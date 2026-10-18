import React, { useState, useRef, useEffect } from 'react';
import { 
  Smartphone, 
  Eye, 
  Printer, 
  BookOpen, 
  Calculator, 
  Sparkles, 
  Tag, 
  HelpCircle, 
  Star,
  ArrowLeftRight,
  Search,
  Zap,
  Camera,
  X,
  ArrowRight,
  DollarSign,
  Check
} from 'lucide-react';
import { SmartFilterCategory } from '../types';
import { IPHONE_MODELS } from '../data/phonesData';

export type ActiveTab = 'models' | 'calculator' | 'deals' | 'tradein' | 'saved' | 'scanner' | 'guides';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  seniorMode: boolean;
  setSeniorMode: (val: boolean) => void;
  onOpenJargon: () => void;
  onPrint: () => void;
  savedCount?: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  smartFilter: SmartFilterCategory;
  setSmartFilter: (filter: SmartFilterCategory) => void;
  onSelectDealFromSearch: (modelId: string, planId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  seniorMode,
  setSeniorMode,
  onOpenJargon,
  onPrint,
  savedCount = 0,
  searchQuery,
  setSearchQuery,
  smartFilter,
  setSmartFilter,
  onSelectDealFromSearch
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick smart search items for Dad
  const smartPresets = [
    {
      id: 'st-16e',
      category: 'budget' as const,
      categoryLabel: 'Budget Deal',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      title: 'iPhone 16e (Brand New)',
      plan: 'Straight Talk Silver ($45/mo)',
      highlight: '$149.99 Upfront Promo ($450 Off)',
      modelId: 'iphone-16e',
      planId: 'straight-talk-silver'
    },
    {
      id: 'vis-14plus',
      category: 'budget' as const,
      categoryLabel: 'Budget Big Screen',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      title: 'iPhone 14 Plus (6.7" Refurbished)',
      plan: 'Visible by Verizon ($25/mo)',
      highlight: '$25/mo All-In Total Plan',
      modelId: 'iphone-14-plus',
      planId: 'visible-base'
    },
    {
      id: 'perf-18pm',
      category: 'performance' as const,
      categoryLabel: 'Performance King',
      categoryColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      title: 'iPhone 18 Pro Max (Fall 2026)',
      plan: 'Visible Unlimited ($25/mo)',
      highlight: '2nm A20 Pro · 35-Hour Battery · 6.9" Screen',
      modelId: 'iphone-18-pro-max',
      planId: 'visible-base'
    },
    {
      id: 'perf-18pro',
      category: 'performance' as const,
      categoryLabel: 'Performance Compact',
      categoryColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      title: 'iPhone 18 Pro (6.3" Titanium)',
      plan: 'Straight Talk Silver ($45/mo)',
      highlight: 'A20 Pro · 120Hz ProMotion · 12GB RAM · 6.67 oz',
      modelId: 'iphone-18-pro',
      planId: 'straight-talk-silver'
    },
    {
      id: 'cam-18pm',
      category: 'camera' as const,
      categoryLabel: 'Camera Focus',
      categoryColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      title: 'iPhone 18 Pro Max Studio Optics',
      plan: 'Straight Talk Silver ($45/mo)',
      highlight: '5x-10x Variable Optical Zoom + 48MP Triple Lens',
      modelId: 'iphone-18-pro-max',
      planId: 'straight-talk-silver'
    },
    {
      id: 'cam-16pro',
      category: 'camera' as const,
      categoryLabel: 'Camera Focus',
      categoryColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      title: 'iPhone 16 Pro (Camera Control)',
      plan: 'Straight Talk Silver ($45/mo)',
      highlight: '5x Tetraprism Zoom + Dedicated Physical Shutter Button',
      modelId: 'iphone-16-pro',
      planId: 'straight-talk-silver'
    }
  ];

  // Filter dropdown items based on query and/or category
  const filteredPresets = smartPresets.filter((item) => {
    const matchesCategory = smartFilter === 'all' || item.category === smartFilter;
    if (!searchQuery.trim()) return matchesCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      item.title.toLowerCase().includes(q) ||
      item.plan.toLowerCase().includes(q) ||
      item.highlight.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const handleToggleFilter = (category: SmartFilterCategory) => {
    if (smartFilter === category) {
      setSmartFilter('all');
    } else {
      setSmartFilter(category);
      // Auto navigate to deals tab if not already on deals or models
      if (activeTab !== 'deals' && activeTab !== 'models') {
        setActiveTab('deals');
      }
    }
  };

  const handleSelectResult = (modelId: string, planId?: string) => {
    setIsDropdownOpen(false);
    onSelectDealFromSearch(modelId, planId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tier 1: Brand Wordmark, Smart Search Bar, and Tools */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 py-2.5 sm:py-3">
          
          {/* Zone 1: Dynamic Brand Wordmark */}
          <button 
            onClick={() => {
              setActiveTab('deals');
              setSmartFilter('all');
              setSearchQuery('');
            }}
            className="group flex items-center gap-2.5 sm:gap-3 shrink-0 text-left cursor-pointer focus:outline-hidden"
            title="Go to swtch homepage"
          >
            {/* Custom swtch Logo Icon */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/40 group-active:scale-95 transition-all duration-300">
              <ArrowLeftRight className="w-5 h-5 text-white stroke-[2.5] transform group-hover:rotate-180 transition-transform duration-500" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  swtch<span className="text-cyan-500">.</span>
                </span>
                <span className="hidden xl:inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-700 border border-indigo-200/80">
                  Switch Engine
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500 hidden sm:block whitespace-nowrap font-medium">
                Smart iPhone & Carrier Plan Advisor
              </span>
            </div>
          </button>

          {/* Zone 2: SMART SEARCH BAR in Header */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-md lg:max-w-xl mx-1 sm:mx-2">
            <div 
              className={`relative flex items-center bg-slate-100/90 hover:bg-slate-100 focus-within:bg-white border rounded-2xl transition-all duration-200 ${
                isDropdownOpen || searchQuery || smartFilter !== 'all'
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm bg-white'
                  : 'border-slate-200/90'
              }`}
            >
              {/* Search Icon */}
              <div className="pl-3 pr-2 text-slate-400 flex items-center pointer-events-none shrink-0">
                <Search className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
              </div>

              {/* Text Input */}
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={seniorMode ? "Smart Search: '16e', 'Budget', 'Camera'..." : "Smart Search deals (e.g. 16e, Visible, Affirm)..."}
                className="w-full py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-transparent placeholder-slate-400 focus:outline-hidden"
              />

              {/* Clear button if active query */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors mr-1 cursor-pointer"
                  title="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Embedded Quick Filter Pills on Desktop */}
              <div className="hidden md:flex items-center gap-1 pr-1.5 shrink-0 border-l border-slate-200/80 pl-1.5 my-1">
                <button
                  type="button"
                  onClick={() => handleToggleFilter('budget')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 active:scale-95 cursor-pointer ${
                    smartFilter === 'budget'
                      ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/30 font-black animate-choice-pop'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                  title="Filter deals by lowest upfront & monthly cost"
                >
                  <Tag className={`w-3 h-3 ${smartFilter === 'budget' ? 'text-white' : 'text-emerald-500'}`} />
                  <span>Budget</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleFilter('performance')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 active:scale-95 cursor-pointer ${
                    smartFilter === 'performance'
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30 font-black animate-choice-pop'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'
                  }`}
                  title="Filter deals by fastest A20 Pro chips & 35-hr battery"
                >
                  <Zap className={`w-3 h-3 ${smartFilter === 'performance' ? 'text-white' : 'text-amber-500'}`} />
                  <span>Performance</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleFilter('camera')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 active:scale-95 cursor-pointer ${
                    smartFilter === 'camera'
                      ? 'bg-cyan-600 text-white shadow-xs shadow-cyan-600/30 font-black animate-choice-pop'
                      : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'
                  }`}
                  title="Filter deals by optical zoom (5x-10x) & 48MP camera controls"
                >
                  <Camera className={`w-3 h-3 ${smartFilter === 'camera' ? 'text-white' : 'text-cyan-600'}`} />
                  <span>Camera</span>
                </button>
              </div>
            </div>

            {/* Smart Search Dropdown Popover */}
            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden z-50 animate-choice-pop">
                
                {/* Header inside dropdown: Category Pills */}
                <div className="p-3 bg-gradient-to-r from-slate-50 via-indigo-50/30 to-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Smart Filter Dad's Deals:
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleFilter('all')}
                      className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                        smartFilter === 'all' ? 'bg-slate-900 text-white font-black' : 'text-slate-600 hover:bg-slate-200/60'
                      }`}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleFilter('budget')}
                      className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        smartFilter === 'budget' ? 'bg-emerald-600 text-white font-black' : 'text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      <Tag className="w-3 h-3" />
                      Budget
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleFilter('performance')}
                      className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        smartFilter === 'performance' ? 'bg-indigo-600 text-white font-black' : 'text-indigo-700 hover:bg-indigo-50'
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      Performance
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleFilter('camera')}
                      className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        smartFilter === 'camera' ? 'bg-cyan-600 text-white font-black' : 'text-cyan-700 hover:bg-cyan-50'
                      }`}
                    >
                      <Camera className="w-3 h-3" />
                      Camera Focus
                    </button>
                  </div>
                </div>

                {/* Dropdown Results List */}
                <div className="max-h-72 overflow-y-auto p-2 space-y-1 divide-y divide-slate-100">
                  {filteredPresets.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No exact deal matched "{searchQuery}". Try filtering by Budget, Performance, or Camera Focus.
                    </div>
                  ) : (
                    filteredPresets.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectResult(item.modelId, item.planId)}
                        className="p-2.5 rounded-xl hover:bg-indigo-50/70 transition-colors cursor-pointer group flex items-center justify-between gap-3 pt-2"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.2 rounded-md border ${item.categoryColor}`}>
                              {item.categoryLabel}
                            </span>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 truncate">
                              {item.title}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium truncate">
                            {item.plan} · <span className="text-emerald-700 font-bold">{item.highlight}</span>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                          <span>View</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer in dropdown */}
                <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Press <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px] font-mono">ESC</kbd> to close</span>
                  <button 
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setActiveTab('deals');
                    }}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    View All {filteredPresets.length} Matching Deals in Curated Bundles →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Zone 3: Quick Action Tools (Jargon, Print, Comfort Mode) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Jargon Glossary Button */}
            <button
              onClick={onOpenJargon}
              className="px-2.5 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-xl transition-colors hidden md:flex items-center gap-1.5 active:scale-95 cursor-pointer"
              title="Plain English explanation of tricky cellular words"
            >
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span>Jargon Buster</span>
            </button>

            {/* Print / Save PDF for Dad */}
            <button
              onClick={onPrint}
              className="px-2.5 sm:px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 hover:text-slate-900 rounded-xl transition-colors hidden sm:flex items-center gap-1.5 active:scale-95 border border-slate-200/60 cursor-pointer"
              title="Print a clear summary sheet for Dad"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Report</span>
            </button>

            {/* High-Legibility Comfort Mode Switch */}
            <button
              onClick={() => setSeniorMode(!seniorMode)}
              className={`px-2.5 sm:px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 sm:gap-2 border shadow-xs active:scale-95 cursor-pointer ${
                seniorMode
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-amber-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
              title="Toggle larger fonts, higher contrast, and plain English descriptions"
            >
              <Eye className={`w-4 h-4 ${seniorMode ? 'text-white' : 'text-amber-500'}`} />
              <span>{seniorMode ? 'Comfort ON' : 'Comfort Mode'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Quick Filter Chips Row (Visible below search on small screens) */}
        <div className="flex md:hidden items-center gap-1.5 pb-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Filter:</span>
          <button
            type="button"
            onClick={() => handleToggleFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all ${
              smartFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleToggleFilter('budget')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
              smartFilter === 'budget' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <Tag className="w-3 h-3" />
            Budget
          </button>
          <button
            type="button"
            onClick={() => handleToggleFilter('performance')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
              smartFilter === 'performance' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
            }`}
          >
            <Zap className="w-3 h-3" />
            Performance
          </button>
          <button
            type="button"
            onClick={() => handleToggleFilter('camera')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
              smartFilter === 'camera' ? 'bg-cyan-600 text-white' : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
            }`}
          >
            <Camera className="w-3 h-3" />
            Camera Focus
          </button>
        </div>

        {/* Tier 2: Dynamic Navigation Links Strip */}
        <nav className="flex items-center gap-1 sm:gap-1.5 py-2 border-t border-slate-100 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('deals')}
            className={`px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              activeTab === 'deals'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
            }`}
          >
            <Tag className={`w-4 h-4 ${activeTab === 'deals' ? 'text-white' : 'text-slate-400'}`} />
            <span>Top Bundles</span>
            {smartFilter !== 'all' && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('models')}
            className={`px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              activeTab === 'models'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
            }`}
          >
            <Smartphone className={`w-4 h-4 ${activeTab === 'models' ? 'text-white' : 'text-slate-400'}`} />
            <span>Compare Phones</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
            }`}
          >
            <Calculator className={`w-4 h-4 ${activeTab === 'calculator' ? 'text-white' : 'text-slate-400'}`} />
            <span>Cost Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('tradein')}
            className={`px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              activeTab === 'tradein'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
            }`}
          >
            <Smartphone className={`w-4 h-4 ${activeTab === 'tradein' ? 'text-cyan-300' : 'text-emerald-500'}`} />
            <span>iPhone 11 Trade-In</span>
          </button>

          {/* Saved Deals with Star Counter */}
          <button
            onClick={() => setActiveTab('saved')}
            className={`relative px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm shadow-amber-500/30 font-bold'
                : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50/60'
            }`}
          >
            <Star className={`w-4 h-4 ${activeTab === 'saved' ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'}`} />
            <span>My Saved Deals</span>
            {savedCount > 0 && (
              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full tabular-nums ${
                activeTab === 'saved' ? 'bg-white text-amber-700 font-black' : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              activeTab === 'scanner'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${activeTab === 'scanner' ? 'text-cyan-300' : 'text-amber-500'}`} />
            <span>AI Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('guides')}
            className={`px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              activeTab === 'guides'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-600/30 font-bold'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === 'guides' ? 'text-white' : 'text-slate-400'}`} />
            <span>Setup & Transfer</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
