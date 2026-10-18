export type PortType = 'Lightning' | 'USB-C';

export interface IPhoneModel {
  id: string;
  name: string;
  generation: string;
  screenSize: string;
  screenDiagonalInches: number;
  weightGrams: number;
  weightOunces: number;
  batteryVideoHours: number;
  chip: string;
  portType: PortType;
  cameraZoom: string;
  faceId: boolean;
  msrpNew: number;
  refurbishedPrice?: number;
  promoPrice?: number;
  bestCondition: 'Brand New' | 'Certified Refurbished' | 'Both Available';
  seniorPros: string[];
  seniorCons: string[];
  summaryForDad: string;
  appleDirectUrl: string;
  bestBuyDirectUrl: string;
  amazonDirectUrl: string;
  walmartDirectUrl: string;
  straightTalkPromoUrl?: string;
  carrierPromotions?: CarrierPromotion[];
}

export interface CarrierPromotion {
  carrier: string;
  promoTitle: string;
  upfrontPrice: number;
  monthlyRequirement: string;
  finePrint: string;
  directUrl: string;
  isUnlockedDayOne?: boolean;
  unlockPolicy?: string;
  planRequired?: string;
  isBestValue?: boolean;
}

export type NetworkType = 'Major Carrier' | 'Prepaid / MVNO' | 'Discount Plan';

export interface PlanOption {
  id: string;
  carrier: string;
  planName: string;
  networkType: NetworkType;
  underlyingNetwork: 'Verizon' | 'AT&T' | 'T-Mobile';
  monthlyRate: number;
  lineCount: number;
  dataAllowance: string;
  hotspotAllowance: string;
  contractMonths: number; // 0, 24, 36
  activationFee: number;
  taxesIncluded: boolean;
  iphone11TradeInCredit: number; // Promotional trade-in credit for Dad's iPhone 11
  straightTalkPortEase: 'Seamless (Same Verizon Network)' | 'Standard Port (Get Transfer PIN)' | 'No Switch Needed';
  seniorPerks: string[]; // Plan perks & senior discount details
  finePrintTrap?: string;
  directUrl: string;
}

export type PaymentMethod = 
  | 'outright' 
  | 'affirm_12' 
  | 'affirm_24' 
  | 'apple_card_24' 
  | 'carrier_36' 
  | 'carrier_24';

export interface ValueScoreBreakdown {
  score: number; // Scaled 10-100 (LOWER IS BETTER)
  category: 'Exceptional Value' | 'Great Value' | 'Fair Value' | 'High Lock-In / Costly';
  colorClass: string;
  upfrontCost: number;
  monthlyPhoneCost: number;
  monthlyPlanCost: number;
  totalMonthlyCost: number;
  contractMonths: number;
  total24MonthCost: number;
  total36MonthCost: number;
  effectivePhonePrice: number;
  appliedPromoCredit: number;
  formula: {
    upfrontPoints: number;
    monthlyPoints: number;
    contractPenalty: number;
    promoOffset: number;
    rawTotal: number;
  };
  plainSummary: string;
}

export interface ActivationStep {
  id: string;
  stepNumber: number;
  title: string;
  estimatedTime: string;
  summary: string;
  instructions: string[];
  tipsForDad: string[];
  actionRequired?: string;
  completed: boolean;
}

export interface SavedDeal {
  id: string;
  savedAt: string;
  modelId: string;
  modelName: string;
  modelScreenSize: string;
  modelPortType: string;
  planId: string;
  planName: string;
  carrier: string;
  paymentMethod: PaymentMethod;
  condition: 'Brand New' | 'Certified Refurbished';
  upfrontCost: number;
  monthlyPhoneCost: number;
  monthlyPlanCost: number;
  totalMonthlyCost: number;
  total24MonthCost: number;
  total36MonthCost: number;
  valueScore: number;
  scoreCategory: string;
  colorClass: string;
  appleDirectUrl: string;
  carrierDirectUrl: string;
}

export type SmartFilterCategory = 'all' | 'budget' | 'performance' | 'camera';
