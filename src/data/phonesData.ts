import { IPhoneModel } from '../types';

export const IPHONE_MODELS: IPhoneModel[] = [
  // --- iPhone 18 Series (Latest Fall 2026 Releases) ---
  {
    id: 'iphone-18-pro-max',
    name: 'iPhone 18 Pro Max',
    generation: '18 Series (Fall 2026 Flagship)',
    screenSize: '6.9-inch Super Retina XDR OLED (Next-Gen Micro Dynamic Island)',
    screenDiagonalInches: 6.9,
    weightGrams: 224,
    weightOunces: 7.9,
    batteryVideoHours: 35,
    chip: 'A20 Pro (2nm Ultra-Efficient Architecture)',
    portType: 'USB-C',
    cameraZoom: '5x-10x Variable Optical Aperture + 48MP Triple Lens',
    faceId: true,
    msrpNew: 1299,
    bestCondition: 'Brand New',
    seniorPros: [
      'Huge 6.9-inch display: absolute easiest screen to read with large text enabled and zero eye strain',
      'Record 35-hour battery life on 2nm A20 Pro: charges once every 2 to 3 days',
      'Advanced vapor chamber cooling keeps phone cool in hand during long FaceTime family calls',
      'Smaller Dynamic Island gives more usable reading space at the top of the screen'
    ],
    seniorCons: [
      'Premium flagship price tag ($1,299)',
      'Large physical footprint requires two hands to hold comfortably'
    ],
    summaryForDad: 'The crown jewel of the new 2026 lineup: largest display Apple makes and multi-day battery life.',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-18-pro',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+18+pro+max',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+18+pro+max',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+18+pro+max'
  },
  {
    id: 'iphone-18-pro',
    name: 'iPhone 18 Pro',
    generation: '18 Series (Fall 2026)',
    screenSize: '6.3-inch Super Retina XDR OLED (ProMotion 120Hz)',
    screenDiagonalInches: 6.3,
    weightGrams: 189,
    weightOunces: 6.67,
    batteryVideoHours: 29,
    chip: 'A20 Pro (2nm Chip)',
    portType: 'USB-C',
    cameraZoom: '5x Optical Zoom + 48MP Variable Aperture',
    faceId: true,
    msrpNew: 1199,
    bestCondition: 'Brand New',
    seniorPros: [
      'Comfortable 6.3-inch screen that easily fits in shirts and pockets without heavy bulk',
      'Featherlight titanium alloy weighing only 6.67 oz – very gentle on wrists',
      'A20 Pro processor with 12GB RAM for lightning-fast responsiveness and 7+ years of iOS updates'
    ],
    seniorCons: [
      'High starting cost ($1,199)',
      'Screen is smaller than the 6.7" and 6.9" Max models'
    ],
    summaryForDad: 'Compact flagship power with universal USB-C charging and lightweight handling.',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-18-pro',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+18+pro',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+18+pro',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+18+pro'
  },

  // --- iPhone 17 Series (2025 Generation) ---
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    generation: '17 Series (2025 Flagship)',
    screenSize: '6.9-inch Super Retina XDR OLED (120Hz ProMotion)',
    screenDiagonalInches: 6.9,
    weightGrams: 225,
    weightOunces: 7.94,
    batteryVideoHours: 33,
    chip: 'A19 Pro (3nm Enhanced)',
    portType: 'USB-C',
    cameraZoom: '5x Optical Zoom + 48MP Telephoto Lens',
    faceId: true,
    msrpNew: 1199,
    refurbishedPrice: 989,
    bestCondition: 'Both Available',
    seniorPros: [
      'Giant 6.9-inch display with razor-sharp contrast for effortless reading of text, news, and email',
      'Massive 33-hour battery life with 40W fast charging (50% charge in 20 minutes)',
      'Dedicated physical Action Button can be set to turn on the Flashlight or Magnifier with 1 press'
    ],
    seniorCons: [
      'Substantial size and high price tier',
      'Features more advanced camera settings than needed for everyday snapshots'
    ],
    summaryForDad: 'A proven giant-screen powerhouse with high-speed charging and crystal-clear readability.',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-17-pro',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+17+pro+max',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+17+pro+max',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+17+pro+max'
  },
  {
    id: 'iphone-17-air',
    name: 'iPhone 17 Air (Slim)',
    generation: '17 Series (Ultra-Thin)',
    screenSize: '6.6-inch Super Retina XDR OLED',
    screenDiagonalInches: 6.6,
    weightGrams: 158,
    weightOunces: 5.57,
    batteryVideoHours: 25,
    chip: 'A19 Chip',
    portType: 'USB-C',
    cameraZoom: '48MP Fusion Camera',
    faceId: true,
    msrpNew: 949,
    bestCondition: 'Brand New',
    seniorPros: [
      'Ultra-thin 5.8mm design: the thinnest, most comfortable iPhone Apple has ever built',
      'Weighs only 5.57 oz with a large 6.6-inch display – eliminates wrist fatigue completely',
      'Large readable screen area without the brick-like weight of traditional Max phones'
    ],
    seniorCons: [
      'Single 48MP rear camera lens (no dedicated telephoto zoom lens)',
      'Slim profile requires a good protective case for grip'
    ],
    summaryForDad: 'Revolutionary slim design: you get a large 6.6" screen with nearly half the weight of older Pro Max phones.',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-17-air',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+17+air',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+17+air',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+17+air'
  },
  {
    id: 'iphone-17',
    name: 'iPhone 17',
    generation: '17 Series',
    screenSize: '6.3-inch Super Retina XDR (120Hz ProMotion & Always-On)',
    screenDiagonalInches: 6.3,
    weightGrams: 172,
    weightOunces: 6.07,
    batteryVideoHours: 30,
    chip: 'A19 Chip',
    portType: 'USB-C',
    cameraZoom: '2x Lossless + 48MP Dual Camera',
    faceId: true,
    msrpNew: 799,
    bestCondition: 'Brand New',
    seniorPros: [
      'First standard iPhone to feature Always-On clock display and smooth 120Hz ProMotion',
      'Upgraded 30-hour battery life on standard size',
      'Universal USB-C charging cord and 24MP high-resolution front selfie camera for clear family calls'
    ],
    seniorCons: [
      '6.3" screen is moderate size compared to 6.7"–6.9" Plus and Max options',
      'No dedicated 5x telephoto optical zoom'
    ],
    summaryForDad: 'Modern, well-rounded iPhone with smooth ProMotion screen and all-day 30-hour battery life.',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-17',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+17',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+17',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+17'
  },

  // --- iPhone 16 Series & 16e ---
  {
    id: 'iphone-16e',
    name: 'iPhone 16e',
    generation: '16 Series (Spring 2025 Release)',
    screenSize: '6.1-inch Super Retina XDR OLED',
    screenDiagonalInches: 6.1,
    weightGrams: 167,
    weightOunces: 5.89,
    batteryVideoHours: 24,
    chip: 'A18 (Apple Intelligence Ready)',
    portType: 'USB-C',
    cameraZoom: '2x In-Sensor Lossless + 48MP Fusion Camera',
    faceId: true,
    msrpNew: 599.99,
    promoPrice: 149.99, // Current Straight Talk promotional price!
    bestCondition: 'Brand New',
    seniorPros: [
      'AMAZING VALUE: Multiple carrier options — including an active $149.99 promo on Dad\'s carrier Straight Talk',
      'Extremely lightweight: Only 5.89 oz (167g) – easiest on hands, zero wrist fatigue',
      'Modern USB-C port: reversible plug, eliminates old Lightning cables, works with all modern chargers',
      'Apple A18 processor: blazing fast performance with 6+ years of future iOS updates guaranteed'
    ],
    seniorCons: [
      '6.1-inch display is standard size (smaller reading area than the 6.7" Plus or Pro Max models)',
      'Straight Talk $149 promo requires activating on Silver Unlimited ($45/mo) and 60 days active service for unlock'
    ],
    summaryForDad: 'A versatile 2025 release with modern USB-C and the Apple A18 chip. Available factory unlocked from Apple ($599, or ~$459 after iPhone 11 trade-in), or via Dad\'s current carrier Straight Talk for $149.99 with Silver Unlimited ($45/mo, unlocks after 60 days).',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-16e',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+16e',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+16e',
    walmartDirectUrl: 'https://www.walmart.com/search?q=straight+talk+iphone+16e',
    straightTalkPromoUrl: 'https://www.straighttalk.com/all-phones/iphone-16e',
    carrierPromotions: [
      {
        carrier: 'Straight Talk Wireless',
        promoTitle: '$149.99 New Device Promo ($450 Instant Savings)',
        upfrontPrice: 149.99,
        monthlyRequirement: 'Straight Talk Silver Unlimited ($45/mo) with AutoPay',
        finePrint: 'Requires active plan purchase of Silver Unlimited ($45/mo) or higher at checkout. Device is locked to Straight Talk; under Verizon network unlock policy, automatically eligible for carrier unlock after 60 days of consecutive paid active service. Limit 2 phones per customer. Taxes and fees due at checkout. Dad keeps his existing phone number and account.',
        directUrl: 'https://www.straighttalk.com/all-phones/iphone-16e',
        isUnlockedDayOne: false,
        unlockPolicy: 'Automatically unlocks after 60 days of active service',
        planRequired: 'Silver Unlimited ($45/mo) or higher',
        isBestValue: true
      },
      {
        carrier: 'Apple Store Direct',
        promoTitle: 'Factory Unlocked (Zero Carrier Restrictions)',
        upfrontPrice: 599.00,
        monthlyRequirement: 'No contract required ($24.95/mo via 0% Apple Card, or outright)',
        finePrint: '100% factory unlocked on Day 1. Dad can pop his existing Straight Talk SIM card straight into the phone with zero plan changes or waiting period. Eligible for Apple Trade-In ($110–$140 estimated credit for iPhone 11, reducing net price to ~$459).',
        directUrl: 'https://www.apple.com/shop/buy-iphone/iphone-16e',
        isUnlockedDayOne: true,
        unlockPolicy: 'Factory Unlocked on Day 1 (No carrier ties)',
        planRequired: 'None (Works with any carrier or Dad\'s existing SIM)',
        isBestValue: false
      },
      {
        carrier: 'Total Wireless (Verizon)',
        promoTitle: '$299.99 Promo (or $24.99 Switcher Deal)',
        upfrontPrice: 299.99,
        monthlyRequirement: 'Requires 2-Month Total 5G Prepaid Plan ($110 upfront)',
        finePrint: 'Available for $299.99 when purchasing 2 months of Total 5G Unlimited service ($110 prepaid upfront). Device automatically unlocks after 60 days of paid service on Verizon towers. Alternatively, drops to $24.99 with port-in on Total 5G+ plan.',
        directUrl: 'https://www.totalwireless.com/smartphones/apple-iphone-16e',
        isUnlockedDayOne: false,
        unlockPolicy: 'Automatically unlocks after 60 days of paid service',
        planRequired: 'Total 5G Unlimited (2 months prepaid)',
        isBestValue: false
      },
      {
        carrier: 'Visible by Verizon',
        promoTitle: 'Prepaid Freedom + $25/mo All-In Unlimited',
        upfrontPrice: 599.00,
        monthlyRequirement: '$25/mo Visible Base (Taxes & Fees Included)',
        finePrint: 'Pay $599 outright or finance via Affirm at $24.95/mo with 0% APR. Visible runs directly on Verizon\'s 5G network with unlimited data, talk, and text. No contracts or credit checks. Automatically unlocks after 60 days.',
        directUrl: 'https://www.visible.com/shop/smartphones/iphone-16e',
        isUnlockedDayOne: false,
        unlockPolicy: 'Automatically unlocks after 60 days',
        planRequired: 'Visible $25/mo Base Plan',
        isBestValue: false
      },
      {
        carrier: 'Postpaid Carriers (AT&T / Verizon / T-Mobile)',
        promoTitle: '"On Us" or $5.99/mo (36-Month Contract Warning)',
        upfrontPrice: 0.00,
        monthlyRequirement: 'Requires 36-Month Postpaid Unlimited Plan ($65–$85/mo)',
        finePrint: 'Caution for Dad: Advertised as $0 down or "On Us", but requires signing a 36-month contract with expensive post-paid plans ($65–$85/month). If cancelled before 36 months, all remaining balance ($599) is due immediately. Not recommended over prepaid.',
        directUrl: 'https://www.att.com/buy/phones/apple-iphone-16e.html',
        isUnlockedDayOne: false,
        unlockPolicy: 'Locked for 36 months until contract is completely paid',
        planRequired: 'Premium Postpaid Unlimited ($65–$85/mo)',
        isBestValue: false
      }
    ]
  },
  {
    id: 'iphone-16-plus',
    name: 'iPhone 16 Plus',
    generation: '16 Series',
    screenSize: '6.7-inch Super Retina XDR OLED',
    screenDiagonalInches: 6.7,
    weightGrams: 199,
    weightOunces: 7.03,
    batteryVideoHours: 27,
    chip: 'A18 (Apple Intelligence Ready)',
    portType: 'USB-C',
    cameraZoom: '2x Lossless + 48MP Fusion Camera',
    faceId: true,
    msrpNew: 899,
    bestCondition: 'Brand New',
    seniorPros: [
      'Under 200 grams with a massive 6.7-inch screen – phenomenal display-to-weight comfort ratio',
      'A18 processor with Apple Intelligence features (writing tools, photo clean up)',
      'Dedicated Action Button (set to Flashlight or Magnifier) and Camera Control button',
      '27-hour all-weekend battery life on USB-C'
    ],
    seniorCons: [
      'Costs $899 new with few refurbished units yet on market',
      'No 5x optical telephoto lens'
    ],
    summaryForDad: 'Massive legible screen, very light in the hand, and modern USB-C charging.',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-16',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+16+plus',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+16+plus',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+16+plus'
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    generation: '16 Series Flagship',
    screenSize: '6.9-inch Super Retina XDR OLED',
    screenDiagonalInches: 6.9,
    weightGrams: 227,
    weightOunces: 8.0,
    batteryVideoHours: 33,
    chip: 'A18 Pro (Top Tier)',
    portType: 'USB-C',
    cameraZoom: '5x Optical Zoom Tetraprism + 48MP Ultra Wide',
    faceId: true,
    msrpNew: 1199,
    refurbishedPrice: 949,
    bestCondition: 'Both Available',
    seniorPros: [
      'Huge 6.9-inch display: maximum font size without text crowding',
      'Record-breaking 33 hours battery life: virtually impossible to run out of charge in a normal day',
      '5x optical telephoto lens and Camera Control button on side'
    ],
    seniorCons: [
      'Substantial size requires two hands',
      'Pricier than non-Pro models'
    ],
    summaryForDad: 'Giant 6.9-inch display and multi-day battery endurance.',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-16-pro',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+16+pro+max',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+16+pro+max',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+16+pro+max'
  },

  // --- iPhone 15 Series ---
  {
    id: 'iphone-15-plus',
    name: 'iPhone 15 Plus',
    generation: '15 Series',
    screenSize: '6.7-inch Super Retina XDR with Dynamic Island',
    screenDiagonalInches: 6.7,
    weightGrams: 201,
    weightOunces: 7.09,
    batteryVideoHours: 26,
    chip: 'A16 Bionic',
    portType: 'USB-C',
    cameraZoom: '2x Lossless Optical Quality + 48MP Main',
    faceId: true,
    msrpNew: 799,
    refurbishedPrice: 629,
    bestCondition: 'Both Available',
    seniorPros: [
      'Modern USB-C port: no more guessing which side of the plug is up, uses universal chargers',
      'Comfortable contoured edges and matte glass back that is easy to grip and does not slip',
      'Weighs only 7.09 oz – lightweight comfort with full 6.7-inch reading area',
      'Dynamic Island notification banner and 48MP high-resolution camera'
    ],
    seniorCons: [
      'No 5x dedicated telephoto lens (2x lossless zoom is included)',
      '60Hz refresh rate (standard)'
    ],
    summaryForDad: 'The sweet-spot modern iPhone: big comfortable screen, lightweight contoured body, and universal USB-C charging.',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-15',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+15+plus',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+15+plus+unlocked',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+15+plus'
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    generation: '15 Series',
    screenSize: '6.7-inch Super Retina XDR OLED (120Hz ProMotion & Always-On)',
    screenDiagonalInches: 6.7,
    weightGrams: 221,
    weightOunces: 7.81,
    batteryVideoHours: 29,
    chip: 'A17 Pro (Fast 3nm processor)',
    portType: 'USB-C',
    cameraZoom: '5x Optical Zoom Tetraprism Telephoto',
    faceId: true,
    msrpNew: 1199,
    refurbishedPrice: 849,
    bestCondition: 'Both Available',
    seniorPros: [
      'Titanium frame sheds weight down to 7.81 oz (significantly lighter than 13/14 Pro Max)',
      'Customizable Action Button can be programmed to instantly turn on Flashlight or Magnifier glass with 1 click',
      '5x optical zoom brings distant grandkids, sports, or nature up close without grain',
      'USB-C port with faster data transfer and universal charging'
    ],
    seniorCons: [
      'High price tag ($849+ refurb / $1,199 new)',
      'More advanced camera settings than most casual photographers need'
    ],
    summaryForDad: 'The premium titanium flagship with a dedicated physical Flashlight/Magnifier button and 5x optical zoom.',
    appleDirectUrl: 'https://www.apple.com/shop/refurbished/iphone',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+15+pro+max',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+15+pro+max',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+15+pro+max'
  },

  // --- iPhone 14 Series ---
  {
    id: 'iphone-14-plus',
    name: 'iPhone 14 Plus',
    generation: '14 Series',
    screenSize: '6.7-inch Super Retina XDR OLED',
    screenDiagonalInches: 6.7,
    weightGrams: 203,
    weightOunces: 7.16,
    batteryVideoHours: 26,
    chip: 'A15 Bionic (Enhanced)',
    portType: 'Lightning',
    cameraZoom: '2x Digital / Wide + Ultra Wide',
    faceId: true,
    msrpNew: 699,
    refurbishedPrice: 469,
    bestCondition: 'Both Available',
    seniorPros: [
      'Huge 6.7-inch screen but weighs 1.2 ounces LESS than Pro Max models (much easier on hands and wrists)',
      'Crash Detection and Emergency SOS via Satellite built-in for peace of mind',
      'Outstanding 26-hour battery life',
      'Very affordable entry into the large-screen iPhone category'
    ],
    seniorCons: [
      'Lacks dedicated 3x telephoto zoom camera lens (uses digital zoom)',
      'Uses older Lightning cable',
      'Standard 60Hz screen refresh (still very smooth for text and photos)'
    ],
    summaryForDad: 'Best ergonomic pick if you want the big Max-sized screen without the heavy wrist fatigue.',
    appleDirectUrl: 'https://www.apple.com/shop/buy-iphone/iphone-14',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+14+plus',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+14+plus+unlocked',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+14+plus'
  },
  {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    generation: '14 Series',
    screenSize: '6.7-inch Super Retina XDR with Dynamic Island & Always-On',
    screenDiagonalInches: 6.7,
    weightGrams: 240,
    weightOunces: 8.47,
    batteryVideoHours: 29,
    chip: 'A16 Bionic',
    portType: 'Lightning',
    cameraZoom: '3x Optical Zoom + 48MP Main Camera',
    faceId: true,
    msrpNew: 1099,
    refurbishedPrice: 669,
    bestCondition: 'Certified Refurbished',
    seniorPros: [
      'Always-On display lets you glance at time, date, and calendar without touching the phone',
      'Dynamic Island shows timers, calls, and directions right at the top of the screen',
      '48 Megapixel camera produces razor-sharp family photos and zoomed-in documents',
      'Satellite Emergency SOS and Crash Detection'
    ],
    seniorCons: [
      'Heavy stainless steel frame (8.47 oz)',
      'Last generation to use Lightning connector',
      'Pricier than the 14 Plus'
    ],
    summaryForDad: 'A luxury experience with the handy Always-On clock and Dynamic Island notifications.',
    appleDirectUrl: 'https://www.apple.com/shop/refurbished/iphone',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+14+pro+max',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+14+pro+max+renewed',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+14+pro+max'
  },

  // --- iPhone 13 Series ---
  {
    id: 'iphone-13-pro-max',
    name: 'iPhone 13 Pro Max',
    generation: '13 Series',
    screenSize: '6.7-inch Super Retina XDR OLED (120Hz ProMotion)',
    screenDiagonalInches: 6.7,
    weightGrams: 238,
    weightOunces: 8.4,
    batteryVideoHours: 28,
    chip: 'A15 Bionic (6-core CPU, 5-core GPU)',
    portType: 'Lightning',
    cameraZoom: '3x Optical Zoom Telephoto + Ultra Wide + Wide',
    faceId: true,
    msrpNew: 1099,
    refurbishedPrice: 519,
    bestCondition: 'Certified Refurbished',
    seniorPros: [
      'Huge 6.7-inch display makes text and icons very easy to read with Display Zoom',
      'Massive 28-hour battery easily lasts 2 full days without worrying about charging',
      'Substantial weight feels sturdy and secure in hand',
      'Highest value-for-money option: save over $700 compared to brand new models'
    ],
    seniorCons: [
      'Heaviest phone in the lineup (8.4 oz) – can tire hands during long reading sessions',
      'Uses older Lightning cable rather than universal modern USB-C',
      'Usually purchased Certified Pre-Owned / Refurbished rather than new from Apple directly'
    ],
    summaryForDad: 'The ultimate budget powerhouse if you want a giant, beautiful screen and two-day battery life without spending $1,200.',
    appleDirectUrl: 'https://www.apple.com/shop/refurbished/iphone',
    bestBuyDirectUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=iphone+13+pro+max+refurbished',
    amazonDirectUrl: 'https://www.amazon.com/s?k=iphone+13+pro+max+renewed+premium',
    walmartDirectUrl: 'https://www.walmart.com/search?q=iphone+13+pro+max+refurbished'
  }
];
