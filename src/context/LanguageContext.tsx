
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Translations
export const translations = {
  english: {
    // Welcome Page
    welcome: "Welcome to Apna Crypto",
    subtitle: "Your secure way to send and manage crypto",
    connectWallet: "Connect Your Wallet",
    explore: "Explore App",
    
    // Explore Mode
    exploreMode: "Explore Mode",
    exploreModeDescription: "This is a demo mode. You can explore the app features without connecting your wallet.",
    demoMode: "Demo",
    demoAddress: "Demo Address",
    backToWelcome: "Back",
    demoTransactionSuccess: "Demo transaction submitted successfully",
    thisWeek: "This Week",
    thisMonth: "This Month",
    sent: "Sent",
    received: "Received",
    
    // Navigation
    dashboard: "Dashboard",
    sendFunds: "Send Funds",
    history: "History",
    settings: "Settings",
    
    // Send Form
    sendEthereum: "Send Ethereum",
    recipientAddress: "Recipient Address",
    enterAddress: "Enter recipient address",
    amount: "Amount",
    enterAmount: "Enter amount in ETH",
    message: "Message (Optional)",
    enterMessage: "Enter a message for the recipient",
    estimatedGas: "Estimated Gas Fee",
    transactionSummary: "Transaction Summary",
    to: "To",
    sending: "Sending",
    gas: "Gas Fee",
    total: "Total",
    send: "Send",
    reset: "Reset",
    
    // Dashboard
    yourWallet: "Your Wallet",
    balance: "Balance",
    recentTransactions: "Recent Transactions",
    viewAll: "View All",
    
    // Transaction History
    transactionHistory: "Transaction History",
    filters: "Filters",
    dateRange: "Date Range",
    amountRange: "Amount Range",
    apply: "Apply",
    clearFilters: "Clear Filters",
    export: "Export to PDF",
    date: "Date",
    transactionType: "Type",
    status: "Status",
    noTransactions: "No transactions found",
    
    // Transaction Status
    pending: "Pending",
    confirmed: "Confirmed",
    failed: "Failed",
    
    // Notifications
    transactionSubmitted: "Transaction submitted",
    transactionConfirmed: "Transaction confirmed",
    transactionFailed: "Transaction failed",
    
    // Settings
    language: "Language",
    theme: "Theme",
    network: "Network",
    notifications: "Notifications",
    
    // Errors
    invalidAddress: "Invalid address",
    insufficientFunds: "Insufficient funds",
    errorOccurred: "An error occurred"
  },
  hindi: {
    // Welcome Page
    welcome: "अपना क्रिप्टो में आपका स्वागत है",
    subtitle: "क्रिप्टो भेजने और प्रबंधित करने का आपका सुरक्षित तरीका",
    connectWallet: "अपना वॉलेट कनेक्ट करें",
    explore: "ऐप एक्सप्लोर करें",
    
    // Explore Mode
    exploreMode: "एक्सप्लोर मोड",
    exploreModeDescription: "यह एक डेमो मोड है। आप बिना वॉलेट कनेक्ट किए ऐप की सुविधाओं का पता लगा सकते हैं।",
    demoMode: "डेमो",
    demoAddress: "डेमो पता",
    backToWelcome: "वापस",
    demoTransactionSuccess: "डेमो लेनदेन सफलतापूर्वक सबमिट किया गया",
    thisWeek: "इस सप्ताह",
    thisMonth: "इस महीने",
    sent: "भेजा गया",
    received: "प्राप्त हुआ",
    
    // Navigation
    dashboard: "डैशबोर्ड",
    sendFunds: "फंड भेजें",
    history: "इतिहास",
    settings: "सेटिंग्स",
    
    // Send Form
    sendEthereum: "इथेरियम भेजें",
    recipientAddress: "प्राप्तकर्ता का पता",
    enterAddress: "प्राप्तकर्ता का पता दर्ज करें",
    amount: "राशि",
    enterAmount: "ETH में राशि दर्ज करें",
    message: "संदेश (वैकल्पिक)",
    enterMessage: "प्राप्तकर्ता के लिए एक संदेश दर्ज करें",
    estimatedGas: "अनुमानित गैस शुल्क",
    transactionSummary: "लेनदेन सारांश",
    to: "प्राप्तकर्ता",
    sending: "भेज रहे हैं",
    gas: "गैस शुल्क",
    total: "कुल",
    send: "भेजें",
    reset: "रीसेट",
    
    // Dashboard
    yourWallet: "आपका वॉलेट",
    balance: "बैलेंस",
    recentTransactions: "हाल के लेनदेन",
    viewAll: "सभी देखें",
    
    // Transaction History
    transactionHistory: "लेनदेन का इतिहास",
    filters: "फ़िल्टर",
    dateRange: "तारीख सीमा",
    amountRange: "राशि सीमा",
    apply: "लागू करें",
    clearFilters: "फ़िल्टर हटाएं",
    export: "PDF में निर्यात करें",
    date: "तारीख",
    transactionType: "प्रकार",
    status: "स्थिति",
    noTransactions: "कोई लेनदेन नहीं मिला",
    
    // Transaction Status
    pending: "अपूर्ण",
    confirmed: "पुष्टि की गई",
    failed: "विफल",
    
    // Notifications
    transactionSubmitted: "लेनदेन सबमिट किया गया",
    transactionConfirmed: "लेनदेन की पुष्टि हुई",
    transactionFailed: "लेनदेन विफल हुआ",
    
    // Settings
    language: "भाषा",
    theme: "थीम",
    network: "नेटवर्क",
    notifications: "सूचनाएं",
    
    // Errors
    invalidAddress: "अमान्य पता",
    insufficientFunds: "अपर्याप्त धनराशि",
    errorOccurred: "एक त्रुटि हुई"
  }
};

export type Language = 'english' | 'hindi';
type LanguageContextType = {
  language: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('english');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.english] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
