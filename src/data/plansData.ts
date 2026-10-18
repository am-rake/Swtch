import { PlanOption } from '../types';

export const CELLULAR_PLANS: PlanOption[] = [
  {
    id: 'visible-base',
    carrier: 'Visible by Verizon',
    planName: 'Visible Unlimited ($25/mo)',
    networkType: 'Prepaid / MVNO',
    underlyingNetwork: 'Verizon',
    monthlyRate: 25,
    lineCount: 1,
    dataAllowance: 'Unlimited 5G & 4G LTE Data',
    hotspotAllowance: 'Unlimited Mobile Hotspot (5 Mbps speed)',
    contractMonths: 0,
    activationFee: 0,
    taxesIncluded: true,
    iphone11TradeInCredit: 120, // Instant trade-in cash value
    straightTalkPortEase: 'Seamless (Same Verizon Network)',
    seniorPerks: [
      'Same exact cell towers as your current Straight Talk phone – identical coverage',
      'Flat $25 every single month: taxes, regulatory fees, and 911 fees are all included',
      'No contract, no credit check, no cancellation fees ever',
      'Unlimited mobile hotspot included so Dad can connect an iPad or laptop anywhere'
    ],
    finePrintTrap: 'Data speeds may slow temporarily in extremely congested stadiums or airports.',
    directUrl: 'https://www.visible.com/plans'
  },
  {
    id: 'consumer-cellular-unlimited',
    carrier: 'Consumer Cellular',
    planName: 'Unlimited Talk, Text & Data (AARP 5% Off)',
    networkType: 'Discount Plan',
    underlyingNetwork: 'AT&T',
    monthlyRate: 33.25, // $35 minus 5% AARP discount
    lineCount: 1,
    dataAllowance: 'Unlimited Data (Slows after 50GB)',
    hotspotAllowance: 'Included in monthly data bucket',
    contractMonths: 0,
    activationFee: 0,
    taxesIncluded: false,
    iphone11TradeInCredit: 110,
    straightTalkPortEase: 'Standard Port (Get Transfer PIN)',
    seniorPerks: [
      'Rated #1 in Customer Satisfaction for 12 consecutive years by J.D. Power',
      '100% US-based phone support: dial directly and speak with a patient human',
      'AARP members receive 5% off monthly service plus free account setup',
      'No contracts: cancel or change plans anytime with zero penalty'
    ],
    finePrintTrap: 'Taxes and government fees are added to monthly bill (typically +$3 to $5/month).',
    directUrl: 'https://www.consumercellular.com/shopping/choose/plan'
  },
  {
    id: 'straight-talk-silver',
    carrier: 'Straight Talk (Keep Current)',
    planName: 'Silver Unlimited ($45/mo)',
    networkType: 'Prepaid / MVNO',
    underlyingNetwork: 'Verizon',
    monthlyRate: 45,
    lineCount: 1,
    dataAllowance: 'Unlimited High-Speed 5G Data',
    hotspotAllowance: '10GB Mobile Hotspot per month',
    contractMonths: 0,
    activationFee: 0,
    taxesIncluded: false,
    iphone11TradeInCredit: 80,
    straightTalkPortEase: 'No Switch Needed',
    seniorPerks: [
      'Zero switching hassle: your phone number stays exactly where it is',
      'Keep your current payment method and login credentials',
      'Verizon network 5G nationwide coverage',
      'Auto-refill discount ($2.50/mo savings available)'
    ],
    finePrintTrap: 'No major subsidized phone promotions for existing customers; phones must be bought outright or via SmartPay.',
    directUrl: 'https://www.straighttalk.com/all-plans'
  },
  {
    id: 'mint-mobile-unlimited',
    carrier: 'Mint Mobile',
    planName: 'Unlimited 3-Month Intro ($15/mo)',
    networkType: 'Prepaid / MVNO',
    underlyingNetwork: 'T-Mobile',
    monthlyRate: 15, // $30/mo renewal after introductory 3 months
    lineCount: 1,
    dataAllowance: 'Unlimited 5G Data (40GB high-speed then slowed)',
    hotspotAllowance: '10GB Mobile Hotspot',
    contractMonths: 0,
    activationFee: 0,
    taxesIncluded: false,
    iphone11TradeInCredit: 115,
    straightTalkPortEase: 'Standard Port (Get Transfer PIN)',
    seniorPerks: [
      'Ultra low cost: only $15/month for the first 3 months ($45 total upfront)',
      'High-speed 5G on T-Mobile network',
      'Free mobile hotspot allowance',
      'Easy eSIM activation directly from the Mint app'
    ],
    finePrintTrap: 'Requires paying for service in 3, 6, or 12-month advance blocks. Renews at $30/mo unless choosing 12-month upfront term.',
    directUrl: 'https://www.mintmobile.com/plans/'
  },
  {
    id: 't-mobile-55-plus',
    carrier: 'T-Mobile',
    planName: 'Go5G Plus 55+ ($65/mo)',
    networkType: 'Major Carrier',
    underlyingNetwork: 'T-Mobile',
    monthlyRate: 65,
    lineCount: 1,
    dataAllowance: 'Unlimited Premium High-Speed Data (Never slowed)',
    hotspotAllowance: '50GB High-Speed Mobile Hotspot',
    contractMonths: 24, // 24-month device bill credits
    activationFee: 35,
    taxesIncluded: true,
    iphone11TradeInCredit: 630, // Promo trade-in credit over 24 months
    straightTalkPortEase: 'Standard Port (Get Transfer PIN)',
    seniorPerks: [
      'Special 55+ senior rate: saves $25/month compared to standard Go5G Plus',
      'Taxes and fees are 100% included (no surprise surcharges)',
      'New customer promotion: get up to $630 - $830 off new iPhone with your iPhone 11 trade-in',
      'Shorter 24-month commitment (1 full year shorter than Verizon and AT&T)'
    ],
    finePrintTrap: 'Phone discount is delivered via 24 monthly bill credits. If you cancel early, remaining phone balance becomes due.',
    directUrl: 'https://www.t-mobile.com/cell-phone-plans/unlimited-55-plus-senior-discount-plans'
  },
  {
    id: 'verizon-welcome-tradein',
    carrier: 'Verizon',
    planName: 'Unlimited Welcome (New Line Promo)',
    networkType: 'Major Carrier',
    underlyingNetwork: 'Verizon',
    monthlyRate: 65,
    lineCount: 1,
    dataAllowance: 'Unlimited 5G Data',
    hotspotAllowance: 'Available as $10/mo add-on',
    contractMonths: 36, // 36-month device bill credits
    activationFee: 35,
    taxesIncluded: false,
    iphone11TradeInCredit: 700, // "Free phone on us" trade-in credit spread over 36 mo
    straightTalkPortEase: 'Seamless (Same Verizon Network)',
    seniorPerks: [
      'Same Verizon network towers Dad is used to with Straight Talk',
      '"On Us" promo: can make an iPhone 14 Plus or 15 virtually $0 upfront with iPhone 11 trade-in',
      'In-person assistance available at thousands of Verizon retail stores nationwide'
    ],
    finePrintTrap: 'CRITICAL: Locked into a 36-month (3-year!) agreement. If you cancel before month 36, you owe hundreds in uncredited phone balance, plus monthly bill includes extra ~$5/mo in taxes.',
    directUrl: 'https://www.verizon.com/plans/unlimited/'
  },
  {
    id: 'att-starter-tradein',
    carrier: 'AT&T',
    planName: 'Unlimited Starter SL ($66/mo)',
    networkType: 'Major Carrier',
    underlyingNetwork: 'AT&T',
    monthlyRate: 65.99,
    lineCount: 1,
    dataAllowance: 'Unlimited 5G Data',
    hotspotAllowance: '5GB Mobile Hotspot',
    contractMonths: 36,
    activationFee: 35,
    taxesIncluded: false,
    iphone11TradeInCredit: 700,
    straightTalkPortEase: 'Standard Port (Get Transfer PIN)',
    seniorPerks: [
      'High promotional credit on iPhone 11 trade-in',
      'Active Armor fraud call blocking included for spam protection',
      'Nationwide store network for in-person support'
    ],
    finePrintTrap: 'Requires 36-month installment agreement. Monthly plan is $66 + taxes, making the 3-year total over $2,400 just for cell service.',
    directUrl: 'https://www.att.com/plans/wireless/'
  }
];
