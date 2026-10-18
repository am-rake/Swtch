import React, { useState } from 'react';
import { SavedDeal, IPhoneModel } from '../types';
import { IPHONE_MODELS } from '../data/phonesData';
import { Star, Trash2, ArrowRight, ExternalLink, Calculator, Tag, Printer, Sparkles } from 'lucide-react';

interface SavedDealsProps {
  savedDeals: SavedDeal[];
  onRemoveDeal: (id: string) => void;
  onLoadDealIntoCalculator: (model: IPhoneModel, planId?: string) => void;
  onBrowseDeals: () => void;
  seniorMode: boolean;
}

export const SavedDeals: React.FC<SavedDealsProps> = ({
  savedDeals,
  onRemoveDeal,
  onLoadDealIntoCalculator,
  onBrowseDeals,
  seniorMode
}) => {
  const [removedId, setRemovedId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setRemovedId(id);
    setTimeout(() => {
      onRemoveDeal(id);
      setRemovedId(null);
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-white to-indigo-50/50 border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center gap-1.5 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-star-burst" />
                swtch. Shortlist
              </span>
              <span className="text-xs bg-indigo-100 text-indigo-900 font-bold px-2.5 py-0.5 rounded-full">
                {savedDeals.length} {savedDeals.length === 1 ? 'Deal' : 'Deals'} Starred
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Saved iPhone & Plan Deals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Starred combinations are safely stored in your browser so Dad can compare his favorites, 
              revisit them later, or print a shortlist to take to the store.
            </p>
          </div>

          {savedDeals.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => window.print()}
                className="no-print px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>Print Saved Shortlist</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {savedDeals.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-500 flex items-center justify-center mx-auto border border-amber-200 shadow-inner">
            <Star className="w-8 h-8 fill-amber-400 text-amber-500" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              No Saved Deals Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Whenever you see a deal you like in the <strong>Cost Calculator</strong> or <strong>Top Bundles</strong>, 
              click the <strong>"Star Deal for Dad"</strong> button to save it here!
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onBrowseDeals}
              className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 inline-flex items-center gap-2 shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
            >
              <Tag className="w-4 h-4" />
              <span>Browse Top Bundles for Dad</span>
            </button>
          </div>
        </div>
      ) : (
        /* Grid of Saved Deals */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedDeals.map((deal) => {
            const model = IPHONE_MODELS.find((m) => m.id === deal.modelId) || IPHONE_MODELS[0];
            const isRemoving = removedId === deal.id;

            return (
              <div
                key={deal.id}
                className={`bg-white border rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between relative transition-all duration-300 group ${
                  isRemoving
                    ? 'opacity-0 scale-95'
                    : 'border-slate-200/90 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Top Bar with Star & Value Score */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500 animate-star-burst" />
                      <span className="text-[11px] font-bold text-slate-500">Saved {deal.savedAt}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border font-mono font-bold text-xs tabular-nums bg-slate-50">
                      <span className={`px-1.5 py-0.2 rounded-xs uppercase ${deal.colorClass}`}>
                        {deal.scoreCategory}
                      </span>
                      <span className="font-black text-slate-900 ml-1">
                        Score: {deal.valueScore}
                      </span>
                    </div>
                  </div>

                  {/* Device and Plan Titles */}
                  <h3 className="text-xl font-black text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                    {deal.modelName}
                  </h3>
                  <div className="text-xs font-bold text-indigo-700 mt-1">
                    {deal.carrier} · {deal.planName}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {deal.condition} · {deal.modelScreenSize} display · {deal.modelPortType}
                  </div>

                  {/* Price Strip */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-gradient-to-r from-slate-50 via-indigo-50/20 to-slate-50 rounded-2xl border border-slate-200/80 my-4 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Upfront</span>
                      <span className="text-sm font-black font-mono text-slate-900 tabular-nums">
                        ${deal.upfrontCost.toFixed(0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider block">Monthly</span>
                      <span className="text-sm font-black font-mono text-indigo-700 tabular-nums">
                        ${deal.totalMonthlyCost.toFixed(0)}/mo
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">2-Yr Total</span>
                      <span className="text-sm font-black font-mono text-slate-900 tabular-nums">
                        ${deal.total24MonthCost.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <button
                    onClick={() => onLoadDealIntoCalculator(model, deal.planId)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-xs active:scale-95 cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Open in Cost Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2 text-indigo-600">
                      {deal.carrierDirectUrl && (
                        <a
                          href={deal.carrierDirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1 font-semibold"
                        >
                          Plan <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <span>·</span>
                      {deal.appleDirectUrl && (
                        <a
                          href={deal.appleDirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1 font-semibold"
                        >
                          Phone <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemove(deal.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                      title="Remove from saved deals"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
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
