import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck, ArrowLeftRight } from 'lucide-react';
import { IPhoneModel, PlanOption } from '../types';

interface PrintSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: IPhoneModel;
  selectedPlan: PlanOption;
  breakdown: any;
}

export const PrintSummaryModal: React.FC<PrintSummaryModalProps> = ({
  isOpen,
  onClose,
  selectedModel,
  selectedPlan,
  breakdown
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative print:p-0 print:border-none print:shadow-none animate-in fade-in-50 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="no-print absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Print Header */}
        <div className="border-b-2 border-slate-900 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                <ArrowLeftRight className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  swtch<span className="text-cyan-500">.</span>
                </span>
                <span className="text-xs text-slate-500 block font-semibold">
                  Switch Recommendation Report for Dad
                </span>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="no-print px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4" /> Print Paper Copy
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Prepared for Dad (Age 66) · Upgrading from iPhone 11 on Straight Talk · Independent Valuation
          </p>
        </div>

        {/* Selected Plan and Phone Box */}
        <div className="space-y-4">
          <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 text-xs block font-bold uppercase">Selected iPhone</span>
                <strong className="text-base font-bold text-slate-900 block">{selectedModel.name}</strong>
                <span className="text-slate-600">{selectedModel.screenSize}</span>
                <div className="text-xs text-slate-500 mt-1">Charging Cable: {selectedModel.portType}</div>
              </div>
              <div>
                <span className="text-slate-500 text-xs block font-bold uppercase">Selected Carrier Plan</span>
                <strong className="text-base font-bold text-indigo-700 block">{selectedPlan.carrier}</strong>
                <span className="text-slate-600">{selectedPlan.planName}</span>
                <div className="text-xs text-slate-500 mt-1">
                  Uses {selectedPlan.underlyingNetwork} Network · {selectedPlan.contractMonths === 0 ? 'No Contract' : `${selectedPlan.contractMonths}-mo contract`}
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 space-y-2 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Financial Breakdown</h4>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Upfront Due Today:</span>
              <strong className="font-mono text-slate-900">${breakdown.upfrontCost.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Total Monthly Cost (Phone + Plan):</span>
              <strong className="font-mono text-indigo-700 text-base">${breakdown.totalMonthlyCost.toFixed(2)}/month</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">2-Year Total Out-of-Pocket:</span>
              <strong className="font-mono text-slate-900">${breakdown.total24MonthCost.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">Overall swtch Value Score:</span>
              <strong className="font-mono text-emerald-700">{breakdown.score} / 100 ({breakdown.category})</strong>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 text-xs space-y-2 bg-slate-50/50">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">Checklist for Dad Before Switching:</h4>
            <div className="space-y-1.5 text-slate-700">
              <div>[ ] Text <strong>NTP</strong> to <strong>611611</strong> from old iPhone 11 to get 4-digit Straight Talk Transfer PIN.</div>
              <div>[ ] Note down Straight Talk Account Number (Settings &gt; General &gt; About &gt; IMEI).</div>
              <div>[ ] Do NOT cancel Straight Talk service until new phone rings with your number.</div>
              <div>[ ] Keep both phones plugged in side-by-side to perform Apple Quick Start transfer.</div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="no-print pt-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 active:scale-95 cursor-pointer shadow-md"
          >
            <Printer className="w-4 h-4" /> Print Handout
          </button>
        </div>
      </div>
    </div>
  );
};
