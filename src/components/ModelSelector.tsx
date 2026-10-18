import React, { useState, useMemo } from 'react';
import { IPhoneModel, SmartFilterCategory } from '../types';
import { IPHONE_MODELS } from '../data/phonesData';
import { 
  Battery, 
  ExternalLink, 
  Scale, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ArrowUpDown, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Tag, 
  Lock, 
  Unlock,
  AlertTriangle
} from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: IPhoneModel;
  onSelectModel: (model: IPhoneModel) => void;
  onGoToCalculator: () => void;
  seniorMode: boolean;
  searchQuery?: string;
  smartFilter?: SmartFilterCategory;
}

export type SortOption = 'price_asc' | 'price_desc' | 'screen_desc' | 'newest';

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onSelectModel,
  onGoToCalculator,
  seniorMode,
  searchQuery = '',
  smartFilter = 'all'
}) => {
  // Default sorting MUST be by Price (Low to High) as explicitly requested
  const [sortBy, setSortBy] = useState<SortOption>('price_asc');
  const [filterSpec, setFilterSpec] = useState<'all' | 'iphone_18' | 'iphone_17' | 'large_screen' | 'lightweight' | 'budget'>('all');
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [expandedPromosModelId, setExpandedPromosModelId] = useState<string | null>('iphone-16e'); // Expanded by default on 16e so Dad sees options!

  const getEffectivePrice = (m: IPhoneModel) => {
    return m.promoPrice || m.refurbishedPrice || m.msrpNew;
  };

  const processedModels = useMemo(() => {
    return IPHONE_MODELS.filter((model) => {
      // 1. Text search query from header
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          model.name.toLowerCase().includes(q) ||
          model.generation.toLowerCase().includes(q) ||
          model.chip.toLowerCase().includes(q) ||
          model.summaryForDad.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Smart category filter from header
      if (smartFilter === 'budget') {
        const isBudget = getEffectivePrice(model) <= 650;
        if (!isBudget) return false;
      } else if (smartFilter === 'performance') {
        const isPerformance = model.chip.includes('A20') || model.chip.includes('A19') || model.chip.includes('A18 Pro');
        if (!isPerformance) return false;
      } else if (smartFilter === 'camera') {
        const isCamera = model.cameraZoom.includes('5x') || model.cameraZoom.includes('Variable') || model.name.includes('Pro');
        if (!isCamera) return false;
      }

      // 3. Local spec filter buttons
      if (filterSpec === 'iphone_18') return model.generation.includes('18 Series');
      if (filterSpec === 'iphone_17') return model.generation.includes('17 Series');
      if (filterSpec === 'large_screen') return model.screenDiagonalInches >= 6.7;
      if (filterSpec === 'lightweight') return model.weightOunces <= 7.2;
      if (filterSpec === 'budget') return getEffectivePrice(model) <= 650;

      return true;
    }).sort((a, b) => {
      // Default to price_asc (Low to High)
      if (sortBy === 'price_asc') return getEffectivePrice(a) - getEffectivePrice(b);
      if (sortBy === 'price_desc') return getEffectivePrice(b) - getEffectivePrice(a);
      if (sortBy === 'screen_desc') return b.screenDiagonalInches - a.screenDiagonalInches;
      return 0; // default array order is newest
    });
  }, [searchQuery, smartFilter, filterSpec, sortBy]);

  const handleChooseModel = (model: IPhoneModel) => {
    setAnimatingId(model.id);
    setTimeout(() => setAnimatingId(null), 300);
    onSelectModel(model);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-indigo-50/60 to-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
                swtch. Device Directory
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                Sorted by Price (Lowest First)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Compare iPhone Models (Price-Ranked)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Every model sorted from most affordable to high-end flagship. Compare outright pricing, carrier promotional deals 
              (like the <strong>Straight Talk $149 iPhone 16e</strong> or <strong>Apple Factory Unlocked</strong>), weight, and screen size for Dad.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs bg-emerald-600 text-white font-extrabold px-3 py-1.5 rounded-xl shadow-xs">
              ★ Lowest Entry: iPhone 16e for $149.99
            </span>
          </div>
        </div>

        {/* Controls Bar: Sort by Price & Filter by Specs */}
        <div className="mt-5 pt-4 border-t border-indigo-100/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Sort Controls (Default: Price Low to High) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600" />
              Sort Order:
            </span>

            <button
              onClick={() => setSortBy('price_asc')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 ${
                sortBy === 'price_asc'
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/30 font-black animate-choice-pop ring-2 ring-emerald-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
              title="Default: Show most affordable iPhones first"
            >
              <span>Price: Low to High</span>
              {sortBy === 'price_asc' && <span className="text-[10px] bg-white/20 px-1 rounded-sm font-normal">Default</span>}
            </button>

            <button
              onClick={() => setSortBy('price_desc')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                sortBy === 'price_desc'
                  ? 'bg-indigo-600 text-white shadow-xs font-black animate-choice-pop'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Price: High to Low
            </button>

            <button
              onClick={() => setSortBy('screen_desc')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                sortBy === 'screen_desc'
                  ? 'bg-indigo-600 text-white shadow-xs font-black animate-choice-pop'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Largest Screen First
            </button>

            <button
              onClick={() => setSortBy('newest')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                sortBy === 'newest'
                  ? 'bg-indigo-600 text-white shadow-xs font-black animate-choice-pop'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Newest Model
            </button>
          </div>

          {/* Quick Filter Specs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 mr-1">Filter:</span>
            <button
              onClick={() => setFilterSpec('all')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filterSpec === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              All ({IPHONE_MODELS.length})
            </button>
            <button
              onClick={() => setFilterSpec('budget')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filterSpec === 'budget' ? 'bg-emerald-600 text-white font-bold' : 'bg-white text-emerald-800 border border-emerald-200'
              }`}
            >
              Under $650
            </button>
            <button
              onClick={() => setFilterSpec('large_screen')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filterSpec === 'large_screen' ? 'bg-indigo-600 text-white font-bold' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              6.7"+ Display
            </button>
            <button
              onClick={() => setFilterSpec('lightweight')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filterSpec === 'lightweight' ? 'bg-indigo-600 text-white font-bold' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Lightweight
            </button>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {processedModels.map((model) => {
          const isSelected = selectedModel.id === model.id;
          const isAnimating = animatingId === model.id;
          const hasPromos = Boolean(model.carrierPromotions && model.carrierPromotions.length > 0);
          const isPromosExpanded = expandedPromosModelId === model.id;

          let displayPrice = `$${model.msrpNew} New`;
          if (model.promoPrice) {
            displayPrice = `From $${model.promoPrice} (Promo) · $${model.msrpNew} MSRP`;
          } else if (model.refurbishedPrice) {
            displayPrice = `From $${model.refurbishedPrice} (Refurb) · $${model.msrpNew} (New)`;
          }

          return (
            <div
              key={model.id}
              onClick={() => handleChooseModel(model)}
              className={`rounded-3xl transition-all duration-300 border p-6 flex flex-col justify-between cursor-pointer group ${
                isAnimating ? 'animate-choice-pop animate-select-glow' : ''
              } ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-500/30 bg-gradient-to-b from-indigo-50/50 via-white to-white shadow-md'
                  : 'border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider block">
                      {model.generation}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {model.name}
                    </h3>
                  </div>
                  {isSelected && (
                    <span className="shrink-0 bg-indigo-100 text-indigo-700 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-xs animate-in zoom-in-75 duration-200">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  )}
                </div>

                {/* Price Baseline */}
                <div className="mb-4 pb-3 border-b border-slate-100 flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">Starting Price:</span>
                  <span className="font-mono text-sm font-black text-slate-900 tabular-nums">
                    {displayPrice}
                  </span>
                </div>

                {/* Key Specs Pill Row */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-800">{model.screenDiagonalInches}" OLED</span>
                    <span className="text-slate-400 text-[11px]">Display</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Battery className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-slate-800">{model.batteryVideoHours}h</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Battery</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="font-bold text-slate-800">{model.weightOunces} oz</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Weight</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Zap className={`w-3.5 h-3.5 ${model.portType === 'USB-C' ? 'text-indigo-600' : 'text-amber-500'} shrink-0`} />
                      <span className={`font-bold ${model.portType === 'USB-C' ? 'text-indigo-700' : 'text-slate-700'}`}>{model.portType}</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Plug</span>
                  </div>
                </div>

                {/* Plain-English summary */}
                <div className="mb-4 text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                  <strong className="text-slate-900 block mb-0.5">Dad’s Takeaway:</strong>
                  {model.summaryForDad}
                </div>

                {/* Carrier Promotions Drawer for iPhone 16e and models with promo programs */}
                {hasPromos && (
                  <div className="mb-4 bg-gradient-to-br from-indigo-50/70 via-white to-emerald-50/40 rounded-2xl border border-indigo-200/80 p-3.5 shadow-2xs">
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedPromosModelId(isPromosExpanded ? null : model.id);
                      }}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-black text-slate-900">
                          Purchase & Carrier Deals ({model.carrierPromotions!.length} Options)
                        </span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 p-0.5">
                        {isPromosExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isPromosExpanded && (
                      <div className="mt-3 space-y-2.5 pt-2 border-t border-indigo-100/80">
                        {model.carrierPromotions!.map((promo, idx) => (
                          <div 
                            key={idx}
                            className={`p-2.5 rounded-xl border text-xs transition-colors ${
                              promo.isBestValue 
                                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                                : promo.carrier.includes('Warning') || promo.carrier.includes('Postpaid')
                                ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                                : 'bg-white border-slate-200/90 text-slate-800'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div>
                                <span className="font-extrabold text-slate-900 block">
                                  {promo.carrier}: {promo.promoTitle}
                                </span>
                                <span className="text-[11px] font-semibold text-slate-600 block">
                                  {promo.monthlyRequirement}
                                </span>
                              </div>
                              <span className="font-mono font-black text-sm text-slate-900 shrink-0">
                                ${promo.upfrontPrice.toFixed(2)}
                              </span>
                            </div>

                            {/* Unlock policy indicator */}
                            <div className="flex items-center gap-1.5 my-1 text-[11px] font-bold text-slate-600">
                              {promo.isUnlockedDayOne ? (
                                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                              )}
                              <span>{promo.unlockPolicy}</span>
                            </div>

                            {/* Fine print explanation */}
                            <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
                              <strong>Fine Print:</strong> {promo.finePrint}
                            </p>

                            <div className="mt-2 pt-1 border-t border-slate-200/50 flex items-center justify-between">
                              <span className="text-[10px] text-slate-400">Official Provider Link</span>
                              <a
                                href={promo.directUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-indigo-600 hover:underline font-bold text-xs inline-flex items-center gap-1"
                              >
                                <span>Go to {promo.carrier}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Pros List */}
                <div className="space-y-1.5 mb-4">
                  {model.seniorPros.slice(0, 2).map((pro, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-emerald-950 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChooseModel(model);
                    onGoToCalculator();
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700'
                  }`}
                >
                  <span>Calculate True Cost for {model.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-3 text-xs pt-1">
                  <a
                    href={model.appleDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Apple Store <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-300">·</span>
                  <a
                    href={model.bestBuyDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Best Buy <ExternalLink className="w-3 h-3" />
                  </a>
                  {model.straightTalkPromoUrl && (
                    <>
                      <span className="text-slate-300">·</span>
                      <a
                        href={model.straightTalkPromoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                      >
                        Straight Talk Promo <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
