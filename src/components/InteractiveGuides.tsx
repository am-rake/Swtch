import React, { useState, useEffect } from 'react';
import { INTERACTIVE_GUIDES, GuideItem } from '../data/guidesData';
import { 
  CheckCircle, 
  Circle, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  Smartphone, 
  Check, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface InteractiveGuidesProps {
  seniorMode: boolean;
}

export const InteractiveGuides: React.FC<InteractiveGuidesProps> = ({ seniorMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<GuideItem['category']>('transfer_ios');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('dad_setup_completed_steps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [simPlaying, setSimPlaying] = useState<boolean>(true);

  const currentGuide = INTERACTIVE_GUIDES.find((g) => g.category === selectedCategory) || INTERACTIVE_GUIDES[0];
  const activeStep = currentGuide.steps[activeStepIndex] || currentGuide.steps[0];

  // Save checklist in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dad_setup_completed_steps', JSON.stringify(completedSteps));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [completedSteps]);

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  // Text to Speech for Senior accessibility
  const handleReadAloud = (textToRead: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // Slightly slower, clear pace for 66-year-old listener
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Calculate total progress
  const allStepIds = INTERACTIVE_GUIDES.flatMap((g) => g.steps.map((s) => s.id));
  const completedCount = allStepIds.filter((id) => completedSteps[id]).length;
  const progressPercent = Math.round((completedCount / allStepIds.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
                swtch. Setup & Transfer Assistant
              </span>
              <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2.5 py-0.5 rounded-full">
                Step-by-Step for Dad
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Activation, Data Transfer & Comfort Setup
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Follow these simple visual steps to transfer your photos, messages, contacts, and phone number 
              from your old iPhone 11 or Android phone to your new iPhone without paying a technician.
            </p>
          </div>

          {/* Progress Tracker Widget */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 min-w-[220px]">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
              <span>Overall Progress</span>
              <span className="font-mono text-blue-700">{completedCount} of {allStepIds.length} Done</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5 Guide Category Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
          {INTERACTIVE_GUIDES.map((guide) => {
            const isCurrent = guide.category === selectedCategory;
            const categoryCompleted = guide.steps.every((s) => completedSteps[s.id]);

            return (
              <button
                key={guide.id}
                onClick={() => {
                  setSelectedCategory(guide.category);
                  setActiveStepIndex(0);
                  if (isSpeaking) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {categoryCompleted ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Smartphone className="w-4 h-4 opacity-80" />
                )}
                <span>{guide.categoryTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Left Instructions & Checklist, Right Interactive Visual Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Step Details & Checklist */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step Selector Pills for Current Category */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              {currentGuide.steps.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const isDone = completedSteps[step.id];

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStepIndex(idx);
                      if (isSpeaking) {
                        window.speechSynthesis.cancel();
                        setIsSpeaking(false);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : isDone
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-slate-300 text-slate-700 text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                    )}
                    <span>{step.title}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-semibold text-slate-400 shrink-0">
              Est. {activeStep.duration}
            </span>
          </div>

          {/* Active Step Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Action Headline & Audio Narration */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Step {activeStep.stepNumber} of {currentGuide.steps.length}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {activeStep.actionHeadline}
                </h3>
              </div>

              {/* Listen to Step Button (SpeechSynthesis) */}
              <button
                onClick={() => handleReadAloud(`${activeStep.title}. ${activeStep.actionHeadline}. Instructions: ${activeStep.details.join('. ')}. Dad's advice: ${activeStep.dadAdvice}`)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 border ${
                  isSpeaking
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
                title="Listen to this step spoken aloud"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
                <span>{isSpeaking ? 'Stop Reading' : 'Listen to Step'}</span>
              </button>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-3.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Step-by-Step Instructions:
              </span>
              {activeStep.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-800">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            {/* Dad's Reassuring Advice Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Advice for Dad:</strong>
                {activeStep.dadAdvice}
              </div>
            </div>

            {/* Mark as Completed Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => toggleStepCompleted(activeStep.id)}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
                  completedSteps[activeStep.id]
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {completedSteps[activeStep.id] ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Completed! Click to Undo</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span>Mark Step {activeStep.stepNumber} Done</span>
                  </>
                )}
              </button>

              {/* Next Step Button */}
              {activeStepIndex < currentGuide.steps.length - 1 && (
                <button
                  onClick={() => {
                    setActiveStepIndex(activeStepIndex + 1);
                    if (isSpeaking) {
                      window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Next Step ({currentGuide.steps[activeStepIndex + 1].title})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Visual Simulated Phone Snippets */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-slate-950 rounded-3xl p-6 text-white shadow-xl border-4 border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
                  Simulated Phone Preview
                </span>
              </div>
              <button
                onClick={() => setSimPlaying(!simPlaying)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <RotateCcw className="w-3 h-3" /> Replay
              </button>
            </div>

            {/* Simulated iPhone Screen Display based on visualType */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 aspect-4/5 flex flex-col justify-between overflow-hidden relative">
              
              {/* Dynamic Island / Notch at top */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-4" />

              {/* Visual 1: Blue Swirling Particle Cloud (Apple Quick Start) */}
              {activeStep.visualType === 'quick_start_cloud' && (
                <div className="my-auto text-center space-y-4">
                  <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                    {/* Pulsing particle galaxy */}
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
                    <div className="w-32 h-32 rounded-full border-4 border-dashed border-cyan-400 animate-spin flex items-center justify-center" style={{ animationDuration: '8s' }}>
                      <div className="w-20 h-20 rounded-full border-2 border-dotted border-blue-300 animate-ping" />
                    </div>
                    <div className="absolute text-center">
                      <Sparkles className="w-8 h-8 text-cyan-300 mx-auto animate-bounce" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">Hold iPhone 11 Camera Here</div>
                    <div className="text-xs text-slate-400">Center the particle cloud in the round circle</div>
                  </div>
                </div>
              )}

              {/* Visual 2: Straight Talk NTP to 611611 */}
              {activeStep.visualType === 'straight_talk_pin' && (
                <div className="my-auto space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                    Messages · 611611 (Straight Talk)
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white px-3 py-1.5 rounded-2xl rounded-tr-xs font-mono">
                        NTP
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-slate-800 text-slate-200 px-3 py-2 rounded-2xl rounded-tl-xs space-y-1">
                        <div className="font-bold text-emerald-400">Straight Talk: Transfer PIN</div>
                        <div>Your 4-Digit Transfer PIN is: <strong className="text-white font-mono text-sm bg-black px-1.5 py-0.5 rounded-md">8492</strong></div>
                        <div className="text-[10px] text-slate-400">Expires in 7 days. Give this to your new carrier.</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual 3: eSIM Cellular Transfer */}
              {activeStep.visualType === 'esim_transfer' && (
                <div className="my-auto space-y-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
                    <Smartphone className="w-8 h-8 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-base font-bold text-white">Set Up Cellular</div>
                    <p className="text-xs text-slate-400">
                      Transfer phone number from Dad's iPhone 11 nearby?
                    </p>
                  </div>
                  <div className="bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs">
                    Transfer Number (Tap to Confirm)
                  </div>
                </div>
              )}

              {/* Visual 4: Display Zoom / Bold Text */}
              {activeStep.visualType === 'display_zoom' && (
                <div className="my-auto space-y-4">
                  <div className="text-center text-xs font-semibold text-slate-400">
                    Settings &gt; Display &gt; Display Zoom
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 opacity-60">
                      <div className="text-[10px] text-slate-400">Default</div>
                      <div className="text-xs font-medium text-slate-300 mt-1">Small Text</div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-950 border-2 border-blue-500 text-white">
                      <div className="text-[10px] text-cyan-300 font-bold">Selected</div>
                      <div className="text-base font-extrabold text-white mt-1">Larger Text</div>
                    </div>
                  </div>
                  <p className="text-xs text-center text-emerald-400 font-semibold">
                    ✓ All buttons, text, and icons enlarged 20%
                  </p>
                </div>
              )}

              {/* Visual 5: Medical ID & Emergency SOS */}
              {activeStep.visualType === 'medical_id' && (
                <div className="my-auto space-y-3 bg-red-950/40 p-4 rounded-xl border border-red-900/50">
                  <div className="text-red-400 text-xs font-bold uppercase tracking-wider text-center">
                    Lock Screen Medical ID
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300 border-b border-red-900/40 pb-1">
                      <span>Name:</span>
                      <strong className="text-white">Dad (Age 66)</strong>
                    </div>
                    <div className="flex justify-between text-slate-300 border-b border-red-900/40 pb-1">
                      <span>Emergency Contact:</span>
                      <strong className="text-white">Son / Family</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Show When Locked:</span>
                      <strong className="text-emerald-400">ENABLED ✓</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Default / Apple ID */}
              {(activeStep.visualType === 'apple_id_login' || activeStep.visualType === 'sim_tray' || activeStep.visualType === 'move_to_ios') && (
                <div className="my-auto text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center mx-auto">
                    <Smartphone className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="text-sm font-bold text-white">{activeStep.title}</div>
                  <p className="text-xs text-slate-400 px-4">{activeStep.checklistAction}</p>
                </div>
              )}

              {/* Bottom Home Indicator */}
              <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-4" />
            </div>

            <div className="text-center text-xs text-slate-400">
              Matches iOS 17 / iOS 18 on iPhone 13 Pro Max to 16 Pro Max
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
