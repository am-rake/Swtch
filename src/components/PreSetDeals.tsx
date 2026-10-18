import React, { useState, useMemo } from 'react';
import { IPhoneModel, SavedDeal, SmartFilterCategory } from '../types';
import { IPHONE_MODELS } from '../data/phonesData';
import { CELLULAR_PLANS } from '../data/plansData';
import { calculateValueScore } from '../utils/scoring';
import { 
  ExternalLink, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Star, 
  Sparkles, 
  Zap, 
  Camera, 
  Lock, 
  Unlock,
  AlertCircle,
  X
} from 'lucide-react';

interface PreSetDealsProps {
  onLoadDealIntoCalculator: (model: IPhoneModel, planId?: string) => void;
  seniorMode: boolean;
  searchQuery?: string;
  smartFilter?: SmartFilterCategory;
  onClearFilter?: () => void;
}

export const PreSetDeals: React.FC<PreSetDealsProps> = ({
  onLoadDealIntoCalculator,
  seniorMode,
  searchQuery = '',
  smartFilter = 'all',
  onClearFilter
}) => {
  const [clickedDealId, setClickedDealId] = useState<string | null>(null);

  // Define curated high-value combinations categorized by Budget, Performance, and Camera Focus
  const curatedDeals = [
    // --- BUDGET FOCUS DEALS ---
    {
      id: 'bundle-st-16e-promo',
      category: 'budget' as const,
      categoryLabel: 'Budget Pick · Top Value',
      badge: 'TOP BUDGET PICK · $450 Instant Savings',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      title: 'iPhone 16e: $149.99 Straight Talk Promo',
      subtitle: 'iPhone 16e (128GB, A18 Chip, USB-C) + Straight Talk Silver ($45/mo)',
      modelId: 'iphone-16e',
      planId: 'straight-talk-silver',
      paymentMethod: 'outright' as const,
      condition: 'Brand New' as const,
      tradeIn: true,
      highlights: [
        'Massive $450 Instant Promo: Brand new 2025 iPhone with Apple A18 chip for just $149.99 (MSRP $599.99)',
        'Zero Carrier Switching: Dad keeps his current Straight Talk account, phone number, and familiar service',
        'Featherlight 5.89 oz design: by far the easiest on hands and joints, zero wrist fatigue',
        'Universal USB-C charging cord, Face ID, 48MP camera, and 6+ years of future iOS support'
      ],
      finePrintRequirement: 'Requires Straight Talk Silver Unlimited plan ($45/mo) with AutoPay. Device is locked to Straight Talk; automatically eligible for unlock after 60 days of consecutive active paid service on Verizon network. Taxes due at checkout.',
      estimatedSavings: 'Saves $450 upfront on a brand new 2025 phone with zero long-term contract'
    },
    {
      id: 'bundle-saver',
      category: 'budget' as const,
      categoryLabel: 'Budget Pick · Big Screen',
      badge: 'BUDGET BIG SCREEN · 6.7" Display & $25/mo',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      title: 'The Smart Value Saver (Big Screen 6.7")',
      subtitle: 'iPhone 14 Plus (Refurbished 6.7") + Visible by Verizon ($25/mo)',
      modelId: 'iphone-14-plus',
      planId: 'visible-base',
      paymentMethod: 'outright' as const,
      condition: 'Certified Refurbished' as const,
      tradeIn: true,
      highlights: [
        'Huge 6.7" screen that is lightweight (7.1 oz) so Dad’s hands never cramp during reading',
        'Uses the exact same Verizon towers as his current Straight Talk phone',
        'Flat $25/mo total with all taxes and fees included',
        'No contracts or bill credits: cancel or switch anytime with zero penalty'
      ],
      finePrintRequirement: 'Prepaid service paid month-to-month. No contract. Certified refurbished unit includes 1-year warranty and new battery.',
      estimatedSavings: 'Saves $1,440 over 3 years compared to Verizon standard contract'
    },
    {
      id: 'bundle-senior-care',
      category: 'budget' as const,
      categoryLabel: 'Budget Pick · Senior Plan',
      badge: 'SENIOR PLAN DEAL · 5% AARP Discount',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      title: 'USB-C Comfort + Live AARP Support',
      subtitle: 'iPhone 15 Plus + Consumer Cellular AARP ($33.25/mo) via Affirm',
      modelId: 'iphone-15-plus',
      planId: 'consumer-cellular-unlimited',
      paymentMethod: 'affirm_24' as const,
      condition: 'Brand New' as const,
      tradeIn: true,
      highlights: [
        '100% US-based customer phone support with zero automated phone trees',
        'Modern USB-C charging cord: reversible plug, eliminates old Lightning cables',
        '5% monthly discount for AARP members plus priority medical alert compatibility',
        'Affirm splits phone independently into monthly payments without carrier lock-in'
      ],
      finePrintRequirement: 'Requires active AARP membership for 5% monthly rate discount. Device financed separately via Affirm with 0% APR on approved credit.',
      estimatedSavings: 'Saves $38/mo compared to major carrier post-paid plans'
    },

    // --- PERFORMANCE FOCUS DEALS ---
    {
      id: 'bundle-18-flagship',
      category: 'performance' as const,
      categoryLabel: 'Performance King · 2026 Flagship',
      badge: 'PERFORMANCE KING · 2nm A20 Pro & 35-Hr Battery',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      title: 'iPhone 18 Pro Max: Performance Sovereign',
      subtitle: 'iPhone 18 Pro Max (6.9" 2nm A20 Pro) + Visible Unlimited ($25/mo)',
      modelId: 'iphone-18-pro-max',
      planId: 'visible-base',
      paymentMethod: 'outright' as const,
      condition: 'Brand New' as const,
      tradeIn: true,
      highlights: [
        'Massive 6.9-inch display: the absolute easiest screen to read with large text enabled',
        'Next-gen 2nm A20 Pro chip delivers unprecedented 35-hour video playback battery',
        'Vapor chamber cooling keeps phone cool in hand during long FaceTime family calls',
        'Paired with Visible $25/mo prepaid so you avoid 36-month carrier bill credit traps'
      ],
      finePrintRequirement: 'Factory unlocked from Apple on Day 1. Can be paired with Visible or Dad\'s current Straight Talk SIM.',
      estimatedSavings: 'Saves $1,620 in carrier fees over 3 years vs AT&T/Verizon postpaid'
    },
    {
      id: 'bundle-18-pro-compact',
      category: 'performance' as const,
      categoryLabel: 'Performance Compact',
      badge: 'PERFORMANCE COMPACT · 120Hz ProMotion & 12GB RAM',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      title: 'iPhone 18 Pro: Compact Speed Demon',
      subtitle: 'iPhone 18 Pro (6.3" Titanium A20 Pro) + Straight Talk Silver ($45/mo)',
      modelId: 'iphone-18-pro',
      planId: 'straight-talk-silver',
      paymentMethod: 'affirm_24' as const,
      condition: 'Brand New' as const,
      tradeIn: true,
      highlights: [
        'A20 Pro processor with 12GB RAM for lightning responsiveness and 7+ years of iOS updates',
        'Featherlight 6.67 oz titanium frame is extremely gentle on aging wrists and hands',
        'Buttery smooth 120Hz ProMotion display eliminates jitter when reading emails and articles',
        'Stay on Dad’s existing Straight Talk service with zero SIM swap hassles'
      ],
      finePrintRequirement: 'Affirm 0% APR financing ($49.95/mo for 24 months). No carrier lock or 36-month bill credit penalty.',
      estimatedSavings: 'Saves over $1,200 vs 3-year AT&T lock-in'
    },
    {
      id: 'bundle-17-air',
      category: 'performance' as const,
      categoryLabel: 'Performance Ergonomics',
      badge: 'PERFORMANCE ERGONOMICS · Thinnest iPhone Ever (5.6mm)',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      title: 'iPhone 17 Air: Ultra-Thin Featherweight',
      subtitle: 'iPhone 17 Air (6.6" 5.6mm Ultra-Slim, 5.8 oz) + Visible Unlimited ($25/mo)',
      modelId: 'iphone-17-air',
      planId: 'visible-base',
      paymentMethod: 'outright' as const,
      condition: 'Brand New' as const,
      tradeIn: true,
      highlights: [
        'Ultra-slim 5.6mm profile weighing only 5.8 oz: zero wrist strain for Dad during bedtime reading',
        'Next-generation A19 chip with hardware AI acceleration for real-time live captions and voice clarity',
        'Vibrant 6.6" display offers the big text readability of a Max model with none of the heavy weight',
        'Paired with $25/mo Visible on Verizon’s proven towers'
      ],
      finePrintRequirement: 'Factory unlocked. eSIM only device. Compatible with all major US networks and prepaid carriers.',
      estimatedSavings: 'Saves $1,350 vs standard big-carrier financing'
    },

    // --- CAMERA FOCUS DEALS ---
    {
      id: 'bundle-18-camera-studio',
      category: 'camera' as const,
      categoryLabel: 'Camera Focus · Studio Optical',
      badge: 'CAMERA MASTER · 5x-10x Variable Optical Telephoto',
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      title: 'iPhone 18 Pro Max: Optical Zoom Studio',
      subtitle: 'iPhone 18 Pro Max (5x-10x Variable Optical Zoom + 48MP Triple Lens)',
      modelId: 'iphone-18-pro-max',
      planId: 'straight-talk-silver',
      paymentMethod: 'affirm_24' as const,
      condition: 'Brand New' as const,
      tradeIn: true,
      highlights: [
        'Revolutionary 5x-10x Variable Optical Aperture: crisp, crystal-clear photos of grandkids from across sports fields',
        '48MP Triple-Lens system with enhanced low-light Photonic Engine for sharp indoor family holiday photos',
        'Dedicated tactile Camera Control button on the side: Dad can slide his finger to zoom just like a classic camera',
        'Studio-quality directional microphones filter out background cafe and restaurant noise on video calls'
      ],
      finePrintRequirement: 'Device purchased unlocked from Apple with 0% APR Affirm financing, keeping Dad on Straight Talk without carrier contracts.',
      estimatedSavings: 'Professional camera replacement saving $1,000+ on dedicated camera gear'
    },
    {
      id: 'bundle-16-pro-camera',
      category: 'camera' as const,
      categoryLabel: 'Camera Focus · Dedicated Shutter',
      badge: 'CAMERA FOCUS · 5x Tetraprism Zoom & Dedicated Shutter',
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      title: 'iPhone 16 Pro: Dedicated Camera Button & 5x Zoom',
      subtitle: 'iPhone 16 Pro (6.3" Tetraprism 5x Zoom) + Straight Talk Silver ($45/mo)',
      modelId: 'iphone-16-pro',
      planId: 'straight-talk-silver',
      paymentMethod: 'affirm_24' as const,
      condition: 'Brand New' as const,
      tradeIn: true,
      highlights: [
        'Physical Camera Control button: 2-stage press (half-press to lock focus, full-press to snap photo) – feels like a real camera',
        '5x Optical Tetraprism Zoom: get 5x closer without any digital pixel blur or degradation',
        '48MP Ultra-Wide lens with automatic macro mode for crisp close-up reading of tiny prescription bottle labels',
        'Keeps Dad on his familiar Straight Talk plan with no bill surprises'
      ],
      finePrintRequirement: 'Paired with Straight Talk Silver $45/mo plan. Device purchased unlocked or financed via Affirm 24.',
      estimatedSavings: 'Saves $720 over 3 years vs Verizon Ultimate postpaid plan'
    },
    {
      id: 'bundle-17-pm-zoom',
      category: 'camera' as const,
      categoryLabel: 'Camera Focus · Giant Viewfinder',
      badge: 'CAMERA FOCUS · Giant 6.9" Viewfinder & 48MP Telephoto',
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      title: 'iPhone 17 Pro Max: Giant Viewfinder & 5x Optical',
      subtitle: 'iPhone 17 Pro Max (6.9" 5x Zoom + Action Button) + Visible ($25/mo)',
      modelId: 'iphone-17-pro-max',
      planId: 'visible-base',
      paymentMethod: 'outright' as const,
      condition: 'Brand New' as const,
      tradeIn: true,
      highlights: [
        'Massive 6.9" OLED serves as an ultra-clear viewfinder for framing portraits of family and nature',
        'Upgraded 48MP telephoto sensor gives double the optical resolution of older iPhone 15 Pro Max',
        'Customizable Action Button can be set to immediately launch Magnifier or Camera with 1 touch',
        'Visible $25/mo prepaid saves $1,500+ over 3 years vs postpaid carrier bundles'
      ],
      finePrintRequirement: 'Prepaid Visible service on Verizon network. Unlocked device with zero carrier lock-in.',
      estimatedSavings: 'Saves $1,500+ over 3 years compared to AT&T/Verizon postpaid'
    }
  ];

  // Filter curated deals based on searchQuery and smartFilter
  const filteredDeals = useMemo(() => {
    return curatedDeals.filter((deal) => {
      // 1. Smart Category Filter
      if (smartFilter !== 'all' && deal.category !== smartFilter) {
        return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          deal.title.toLowerCase().includes(q) ||
          deal.subtitle.toLowerCase().includes(q) ||
          deal.badge.toLowerCase().includes(q) ||
          deal.categoryLabel.toLowerCase().includes(q) ||
          deal.highlights.some(h => h.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [smartFilter, searchQuery]);

  const handleAction = (dealId: string, model: IPhoneModel, planId: string) => {
    setClickedDealId(dealId);
    setTimeout(() => setClickedDealId(null), 300);
    onLoadDealIntoCalculator(model, planId);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-indigo-50/50 to-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
                swtch. Curated Bundles
              </span>
              <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                Zero Lock-In Verified
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Top Verified Bundles for Dad
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              We evaluated every combination of iPhone (13 Pro Max through 18 Pro Max & 16e) across outright purchase, 
              Affirm installment plans, and carrier promotions. Every deal specifies exact fine print, plan requirements, 
              and carrier unlock terms.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs bg-emerald-600 text-white font-extrabold px-3 py-1.5 rounded-xl shadow-xs">
              ★ Straight Talk Deal: iPhone 16e for $149.99
            </span>
          </div>
        </div>

        {/* Active Smart Search / Filter Status Bar */}
        {(smartFilter !== 'all' || searchQuery.trim()) && (
          <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-between gap-3 bg-indigo-50/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-3 sm:px-8">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>
                Showing <strong>{filteredDeals.length}</strong> deals filtered by{' '}
                <span className="capitalize underline font-black text-indigo-700">
                  {smartFilter !== 'all' ? `${smartFilter} Focus` : `"${searchQuery}"`}
                </span>
              </span>
            </div>

            {onClearFilter && (
              <button
                onClick={onClearFilter}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white border border-indigo-200 px-2.5 py-1 rounded-lg flex items-center gap-1 active:scale-95 cursor-pointer shadow-2xs"
              >
                <X className="w-3.5 h-3.5" />
                <span>Show All Deals</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Grid of Bundles */}
      {filteredDeals.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No deals matched the current filter</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try clearing the search query or selecting a different smart filter category (Budget, Performance, or Camera Focus).
          </p>
          {onClearFilter && (
            <button
              onClick={onClearFilter}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl active:scale-95 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => {
            const model = IPHONE_MODELS.find((m) => m.id === deal.modelId) || IPHONE_MODELS[0];
            const plan = CELLULAR_PLANS.find((p) => p.id === deal.planId) || CELLULAR_PLANS[0];
            const scoreData = calculateValueScore(model, plan, deal.paymentMethod, deal.condition, deal.tradeIn);
            const isClicked = clickedDealId === deal.id;

            return (
              <div
                key={deal.id}
                className={`bg-white border rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group ${
                  isClicked
                    ? 'border-indigo-600 ring-2 ring-indigo-500/30 scale-[0.99] animate-choice-pop'
                    : 'border-slate-200/90 hover:border-indigo-400'
                }`}
              >
                <div>
                  {/* Category Pill & Value Score */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-black px-2.5 py-1 rounded-xl border ${deal.badgeColor}`}>
                      {deal.badge}
                    </span>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl border font-mono font-bold text-xs tabular-nums bg-slate-50">
                      <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black uppercase ${scoreData.colorClass}`}>
                        {scoreData.category}
                      </span>
                      <span className="font-black text-slate-900 ml-0.5">
                        {scoreData.score}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                    {deal.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1 mb-4">
                    {deal.subtitle}
                  </p>

                  {/* Pricing Matrix Strip */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-gradient-to-r from-slate-50 via-indigo-50/20 to-slate-50 rounded-2xl border border-slate-200/80 mb-4 text-center">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Upfront Today</span>
                      <span className="text-xs sm:text-sm font-black font-mono text-slate-900 tabular-nums">
                        ${scoreData.upfrontCost.toFixed(0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">Total Monthly</span>
                      <span className="text-xs sm:text-sm font-black font-mono text-indigo-700 tabular-nums">
                        ${scoreData.totalMonthlyCost.toFixed(0)}/mo
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">2-Year Total</span>
                      <span className="text-xs sm:text-sm font-black font-mono text-slate-900 tabular-nums">
                        ${scoreData.total24MonthCost.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-4">
                    {deal.highlights.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Verified Fine Print Requirement Box */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 text-[11px] text-slate-600 mb-4 leading-relaxed">
                    <div className="font-extrabold text-slate-800 flex items-center gap-1.5 mb-0.5">
                      <Lock className="w-3 h-3 text-indigo-600" />
                      <span>Verified Plan Terms & Unlock Rules:</span>
                    </div>
                    <p>{deal.finePrintRequirement}</p>
                  </div>

                  {/* Savings Callout */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-2.5 text-xs font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{deal.estimatedSavings}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => handleAction(deal.id, model, plan.id)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 active:scale-95 cursor-pointer"
                  >
                    <span>Load in Value Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-3 text-xs pt-1">
                    <a
                      href={plan.directUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      View {plan.carrier} Plan <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-slate-300">·</span>
                    <a
                      href={model.appleDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      View {model.name} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
