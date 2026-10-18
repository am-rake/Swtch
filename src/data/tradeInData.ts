export type StorageCapacity = '64GB' | '128GB' | '256GB';
export type DeviceCondition = 'Flawless (Like New)' | 'Good (Normal Wear, No Cracks)' | 'Fair (Heavy Scratches)' | 'Damaged (Cracked Screen/Back)';

export interface TradeInOption {
  merchant: string;
  payoutType: 'Instant Cash / Discount' | 'Store Gift Card' | '24/36-Mo Bill Credits';
  estimatedValue: number;
  promoValue?: number;
  promoConditions?: string;
  directUrl: string;
  bestFor: string;
}

export const IPHONE_11_BASE_TRADE_VALUES: Record<StorageCapacity, Record<DeviceCondition, number>> = {
  '64GB': {
    'Flawless (Like New)': 110,
    'Good (Normal Wear, No Cracks)': 100,
    'Fair (Heavy Scratches)': 65,
    'Damaged (Cracked Screen/Back)': 35
  },
  '128GB': {
    'Flawless (Like New)': 125,
    'Good (Normal Wear, No Cracks)': 115,
    'Fair (Heavy Scratches)': 75,
    'Damaged (Cracked Screen/Back)': 45
  },
  '256GB': {
    'Flawless (Like New)': 140,
    'Good (Normal Wear, No Cracks)': 130,
    'Fair (Heavy Scratches)': 85,
    'Damaged (Cracked Screen/Back)': 50
  }
};

export function getIPhone11TradeOptions(
  capacity: StorageCapacity = '128GB',
  condition: DeviceCondition = 'Good (Normal Wear, No Cracks)'
): TradeInOption[] {
  const baseCash = IPHONE_11_BASE_TRADE_VALUES[capacity][condition];
  const isCracked = condition === 'Damaged (Cracked Screen/Back)';

  return [
    {
      merchant: 'Apple Official Trade In',
      payoutType: 'Instant Cash / Discount',
      estimatedValue: isCracked ? 30 : Math.min(110, baseCash),
      directUrl: 'https://www.apple.com/shop/trade-in',
      bestFor: 'Instant deduction on unlocked iPhone 14, 15, 16, 17, or 18'
    },
    {
      merchant: 'Best Buy Trade-In',
      payoutType: 'Store Gift Card',
      estimatedValue: isCracked ? 25 : Math.round(baseCash * 0.95),
      directUrl: 'https://www.bestbuy.com/site/services/best-buy-trade-in/pcmcat133600050011.c',
      bestFor: 'Quick in-store drop off at any local Best Buy counter'
    },
    {
      merchant: 'Decluttr / Swappa (Direct Cash Buyback)',
      payoutType: 'Instant Cash / Discount',
      estimatedValue: isCracked ? 40 : baseCash,
      directUrl: 'https://www.decluttr.com/sell-my-phone/',
      bestFor: 'Direct deposit straight into Dad’s bank account or PayPal'
    },
    {
      merchant: 'Straight Talk Upgrade Program',
      payoutType: 'Instant Cash / Discount',
      estimatedValue: isCracked ? 20 : Math.round(baseCash * 0.85),
      directUrl: 'https://www.straighttalk.com/phones',
      bestFor: 'Applying toward the $149 iPhone 16e upgrade'
    },
    {
      merchant: 'T-Mobile (55+ / Go5G Promo Trade-In)',
      payoutType: '24/36-Mo Bill Credits',
      estimatedValue: isCracked ? 150 : 630,
      promoValue: 630,
      promoConditions: 'Requires switching to Go5G Plus 55+ plan; applied over 24 monthly bill credits',
      directUrl: 'https://www.t-mobile.com/cell-phone-plans/unlimited-55-plus-senior-discount-plans',
      bestFor: 'Highest dollar credit if Dad is willing to join a 24-month contract'
    },
    {
      merchant: 'Verizon (Unlimited Plus Promo Trade-In)',
      payoutType: '24/36-Mo Bill Credits',
      estimatedValue: isCracked ? 200 : 700,
      promoValue: 700,
      promoConditions: 'Requires switching to Unlimited Plus plan; applied over 36 monthly bill credits',
      directUrl: 'https://www.verizon.com/smartphones/apple/',
      bestFor: 'Major carrier upgrade credit over 3 years'
    },
    {
      merchant: 'AT&T (Unlimited Extra Promo Trade-In)',
      payoutType: '24/36-Mo Bill Credits',
      estimatedValue: isCracked ? 175 : 700,
      promoValue: 700,
      promoConditions: 'Requires switching to Unlimited Extra EL plan; applied over 36 monthly bill credits',
      directUrl: 'https://www.att.com/buy/phones/',
      bestFor: 'AT&T network 36-month promotional bill credit'
    }
  ];
}
