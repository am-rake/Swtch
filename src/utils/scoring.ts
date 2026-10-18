import { IPhoneModel, PaymentMethod, PlanOption, ValueScoreBreakdown } from '../types';

export function calculateValueScore(
  model: IPhoneModel,
  plan: PlanOption,
  paymentMethod: PaymentMethod,
  condition: 'Brand New' | 'Certified Refurbished' = 'Certified Refurbished',
  hasIphone11TradeIn: boolean = true
): ValueScoreBreakdown {
  // 1. Determine baseline phone price
  const isStraightTalkPromo = plan.carrier.includes('Straight Talk') && Boolean(model.promoPrice);
  const isRefurb = condition === 'Certified Refurbished' && Boolean(model.refurbishedPrice);
  
  // If Straight Talk promo price is available, use $149.99
  let basePhonePrice = model.msrpNew;
  if (isStraightTalkPromo) {
    basePhonePrice = model.promoPrice!;
  } else if (isRefurb) {
    basePhonePrice = model.refurbishedPrice!;
  }

  // 2. Determine applicable promo / trade-in credit for Dad's iPhone 11
  let appliedPromoCredit = 0;
  const isCarrierFinanced = paymentMethod === 'carrier_24' || paymentMethod === 'carrier_36';

  if (hasIphone11TradeIn) {
    if (isStraightTalkPromo) {
      // In the $149.99 promo, the phone is already discounted from $599.99 down to $149.99 ($450 promo discount!)
      appliedPromoCredit = 450;
    } else if (isCarrierFinanced && plan.contractMonths > 0) {
      // Carrier bill credit promotion
      appliedPromoCredit = Math.min(basePhonePrice, plan.iphone11TradeInCredit);
    } else {
      // Direct outright / Apple trade-in cash value for iPhone 11 (approx $110 - $130)
      appliedPromoCredit = 120;
    }
  }

  // 3. Effective phone price after promotion
  const effectivePhonePrice = isStraightTalkPromo 
    ? model.promoPrice! 
    : Math.max(0, basePhonePrice - appliedPromoCredit);

  // 4. Calculate Upfront Cost due today
  let upfrontCost = plan.activationFee;
  let monthlyPhoneCost = 0;
  let contractMonths = plan.contractMonths;

  switch (paymentMethod) {
    case 'outright':
      upfrontCost += effectivePhonePrice;
      monthlyPhoneCost = 0;
      contractMonths = 0;
      break;

    case 'affirm_12':
      // Affirm standard 0%-10% estimated APR or 12 installments
      upfrontCost += 0; // Affirm typically $0 down with approved credit
      monthlyPhoneCost = Math.round((effectivePhonePrice / 12) * 100) / 100;
      contractMonths = 0; // Device loan with Affirm is not a cellular carrier lock-in
      break;

    case 'affirm_24':
      upfrontCost += 0;
      monthlyPhoneCost = Math.round((effectivePhonePrice / 24) * 100) / 100;
      contractMonths = 0;
      break;

    case 'apple_card_24':
      upfrontCost += 0;
      monthlyPhoneCost = Math.round((effectivePhonePrice / 24) * 100) / 100;
      contractMonths = 0;
      break;

    case 'carrier_24':
      upfrontCost += 0;
      monthlyPhoneCost = Math.round((effectivePhonePrice / 24) * 100) / 100;
      contractMonths = Math.max(contractMonths, 24);
      break;

    case 'carrier_36':
      upfrontCost += 0;
      monthlyPhoneCost = Math.round((effectivePhonePrice / 36) * 100) / 100;
      contractMonths = Math.max(contractMonths, 36);
      break;
  }

  // 5. Monthly Plan & Total Monthly
  const monthlyPlanCost = plan.monthlyRate;
  const totalMonthlyCost = Math.round((monthlyPhoneCost + monthlyPlanCost) * 100) / 100;

  // 6. 24-Month and 36-Month Total Cost of Ownership (TCO)
  const total24MonthCost = Math.round((upfrontCost + (totalMonthlyCost * 24)) * 100) / 100;
  const total36MonthCost = Math.round((upfrontCost + (totalMonthlyCost * 36)) * 100) / 100;

  // 7. Value Scoring Engine Formula
  // Lower score indicates better overall value (less financial strain and commitment for Dad)
  // Factors:
  // - Upfront cost points (scaled: $500 upfront = ~4.0 pts)
  // - Monthly cost points (heaviest weighting: $50/mo = 22.5 pts)
  // - Contract duration penalty (0 mo = 0 penalty pts; 24 mo = 7.5 pts; 36 mo = 11.25 pts)
  // - Promotion offset (rewarding honest discounts)
  const upfrontPoints = Math.round(((upfrontCost / 25) * 0.20) * 10) / 10;
  const monthlyPoints = Math.round((totalMonthlyCost * 0.45) * 10) / 10;
  const contractPenalty = Math.round(((contractMonths * 1.25) * 0.25) * 10) / 10;
  const promoOffset = Math.round(((appliedPromoCredit / 30) * 0.10) * 10) / 10;

  const rawTotal = upfrontPoints + monthlyPoints + contractPenalty - promoOffset;
  const score = Math.max(12, Math.min(95, Math.round(rawTotal)));

  // 8. Categorize Score
  let category: ValueScoreBreakdown['category'];
  let colorClass = '';

  if (score <= 32) {
    category = 'Exceptional Value';
    colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  } else if (score <= 45) {
    category = 'Great Value';
    colorClass = 'text-teal-700 bg-teal-50 border-teal-300';
  } else if (score <= 58) {
    category = 'Fair Value';
    colorClass = 'text-amber-800 bg-amber-50 border-amber-300';
  } else {
    category = 'High Lock-In / Costly';
    colorClass = 'text-rose-800 bg-rose-50 border-rose-300';
  }

  // 9. Plain English summary for Dad
  let plainSummary = '';
  if (contractMonths === 0 && totalMonthlyCost <= 40) {
    plainSummary = 'Lowest monthly drain and zero contract lock-in. You own your phone and can switch plans anytime.';
  } else if (isCarrierFinanced && contractMonths === 36) {
    plainSummary = 'Looks cheap upfront ($0 today), but commits you to 3 full years of a $65+/month cellular plan.';
  } else if (paymentMethod.startsWith('affirm') || paymentMethod === 'apple_card_24') {
    plainSummary = 'Predictable monthly device payments with zero cellular carrier lock-in, paired with an affordable prepaid plan.';
  } else {
    plainSummary = 'Balanced mid-tier choice with moderate upfront cost and dependable coverage.';
  }

  return {
    score,
    category,
    colorClass,
    upfrontCost,
    monthlyPhoneCost,
    monthlyPlanCost,
    totalMonthlyCost,
    contractMonths,
    total24MonthCost,
    total36MonthCost,
    effectivePhonePrice,
    appliedPromoCredit,
    formula: {
      upfrontPoints,
      monthlyPoints,
      contractPenalty,
      promoOffset,
      rawTotal: Math.round(rawTotal * 10) / 10
    },
    plainSummary
  };
}
