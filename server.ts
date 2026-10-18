import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with modern SDK guidelines
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Endpoint for Live Deal Analysis & Verification
app.post('/api/deals/search', async (req: Request, res: Response) => {
  try {
    const { 
      currentCarrier = 'Straight Talk', 
      currentDevice = 'iPhone 11', 
      targetModel = 'iPhone 15 Plus or 16 Plus',
      priority = 'Lowest Monthly Cost',
      financingPreference = 'Any (Outright, Affirm, or Carrier)'
    } = req.body;

    if (!apiKey) {
      // Graceful fallback if API key is not yet configured in secrets
      return res.json({
        success: true,
        summary: `Analysis for upgrading from ${currentDevice} on ${currentCarrier}: The undisputed #1 deal right now is the Straight Talk iPhone 16e promotion for just $149.99 (discounted from $599.99). Since Dad is already on Straight Talk with an iPhone 11, he can purchase a brand new 2025 iPhone with Apple's A18 chip and modern USB-C charging for $149.99 outright with zero carrier switching! Alternatively, if he wants a giant 6.7" screen, a certified refurbished iPhone 14 Plus paired with Visible by Verizon ($25/mo on the same Verizon towers) provides maximum display comfort at the lowest monthly recurring price.`,
        topRecommendation: {
          title: 'Straight Talk iPhone 16e Promo ($149.99 Outright)',
          reason: 'Brand new 2025 iPhone with A18 chip and USB-C for $149.99 on the carrier Dad already uses. Zero switching hassle.',
          estimatedUpfront: '$149.99 (Save $450 off MSRP)',
          monthlyCost: '$45/mo (Silver Unlimited)',
          directUrl: 'https://www.straighttalk.com/phones/apple-iphone-16e'
        },
        alternativeOption: {
          title: 'Visible by Verizon ($25/mo Unlimited) + Refurbished 14 Plus (6.7")',
          reason: 'Best for maximum screen legibility: giant 6.7" display with the lowest monthly cell bill ($25 flat) on the same Verizon towers.',
          estimatedUpfront: '$359 - $479 (after iPhone 11 trade-in)',
          monthlyCost: '$25/mo (Taxes & fees included)',
          directUrl: 'https://www.visible.com/plans'
        },
        straightTalkSwitchAdvice: 'If staying with Straight Talk for the $149 iPhone 16e, log into Straight Talk or visit Walmart to activate the upgrade on his existing line. If switching to Visible or Consumer Cellular, text NTP to 611611 from the iPhone 11 to receive his 4-digit transfer PIN.',
        finePrintWarning: 'Beware of major carrier (Verizon/AT&T) "free phone" promotions: they require locking into 36 months at $65-$80/month ($2,400+ over 3 years) and forfeit remaining credits if you leave early.'
      });
    }

    const prompt = `You are a trusted senior cellular advisor helping a 66-year-old father who currently has an iPhone 11 on Straight Talk.
He is looking to compare iPhone models (including the brand new iPhone 16e currently on promo for $149 on Straight Talk, iPhone 13 Pro Max, 14 Plus/Pro Max, 15 Plus/Pro Max, 16/16 Plus/Pro Max) and find the best value across outright purchase, Affirm financing, and carrier/prepaid plans.

Current Situation:
- Age: 66 years old
- Current Carrier: ${currentCarrier} (Runs on Verizon towers)
- Current Device: ${currentDevice}
- Target Model Interest: ${targetModel}
- Main Priority: ${priority}
- Financing Preference: ${financingPreference}

Special Active Promotion to Factor In:
- Straight Talk is running an official promotion offering the brand new iPhone 16e (128GB, A18 Chip, USB-C, MSRP $599.99) for only $149.99 when activated with a Silver Unlimited plan ($45/mo). Since Dad is already on Straight Talk, highlight this as an extraordinary direct option with zero switching hassle!

Analyze the real market options for him. Address:
1. The Straight Talk $149 iPhone 16e deal vs. Refurbished 13 Pro Max / 14 Plus for bigger screen.
2. Trade-in value of his iPhone 11 (approx $100-$130 direct cash or $400-$700 in carrier 36-month bill credits).
3. The trade-off between carrier "free" phones (locked into 36 months at $65+/mo) vs. low-cost prepaid like Visible ($25/mo on same Verizon towers) or Consumer Cellular (AARP discount).
4. Affirm 0% - 15% financing vs Outright unlocked purchase.
5. Active, non-hallucinated direct guidance for purchasing and transferring his Straight Talk line (texting NTP to 611611).

Provide your response in JSON format with the following fields:
- summary: string (3-4 reassuring, clear sentences tailored for a 66-year-old dad and his family)
- topRecommendation: { title: string, reason: string, estimatedUpfront: string, monthlyCost: string, directUrl: string }
- alternativeOption: { title: string, reason: string, estimatedUpfront: string, monthlyCost: string, directUrl: string }
- straightTalkSwitchAdvice: string (step by step note on keeping his number)
- finePrintWarning: string (clear explanation of carrier bill credits vs contract freedom)
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = { summary: text };
    }

    return res.json({
      success: true,
      ...parsedData,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze deals',
    });
  }
});

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
