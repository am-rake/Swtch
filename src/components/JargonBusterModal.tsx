import React from 'react';
import { X, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface JargonBusterModalProps {
  isOpen: boolean;
  onClose: () => void;
  seniorMode: boolean;
}

export const JargonBusterModal: React.FC<JargonBusterModalProps> = ({
  isOpen,
  onClose,
  seniorMode
}) => {
  if (!isOpen) return null;

  const terms = [
    {
      term: 'eSIM (Digital SIM Card)',
      simpleExplanation: 'An invisible electronic SIM card built right into the computer chip of the iPhone.',
      whyDadCares: 'iPhone 14, 15, and 16 do NOT have a plastic card slot. You never have to poke a paperclip into the side or lose a microscopic chip. Carrier activation happens over Wi-Fi in 2 minutes.'
    },
    {
      term: 'Bill Credits ("Free Phone" Promotions)',
      simpleExplanation: 'A discount spread out in 36 small monthly credits on your cellular bill.',
      whyDadCares: 'The phone is NOT free on day 1. Verizon or AT&T gives you an $800 credit divided by 36 months ($22.22/mo credit). If you cancel or leave before 3 full years are up, you must pay back the entire remaining balance in cash.'
    },
    {
      term: 'MVNO / Prepaid Carrier',
      simpleExplanation: 'Discount carriers (like Visible, Mint, Consumer Cellular, and Straight Talk) that lease cell tower coverage from Verizon, AT&T, and T-Mobile.',
      whyDadCares: 'You get the exact same nationwide cell coverage for $25/mo that the major carrier charges $70/mo for. You do not sacrifice signal quality.'
    },
    {
      term: 'Affirm Financing',
      simpleExplanation: 'A buy-now, pay-later installment loan that splits your phone cost into 12 or 24 monthly payments.',
      whyDadCares: 'Affirm finances the phone independently from your cellular provider. This means you can finance an iPhone without being handcuffed to an expensive carrier contract.'
    },
    {
      term: 'Number Transfer PIN (NTP)',
      simpleExplanation: 'A 4-digit security code that proves you own your phone number when moving to a new company.',
      whyDadCares: 'On Straight Talk, you simply text the letters "NTP" to the number "611611" to get this PIN. It allows you to keep the exact same telephone number your friends and family already have.'
    },
    {
      term: 'Certified Refurbished (Apple / Premium Renewed)',
      simpleExplanation: 'A pre-owned iPhone that has been thoroughly tested, cleaned, fitted with a fresh battery and new outer shell, backed by a 1-year warranty.',
      whyDadCares: 'Saves you $400 to $600 compared to brand new, looks flawless, and works just like a factory-sealed device.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              swtch<span className="text-cyan-500">.</span> Telecom Decoder for Dad
            </h3>
            <p className="text-xs text-slate-500">
              Plain-English translations of fine-print telecom vocabulary
            </p>
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {terms.map((item, index) => (
            <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{item.term}</span>
              </h4>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {item.simpleExplanation}
              </p>
              <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-600">
                <strong className="text-slate-800">Why it matters for Dad: </strong>
                {item.whyDadCares}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Got it, Return to Advisor
          </button>
        </div>

      </div>
    </div>
  );
};
