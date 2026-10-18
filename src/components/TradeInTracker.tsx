import React, { useState } from 'react';
import { StorageCapacity, DeviceCondition, getIPhone11TradeOptions } from '../data/tradeInData';
import { 
  RotateCcw, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle,
  HelpCircle,
  Smartphone,
  Check
} from 'lucide-react';

interface TradeInTrackerProps {
  onApplyTradeInValue: (value: number, promoCredit: number) => void;
  onGoToCalculator: () => void;
  seniorMode: boolean;
}

export const TradeInTracker: React.FC<TradeInTrackerProps> = ({
  onApplyTradeInValue,
  onGoToCalculator,
  seniorMode
}) => {
  const [capacity, setCapacity] = useState<StorageCapacity>('128GB');
  const [condition, setCondition] = useState<DeviceCondition>('Good (Normal Wear, No Cracks)');
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);

  const tradeOptions = getIPhone11TradeOptions(capacity, condition);
  const instantOptions = tradeOptions.filter((t) => t.payoutType !== '24/36-Mo Bill Credits');
  const promoOptions = tradeOptions.filter((t) => t.payoutType === '24/36-Mo Bill Credits');

  const selectedCashValue = instantOptions[0]?.estimatedValue || 110;
  const selectedPromoValue = promoOptions[0]?.estimatedValue || 630;

  const handleApply = () => {
    setSelectedActionId('apply-main');
    setTimeout(() => setSelectedActionId(null), 300);
    onApplyTradeInValue(selectedCashValue, selectedPromoValue);
    onGoToCalculator();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/10 via-white to-indigo-50/50 border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                swtch. Trade-In Radar
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                Dad's iPhone 11
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Current iPhone 11 Trade-In Values Across Retailers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              See what Dad's iPhone 11 is worth right now. You can get instant cash/store credit (~$100 - $130) 
              or promotional carrier bill credits (up to $630 - $700) when switching.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleApply}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 flex items-center gap-2 shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer ${
                selectedActionId === 'apply-main' ? 'animate-choice-pop' : ''
              }`}
            >
              <span>Apply to Cost Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Configuration Controls: Capacity & Condition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-emerald-100">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              1. Dad's iPhone 11 Storage Size:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['64GB', '128GB', '256GB'] as StorageCapacity[]).map((cap) => (
                <button
                  key={cap}
                  onClick={() => setCapacity(cap)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 border ${
                    capacity === cap
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs animate-choice-pop'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50'
                  }`}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              2. Device Condition:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Flawless / Like-New', 'Good (Normal Wear, No Cracks)'] as DeviceCondition[]).map((cond) => (
                <button
                  key={cond}
                  onClick={() => setCondition(cond)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 border truncate ${
                    condition === cond
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs animate-choice-pop'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50'
                  }`}
                >
                  {cond.includes('Flawless') ? 'Flawless' : 'Good / Normal Wear'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two Comparison Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column 1: Instant Cash Outright Trade-Ins */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant Cash & Gift Cards (No Bill Credits)</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Upfront Trade-In Value
              </h3>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
              Recommended for Flexibility
            </span>
          </div>

          <p className="text-xs text-slate-600">
            These merchants give Dad immediate cash or Apple gift cards on day 1. There is zero 36-month bill-credit trap.
          </p>

          <div className="space-y-3">
            {instantOptions.map((opt) => (
              <div
                key={opt.merchant}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-bold text-slate-900 text-sm">{opt.merchant}</div>
                  <div className="text-xs text-slate-500">{opt.bestFor}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-black font-mono text-emerald-600 tabular-nums">
                    ${opt.estimatedValue}
                  </div>
                  <a
                    href={opt.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    Quote <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Carrier Trade-In Promotional Credits */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-700 uppercase">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Carrier Promotional Bill Credits</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                36-Month Bill Credit Credits
              </h3>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
              Requires 3-Year Plan
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Carriers give large discounts ($630 - $700), but credit is paid out across 36 monthly bills. If Dad leaves early, the remaining balance is due in cash.
          </p>

          <div className="space-y-3">
            {promoOptions.map((opt) => (
              <div
                key={opt.merchant}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-bold text-slate-900 text-sm">{opt.merchant}</div>
                  <div className="text-xs text-slate-500">{opt.promoConditions || opt.bestFor}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-black font-mono text-indigo-700 tabular-nums">
                    Up to ${opt.estimatedValue}
                  </div>
                  <a
                    href={opt.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    Carrier terms <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
