/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { IPhoneModel, PlanOption, SavedDeal, SmartFilterCategory } from './types';
import { IPHONE_MODELS } from './data/phonesData';
import { CELLULAR_PLANS } from './data/plansData';
import { calculateValueScore } from './utils/scoring';

import { Header, ActiveTab } from './components/Header';
import { ModelSelector } from './components/ModelSelector';
import { CostCalculator } from './components/CostCalculator';
import { PreSetDeals } from './components/PreSetDeals';
import { TradeInTracker } from './components/TradeInTracker';
import { SavedDeals } from './components/SavedDeals';
import { LiveDealScanner } from './components/LiveDealScanner';
import { InteractiveGuides } from './components/InteractiveGuides';
import { JargonBusterModal } from './components/JargonBusterModal';
import { PrintSummaryModal } from './components/PrintSummaryModal';

import { 
  Eye, 
  Smartphone, 
  BookOpen, 
  Calculator, 
  Sparkles, 
  Tag, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  ArrowLeftRight, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('deals');
  const [seniorMode, setSeniorMode] = useState<boolean>(true); // Default to comfortable high-legibility mode for Dad!
  const [selectedModel, setSelectedModel] = useState<IPhoneModel>(IPHONE_MODELS[0]); // Default to lowest price or chosen model
  const [isJargonOpen, setIsJargonOpen] = useState<boolean>(false);
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);
  
  // Smart Search and Focus Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [smartFilter, setSmartFilter] = useState<SmartFilterCategory>('all');
  
  // Custom trade-in valuation state
  const [customTradeCash, setCustomTradeCash] = useState<number>(110);
  const [customTradePromo, setCustomTradePromo] = useState<number>(630);

  // Micro-interaction toast feedback when user makes a key choice
  const [actionNotification, setActionNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionNotification(msg);
    setTimeout(() => {
      setActionNotification((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Saved Deals in LocalStorage for Dad's Shortlist
  const [savedDeals, setSavedDeals] = useState<SavedDeal[]>(() => {
    try {
      const stored = localStorage.getItem('swtch_saved_deals');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not load saved deals from localStorage', e);
    }
    // Seed with 1 great initial deal for Dad
    return [
      {
        id: 'initial-seed-16e',
        savedAt: 'Today',
        modelId: 'iphone-16e',
        modelName: 'iPhone 16e (128GB, A18, USB-C)',
        modelScreenSize: '6.1"',
        modelPortType: 'USB-C',
        planId: 'straight-talk-silver',
        planName: 'Silver Unlimited ($45/mo)',
        carrier: 'Straight Talk',
        paymentMethod: 'outright',
        condition: 'Brand New',
        upfrontCost: 149.99,
        monthlyPhoneCost: 0,
        monthlyPlanCost: 45,
        totalMonthlyCost: 45,
        total24MonthCost: 1229.99,
        total36MonthCost: 1769.99,
        valueScore: 23,
        scoreCategory: 'Exceptional Value',
        colorClass: 'bg-emerald-500 text-white',
        appleDirectUrl: 'https://www.apple.com/iphone-16/',
        carrierDirectUrl: 'https://www.straighttalk.com/all-phones/iphone-16e'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('swtch_saved_deals', JSON.stringify(savedDeals));
    } catch (e) {
      console.warn('Could not save deals to localStorage', e);
    }
  }, [savedDeals]);

  // Sync body class for comfort mode
  useEffect(() => {
    if (seniorMode) {
      document.body.classList.add('senior-mode');
    } else {
      document.body.classList.remove('senior-mode');
    }
  }, [seniorMode]);

  const defaultPlan = CELLULAR_PLANS[0];
  const currentBreakdown = calculateValueScore(selectedModel, defaultPlan, 'outright', 'Brand New', true);

  const handleToggleSaveDeal = (deal: SavedDeal) => {
    setSavedDeals((prev) => {
      const exists = prev.some((d) => d.id === deal.id);
      if (exists) {
        showNotification(`Removed "${deal.modelName}" from saved deals`);
        return prev.filter((d) => d.id !== deal.id);
      } else {
        showNotification(`★ Saved "${deal.modelName}" to Dad's shortlist!`);
        return [deal, ...prev];
      }
    });
  };

  const handleRemoveDeal = (id: string) => {
    setSavedDeals((prev) => prev.filter((d) => d.id !== id));
    showNotification('Deal removed from saved shortlist');
  };

  const isCurrentDealSaved = savedDeals.some((d) => d.modelId === selectedModel.id);

  const handleLoadDealIntoCalculator = (model: IPhoneModel, planId?: string) => {
    setSelectedModel(model);
    setActiveTab('calculator');
    showNotification(`Loaded ${model.name} into Value Calculator`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyTradeIn = (cash: number, promo: number) => {
    setCustomTradeCash(cash);
    setCustomTradePromo(promo);
    setActiveTab('calculator');
    showNotification(`Applied $${cash} Cash / $${promo} Promo Trade Value!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${seniorMode ? 'senior-mode' : ''} selection:bg-indigo-500 selection:text-white`}>
      {/* Dynamic Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        seniorMode={seniorMode}
        setSeniorMode={setSeniorMode}
        onOpenJargon={() => setIsJargonOpen(true)}
        onPrint={() => setIsPrintOpen(true)}
        savedCount={savedDeals.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        smartFilter={smartFilter}
        setSmartFilter={setSmartFilter}
        onSelectDealFromSearch={(modelId, planId) => {
          const model = IPHONE_MODELS.find((m) => m.id === modelId) || IPHONE_MODELS[0];
          handleLoadDealIntoCalculator(model, planId);
        }}
      />

      {/* Comfort Mode Banner */}
      {seniorMode && (
        <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-b border-amber-300/80 px-4 py-2 text-xs sm:text-sm text-amber-950 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-800 shrink-0 animate-pulse" />
              <span>
                <strong>Comfort Mode Active for Dad:</strong> High-contrast typography, large touch targets, and plain-English carrier explanations enabled.
              </span>
            </div>
            <button
              onClick={() => {
                setSeniorMode(false);
                showNotification('Switched to Standard View');
              }}
              className="text-xs text-amber-900 underline hover:text-black font-bold shrink-0 cursor-pointer"
            >
              Standard View
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Toast / Animation Indicator */}
      {actionNotification && (
        <div className="fixed bottom-6 right-6 z-50 animate-choice-pop">
          <div className="bg-slate-900/95 backdrop-blur-md text-white border border-indigo-500/50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{actionNotification}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Dynamic swtch Context Strip */}
        <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-white via-indigo-50/40 to-white border border-slate-200/90 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-sm hover:border-indigo-300 transition-colors">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/20 shrink-0">
              ST
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                  Active Switch Profile
                </span>
                <span className="text-xs font-bold text-slate-900">Dad (Age 66)</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                <span>Straight Talk</span>
                <span>·</span>
                <span>iPhone 11 Trade-In</span>
                <span>·</span>
                <span className="text-emerald-700 font-semibold">Zero Carrier Contracts</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleTabChange('tradein')}
              className="text-xs font-bold text-emerald-900 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-300 px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-xs cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>iPhone 11 Trade Value: ${customTradeCash} Cash / ${customTradePromo} Promo</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
            </button>

            <button
              onClick={() => handleTabChange('saved')}
              className="text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Saved Deals ({savedDeals.length})</span>
            </button>

            <button
              onClick={() => setIsJargonOpen(true)}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 px-3 py-2 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"
            >
              Jargon Decoder
            </button>
          </div>
        </div>

        {/* Tab Content Views with smooth transitions */}
        <div className="transition-all duration-300">
          {activeTab === 'models' && (
            <ModelSelector
              selectedModel={selectedModel}
              onSelectModel={(m) => {
                setSelectedModel(m);
                showNotification(`Selected ${m.name}`);
              }}
              onGoToCalculator={() => {
                setActiveTab('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              seniorMode={seniorMode}
              searchQuery={searchQuery}
              smartFilter={smartFilter}
            />
          )}

          {activeTab === 'calculator' && (
            <CostCalculator
              selectedModel={selectedModel}
              onSelectModel={(m) => {
                setSelectedModel(m);
                showNotification(`Selected ${m.name}`);
              }}
              seniorMode={seniorMode}
              onOpenJargon={() => setIsJargonOpen(true)}
              onToggleSaveDeal={handleToggleSaveDeal}
              isSaved={isCurrentDealSaved}
            />
          )}

          {activeTab === 'deals' && (
            <PreSetDeals
              onLoadDealIntoCalculator={handleLoadDealIntoCalculator}
              seniorMode={seniorMode}
              searchQuery={searchQuery}
              smartFilter={smartFilter}
              onClearFilter={() => {
                setSmartFilter('all');
                setSearchQuery('');
              }}
            />
          )}

          {activeTab === 'tradein' && (
            <TradeInTracker
              onApplyTradeInValue={handleApplyTradeIn}
              onGoToCalculator={() => {
                setActiveTab('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              seniorMode={seniorMode}
            />
          )}

          {activeTab === 'saved' && (
            <SavedDeals
              savedDeals={savedDeals}
              onRemoveDeal={handleRemoveDeal}
              onLoadDealIntoCalculator={handleLoadDealIntoCalculator}
              onBrowseDeals={() => setActiveTab('deals')}
              seniorMode={seniorMode}
            />
          )}

          {activeTab === 'scanner' && (
            <LiveDealScanner
              seniorMode={seniorMode}
            />
          )}

          {activeTab === 'guides' && (
            <InteractiveGuides
              seniorMode={seniorMode}
            />
          )}
        </div>
      </main>

      {/* Dynamic swtch Footer */}
      <footer className="mt-20 bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black shadow-md shadow-indigo-500/20">
                <ArrowLeftRight className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  swtch<span className="text-cyan-400">.</span>
                </span>
                <span className="text-xs text-slate-400 block font-medium">
                  Smart iPhone & Carrier Plan Switch Engine
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
              <button onClick={() => handleTabChange('models')} className="hover:text-cyan-400 transition-colors">Compare Phones</button>
              <span>·</span>
              <button onClick={() => handleTabChange('calculator')} className="hover:text-cyan-400 transition-colors">Value Calculator</button>
              <span>·</span>
              <button onClick={() => handleTabChange('deals')} className="hover:text-cyan-400 transition-colors">Curated Bundles</button>
              <span>·</span>
              <button onClick={() => handleTabChange('tradein')} className="hover:text-cyan-400 transition-colors">Trade-In Radar</button>
              <span>·</span>
              <button onClick={() => handleTabChange('saved')} className="hover:text-amber-400 transition-colors">Saved Deals ({savedDeals.length})</button>
              <span>·</span>
              <button onClick={() => handleTabChange('scanner')} className="hover:text-cyan-400 transition-colors">AI Live Radar</button>
              <span>·</span>
              <button onClick={() => handleTabChange('guides')} className="hover:text-cyan-400 transition-colors">Setup & Transfer</button>
              <span>·</span>
              <button onClick={() => setIsJargonOpen(true)} className="hover:text-cyan-400 transition-colors">Jargon Decoder</button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
            <p className="max-w-xl">
              Independent switch engine engineered for Dad and family. Zero sponsored carrier placement or predatory 3-year lock-in kickbacks. All links lead directly to official Apple, carrier, and authorized retail stores.
            </p>
            <p className="font-mono text-slate-400">
              © {new Date().getFullYear()} swtch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <JargonBusterModal
        isOpen={isJargonOpen}
        onClose={() => setIsJargonOpen(false)}
        seniorMode={seniorMode}
      />

      <PrintSummaryModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        selectedModel={selectedModel}
        selectedPlan={defaultPlan}
        breakdown={currentBreakdown}
      />
    </div>
  );
}
