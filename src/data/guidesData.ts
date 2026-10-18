export interface GuideItem {
  id: string;
  category: 'activation' | 'apple_id' | 'transfer_ios' | 'transfer_android' | 'essential_settings';
  categoryTitle: string;
  categoryDescription: string;
  steps: {
    id: string;
    stepNumber: number;
    title: string;
    actionHeadline: string;
    duration: string;
    details: string[];
    dadAdvice: string;
    visualType: 'quick_start_cloud' | 'esim_transfer' | 'apple_id_login' | 'display_zoom' | 'medical_id' | 'move_to_ios' | 'straight_talk_pin' | 'sim_tray';
    checklistAction: string;
  }[];
}

export const INTERACTIVE_GUIDES: GuideItem[] = [
  {
    id: 'device-activation',
    category: 'activation',
    categoryTitle: '1. Device Activation & Cellular Setup',
    categoryDescription: 'Get your new iPhone connected to cellular service, activate eSIM or SIM card, and connect to home Wi-Fi.',
    steps: [
      {
        id: 'act-1',
        stepNumber: 1,
        title: 'Unbox & Check Wi-Fi',
        actionHeadline: 'Power on the new iPhone and connect to your home Wi-Fi',
        duration: '3 mins',
        details: [
          'Press and hold the side button on the right edge until the white Apple logo appears on screen.',
          'Swipe up from the bottom of the "Hello" screen.',
          'Select "English" and "United States".',
          'Tap your home Wi-Fi network and enter your home Wi-Fi password. (You need Wi-Fi active to activate cellular).'
        ],
        dadAdvice: 'Keep your new iPhone plugged into the charger during setup so the battery doesn’t shut down midway.',
        visualType: 'sim_tray',
        checklistAction: 'New iPhone powered on and connected to Wi-Fi'
      },
      {
        id: 'act-2',
        stepNumber: 2,
        title: 'Straight Talk Number Transfer PIN (NTP)',
        actionHeadline: 'Request your Straight Talk Number Transfer PIN if switching carriers',
        duration: '4 mins',
        details: [
          'If you are KEEPING Straight Talk: you can simply insert your Straight Talk SIM card into the new phone, or open the Straight Talk app to activate your new eSIM.',
          'If you are SWITCHING to Visible, Consumer Cellular, Mint, or a major carrier: on your OLD iPhone 11, open Messages and text the letters "NTP" to the number "611611".',
          'Straight Talk will instantly text you back a 4-digit temporary Transfer PIN.',
          'Your Straight Talk Account Number is usually your old phone’s IMEI number (found in Settings > General > About > IMEI).'
        ],
        dadAdvice: 'Do NOT cancel your Straight Talk service before the new phone activates! Your old line must remain open until the number finishes transferring.',
        visualType: 'straight_talk_pin',
        checklistAction: 'Obtained Straight Talk Transfer PIN and Account Number'
      },
      {
        id: 'act-3',
        stepNumber: 3,
        title: 'eSIM Wireless Activation',
        actionHeadline: 'Activate your digital eSIM over the air',
        duration: '5 mins',
        details: [
          'iPhones 14, 15, and 16 sold in the US use eSIM (electronic SIM cards – no tiny plastic trays to lose or poke with a paperclip!).',
          'During setup, your iPhone will show "Set Up Cellular".',
          'Tap "Transfer from Nearby iPhone" (if keeping your number on iOS 16+) OR select "Use QR Code" sent by your carrier.',
          'Follow the one-tap prompt on your old iPhone 11 confirming the transfer.'
        ],
        dadAdvice: 'Once cellular says "Connected", make a quick 10-second test phone call to your son or spouse to verify sound.',
        visualType: 'esim_transfer',
        checklistAction: 'Cellular bars appear at top-right of new screen'
      }
    ]
  },
  {
    id: 'apple-id-guide',
    category: 'apple_id',
    categoryTitle: '2. Apple ID & iCloud Sign-In',
    categoryDescription: 'Safely sign in to your existing Apple account, recover passwords if needed, and secure your photos and contacts.',
    steps: [
      {
        id: 'aid-1',
        stepNumber: 1,
        title: 'Find Your Existing Apple ID',
        actionHeadline: 'Verify your Apple ID email address on your old iPhone 11',
        duration: '2 mins',
        details: [
          'On your old iPhone 11, open the "Settings" app.',
          'Look at the very top row where your name is shown.',
          'Under your name, you will see an email address (often ending in @icloud.com, @gmail.com, or @yahoo.com). This is your official Apple ID!',
          'Write this down on a piece of paper so you have it ready.'
        ],
        dadAdvice: 'Do not create a brand new Apple ID! Using your existing Apple ID ensures all your purchased apps, contacts, and photos transfer automatically without paying again.',
        visualType: 'apple_id_login',
        checklistAction: 'Confirmed current Apple ID email address'
      },
      {
        id: 'aid-2',
        stepNumber: 2,
        title: 'Password & Two-Factor Code',
        actionHeadline: 'Sign in on the new iPhone and approve the security prompt',
        duration: '4 mins',
        details: [
          'On your new iPhone, type in your Apple ID email and password.',
          'If you forgot the password, tap "Forgot Password?" to reset it using your phone number or email.',
          'A 6-digit code will pop up on your old iPhone 11 screen saying "Apple ID Sign-in Requested". Tap "Allow".',
          'Type that 6-digit code into your new iPhone.'
        ],
        dadAdvice: 'Have both your old phone and new phone on the table next to each other so you can see the 6-digit verification code immediately.',
        visualType: 'apple_id_login',
        checklistAction: 'Successfully signed into Apple Account on new phone'
      }
    ]
  },
  {
    id: 'data-transfer-ios',
    category: 'transfer_ios',
    categoryTitle: '3. Data Transfer: iPhone 11 to New iPhone (Quick Start)',
    categoryDescription: 'The official Apple direct wireless migration that copies all photos, text message history, contacts, and apps effortlessly.',
    steps: [
      {
        id: 'tios-1',
        stepNumber: 1,
        title: 'Place Phones Side-by-Side',
        actionHeadline: 'Bring the iPhone 11 next to the new iPhone with Bluetooth ON',
        duration: '2 mins',
        details: [
          'Ensure Bluetooth and Wi-Fi are turned ON on your old iPhone 11.',
          'Place both phones on the table 2 inches apart.',
          'A pop-up card will automatically slide up on your old iPhone 11 screen reading: "Set Up New iPhone".',
          'Tap "Continue" on the old iPhone 11.'
        ],
        dadAdvice: 'If the card doesn’t appear, lock the old iPhone 11 screen and unlock it again while holding it right against the new phone.',
        visualType: 'quick_start_cloud',
        checklistAction: 'Saw "Set Up New iPhone" card and tapped Continue'
      },
      {
        id: 'tios-2',
        stepNumber: 2,
        title: 'Scan the Blue Floating Particle Cloud',
        actionHeadline: 'Hold old iPhone 11 camera over the new iPhone screen animation',
        duration: '2 mins',
        details: [
          'A swirling blue particle graphic (like a rotating galaxy) will appear on the new iPhone screen.',
          'A camera viewfinder circle will open on your old iPhone 11.',
          'Hold your old phone above the new phone and center the blue particle cloud inside the circle.',
          'A green checkmark will appear saying "Finish on New iPhone".'
        ],
        dadAdvice: 'Hold the phone steady about 8 inches away from the new screen for 3 seconds until the circle locks on.',
        visualType: 'quick_start_cloud',
        checklistAction: 'Blue particle pattern scanned and paired'
      },
      {
        id: 'tios-3',
        stepNumber: 3,
        title: 'Choose "Transfer from iPhone"',
        actionHeadline: 'Select direct device-to-device wireless data migration',
        duration: '15 - 35 mins',
        details: [
          'When prompted, enter your old iPhone 11 passcode on the new iPhone.',
          'Select "Transfer Directly from iPhone" (this moves everything directly over local Wi-Fi without needing extra iCloud storage space).',
          'Keep both phones near each other and plugged into wall power until the progress bar completes.',
          'When finished, the new iPhone will chime and restart with your exact wallpaper, contacts, photos, and apps in the exact same positions!'
        ],
        dadAdvice: 'Don’t worry if the screen says "30 minutes remaining" – it often finishes faster. Go enjoy a cup of coffee while it transfers.',
        visualType: 'quick_start_cloud',
        checklistAction: 'Data transfer progress bar completed and phone restarted'
      }
    ]
  },
  {
    id: 'data-transfer-android',
    category: 'transfer_android',
    categoryTitle: '4. Data Transfer: From Android (Samsung / Motorola / Pixel)',
    categoryDescription: 'If switching from an Android device to iPhone using the official Apple "Move to iOS" utility.',
    steps: [
      {
        id: 'tand-1',
        stepNumber: 1,
        title: 'Install "Move to iOS" on Android',
        actionHeadline: 'Download Apple’s free transfer app from the Google Play Store',
        duration: '4 mins',
        details: [
          'On your old Android phone, open Google Play Store.',
          'Search for "Move to iOS" (by Apple) and tap Install.',
          'Open the app, tap Continue, and accept Apple’s terms.',
          'Grant permission to access Contacts, Messages, Calendar, and Photos.'
        ],
        dadAdvice: 'Make sure Android is connected to the same home Wi-Fi network as your new iPhone.',
        visualType: 'move_to_ios',
        checklistAction: '"Move to iOS" app opened on Android phone'
      },
      {
        id: 'tand-2',
        stepNumber: 2,
        title: 'Enter One-Time Security Code',
        actionHeadline: 'Pair Android and iPhone using a 6-digit wireless code',
        duration: '3 mins',
        details: [
          'On the new iPhone setup screen, tap "Move Data from Android".',
          'A 6-digit or 10-digit code will display on the new iPhone screen.',
          'Enter this code into your Android phone.',
          'The iPhone will create a temporary private Wi-Fi network. Tap "Connect" on your Android.'
        ],
        dadAdvice: 'If Android displays an internet warning saying "Wi-Fi has no internet", tap "Keep Wi-Fi connection".',
        visualType: 'move_to_ios',
        checklistAction: 'Entered 6-digit code and paired devices'
      },
      {
        id: 'tand-3',
        stepNumber: 3,
        title: 'Select Contacts, Messages & Photos',
        actionHeadline: 'Pick what content to move over to your new iPhone',
        duration: '15 - 30 mins',
        details: [
          'On Android, select Contacts, Message History, Camera Photos, and Google Account credentials.',
          'Tap Continue and wait for the transfer bar to reach 100%.',
          'Free apps that exist on iPhone (e.g. Weather, YouTube, Maps) will download automatically.'
        ],
        dadAdvice: 'Leave both phones alone until the iPhone displays "Transfer Complete".',
        visualType: 'move_to_ios',
        checklistAction: 'Android transfer completed successfully'
      }
    ]
  },
  {
    id: 'essential-senior-settings',
    category: 'essential_settings',
    categoryTitle: '5. Essential Comfort & Display Settings',
    categoryDescription: 'Crucial adjustments for easier reading: larger text, high-contrast display zoom, Medical ID, and spam call silencing.',
    steps: [
      {
        id: 'ess-1',
        stepNumber: 1,
        title: 'Enable Display Zoom (Larger Text & Icons)',
        actionHeadline: 'Make all on-screen buttons, text, and icons 20% larger',
        duration: '2 mins',
        details: [
          'Open Settings > Display & Brightness.',
          'Scroll down to the bottom and tap "Display Zoom".',
          'Choose "Larger Text".',
          'Tap "Done" in the top-right corner. The screen will pause for 2 seconds and reload with bigger, clearer icons!'
        ],
        dadAdvice: 'This is the #1 setting for comfortable viewing: it prevents squinting and makes tapping keyboard keys much easier.',
        visualType: 'display_zoom',
        checklistAction: 'Display Zoom set to Larger Text'
      },
      {
        id: 'ess-2',
        stepNumber: 2,
        title: 'Set Text Size & Bold Text',
        actionHeadline: 'Boost font weight and size across Messages, Mail, and Safari',
        duration: '2 mins',
        details: [
          'In Settings > Display & Brightness, tap "Text Size".',
          'Drag the slider to the right to increase reading size.',
          'Go back one screen and turn the switch ON for "Bold Text".',
          'All text across the entire phone will become crisp and high-contrast dark black.'
        ],
        dadAdvice: 'Setting Bold Text ON makes reading bank statements, medical portals, and text messages dramatically easier.',
        visualType: 'display_zoom',
        checklistAction: 'Bold Text enabled and Text Size comfortable'
      },
      {
        id: 'ess-3',
        stepNumber: 3,
        title: 'Configure Medical ID & Emergency SOS',
        actionHeadline: 'Put emergency contacts and medical notes on your lock screen',
        duration: '4 mins',
        details: [
          'Open the Health app (heart icon) and tap your profile picture at top right.',
          'Tap "Medical ID" then tap "Edit".',
          'Add your emergency contacts (e.g., your son, daughter, or doctor) and any allergies or medications.',
          'Turn ON "Show When Locked" and "Share During Emergency Call".',
          'Now, first responders can access vital info even if your phone is locked.'
        ],
        dadAdvice: 'Holding the side button and volume button together triggers Emergency SOS and automatically texts your emergency contacts with your GPS location.',
        visualType: 'medical_id',
        checklistAction: 'Emergency contacts and Medical ID saved'
      },
      {
        id: 'ess-4',
        stepNumber: 4,
        title: 'Silence Unknown Spam Callers',
        actionHeadline: 'Block automated robocallers from interrupting your day',
        duration: '1 min',
        details: [
          'Open Settings > Phone.',
          'Scroll down and tap "Silence Unknown Callers".',
          'Toggle the switch to ON.',
          'Calls from numbers not in your Contacts will not ring your phone; they go directly to Voicemail silently.'
        ],
        dadAdvice: 'Doctors or contractors you haven’t saved can still leave a voicemail, and their missed call shows in your recent calls list without startling you.',
        visualType: 'display_zoom',
        checklistAction: 'Silence Unknown Callers activated'
      }
    ]
  }
];
