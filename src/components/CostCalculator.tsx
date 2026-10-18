import React, { useState } from 'react';
import { IPhoneModel, PaymentMethod, PlanOption, SavedDeal } from '../types';
import { IPHONE_MODELS } from '../data/phonesData';
import { CELLULAR_PLANS } from '../data/plansData';
import { calculateValueScore } from '../utils/scoring';
import { 
  Calculator, 
  HelpCircle, 
  ExternalLink, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles, 
  Info,
  DollarSign,
  Calendar,
  Lock,
  Star,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';

interface CostCalculatorProps {
  selectedModel: IPhoneModel;
  onSelectModel: (m: IPhoneModel) => void;
  seniorMode: boolean;
  onOpenJargon: () => void;
  onToggleSaveDeal: (deal: SavedDeal) => void;
  isSaved: boolean;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  selectedModel,
  onSelectModel,
  seniorMode,
  onOpenJargon,
  onToggleSaveDeal,
  isSaved
}) => {
  // Calculator state
  const [selectedPlanId, setSelectedPlanId] = useState<string>('visible-base');
  const [condition, setCondition] = useState<'Certified Refurbished' | 'Brand New'>('Certified Refurbished');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('outright');
  const [tradeInIphone11, setTradeInIphone11] = useState<boolean>(true);
  const [showFormulaDrawer, setShowFormulaDrawer] = useState<boolean>(false);
  const [lastSelectedElement, setLastSelectedElement] = useState<string>('');
  const [justStarred, setJustStarred] = useState<boolean>(false);

  const selectedPlan = CELLULAR_PLANS.find((p) => p.id === selectedPlanId) || CELLULAR_PLANS[0];

  // Calculate Value Score and complete financial breakdown
  const breakdown = calculateValueScore(
    selectedModel,
    selectedPlan,
    paymentMethod,
    condition,
    tradeInIphone11
  );

  const handleSelectModel = (model: IPhoneModel) => {
    onSelectModel(model);
    setLastSelectedElement(`model-${model.id}`);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setLastSelectedElement(`plan-${planId}`);
  };

  const handleSelectCondition = (cond: 'Certified Refurbished' | 'Brand New') => {
    setCondition(cond);
    setLastSelectedElement(`condition-${cond}`);
  };

  const handleSelectPayment = (pm: PaymentMethod) => {
    setPaymentMethod(pm);
    setLastSelectedElement(`payment-${pm}`);
  };

  const handleStarDeal = () => {
    const dealToSave: SavedDeal = {
      id: `${selectedModel.id}-${selectedPlan.id}-${paymentMethod}-${condition}`,
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      modelId: selectedModel.id,
      modelName: selectedModel.name,
      modelScreenSize: `${selectedModel.screenDiagonalInches}"`,
      modelPortType: selectedModel.portType,
      planId: selectedPlan.id,
      planName: selectedPlan.planName,
      carrier: selectedPlan.carrier,
      paymentMethod,
      condition,
      upfrontCost: breakdown.upfrontCost,
      monthlyPhoneCost: breakdown.monthlyPhoneCost,
      monthlyPlanCost: breakdown.monthlyPlanCost,
      totalMonthlyCost: breakdown.totalMonthlyCost,
      total24MonthCost: breakdown.total24MonthCost,
      total36MonthCost: breakdown.total36MonthCost,
      valueScore: breakdown.score,
      scoreCategory: breakdown.category,
      colorClass: breakdown.colorClass,
      appleDirectUrl: selectedModel.appleDirectUrl,
      carrierDirectUrl: selectedPlan.directUrl
    };

    onToggleSaveDeal(dealToSave);
    setJustStarred(true);
    setTimeout(() => setJustStarred(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner explaining the Value Scoring System */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-cyan-300 border border-indigo-400/30">
                swtch. Value Engine v3.0
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Lower Score = Better Value
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Transparent iPhone & Carrier Cost Analyzer
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Calculates upfront money due today, monthly charges, and true 2-year / 3-year commitments. 
              Like golf, a <strong className="text-cyan-300">lower value score</strong> means less ongoing burden, 
              smaller bills, and freedom from predatory 36-month bill-credit lock-ins.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
              className="text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              <Info className="w-4 h-4 text-cyan-300" />
              <span>{showFormulaDrawer ? 'Hide Formula' : 'How Score is Calculated'}</span>
              {showFormulaDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <button
              onClick={handleStarDeal}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-md active:scale-95 cursor-pointer ${
                isSaved
                  ? 'bg-amber-400 text-slate-900 shadow-amber-400/30 hover:bg-amber-300'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-amber-500/25'
              }`}
            >
              <Star className={`w-4 h-4 ${isSaved ? 'fill-slate-900 text-slate-900 animate-star-burst' : 'fill-white text-white'}`} />
              <span>{isSaved ? 'Deal Saved in Shortlist' : 'Star Deal for Dad'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Formula Explanation Drawer */}
        {showFormulaDrawer && (
          <div className="mt-6 pt-6 border-t border-indigo-800/60 bg-black/30 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl space-y-4 animate-in fade-in-50 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-indigo-500/30">
                <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  1. Upfront Burden (20%)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  (Upfront Cost ÷ $20) × 0.20. Weighs cash due today (device deposit + activation fee).
                </p>
                <div className="mt-2 text-indigo-300 font-mono font-bold">
                  Points: +{breakdown.formula.upfrontPoints.toFixed(1)}
                </div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-indigo-500/30">
                <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  2. Monthly Expense (45%)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Monthly Outlay × 0.45. Heaviest weight: recurring monthly strain on Dad’s fixed income.
                </p>
                <div className="mt-2 text-indigo-300 font-mono font-bold">
                  Points: +{breakdown.formula.monthlyPoints.toFixed(1)}
                </div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-indigo-500/30">
                <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  3. Lock-in Penalty (25%)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  (Contract Months × 1.2) × 0.25. Penalizes predatory 36-month carrier bill credit traps.
                </p>
                <div className="mt-2 text-indigo-300 font-mono font-bold">
                  Points: +{breakdown.formula.contractPenalty.toFixed(1)}
                </div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-emerald-500/30">
                <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  4. Promo Reward (-10%)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  (Promo & iPhone 11 Trade Value ÷ $25) × 0.10. Direct deduction reward for discounts.
                </p>
                <div className="mt-2 text-emerald-400 font-mono font-bold">
                  Deduction: -{breakdown.formula.promoOffset.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/80 rounded-xl border border-indigo-800/80 text-xs text-indigo-200 flex items-center justify-between">
              <span>
                <strong>Net Mathematical Score:</strong> {breakdown.formula.upfrontPoints.toFixed(1)} + {breakdown.formula.monthlyPoints.toFixed(1)} + {breakdown.formula.contractPenalty.toFixed(1)} - {breakdown.formula.promoOffset.toFixed(1)} = <span className="font-bold font-mono text-white">{breakdown.score}</span>
              </span>
              <span className="text-[11px] text-cyan-300 font-semibold">
                Score Rank: {breakdown.category}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Phone Model Picker */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">1</span>
                <span>Select iPhone Model</span>
              </label>
              <span className="text-xs text-slate-500 font-medium">13 Pro Max to 18 Pro Max</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {IPHONE_MODELS.map((m) => {
                const isSelected = selectedModel.id === m.id;
                const isAnimating = lastSelectedElement === `model-${m.id}`;

                return (
                  <button
                    key={m.id}
                    onClick={() => handleSelectModel(m)}
                    className={`p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer active:scale-95 ${
                      isAnimating ? 'animate-choice-pop animate-select-glow' : ''
                    } ${
                      isSelected
                        ? 'border-indigo-600 bg-gradient-to-br from-indigo-50/80 to-white text-indigo-950 ring-2 ring-indigo-500/30 font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold truncate">{m.name}</div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
                      <span>{m.screenDiagonalInches}"</span>
                      <span>·</span>
                      <span className={m.portType === 'USB-C' ? 'text-indigo-600 font-bold' : ''}>{m.portType}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Condition selector if refurbished is available */}
            {selectedModel.refurbishedPrice && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700">Condition Preference:</span>
                <div className="inline-flex rounded-xl p-1 bg-slate-100/90 border border-slate-200/60">
                  <button
                    onClick={() => handleSelectCondition('Certified Refurbished')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer active:scale-95 ${
                      condition === 'Certified Refurbished'
                        ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/60 font-black animate-choice-pop'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Certified Refurbished (${selectedModel.refurbishedPrice})
                  </button>
                  <button
                    onClick={() => handleSelectCondition('Brand New')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer active:scale-95 ${
                      condition === 'Brand New'
                        ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/60 font-black animate-choice-pop'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Brand New (${selectedModel.msrpNew})
                  </button>
                </div>
              </div>
            )}

            {/* Multiple Carrier & Purchase Possibilities for iPhone 16e */}
            {selectedModel.id === 'iphone-16e' && (
              <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 via-indigo-50/30 to-teal-50 border border-emerald-300 rounded-2xl text-xs text-slate-800 space-y-2.5 animate-in fade-in-50 duration-200 shadow-xs">
                <div className="font-extrabold flex items-center justify-between gap-2 text-slate-900 border-b border-emerald-200/60 pb-2">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>iPhone 16e Purchase & Promotion Options for Dad</span>
                  </div>
                  <span className="text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                    4 Verified Paths
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {/* Option 1: Straight Talk $149 Promo */}
                  <div 
                    onClick={() => {
                      handleSelectPlan('straight-talk-silver');
                      handleSelectPayment('outright');
                    }}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      selectedPlan.id === 'straight-talk-silver'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-white hover:bg-emerald-50 border-emerald-300 text-emerald-950'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold">Straight Talk $149.99 Promo</span>
                      <span className="font-mono text-xs font-black">$149.99</span>
                    </div>
                    <p className={`text-[10px] leading-snug ${selectedPlan.id === 'straight-talk-silver' ? 'text-emerald-100' : 'text-slate-500'}`}>
                      Requires Silver Unlimited ($45/mo). Dad keeps existing account & phone number. Automatically unlocks after 60 days of active paid service on Verizon network.
                    </p>
                  </div>

                  {/* Option 2: Apple Store Unlocked */}
                  <div 
                    onClick={() => {
                      handleSelectPayment('outright');
                    }}
                    className="p-2.5 rounded-xl border bg-white hover:bg-indigo-50 border-slate-200 text-slate-800 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold">Apple Store Unlocked</span>
                      <span className="font-mono text-xs font-black">$599 ($459 w/ Trade)</span>
                    </div>
                    <p className="text-[10px] leading-snug text-slate-500">
                      100% factory unlocked on Day 1. Pop Dad's current SIM right in. Eligible for ~$120 trade-in credit on iPhone 11 and 0% APR financing ($24.95/mo).
                    </p>
                  </div>

                  {/* Option 3: Visible by Verizon */}
                  <div 
                    onClick={() => {
                      handleSelectPlan('visible-base');
                      handleSelectPayment('affirm_24');
                    }}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      selectedPlan.id === 'visible-base'
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : 'bg-white hover:bg-indigo-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold">Visible Flat $25/mo All-In</span>
                      <span className="font-mono text-xs font-black">$25/mo</span>
                    </div>
                    <p className={`text-[10px] leading-snug ${selectedPlan.id === 'visible-base' ? 'text-indigo-100' : 'text-slate-500'}`}>
                      All taxes and fees included on Verizon 5G towers. Affirm $24.95/mo device financing without carrier contract lock.
                    </p>
                  </div>

                  {/* Option 4: Postpaid Carrier Warning */}
                  <div className="p-2.5 rounded-xl border bg-amber-50/70 border-amber-200 text-amber-950">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold">AT&T / Verizon Postpaid (Caution)</span>
                      <span className="font-mono text-xs font-black">$0 Down</span>
                    </div>
                    <p className="text-[10px] leading-snug text-amber-800">
                      Requires 36-month high-cost plan ($65–$85/mo) and carrier bill credits. Unlocks only after 36 full months.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Trade-in Dad's iPhone 11 Toggle */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div>
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">2</span>
                  <span>Trade In Dad's Current iPhone 11?</span>
                </label>
                <p className="text-xs text-slate-500 mt-1">
                  Direct Cash Trade-In: ~$110 - $130 · Carrier New Line Trade-in Promo: Up to $630 - $700
                </p>
              </div>
              <button
                onClick={() => {
                  setTradeInIphone11(!tradeInIphone11);
                  setLastSelectedElement('trade-toggle');
                }}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  tradeInIphone11 ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                title="Toggle trade-in"
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    tradeInIphone11 ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {tradeInIphone11 && (
              <div className="mt-4 p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs animate-in fade-in-50 duration-200">
                <div className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Applied to calculation: <strong>${breakdown.appliedPromoCredit.toFixed(0)}</strong> total trade savings
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  {selectedPlan.contractMonths > 0 ? 'Monthly Bill Credit' : 'Instant Cash Off'}
                </span>
              </div>
            )}
          </div>

          {/* 3. Cellular Plan Picker */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">3</span>
                <span>Select Cellular Carrier & Plan</span>
              </label>
              <button
                onClick={onOpenJargon}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Explain Plans</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {CELLULAR_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                const isAnimating = lastSelectedElement === `plan-${plan.id}`;

                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer active:scale-98 ${
                      isAnimating ? 'animate-choice-pop animate-select-glow' : ''
                    } ${
                      isSelected
                        ? 'border-indigo-600 bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/40 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{plan.carrier}</span>
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                            plan.networkType === 'Prepaid / MVNO'
                              ? 'bg-emerald-100 text-emerald-800'
                              : plan.networkType === 'Discount Plan'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {plan.networkType}
                          </span>
                          {plan.id === 'straight-talk-silver' && (
                            <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-full">
                              Dad's Current Carrier
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-slate-600">{plan.planName}</div>
                        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2">
                          <span>Network: {plan.underlyingNetwork}</span>
                          <span>·</span>
                          <span>{plan.contractMonths === 0 ? 'No Contract (Cancel Anytime)' : `${plan.contractMonths}-Month Contract`}</span>
                          <span>·</span>
                          <span>Taxes: {plan.taxesIncluded ? 'Included' : '+ Taxes (~$5)'}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-lg font-black font-mono text-slate-900 tabular-nums">
                          ${plan.monthlyRate}
                          <span className="text-xs font-normal text-slate-500">/mo</span>
                        </div>
                        <div className={`text-[11px] font-bold ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                          {isSelected ? '✓ Selected' : 'Click to select'}
                        </div>
                      </div>
                    </div>

                    {/* Fine print alert if carrier has long contract lock-in */}
                    {plan.finePrintTrap && isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-1.5 bg-amber-50/60 p-2 rounded-xl">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{plan.finePrintTrap}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Payment Method Picker */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs hover:border-indigo-300 transition-colors">
            <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">4</span>
              <span>Device Payment Structure</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleSelectPayment('outright')}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-95 ${
                  paymentMethod === 'outright'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 font-bold animate-choice-pop'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200'
                }`}
              >
                <div className="text-xs font-black">Pay Outright (Best Score)</div>
                <div className="text-[11px] text-slate-500 mt-1">Pay today. Zero monthly phone debt or interest.</div>
              </button>

              <button
                onClick={() => handleSelectPayment('affirm_24')}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-95 ${
                  paymentMethod === 'affirm_24'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 font-bold animate-choice-pop'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200'
                }`}
              >
                <div className="text-xs font-black">Affirm 24-Mo (0% APR)</div>
                <div className="text-[11px] text-slate-500 mt-1">Split device independently without carrier lock-in.</div>
              </button>

              <button
                onClick={() => handleSelectPayment('carrier_36')}
                disabled={selectedPlan.contractMonths === 0}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                  selectedPlan.contractMonths === 0
                    ? 'opacity-40 cursor-not-allowed border-dashed bg-slate-50'
                    : paymentMethod === 'carrier_36'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 font-bold cursor-pointer animate-choice-pop'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 cursor-pointer'
                }`}
              >
                <div className="text-xs font-black">Carrier 36-Mo Financing</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {selectedPlan.contractMonths === 0
                    ? 'Not offered on prepaid plans'
                    : 'Subsidized with monthly bill credits.'}
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Live swtch Value Score Card & Breakdown */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
            
            {/* Header: Value Score Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  swtch. Value Index
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {selectedModel.name}
                </span>
              </div>

              {/* Big Value Score Badge */}
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border font-mono font-bold text-sm tabular-nums shadow-xs">
                  <span className={`px-2 py-0.5 rounded-md text-xs uppercase font-extrabold ${breakdown.colorClass}`}>
                    {breakdown.category}
                  </span>
                  <span className="text-xl font-black text-slate-900 ml-1">
                    {breakdown.score}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">Lower = Better Deal</span>
              </div>
            </div>

            {/* Quick Plain Summary for Dad */}
            <div className="py-3 text-xs text-slate-600 leading-relaxed border-b border-slate-100">
              {breakdown.plainSummary}
            </div>

            {/* Financial Ledger */}
            <div className="py-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Upfront Due Today:</span>
                <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                  ${breakdown.upfrontCost.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Phone Payment:</span>
                <span className="font-mono font-semibold text-slate-800 tabular-nums">
                  ${breakdown.monthlyPhoneCost.toFixed(2)}/mo
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Carrier Plan ({selectedPlan.carrier}):</span>
                <span className="font-mono font-semibold text-slate-800 tabular-nums">
                  ${breakdown.monthlyPlanCost.toFixed(2)}/mo
                </span>
              </div>

              {breakdown.appliedPromoCredit > 0 && (
                <div className="flex justify-between items-center py-1.5 border-b border-emerald-100 text-emerald-800 bg-emerald-50/80 px-2.5 rounded-xl font-semibold">
                  <span>iPhone 11 Trade-In Saved:</span>
                  <span className="font-mono font-bold tabular-nums">
                    -${breakdown.appliedPromoCredit.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Total Monthly Highlight */}
              <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50/50 border border-indigo-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-xs font-bold text-indigo-950 block">Total Combined Monthly</span>
                  <span className="text-[11px] text-indigo-700 font-medium">Phone + Carrier Combined</span>
                </div>
                <div className="text-2xl font-black font-mono text-indigo-900 tabular-nums">
                  ${breakdown.totalMonthlyCost.toFixed(2)}
                  <span className="text-xs font-normal text-indigo-600">/mo</span>
                </div>
              </div>

              {/* Total Cost of Ownership (24-Mo & 36-Mo) */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">2-Year Total</span>
                  <span className="font-mono font-black text-slate-900 text-base tabular-nums">
                    ${breakdown.total24MonthCost.toFixed(0)}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">3-Year Total</span>
                  <span className="font-mono font-black text-slate-900 text-base tabular-nums">
                    ${breakdown.total36MonthCost.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contract Trap Warning if 36-month lock-in */}
            {breakdown.contractMonths === 36 && (
              <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-2xl text-xs text-amber-900 flex items-start gap-2 shadow-xs">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>36-Month Lock-in Notice:</strong> While the upfront device cost is subsidized, Dad will pay over ${breakdown.total36MonthCost.toFixed(0)} total across 3 years. If he cancels or leaves early, remaining credits are forfeited.
                </div>
              </div>
            )}

            {/* Star Deal and Store Action Buttons */}
            <div className="pt-4 space-y-2.5">
              <button
                onClick={handleStarDeal}
                className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95 ${
                  isSaved
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-500/20'
                }`}
              >
                <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : 'fill-white text-white'}`} />
                <span>{isSaved ? 'Starred in My Saved Deals' : 'Star Deal for Dad'}</span>
              </button>

              <a
                href={selectedPlan.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 active:scale-95"
              >
                <span>View {selectedPlan.carrier} Plan Online</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={selectedModel.appleDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Check {selectedModel.name} on Apple Store</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
