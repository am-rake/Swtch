import React, { useState } from 'react';
import { Sparkles, Loader2, ExternalLink, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface LiveDealScannerProps {
  seniorMode: boolean;
}

export const LiveDealScanner: React.FC<LiveDealScannerProps> = ({ seniorMode }) => {
  const [carrier, setCarrier] = useState('Straight Talk');
  const [device, setDevice] = useState('iPhone 11');
  const [targetModel, setTargetModel] = useState('iPhone 15 Plus or 16 Plus');
  const [priority, setPriority] = useState('Lowest Monthly Bill (Under $35/mo)');
  const [financing, setFinancing] = useState('Affirm or Outright (No 3-year contract)');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/deals/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentCarrier: carrier,
          currentDevice: device,
          targetModel,
          priority,
          financingPreference: financing
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Could not fetch deal scan');
      }
    } catch (err: any) {
      setError(err.message || 'Network error scanning for deals');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-indigo-50/50 to-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-500 animate-spin" />
          <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
            swtch. Live AI Radar
          </span>
          <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
            Real-Time Engine
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Real-Time Promotion & Trade-In Analyzer
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Carrier promotions change weekly. This scanner analyzes live carrier switch bonuses, trade-in tiers 
          for your iPhone 11, Affirm financing terms, and verified store links to give Dad a customized 
          recommendation without confusing marketing hype.
        </p>

        {/* Inputs Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Carrier</label>
            <input
              type="text"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Phone for Trade-In</label>
            <input
              type="text"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target iPhone Model</label>
            <select
              value={targetModel}
              onChange={(e) => setTargetModel(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="iPhone 14 Plus (Best lightweight big screen)">iPhone 14 Plus (Lightweight 6.7")</option>
              <option value="iPhone 15 Plus or 16 Plus (Modern USB-C)">iPhone 15 Plus / 16 Plus (USB-C)</option>
              <option value="iPhone 13 Pro Max (Best budget flagship)">iPhone 13 Pro Max (2-day battery)</option>
              <option value="iPhone 16 Pro Max (Top-tier flagship)">iPhone 16 Pro Max (Flagship 6.9")</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Dad's Main Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Lowest Monthly Bill (Under $35/mo)">Lowest Monthly Bill (Under $35/mo)</option>
              <option value="Maximum Screen Legibility and Comfort">Maximum Screen Legibility and Comfort</option>
              <option value="Zero Paperwork / Keeping Same Carrier">Zero Paperwork / Keeping Same Carrier</option>
              <option value="Live US Senior Phone Support">Live US Senior Phone Support</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Financing Preference</label>
            <select
              value={financing}
              onChange={(e) => setFinancing(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Affirm or Outright (No 3-year contract)">Affirm Monthly or Outright (Zero 3-year contract)</option>
              <option value="Carrier Trade-In Promotion (Free phone with bill credits)">Carrier Trade-In Promotion (Bill credits)</option>
              <option value="Open to all paths">Open to all paths</option>
            </select>
          </div>
        </div>

        {/* Scan Trigger Button */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleScan}
            disabled={loading}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-2 shadow-xs disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Carrier Deals with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Run Live AI Deal Check</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-xs sm:text-sm text-rose-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                Live Scan Complete
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Custom Recommendation for Dad
              </h3>
            </div>
            <button
              onClick={handleScan}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium bg-slate-100 px-3 py-1.5 rounded-lg"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>

          {/* AI Summary Box */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            {result.summary}
          </div>

          {/* Top Recommendation Box */}
          {result.topRecommendation && (
            <div className="bg-white border border-emerald-300 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                  Top Recommended Route
                </span>
                <span className="text-sm font-bold font-mono text-emerald-800">
                  {result.topRecommendation.monthlyCost}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {result.topRecommendation.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700">
                {result.topRecommendation.reason}
              </p>
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">
                  Estimated Upfront: <strong className="text-slate-800">{result.topRecommendation.estimatedUpfront}</strong>
                </span>
                {result.topRecommendation.directUrl && (
                  <a
                    href={result.topRecommendation.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                  >
                    View Official Offer <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Fine Print Trap Warning */}
          {result.finePrintWarning && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Fine Print Breakdown for Dad:</strong> {result.finePrintWarning}
              </div>
            </div>
          )}

          {/* Straight Talk Porting Advice */}
          {result.straightTalkSwitchAdvice && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 block mb-1">
                Step-by-Step Number Transfer Instructions (Straight Talk):
              </strong>
              {result.straightTalkSwitchAdvice}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
