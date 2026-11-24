import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  ReceiptText,
  CreditCard,
  Bot,
  ShieldAlert,
  BookOpen,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Plus,
  Send,
  Download,
  Printer,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  ExternalLink,
  Lock,
  Unlock,
  Globe,
  Wifi,
  ShoppingBag,
  Trash2,
  Edit3,
  QrCode,
  Building2,
  Wallet,
  TrendingUp,
  RefreshCw,
  Database,
  Layers,
  Award,
  PhoneCall,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  UserCheck,
  Languages,
  Landmark,
  PieChart as PieChartIcon,
  Sliders
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// ============================================================================
// CONSTANTS & MANDATORY DISCLAIMER
// ============================================================================
const DISCLAIMER_TEXT =
    'SmartBank AI is an educational and demonstration platform. It is not a real bank, is not affiliated with RBI or any financial institution, and does not process real financial transactions.';

const STORAGE_KEY = 'smartbank_ai_luxury_v2';

// Ultra-Premium Private Banking Chart Palette (Gold, Royal Indigo, Emerald, Obsidian Slate, Amber, Rose)
const CHART_COLORS = ['#C8A24A', '#4F46E5', '#059669', '#0F1629', '#D97706', '#E11D48', '#6366F1'];

const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Utilities & Bills',
  'Education',
  'Shopping',
  'Rent & Housing',
  'Transport',
  'Healthcare',
  'Entertainment',
  'Salary & Stipend',
  'Freelance / Other'
];

// ============================================================================
// CUSTOM ANIMATIONS & LUXURY DESIGN TOKENS (INJECTED STYLES)
// ============================================================================
const LUXURY_STYLES = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(22px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes tabReveal {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes pulseSoft {
    0%, 100% { opacity: 0.45; transform: scale(0.92); }
    50% { opacity: 1; transform: scale(1.08); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .animate-fade-in-scale {
    animation: fadeInScale 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .animate-slide-in-right {
    animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .animate-tab-reveal {
    animation: tabReveal 0.36s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .shimmer-gold {
    background: linear-gradient(110deg, rgba(200,162,74,0.08) 25%, rgba(229,199,123,0.22) 50%, rgba(200,162,74,0.08) 75%);
    background-size: 200% 100%;
    animation: shimmer 2.8s infinite linear;
  }
  .typing-dot {
    animation: pulseSoft 1.2s infinite ease-in-out;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.18s; }
  .typing-dot:nth-child(3) { animation-delay: 0.36s; }
  .stagger-1 { animation-delay: 40ms; }
  .stagger-2 { animation-delay: 90ms; }
  .stagger-3 { animation-delay: 140ms; }
  .stagger-4 { animation-delay: 190ms; }
  .luxury-card {
    background: #FFFFFF;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 4px 20px -4px rgba(9, 13, 22, 0.05), 0 1px 3px rgba(9, 13, 22, 0.03);
    transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.24s ease, border-color 0.24s ease;
  }
  .luxury-card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px -10px rgba(9, 13, 22, 0.12), 0 2px 6px rgba(200, 162, 74, 0.08);
    border-color: rgba(200, 162, 74, 0.35);
  }
`;

// ============================================================================
// INITIAL DEMO DATA (STRICTLY FICTIONAL / DEMO DATA)
// ============================================================================
const INITIAL_USER = {
  name: 'Aarav Sharma',
  email: 'aarav.demo@smartbank.edu',
  phone: '+91 98XXX-XX410 (Demo)',
  customerId: 'DEMO-PRIV-9021',
  branch: 'SmartBank Private Demo Hub, Mathura',
  upiId: 'aarav.demo@smartbank',
  kycStatus: 'Demo V-CIP Verified'
};

const INITIAL_ACCOUNTS = [
  {
    id: 'acc-sb',
    type: 'Savings Account',
    label: 'Private Demo Savings',
    accountNumber: 'SB-DEMO-8841',
    ifsc: 'SMBK0DEMO01',
    balance: 248500,
    interestRate: 3.5,
    status: 'Active (Demo)'
  },
  {
    id: 'acc-ca',
    type: 'Current Account',
    label: 'Executive Demo Current',
    accountNumber: 'CA-DEMO-4419',
    ifsc: 'SMBK0DEMO01',
    balance: 115200,
    interestRate: 0.0,
    status: 'Active (Demo)'
  }
];

const INITIAL_BENEFICIARIES = [
  {
    id: 'ben-1',
    name: 'Priya Verma (Demo)',
    accountNumber: 'SB-DEMO-7712',
    ifsc: 'DEMO0001042',
    bankName: 'National Demo Bank',
    upiId: 'priya.demo@smartbank'
  },
  {
    id: 'ben-2',
    name: 'Rohan Mehta (Demo)',
    accountNumber: 'CA-DEMO-3309',
    ifsc: 'DEMO0002190',
    bankName: 'Unity Demo FinCorp',
    upiId: 'rohan.demo@okdemo'
  },
  {
    id: 'ben-3',
    name: 'Campus Hostel Trust (Demo)',
    accountNumber: 'CA-DEMO-9901',
    ifsc: 'DEMO0005511',
    bankName: 'EduTrust Demo Bank',
    upiId: 'hostel.demo@smartbank'
  },
  {
    id: 'ben-4',
    name: 'Metro Transit Card (Demo)',
    accountNumber: 'CA-DEMO-6120',
    ifsc: 'DEMO0008823',
    bankName: 'Urban Mobility Demo',
    upiId: 'metro.demo@okdemo'
  }
];

const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-DEMO-9012',
    date: '2026-11-23',
    time: '10:15 AM',
    accountId: 'acc-sb',
    accountLabel: 'SB-DEMO-8841',
    title: 'Monthly Internship Stipend (Demo)',
    counterparty: 'TechSpark Demo Labs',
    type: 'Credit',
    mode: 'NEFT',
    category: 'Salary & Stipend',
    amount: 45000,
    status: 'Completed',
    utr: 'NEFTDEMO261123001'
  },
  {
    id: 'TXN-DEMO-9011',
    date: '2026-11-21',
    time: '06:40 PM',
    accountId: 'acc-sb',
    accountLabel: 'SB-DEMO-8841',
    title: 'Campus Hostel & Mess Fee',
    counterparty: 'hostel.demo@smartbank',
    type: 'Debit',
    mode: 'UPI',
    category: 'Rent & Housing',
    amount: 12500,
    status: 'Completed',
    utr: 'UPIDEMO261121882'
  },
  {
    id: 'TXN-DEMO-9010',
    date: '2026-11-19',
    time: '01:22 PM',
    accountId: 'acc-sb',
    accountLabel: 'SB-DEMO-8841',
    title: 'Cloud Course & Certification',
    counterparty: 'EduCloud Demo Portal',
    type: 'Debit',
    mode: 'Card',
    category: 'Education',
    amount: 4200,
    status: 'Completed',
    utr: 'CRDDEMO261119443'
  },
  {
    id: 'TXN-DEMO-9009',
    date: '2026-11-17',
    time: '09:05 PM',
    accountId: 'acc-sb',
    accountLabel: 'SB-DEMO-8841',
    title: 'Artisan Cafe & Groceries',
    counterparty: 'freshmart.demo@okdemo',
    type: 'Debit',
    mode: 'UPI',
    category: 'Food & Dining',
    amount: 2850,
    status: 'Completed',
    utr: 'UPIDEMO261117229'
  },
  {
    id: 'TXN-DEMO-9008',
    date: '2026-11-15',
    time: '11:30 AM',
    accountId: 'acc-ca',
    accountLabel: 'CA-DEMO-4419',
    title: 'Hackathon Prototype Grant (Demo)',
    counterparty: 'Innovation Cell Demo',
    type: 'Credit',
    mode: 'IMPS',
    category: 'Freelance / Other',
    amount: 25000,
    status: 'Completed',
    utr: 'IMPSDEMO261115711'
  },
  {
    id: 'TXN-DEMO-9007',
    date: '2026-11-12',
    time: '04:18 PM',
    accountId: 'acc-sb',
    accountLabel: 'SB-DEMO-8841',
    title: 'Broadband & Electricity Bill',
    counterparty: 'PowerNet Demo Utility',
    type: 'Debit',
    mode: 'UPI',
    category: 'Utilities & Bills',
    amount: 3150,
    status: 'Completed',
    utr: 'UPIDEMO261112509'
  },
  {
    id: 'TXN-DEMO-9006',
    date: '2026-11-08',
    time: '03:50 PM',
    accountId: 'acc-ca',
    accountLabel: 'CA-DEMO-4419',
    title: 'Hardware Components Order',
    counterparty: 'Rohan Mehta (Demo)',
    type: 'Debit',
    mode: 'IMPS',
    category: 'Shopping',
    amount: 8400,
    status: 'Completed',
    utr: 'IMPSDEMO261108312'
  },
  {
    id: 'TXN-DEMO-9005',
    date: '2026-11-04',
    time: '08:45 AM',
    accountId: 'acc-sb',
    accountLabel: 'SB-DEMO-8841',
    title: 'Metro Pass Recharge',
    counterparty: 'metro.demo@okdemo',
    type: 'Debit',
    mode: 'UPI',
    category: 'Transport',
    amount: 1200,
    status: 'Completed',
    utr: 'UPIDEMO261104109'
  }
];

const INITIAL_CARDS = [
  {
    id: 'card-debit',
    kind: 'Obsidian Reserve Debit',
    network: 'RuPay Select (DEMO)',
    holder: 'AARAV SHARMA',
    maskedNumber: '6070 •••• •••• 4829',
    demoFullNumber: '6070 0000 0000 4829 (DEMO)',
    expiry: '08/29',
    linkedAccount: 'SB-DEMO-8841',
    frozen: false,
    onlineEnabled: true,
    internationalEnabled: false,
    contactlessEnabled: true,
    dailyLimit: 50000,
    maxLimit: 100000,
    theme: 'from-[#090D16] via-[#121B31] to-[#1E293B]'
  },
  {
    id: 'card-credit',
    kind: 'Aurelia Infinite Credit',
    network: 'Visa Signature (DEMO)',
    holder: 'AARAV SHARMA',
    maskedNumber: '4532 •••• •••• 9104',
    demoFullNumber: '4532 0000 0000 9104 (DEMO)',
    linkedAccount: 'Demo Credit Limit: ₹1,50,000',
    expiry: '11/30',
    frozen: false,
    onlineEnabled: true,
    internationalEnabled: true,
    contactlessEnabled: true,
    dailyLimit: 75000,
    maxLimit: 150000,
    theme: 'from-[#161329] via-[#1E1B4B] to-[#0F1629]'
  }
];

const INITIAL_EXPENSES = [
  { id: 'exp-1', title: 'Monthly Internship Stipend', type: 'Income', category: 'Salary & Stipend', amount: 45000, date: '2026-11-01', note: 'Demo monthly credit' },
  { id: 'exp-2', title: 'Freelance UI Design Project', type: 'Income', category: 'Freelance / Other', amount: 18000, date: '2026-11-10', note: 'Demo project payout' },
  { id: 'exp-3', title: 'Hostel & Rent', type: 'Expense', category: 'Rent & Housing', amount: 12500, date: '2026-11-03', note: 'Monthly accommodation' },
  { id: 'exp-4', title: 'Groceries & Dining', type: 'Expense', category: 'Food & Dining', amount: 6400, date: '2026-11-07', note: 'Weekly food & dining' },
  { id: 'exp-5', title: 'Electricity & Fiber Internet', type: 'Expense', category: 'Utilities & Bills', amount: 3150, date: '2026-11-12', note: 'Monthly utility bills' },
  { id: 'exp-6', title: 'AI & Cloud Courses', type: 'Expense', category: 'Education', amount: 4200, date: '2026-11-15', note: 'Certification prep' },
  { id: 'exp-7', title: 'Campus Commute & Metro', type: 'Expense', category: 'Transport', amount: 1850, date: '2026-11-18', note: 'Monthly travel' },
  { id: 'exp-8', title: 'Gadgets & Accessories', type: 'Expense', category: 'Shopping', amount: 5400, date: '2026-11-20', note: 'USB-C hub & desk lamp' }
];

const INITIAL_BUDGETS = {
  'Food & Dining': 8000,
  'Utilities & Bills': 4000,
  Education: 6000,
  Shopping: 5000,
  'Rent & Housing': 13000,
  Transport: 2500,
  Entertainment: 2500
};

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Welcome to SmartBank AI (Private Demo)',
    message: 'All accounts, balances, and transactions are fictional demonstration data.',
    time: 'Just now',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-2',
    title: 'Demo Credit Received: ₹45,000',
    message: 'Simulated NEFT credit from TechSpark Demo Labs to SB-DEMO-8841.',
    time: 'Yesterday',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-3',
    title: 'AI Expense Assistant Ready',
    message: 'Ask SmartBank AI to analyze spending, add expenses, or adjust category budgets.',
    time: '2 days ago',
    read: true,
    type: 'warning'
  }
];

// ============================================================================
// RBI KNOWLEDGE BASE FOR CLIENT-SIDE RAG PIPELINE (10 OFFICIAL-STYLE DOCS)
// ============================================================================
const INITIAL_RBI_DOCS = [
  {
    docId: 'RBI-DOC-01',
    title: 'Customer Protection – Limiting Liability of Customers in Unauthorised Electronic Banking Transactions',
    circularRef: 'DBR.No.Leg.BC.78/09.07.005/2017-18',
    date: '2017-07-06',
    section: 'Zero Liability & Limited Liability Rules',
    status: 'Active',
    category: 'Fraud & Customer Liability',
    officialUrl: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11040&Mode=0',
    content:
        'A customer has ZERO liability in unauthorised electronic banking transactions where: (1) Contributory fraud or negligence occurs on the part of the bank, or (2) Third-party breach occurs where the deficiency lies neither with the bank nor with the customer, and the customer notifies the bank within 3 working days of receiving communication from the bank. If the customer reports a third-party breach between 4 to 7 working days, per-transaction liability is capped at ₹5,000 (BSBDA), ₹10,000 (Savings/Regular accounts), or ₹25,000 (Current/OD/CC accounts with limits above ₹25 lakh) depending on account type. Beyond 7 working days, liability is determined as per the bank board-approved policy. If the loss is due to customer negligence (such as sharing OTP, PIN, or payment credentials), the customer bears the entire loss until the unauthorized transaction is reported to the bank; any loss occurring after reporting is borne by the bank. Banks must credit the shadow reversal amount within 10 working days of customer notification and resolve the complaint within 90 days.'
  },
  {
    docId: 'RBI-DOC-02',
    title: 'Reserve Bank – Integrated Ombudsman Scheme (RB-IOS), 2021',
    circularRef: 'Reserve Bank – Integrated Ombudsman Scheme, 2021 (One Nation One Ombudsman)',
    date: '2021-11-12',
    section: 'Grievance Redressal & CMS Portal',
    status: 'Active',
    category: 'Grievance Redressal',
    officialUrl: 'https://cms.rbi.org.in/',
    content:
        'The Reserve Bank – Integrated Ombudsman Scheme (RB-IOS), 2021 integrates the earlier Banking Ombudsman, NBFC Ombudsman, and Ombudsman for Digital Transactions into a single scheme based on "One Nation One Ombudsman". Customers of regulated entities (banks, NBFCs, payment system participants) can file a free-of-cost complaint on the RBI Complaint Management System (CMS) portal (https://cms.rbi.org.in/) or call the RBI Contact Centre at 14448. Before approaching the RBI Ombudsman, the customer must first file a written complaint with the regulated entity (bank/NBFC). If the entity rejects the complaint, gives an unsatisfactory reply, or fails to reply within 30 days, the customer may escalate to the RBI Ombudsman within 1 year. The Ombudsman can award compensation up to ₹20 lakh for consequential loss and up to ₹1 lakh for loss of time, expenses, and mental agony.'
  },
  {
    docId: 'RBI-DOC-03',
    title: 'Legacy Banking Ombudsman Scheme, 2006 (Historical Reference)',
    circularRef: 'Banking Ombudsman Scheme, 2006 (Superseded)',
    date: '2006-01-01',
    section: 'Historical Notice – Superseded',
    status: 'Superseded',
    category: 'Grievance Redressal',
    officialUrl: 'https://www.rbi.org.in/',
    content:
        'SUPERSEDED DOCUMENT: The earlier Banking Ombudsman Scheme 2006, Ombudsman Scheme for NBFCs 2018, and Ombudsman Scheme for Digital Transactions 2019 have been merged and superseded by the Reserve Bank – Integrated Ombudsman Scheme (RB-IOS), 2021 effective November 12, 2021. Customers should always refer to RB-IOS 2021 and the CMS portal (cms.rbi.org.in) for current complaint filing.'
  },
  {
    docId: 'RBI-DOC-04',
    title: 'Harmonisation of Turn Around Time (TAT) and Customer Compensation for Failed Transactions',
    circularRef: 'RBI DPSS.CO.PD No.629/02.01.014/2019-20',
    date: '2019-09-20',
    section: 'Auto-Reversal TAT & ₹100/Day Penalty',
    status: 'Active',
    category: 'Digital Payments',
    officialUrl: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11693&Mode=0',
    content:
        'RBI mandates strict Turn Around Time (TAT) for auto-reversal of failed digital transactions where the customer account is debited without beneficiary credit or cash dispensation. For ATM failed cash withdrawal: auto-reversal within T+5 calendar days (T is transaction date). For IMPS failed transfer: T+1 day. For UPI P2P/P2M failed transfer: T+1 day for P2P and T+5 days for merchant/P2M if not credited. For Point-of-Sale (PoS) or e-commerce card transactions: T+5 days. If the bank/payment system fails to reverse the amount within the prescribed TAT, it must automatically pay compensation of ₹100 per day of delay beyond the TAT directly to the customer without requiring a complaint.'
  },
  {
    docId: 'RBI-DOC-05',
    title: 'NEFT, RTGS 24x7 Availability and IMPS Transaction Guidelines',
    circularRef: 'RBI Payment & Settlement Systems Guidelines (NEFT/RTGS/IMPS)',
    date: '2021-10-08',
    section: 'Electronic Fund Transfer Limits & Timings',
    status: 'Active',
    category: 'Digital Payments',
    officialUrl: 'https://www.rbi.org.in/commonman/English/Scripts/FAQs.aspx',
    content:
        'NEFT (National Electronic Funds Transfer) operates 24x7x365 in half-hourly batches with no minimum or maximum RBI-mandated limit (individual banks may set internal risk caps). Savings bank account holders cannot be charged for online NEFT transactions. RTGS (Real Time Gross Settlement) is meant for high-value instant settlement, operates 24x7x365, has a mandatory minimum threshold of ₹2,00,000 (₹2 lakh), and has no upper ceiling. RBI has waived processing charges on NEFT and RTGS for member banks to encourage digital payments. IMPS (Immediate Payment Service) operates 24x7 in real time; RBI enhanced the per-transaction IMPS limit to ₹5,00,000 (₹5 lakh).'
  },
  {
    docId: 'RBI-DOC-06',
    title: 'Master Direction – Know Your Customer (KYC) Direction & Video-Based Customer Identification (V-CIP)',
    circularRef: 'RBI Master Direction – KYC Direction (Updated)',
    date: '2023-10-17',
    section: 'KYC Verification, Periodic Updation & V-CIP',
    status: 'Active',
    category: 'KYC & Compliance',
    officialUrl: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=11566',
    content:
        'Banks and regulated entities must verify customer identity using Officially Valid Documents (OVDs) such as Passport, Driving Licence, Aadhaar (voluntary/consent-based), Voter ID, NREGA Job Card, or NPR letter. Video-based Customer Identification Process (V-CIP) is an RBI-permitted consent-based, paperless, live audio-visual interaction method for remote KYC onboarding and periodic updation. Periodic KYC updation (Re-KYC) is required at least once every 2 years for high-risk customers, 8 years for medium-risk customers, and 10 years for low-risk customers. If there is no change in KYC information, customers can submit a self-declaration via registered email, mobile, ATM, or internet/mobile banking without visiting a branch.'
  },
  {
    docId: 'RBI-DOC-07',
    title: 'Master Direction – Credit Card and Debit Card – Issuance and Conduct Directions, 2022',
    circularRef: 'RBI/2022-23/92 DoR.AUT.REC.No.27/24.01.001/2022-23',
    date: '2022-04-21',
    section: 'Card Activation Consent, Closure & Billing Rules',
    status: 'Active',
    category: 'Cards & Credit',
    officialUrl: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12300',
    content:
        'Card issuers cannot issue unsolicited credit cards or upgrade existing cards without explicit customer consent. If a credit card is not activated by the customer within 30 days of issuance, the issuer must seek OTP-based consent; if consent is not given, the card must be closed within 7 working days at no cost. Upon a customer request to close a credit card (assuming dues are cleared), the issuer must complete closure within 7 working days; failure attracts a penalty of ₹500 per calendar day of delay payable to the customer. Customers must be given a one-time option to modify their credit card billing cycle. Cardholders also have the right to switch card controls (online, international, contactless) and set custom spending limits.'
  },
  {
    docId: 'RBI-DOC-08',
    title: 'DICGC Deposit Insurance Coverage for Bank Depositors',
    circularRef: 'Deposit Insurance and Credit Guarantee Corporation (DICGC) – RBI Subsidiary',
    date: '2020-02-04',
    section: '₹5 Lakh Insurance Limit per Depositor per Bank',
    status: 'Active',
    category: 'Deposits & Insurance',
    officialUrl: 'https://www.dicgc.org.in/',
    content:
        'The Deposit Insurance and Credit Guarantee Corporation (DICGC), a wholly-owned subsidiary of RBI, insures deposits in eligible commercial banks (including foreign bank branches in India, RRBs, Small Finance Banks, Payments Banks) and insured cooperative banks. Each depositor in an insured bank is insured up to a maximum of ₹5,00,000 (₹5 lakh) for both principal and interest combined held in the same right and same capacity as on the date of liquidation or cancellation of bank licence. Deposits held in different banks are insured separately up to ₹5 lakh per bank. Savings, Fixed Deposits (FD), Current, and Recurring Deposits (RD) are covered under this insurance.'
  },
  {
    docId: 'RBI-DOC-09',
    title: 'Reset of Floating Interest Rate on Equated Monthly Instalments (EMI) based Personal Loans',
    circularRef: 'RBI/2023-24/55 DoR.MCS.REC.32/01.01.003/2023-24',
    date: '2023-08-18',
    section: 'Borrower Options & Key Fact Statement (KFS)',
    status: 'Active',
    category: 'Loans & Interest Rates',
    officialUrl: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12529&Mode=0',
    content:
        'When floating interest rates reset on EMI-based personal/home loans, Regulated Entities must clearly communicate the impact on EMI and/or loan tenure to the borrower. At the time of rate reset, lenders must offer borrowers the option to switch to a fixed interest rate (as per board-approved policy) and choose between: (a) enhancement in EMI, (b) elongation of tenure (ensuring no negative amortization), or (c) a combination of both, plus the option to prepay either in part or in full at any point during the loan tenure. Lenders must also provide a transparent Key Fact Statement (KFS) and quarterly statements showing principal recovered, interest charged, remaining EMIs, and Annual Percentage Rate (APR).'
  },
  {
    docId: 'RBI-DOC-10',
    title: 'RBI Kehta Hai – Public Awareness on Safe Digital Banking & Fraud Prevention',
    circularRef: 'RBI Kehta Hai Financial Literacy Initiative',
    date: '2024-01-15',
    section: 'UPI Safety, OTP Protection & Cybercrime Helpline 1930',
    status: 'Active',
    category: 'Fraud & Customer Liability',
    officialUrl: 'https://rbikehtahai.rbi.org.in/',
    content:
        'Under the "RBI Kehta Hai" campaign, RBI reminds citizens: (1) Entering a UPI PIN is ONLY required to SEND money, NEVER to receive money. (2) RBI never calls, emails, or SMSes customers asking for OTP, PIN, CVV, password, or bank details, nor does RBI offer lottery prizes or ask to download remote screen-sharing apps. (3) Never click unknown links promising KYC updates or account unblocking; always use official bank websites or apps. (4) In case of cyber financial fraud, immediately call the National Cyber Crime Helpline 1930 or report at https://cybercrime.gov.in/ and notify your bank immediately to preserve Zero Liability protection.'
  }
];

// ============================================================================
// BANKING KNOWLEDGE CENTER ARTICLES & FRAUD MODULES
// ============================================================================
const KNOWLEDGE_ARTICLES = [
  {
    id: 'kb-1',
    category: 'Accounts',
    title: 'Savings Account vs Current Account',
    readTime: '3 min read',
    summary: 'How personal savings accounts differ from business current accounts in interest, liquidity, and transaction limits.',
    content:
        'A Savings Account is designed for individuals to safely store money, earn periodic interest (typically 2.5% to 4% p.a. at major banks), and meet everyday expenses. A Current Account is tailored for businesses and professionals requiring high daily transaction volume and overdraft facilities; current accounts generally earn 0% interest and may require a higher average monthly balance.'
  },
  {
    id: 'kb-2',
    category: 'Digital Payments',
    title: 'UPI (Unified Payments Interface) Explained',
    readTime: '4 min read',
    summary: 'How Virtual Payment Addresses (VPAs), instant bank-to-bank settlement, and UPI PIN security work.',
    content:
        'UPI, operated by NPCI and regulated under RBI payment frameworks, enables instant 24x7 bank-to-bank transfers using a simple Virtual Payment Address (like name@bank) or QR code. Remember: Your UPI PIN is strictly required only when money LEAVES your account—never when receiving funds.'
  },
  {
    id: 'kb-3',
    category: 'Digital Payments',
    title: 'NEFT vs RTGS vs IMPS: Which to Use?',
    readTime: '4 min read',
    summary: 'Compare settlement speeds, minimum limits, and 24x7 availability across India’s core transfer rails.',
    content:
        'IMPS offers instant 24x7 transfers up to ₹5 lakh. NEFT settles 24x7 in half-hourly batches with no minimum limit and zero online charges for savings accounts. RTGS settles high-value transfers in real time 24x7 with a mandatory minimum of ₹2,00,000 and no upper limit.'
  },
  {
    id: 'kb-4',
    category: 'Deposits',
    title: 'Fixed Deposits (FD) & Recurring Deposits (RD)',
    readTime: '3 min read',
    summary: 'Build disciplined wealth using lump-sum FDs or monthly RDs with compounding interest and DICGC coverage.',
    content:
        'A Fixed Deposit (FD) locks a lump-sum amount for a fixed tenure at a predetermined interest rate, compounding quarterly in most Indian banks. A Recurring Deposit (RD) lets you invest a fixed monthly sum to build a corpus over time. Both FDs and RDs in insured banks are covered under DICGC deposit insurance up to ₹5 lakh per depositor per bank.'
  },
  {
    id: 'kb-5',
    category: 'Loans & Credit',
    title: 'Credit Score (300–900) & Loan Terms',
    readTime: '3 min read',
    summary: 'Key factors influencing your credit score: payment history, utilization ratio, and RBI Key Fact Statements.',
    content:
        'Credit bureaus in India score borrowers from 300 to 900. A score of 750+ generally improves loan approval chances and interest terms. Maintain a strong score by paying bills on time, keeping card utilization below 30%, and reviewing the RBI-mandated Key Fact Statement (KFS) before signing any loan.'
  },
  {
    id: 'kb-6',
    category: 'RBI Regulations',
    title: 'Zero Liability & RBI Ombudsman (RB-IOS)',
    readTime: '5 min read',
    summary: 'Know your legal rights if an unauthorized digital transaction occurs or your bank fails to resolve a dispute.',
    content:
        'If an unauthorized electronic transaction happens due to a third-party breach (not your fault), reporting it within 3 working days gives you Zero Liability under RBI rules. If your bank does not resolve any service complaint within 30 days, you can escalate free of charge to the RBI Integrated Ombudsman at cms.rbi.org.in.'
  }
];

const FRAUD_MODULES = [
  {
    id: 'fr-1',
    title: 'UPI "Collect Request" Scam',
    risk: 'High Risk',
    description:
        'Fraudsters pretending to be online buyers send a UPI "Collect / Pay Request" or QR code claiming you must scan and enter your UPI PIN to receive money.',
    dos: ['Verify that receiving money NEVER requires entering a UPI PIN.', 'Decline unknown UPI collect requests immediately.'],
    donts: ['Never scan a QR code sent by a stranger to "receive" payment.', 'Never enter your UPI PIN unless you intend to send money.']
  },
  {
    id: 'fr-2',
    title: 'Fake KYC Update & Phishing Links',
    risk: 'High Risk',
    description:
        'Urgent SMS/WhatsApp messages claiming "Your bank account will be blocked in 24 hours—click this link to update PAN/KYC" lead to lookalike phishing websites.',
    dos: ['Verify KYC status only inside your official bank app or branch.', 'Check URLs carefully for official domains.'],
    donts: ['Never click shortened or unknown links in urgent SMS messages.', 'Never enter net-banking passwords or OTPs on third-party forms.']
  },
  {
    id: 'fr-3',
    title: 'OTP & Screen-Sharing App Fraud',
    risk: 'Critical Risk',
    description:
        'Scammers pose as bank officials or tech support and ask you to install remote-access apps (AnyDesk, TeamViewer, QuickSupport) to "fix" a failed refund.',
    dos: ['Disconnect the call immediately if someone asks to install a screen-sharing app.', 'Report fraud to Helpline 1930 right away.'],
    donts: ['Never share 9-digit screen-sharing codes with strangers.', 'Never read out SMS OTPs over a phone call.']
  },
  {
    id: 'fr-4',
    title: 'Fake Customer Care Numbers on Search',
    risk: 'Medium-High Risk',
    description:
        'Fraudsters post fake helpline numbers on unverified web pages or maps listings so users searching for bank support call the scammer directly.',
    dos: ['Always obtain customer care numbers from the back of your card or official bank website.', 'Use RBI CMS (cms.rbi.org.in) for unresolved disputes.'],
    donts: ['Never trust random phone numbers posted in social media comments or unverified search snippets.']
  }
];

const FRAUD_QUIZ = [
  {
    id: 'q1',
    scenario:
        'You list a bicycle for ₹4,500 online. A buyer sends you a QR code on WhatsApp and says: "Scan this and enter your UPI PIN so ₹4,500 gets credited to your account."',
    question: 'What should you do?',
    options: [
      'Scan the QR code and enter UPI PIN to receive ₹4,500',
      'Refuse immediately—UPI PIN is ONLY for sending money, never for receiving',
      'Try with ₹1 first to test if it works',
      'Share your debit card number instead'
    ],
    correctIndex: 1,
    explanation:
        'Under RBI Kehta Hai guidelines, you NEVER need to scan a QR code or enter a UPI PIN to receive money. Doing so will debit money from your account.'
  },
  {
    id: 'q2',
    scenario:
        'You receive an SMS: "URGENT: Your SmartBank KYC has expired. Account will be frozen in 2 hours. Update immediately at http://bit.ly/demo-kyc-verify-now".',
    question: 'Is this message legitimate?',
    options: [
      'Yes, click the link quickly to avoid account freeze',
      'Reply to the SMS with your Aadhaar and PAN number',
      'No, it is a classic phishing scam—ignore the link and check only in your official bank app',
      'Forward it to friends to ask if they got it too'
    ],
    correctIndex: 2,
    explanation:
        'Banks never send shortened/unofficial links threatening instant account closure within hours. Always verify KYC directly through official bank channels.'
  },
  {
    id: 'q3',
    scenario:
        'A caller claims to be from "RBI Refund Department" and says your ₹1,200 failed UPI refund is ready, but asks you to download a screen-sharing app and share the 9-digit code.',
    question: 'How should you respond?',
    options: [
      'Install the app briefly just to get the refund',
      'Hang up immediately—RBI never calls individuals for refunds or asks for screen-sharing apps',
      'Give them only your account number and OTP',
      'Ask them to send an email first before sharing screen'
    ],
    correctIndex: 1,
    explanation:
        'RBI never contacts individuals to process refunds. Remote screen-sharing apps allow fraudsters to view your OTPs and steal funds. Failed UPI refunds are auto-reversed under RBI TAT rules.'
  },
  {
    id: 'q4',
    scenario:
        'You notice an unauthorized ₹18,000 debit from your savings account caused by a third-party data breach (you did not share any PIN/OTP).',
    question: 'Under RBI Customer Protection guidelines, how soon should you report it to your bank for Zero Liability?',
    options: [
      'Within 30 days',
      'Within 3 working days of receiving the bank alert',
      'Only after the monthly statement arrives',
      'Wait 10 days to see if it reverses automatically'
    ],
    correctIndex: 1,
    explanation:
        'Reporting a third-party breach unauthorized transaction within 3 working days qualifies you for Zero Liability under RBI Customer Protection guidelines.'
  },
  {
    id: 'q5',
    scenario:
        'Your UPI transfer failed, your account was debited, and the money has not returned even after 2 days. You search Google for "Bank Helpline" and find a mobile number in a random blog comment.',
    question: 'What is the safest action?',
    options: [
      'Call the mobile number from the blog comment',
      'Use only the official helpline from your bank app/website, and note that RBI mandates auto-reversal within T+1 day (with ₹100/day penalty for delay)',
      'Post your account number and UTR publicly on social media',
      'Pay a small "processing fee" to an online agent'
    ],
    correctIndex: 1,
    explanation:
        'Always use official bank channels. Under RBI TAT rules, failed UPI P2P transfers must be auto-reversed within T+1 day, or the bank owes ₹100/day compensation.'
  },
  {
    id: 'q6',
    scenario:
        'You accidentally fell for a scam and lost money via an unauthorized transfer 10 minutes ago.',
    question: 'Which national helpline should you call immediately along with notifying your bank?',
    options: [
      'Helpline 1930 (National Cyber Crime Helpline) & cybercrime.gov.in',
      'Wait until tomorrow morning',
      'Delete your banking app immediately',
      'Send ₹1 back to trace the scammer'
    ],
    correctIndex: 0,
    explanation:
        'Calling 1930 immediately (Golden Hour) and reporting on cybercrime.gov.in helps authorities freeze the fraudster’s money trail quickly.'
  }
];

// ============================================================================
// UTILITY HELPERS
// ============================================================================
const formatINR = (num) => {
  const n = Number(num) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(n);
};

const todayStr = () => new Date().toISOString().split('T')[0];

const nowTimeStr = () =>
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

// ============================================================================
// RAG ENGINE: CHUNKING + SEMANTIC/TF-IDF RETRIEVAL + EXPENSE AI ENGINE
// ============================================================================
const SYNONYM_MAP = {
  fraud: ['unauthorised', 'unauthorized', 'scam', 'liability', 'otp', 'phishing', '1930', 'dhokha', 'thagi'],
  complaint: ['ombudsman', 'grievance', 'rb-ios', 'cms', '14448', 'shikayat', 'dispute'],
  upi: ['failed', 'reversal', 'tat', '100', 'pin', 'collect', 'digital', 'payment'],
  transfer: ['neft', 'rtgs', 'imps', 'limit', '24x7', 'lakh', 'charges'],
  kyc: ['vcip', 'video', 'aadhaar', 'ovd', 're-kyc', 'verification'],
  card: ['credit', 'debit', 'closure', '500', 'billing', 'consent', 'activation'],
  insurance: ['dicgc', '5 lakh', 'deposit', 'safe', 'bima', 'bank fail'],
  loan: ['emi', 'floating', 'interest', 'reset', 'kfs', 'prepay', 'byaj']
};

function chunkRBIDocument(doc) {
  const sentences = doc.content
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

  const chunks = [];
  let buffer = '';
  let idx = 1;

  for (const sentence of sentences) {
    if ((buffer + ' ' + sentence).length > 340 && buffer.length > 0) {
      chunks.push({
        chunkId: `${doc.docId}-C${idx}`,
        docId: doc.docId,
        title: doc.title,
        circularRef: doc.circularRef,
        date: doc.date,
        section: doc.section,
        status: doc.status,
        category: doc.category,
        officialUrl: doc.officialUrl,
        text: buffer.trim()
      });
      buffer = sentence;
      idx += 1;
    } else {
      buffer = buffer ? `${buffer} ${sentence}` : sentence;
    }
  }
  if (buffer.trim()) {
    chunks.push({
      chunkId: `${doc.docId}-C${idx}`,
      docId: doc.docId,
      title: doc.title,
      circularRef: doc.circularRef,
      date: doc.date,
      section: doc.section,
      status: doc.status,
      category: doc.category,
      officialUrl: doc.officialUrl,
      text: buffer.trim()
    });
  }
  return chunks;
}

function tokenize(text) {
  return text
      .toLowerCase()
      .replace(/[^a-z0-9\u0900-\u097f₹\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1);
}

function retrieveRBIChunks(query, docs, topK = 4) {
  const allChunks = docs.flatMap(chunkRBIDocument);
  const rawTokens = tokenize(query);
  const expandedSet = new Set(rawTokens);

  for (const tok of rawTokens) {
    for (const [key, syns] of Object.entries(SYNONYM_MAP)) {
      if (tok === key || syns.includes(tok)) {
        expandedSet.add(key);
        syns.forEach((s) => expandedSet.add(s));
      }
    }
  }
  const expandedTokens = Array.from(expandedSet);

  const N = allChunks.length || 1;
  const df = {};
  for (const ch of allChunks) {
    const chTokens = new Set(tokenize(`${ch.title} ${ch.section} ${ch.category} ${ch.text}`));
    for (const t of chTokens) df[t] = (df[t] || 0) + 1;
  }

  const scored = allChunks.map((chunk) => {
    const hay = `${chunk.title} ${chunk.section} ${chunk.category} ${chunk.text}`.toLowerCase();
    const hayTokens = tokenize(hay);
    let score = 0;
    const matchedTerms = new Set();

    for (const qTok of expandedTokens) {
      const isDirect = rawTokens.includes(qTok);
      const idf = Math.log((N + 1) / ((df[qTok] || 0) + 1)) + 1;
      if (hayTokens.includes(qTok) || hay.includes(qTok)) {
        score += (isDirect ? 2.4 : 0.9) * idf;
        matchedTerms.add(qTok);
      }
      if (chunk.title.toLowerCase().includes(qTok) || chunk.category.toLowerCase().includes(qTok)) {
        score += isDirect ? 2.0 : 0.6;
      }
    }

    if (chunk.status === 'Active') score *= 1.15;
    else if (!query.toLowerCase().includes('old') && !query.toLowerCase().includes('2006')) score *= 0.65;

    return {
      chunk,
      score: Number(score.toFixed(2)),
      matchedTerms: Array.from(matchedTerms).slice(0, 6)
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((item) => item.score > 1.2).slice(0, topK);
}

// Helper to infer expense category from natural language
function detectCategory(text) {
  const t = text.toLowerCase();
  if (/food|zomato|swiggy|dining|dinner|lunch|cafe|coffee|grocery|groceries|restaurant|meal/.test(t)) return 'Food & Dining';
  if (/bill|electric|wifi|broadband|internet|water|gas|recharge|utility|utilities/.test(t)) return 'Utilities & Bills';
  if (/course|book|tuition|college|exam|edu|study|udemy|certification/.test(t)) return 'Education';
  if (/shop|amazon|flipkart|clothes|shoes|gadget|electronics|mall/.test(t)) return 'Shopping';
  if (/rent|hostel|house|pg|flat|accommodation/.test(t)) return 'Rent & Housing';
  if (/uber|ola|metro|cab|train|bus|fuel|petrol|transport|commute|travel/.test(t)) return 'Transport';
  if (/doctor|medicine|hospital|pharmacy|health|clinic/.test(t)) return 'Healthcare';
  if (/movie|netflix|concert|game|entertainment|party/.test(t)) return 'Entertainment';
  if (/salary|stipend|payroll|bonus/.test(t)) return 'Salary & Stipend';
  return 'Freelance / Other';
}

// Compute live expense analytics snapshot for inline visual cards
function buildExpenseSnapshot(expenses, budgets) {
  const totalIncome = expenses
      .filter((e) => e.type === 'Income')
      .reduce((s, e) => s + Number(e.amount), 0);
  const totalExpense = expenses
      .filter((e) => e.type === 'Expense')
      .reduce((s, e) => s + Number(e.amount), 0);
  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  const spentMap = {};
  expenses
      .filter((e) => e.type === 'Expense')
      .forEach((e) => {
        spentMap[e.category] = (spentMap[e.category] || 0) + Number(e.amount);
      });

  const categories = Object.keys({ ...budgets, ...spentMap }).map((cat) => {
    const spent = spentMap[cat] || 0;
    const budget = budgets[cat] || 0;
    const pct = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 100;
    return {
      category: cat,
      spent,
      budget,
      pct,
      over: budget > 0 && spent > budget
    };
  });

  categories.sort((a, b) => b.spent - a.spent);
  return { totalIncome, totalExpense, netSavings, savingsRate, categories };
}

// Natural-language Expense AI Command Processor (Read + Write mutations!)
function processExpenseAICommand(query, expenses, setExpenses, budgets, setBudgets, language, showToast) {
  const q = query.trim();
  const lower = q.toLowerCase();
  const isHi = language === 'hi';

  // Extract numeric amount (supports ₹1,200 / 850 / rs 15000)
  const amtMatch = q.match(/(?:₹|rs\.?|inr)?\s*(\d[\d,]*)/i);
  const parsedAmount = amtMatch ? Number(amtMatch[1].replace(/,/g, '')) : null;

  // 1. ADD EXPENSE OR INCOME
  if (/(add|log|record|spent|spend|paid|received|earned|जोड़ें|खर्च लिखें)/i.test(lower) && parsedAmount && parsedAmount > 0) {
    const isIncome = /(income|salary|stipend|freelance|received|earned|bonus|आय)/i.test(lower);
    const category = isIncome
        ? /salary|stipend/i.test(lower)
            ? 'Salary & Stipend'
            : 'Freelance / Other'
        : detectCategory(q);

    // Build clean title
    let title = q
        .replace(/(add|log|record|an?|my|expense|income|of|for|rs\.?|inr|₹|\d[\d,]*)/gi, ' ')
        .replace(/[-:]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (!title || title.length < 2) title = isIncome ? `${category} Credit (Demo)` : `${category} Expense (Demo)`;
    else title = title.charAt(0).toUpperCase() + title.slice(1);

    const newEntry = {
      id: `exp-${Date.now()}`,
      title,
      type: isIncome ? 'Income' : 'Expense',
      category,
      amount: parsedAmount,
      date: todayStr(),
      note: 'Added via SmartBank AI Assistant (Demo)'
    };

    const nextExpenses = [newEntry, ...expenses];
    setExpenses(nextExpenses);
    showToast(`AI added ${newEntry.type}: ${formatINR(parsedAmount)} (${category})`, 'success');

    const snapshot = buildExpenseSnapshot(nextExpenses, budgets);
    const text = isHi
        ? `**AI Expense Tracker अपडेट हो गया है (Demo):**\nमैंने आपके डेमो खाते में **${formatINR(parsedAmount)}** की **${isIncome ? 'आय (Income)' : 'खर्च (Expense)'}** एंट्री (*${title}* — ${category}) जोड़ दी है।\n\nनीचे आपका अपडेटेड मासिक सारांश और श्रेणी बजट देखें:`
        : `**AI Expense Tracker Updated (Demo Data):**\nI have added a new **${newEntry.type}** of **${formatINR(parsedAmount)}** under **${category}** (*"${title}"*) to your persistent demo ledger.\n\nHere is your updated live monthly breakdown:`;

    return { handled: true, text, mode: 'AI Expense Engine', expenseCard: { ...snapshot, actionBadge: `Added ${newEntry.type}: ${formatINR(parsedAmount)}` } };
  }

  // 2. CHANGE / UPDATE BUDGET
  if (/(change|set|update|increase|decrease|edit).*(budget|limit)/i.test(lower) && parsedAmount && parsedAmount >= 500) {
    const category = detectCategory(q);
    const targetCat = Object.keys(budgets).find((b) => b.toLowerCase() === category.toLowerCase()) || category;
    const nextBudgets = { ...budgets, [targetCat]: parsedAmount };
    setBudgets(nextBudgets);
    showToast(`AI updated ${targetCat} budget to ${formatINR(parsedAmount)}`, 'info');

    const snapshot = buildExpenseSnapshot(expenses, nextBudgets);
    const text = isHi
        ? `**बजट अपडेट किया गया (Demo):**\nमैंने **${targetCat}** का मासिक डेमो बजट बदलकर **${formatINR(parsedAmount)}** कर दिया है। नीचे नया बजट बनाम खर्च तुलना देखें:`
        : `**Category Budget Updated (Demo Data):**\nI have updated your monthly **${targetCat}** budget to **${formatINR(parsedAmount)}**.\n\nHere is your updated budget comparison:`;

    return { handled: true, text, mode: 'AI Expense Engine', expenseCard: { ...snapshot, actionBadge: `${targetCat} Budget → ${formatINR(parsedAmount)}` } };
  }

  // 3. DELETE LAST EXPENSE / ENTRY
  if (/(delete|remove|undo).*(last|latest|recent).*(expense|entry|income|transaction)/i.test(lower)) {
    const targetIdx = expenses.findIndex((e) => (lower.includes('income') ? e.type === 'Income' : e.type === 'Expense'));
    if (targetIdx === -1) {
      return {
        handled: true,
        text: 'There are no matching demo entries left to delete in your expense ledger.',
        mode: 'AI Expense Engine'
      };
    }
    const removed = expenses[targetIdx];
    const nextExpenses = expenses.filter((_, i) => i !== targetIdx);
    setExpenses(nextExpenses);
    showToast(`AI deleted "${removed.title}" (${formatINR(removed.amount)})`, 'info');

    const snapshot = buildExpenseSnapshot(nextExpenses, budgets);
    const text = isHi
        ? `**एंट्री हटा दी गई है (Demo):**\nमैंने आपकी अंतिम ${removed.type} एंट्री **"${removed.title}" (${formatINR(removed.amount)})** हटा दी है। अपडेटेड सारांश नीचे देखें:`
        : `**Demo Entry Deleted:**\nI removed your latest ${removed.type.toLowerCase()} entry: **${removed.title}** (**${formatINR(removed.amount)}**, ${removed.category}).\n\nUpdated monthly financial summary:`;

    return { handled: true, text, mode: 'AI Expense Engine', expenseCard: { ...snapshot, actionBadge: `Deleted: ${removed.title}` } };
  }

  // 4. ANALYZE SPENDING / BUDGET STATUS / SAVINGS TIPS
  if (/(analy[sz]e|summary|spending|expense|budget|savings? rate|overspend|खर्च|बजट|बचत)/i.test(lower)) {
    const snapshot = buildExpenseSnapshot(expenses, budgets);
    const overCats = snapshot.categories.filter((c) => c.over);
    const topCat = snapshot.categories[0];

    const adviceLines = [];
    if (overCats.length > 0) {
      adviceLines.push(
          `• **Overspending Alert:** ${overCats.map((c) => `${c.category} (over by ${formatINR(c.spent - c.budget)})`).join(', ')}.`
      );
    } else {
      adviceLines.push('• **Budget Discipline:** All your tracked categories are currently within their monthly demo budgets.');
    }
    if (topCat) {
      adviceLines.push(`• **Highest Spend Category:** ${topCat.category} at ${formatINR(topCat.spent)}.`);
    }
    adviceLines.push(
        snapshot.savingsRate >= 20
            ? `• **50/30/20 Health Check:** Your demo savings rate is **${snapshot.savingsRate}%**, which beats the recommended 20% benchmark.`
            : `• **50/30/20 Health Check:** Your demo savings rate is **${snapshot.savingsRate}%**. Aim to trim discretionary shopping/dining to cross 20%.`
    );

    const text = isHi
        ? `**AI मासिक खर्च विश्लेषण (Demo Data):**\nआपकी कुल डेमो आय **${formatINR(snapshot.totalIncome)}**, कुल खर्च **${formatINR(snapshot.totalExpense)}**, और शुद्ध बचत **${formatINR(snapshot.netSavings)} (${snapshot.savingsRate}%)** है।\n\n**स्मार्ट सुझाव:**\n${adviceLines.join('\n')}\n\n*आप मुझसे कह सकते हैं: "Add ₹600 Food expense" या "Change Shopping budget to ₹7000"*`
        : `**AI Monthly Spending & Budget Analysis (Demo Data):**\nYour total demo income is **${formatINR(snapshot.totalIncome)}**, total expenses are **${formatINR(snapshot.totalExpense)}**, leaving a net savings of **${formatINR(snapshot.netSavings)}** (**${snapshot.savingsRate}% savings rate**).\n\n**Personalized Budgeting Suggestions:**\n${adviceLines.join('\n')}\n\n*Tip: You can also tell me "Add ₹850 expense for Food - Zomato", "Change Shopping budget to ₹7,000", or "Delete my last expense".*`;

    return { handled: true, text, mode: 'AI Expense Engine', expenseCard: { ...snapshot, actionBadge: 'Live Expense Analytics' } };
  }

  return { handled: false };
}

async function fetchWithBackoff(url, options, maxRetries = 3) {
  let delay = 1000;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (response.status !== 429 && response.status < 500) throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      if (attempt === maxRetries) throw err;
    }
    await new Promise((res) => setTimeout(res, delay));
    delay *= 2;
  }
  throw new Error('Request failed after retries');
}

function generateFallbackRAGResponse(query, retrieved, language) {
  const isHindi = language === 'hi';
  if (!retrieved.length) {
    return isHindi
        ? `**RBI Knowledge Base स्थिति:** आपके प्रश्न के लिए वर्तमान RBI नॉलेज बेस में सटीक आधिकारिक दस्तावेज़ नहीं मिला।\n\n**सामान्य बैंकिंग मार्गदर्शन:** कृपया UPI विफल लेनदेन, अनधिकृत फ्रॉड लायबिलिटी, NEFT/RTGS सीमा, DICGC ₹5 लाख बीमा, KYC, या RBI Ombudsman के बारे में पूछें, या https://www.rbi.org.in/ देखें।\n\n*नोट: यह स्मार्टबैंक एआई का ग्राउंडेड डेमो फ़ॉलबैक उत्तर है।*`
        : `**RBI Knowledge Base Status:** I could not find a direct matching passage in the currently indexed RBI Knowledge Base for this specific query.\n\n**General Banking Guidance:** Try asking about RBI topics such as unauthorized transaction zero liability, failed UPI auto-reversal TAT, NEFT/RTGS/IMPS limits, DICGC ₹5 lakh deposit insurance, Credit Card closure rules, KYC/V-CIP, or the RBI Integrated Ombudsman Scheme (RB-IOS), or visit https://www.rbi.org.in/.\n\n*Note: Returned in Grounded Demo Fallback Mode. SmartBank AI is an educational demo and not an official RBI representative.*`;
  }

  const top = retrieved[0].chunk;
  const second = retrieved[1]?.chunk;

  if (isHindi) {
    return `**अनिवार्य RBI विनियमन (Mandatory RBI Regulation):**\n**${top.title}** (*${top.date}*) के अनुसार:\n• ${top.text}${
        second ? `\n\n**संबंधित RBI प्रावधान (${second.section}):**\n• ${second.text}` : ''
    }\n\n**सामान्य बैंकिंग मार्गदर्शन:**\nहमेशा केवल आधिकारिक बैंक ऐप या RBI वेबसाइट (https://www.rbi.org.in/) का उपयोग करें और OTP/PIN कभी साझा न करें।\n\n*नोट: यह उत्तर सीधे RBI नॉलेज बेस से ग्राउंडेड डेमो फ़ॉलबैक मोड में तैयार किया गया है।*`;
  }

  return `**Mandatory RBI Regulation (Grounded in Indexed Guidelines):**\nBased on **${top.title}** (*${top.circularRef}*, ${top.date}, Status: ${top.status}):\n• ${top.text}${
      second ? `\n\n**Additional Relevant RBI Guideline (${second.section}):**\n• ${second.text}` : ''
  }\n\n**General Banking Guidance:**\nAlways verify account updates only through official bank channels and never share OTPs, PINs, or CVVs. Review the cited official RBI links below for complete text.\n\n*Note: Returned via Grounded Demo Fallback Mode using retrieved RBI passages. SmartBank AI is not an official RBI representative.*`;
}

async function queryGeminiWithRAG({ query, retrieved, history, language, demoContext }) {
  const apiKey = ''; // Automatically injected by runtime when empty
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const contextPassages = retrieved.length
      ? retrieved
          .map(
              (r, i) =>
                  `[Source ${i + 1}] Title: ${r.chunk.title} | Ref: ${r.chunk.circularRef} | Date: ${r.chunk.date} | Section: ${r.chunk.section} | Status: ${r.chunk.status} | URL: ${r.chunk.officialUrl}\nPassage: ${r.chunk.text}`
          )
          .join('\n\n')
      : 'NO RELEVANT RBI PASSAGES FOUND IN KNOWLEDGE BASE.';

  const systemPrompt = `You are SmartBank AI, an ultra-premium educational digital banking assistant integrated with an RBI-powered RAG system and live demo expense analytics for a college hackathon.
STRICT RULES:
1. NEVER present yourself as an official RBI representative or real bank.
2. Prioritize the provided RBI Knowledge Base passages. NEVER invent circular numbers, dates, legal penalties, or RBI rules not present in the passages.
3. Clearly separate your response into two labeled sections whenever answering regulatory questions:
   - **Mandatory RBI Regulation** (facts grounded in retrieved RBI passages, noting if any source is Superseded)
   - **General Banking Guidance** (plain-language educational advice)
4. If retrieved passages do not answer an RBI-specific question, explicitly communicate uncertainty and avoid fabricating rules.
5. Language: Respond in ${language === 'hi' ? 'Simple, clear Hindi (हिन्दी) keeping standard banking terms like UPI, NEFT, RTGS, RBI, OTP clear' : 'Simple, clear English'}.
6. Keep responses structured, crisp, and under 220 words.`;

  const recentHistory = history
      .slice(-4)
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');

  const userPrompt = `Retrieved RBI Knowledge Base Passages:\n${contextPassages}\n\nUser Demo Financial Snapshot (Fictional Demo Data):\n${demoContext}\n\nRecent Conversation:\n${recentHistory || 'None'}\n\nCurrent User Question: ${query}`;

  try {
    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };
    const res = await fetchWithBackoff(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response');
    return { text, mode: 'Gemini Live RAG' };
  } catch {
    return {
      text: generateFallbackRAGResponse(query, retrieved, language),
      mode: 'Grounded Demo Fallback'
    };
  }
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const loadSaved = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const saved = useMemo(() => loadSaved(), []);

  // Persistent Demo States
  const [isAuthenticated, setIsAuthenticated] = useState(saved?.isAuthenticated ?? false);
  const [user, setUser] = useState(saved?.user ?? INITIAL_USER);
  const [accounts, setAccounts] = useState(saved?.accounts ?? INITIAL_ACCOUNTS);
  const [beneficiaries, setBeneficiaries] = useState(saved?.beneficiaries ?? INITIAL_BENEFICIARIES);
  const [transactions, setTransactions] = useState(saved?.transactions ?? INITIAL_TRANSACTIONS);
  const [cards, setCards] = useState(saved?.cards ?? INITIAL_CARDS);
  const [expenses, setExpenses] = useState(saved?.expenses ?? INITIAL_EXPENSES);
  const [budgets, setBudgets] = useState(saved?.budgets ?? INITIAL_BUDGETS);
  const [notifications, setNotifications] = useState(saved?.notifications ?? INITIAL_NOTIFICATIONS);
  const [rbiDocs, setRbiDocs] = useState(saved?.rbiDocs ?? INITIAL_RBI_DOCS);
  const [language, setLanguage] = useState(saved?.language ?? 'en');
  const [chatMessages, setChatMessages] = useState(
      saved?.chatMessages ?? [
        {
          id: 'msg-welcome',
          role: 'assistant',
          text:
              'Welcome to **SmartBank AI**. I combine an **RBI-Powered RAG Engine** with a **Live AI Expense Analyzer**.\n\nYou can ask me about RBI guidelines (Zero Liability, UPI TAT penalties, NEFT/RTGS, DICGC, Ombudsman) **OR** manage your demo finances directly here—try *"Analyze my monthly spending"*, *"Add ₹850 expense for Food - Zomato"*, or *"Change Shopping budget to ₹7,000"*!',
          citations: [],
          retrieved: [],
          mode: 'System',
          followUps: [
            'Analyze my monthly spending',
            'Add ₹1,200 Food expense',
            'What is RBI zero liability rule for unauthorized transactions?'
          ]
        }
      ]
  );

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardSubTab, setDashboardSubTab] = useState('overview'); // 'overview' | 'transactions'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            isAuthenticated,
            user,
            accounts,
            beneficiaries,
            transactions,
            cards,
            expenses,
            budgets,
            notifications,
            rbiDocs,
            language,
            chatMessages
          })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [
    isAuthenticated,
    user,
    accounts,
    beneficiaries,
    transactions,
    cards,
    expenses,
    budgets,
    notifications,
    rbiDocs,
    language,
    chatMessages
  ]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3600);
  };

  const pushNotification = (title, message, type = 'info') => {
    setNotifications((prev) => [
      { id: `notif-${Date.now()}`, title, message, time: 'Just now', read: false, type },
      ...prev
    ]);
  };

  const handleResetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(INITIAL_USER);
    setAccounts(INITIAL_ACCOUNTS);
    setBeneficiaries(INITIAL_BENEFICIARIES);
    setTransactions(INITIAL_TRANSACTIONS);
    setCards(INITIAL_CARDS);
    setExpenses(INITIAL_EXPENSES);
    setBudgets(INITIAL_BUDGETS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setRbiDocs(INITIAL_RBI_DOCS);
    setLanguage('en');
    setDashboardSubTab('overview');
    setChatMessages([
      {
        id: 'msg-welcome-reset',
        role: 'assistant',
        text: 'All demo data has been reset to defaults! Ask me to analyze your fresh demo expenses or explain any RBI regulation.',
        citations: [],
        retrieved: [],
        mode: 'System',
        followUps: ['Analyze my monthly spending', 'Explain UPI failed transaction auto-reversal TAT']
      }
    ]);
    showToast('All demo data reset to defaults.', 'info');
  };

  // Streamlined 7-Item Navigation (No standalone Calculators, No standalone Expense Analyzer, No Transactions in sidebar/mobile nav)
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'accounts', label: 'Accounts & Cards', icon: CreditCard },
    { id: 'transfers', label: 'Transfers & UPI', icon: ArrowLeftRight },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, badge: 'RAG + AI' },
    { id: 'fraud', label: 'Fraud Awareness', icon: ShieldAlert },
    { id: 'knowledge', label: 'Knowledge Center', icon: BookOpen },
    { id: 'settings', label: 'Profile & Settings', icon: Settings }
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isAuthenticated) {
    return (
        <>
          <style>{LUXURY_STYLES}</style>
          <AuthScreen
              onLogin={(userData) => {
                if (userData) setUser((prev) => ({ ...prev, ...userData }));
                setIsAuthenticated(true);
                showToast(`Welcome to SmartBank AI, ${userData?.name || user.name}! (Demo Mode)`);
              }}
          />
          <ToastStack toasts={toasts} />
        </>
    );
  }

  return (
      <div className="min-h-screen bg-[#F6F8FB] text-[#0F1629] flex flex-col overflow-x-hidden selection:bg-[#C8A24A]/25 selection:text-[#090D16]">
        <style>{LUXURY_STYLES}</style>

        {/* Top Mandatory Educational Disclaimer Ribbon */}
        <div className="bg-[#090D16] text-[#E5C77B] text-[11px] sm:text-xs py-1.5 px-4 border-b border-[#C8A24A]/25 flex items-center justify-center gap-2 text-center">
          <Info className="w-3.5 h-3.5 text-[#C8A24A] shrink-0" />
          <span className="text-slate-200/95">{DISCLAIMER_TEXT}</span>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Desktop Obsidian Private-Banking Sidebar */}
          <aside className="hidden lg:flex lg:flex-col w-68 bg-[#090D16] text-slate-200 shrink-0 border-r border-white/10">
            <div className="p-5 flex items-center gap-3.5 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8A24A] via-[#E5C77B] to-[#9E7B2F] flex items-center justify-center shadow-lg shadow-[#C8A24A]/25">
                <Landmark className="w-5 h-5 text-[#090D16]" />
              </div>
              <div>
                <div className="font-bold text-white tracking-tight text-lg leading-none">
                  SmartBank <span className="text-[#E5C77B]">AI</span>
                </div>
                <div className="text-[10px] text-[#C8A24A] font-semibold mt-1 uppercase tracking-widest">
                  Private RBI • Demo
                </div>
              </div>
            </div>

            <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
                            active
                                ? 'bg-gradient-to-r from-[#C8A24A]/20 via-[#C8A24A]/10 to-transparent text-white border border-[#C8A24A]/40 shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                    >
                  <span className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${active ? 'text-[#E5C77B]' : 'text-slate-400'}`} />
                    {item.label}
                  </span>
                      {item.badge && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C8A24A]/20 text-[#E5C77B] border border-[#C8A24A]/35 tracking-wide">
                      {item.badge}
                    </span>
                      )}
                    </button>
                );
              })}
            </nav>

            {/* Sidebar User Profile Card */}
            <div className="p-4 border-t border-white/10">
              <div className="bg-[#0F1629] rounded-2xl p-3 border border-white/10 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C8A24A] to-[#4F46E5] flex items-center justify-center text-white font-bold text-xs shadow-md">
                    {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{user.name}</div>
                    <div className="text-[11px] text-[#E5C77B]/80 truncate font-mono">{user.customerId}</div>
                  </div>
                </div>
              </div>
              <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    showToast('Signed out of Demo Session.', 'info');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition active:scale-[0.98]"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out (Demo)
              </button>
            </div>
          </aside>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 lg:hidden flex">
                <div
                    className="fixed inset-0 bg-[#090D16]/70 backdrop-blur-xs"
                    onClick={() => setMobileMenuOpen(false)}
                />
                <div className="relative w-72 max-w-[85vw] bg-[#090D16] text-slate-100 flex flex-col h-full z-10 shadow-2xl animate-fade-in-scale border-r border-white/10">
                  <div className="p-4 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8A24A] to-[#9E7B2F] flex items-center justify-center">
                        <Landmark className="w-4 h-4 text-[#090D16]" />
                      </div>
                      <span className="font-bold text-white">
                    SmartBank <span className="text-[#E5C77B]">AI</span>
                  </span>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const active = activeTab === item.id;
                      return (
                          <button
                              key={item.id}
                              onClick={() => {
                                setActiveTab(item.id);
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                                  active
                                      ? 'bg-[#C8A24A]/20 text-white border border-[#C8A24A]/40'
                                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                              }`}
                          >
                      <span className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${active ? 'text-[#E5C77B]' : 'text-slate-400'}`} />
                        {item.label}
                      </span>
                            {item.badge && (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C8A24A]/20 text-[#E5C77B]">
                          {item.badge}
                        </span>
                            )}
                          </button>
                      );
                    })}
                  </nav>
                  <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setIsAuthenticated(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out (Demo)
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Main Workspace Column */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Elevated Porcelain Top Header */}
            <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-900/8 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition"
                    aria-label="Open navigation"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-[#090D16] leading-tight tracking-tight">
                    {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
                  </h1>
                  <div className="flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C8A24A]/12 text-[#8C6A1D] border border-[#C8A24A]/30">
                    <Sparkles className="w-2.5 h-2.5 text-[#C8A24A]" /> DEMO DATA • SANDBOX
                  </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Language Switcher */}
                <button
                    onClick={() => {
                      const next = language === 'en' ? 'hi' : 'en';
                      setLanguage(next);
                      showToast(
                          next === 'hi'
                              ? 'AI भाषा हिन्दी (Hindi) में सेट की गई है'
                              : 'AI language switched to Simple English',
                          'info'
                      );
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 bg-white hover:border-[#C8A24A]/60 text-slate-700 transition active:scale-[0.98]"
                    title="Switch AI Language"
                >
                  <Languages className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>{language === 'en' ? 'EN' : 'हिन्दी'}</span>
                </button>

                {/* Quick Ask AI CTA */}
                <button
                    onClick={() => setActiveTab('assistant')}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#090D16] text-[#E5C77B] border border-[#C8A24A]/40 hover:bg-[#162038] shadow-xs transition active:scale-[0.98]"
                >
                  <Bot className="w-3.5 h-3.5 text-[#E5C77B]" />
                  Ask SmartBank AI
                </button>

                {/* Notifications Popover */}
                <div className="relative">
                  <button
                      onClick={() => {
                        setNotifOpen((o) => !o);
                        if (!notifOpen) {
                          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                        }
                      }}
                      className="relative p-2 rounded-xl border border-slate-200 hover:border-[#C8A24A]/50 bg-white text-slate-700 transition active:scale-95"
                      aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C8A24A] text-[#090D16] text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                      {unreadCount}
                    </span>
                    )}
                  </button>

                  {notifOpen && (
                      <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-slate-900/10 overflow-hidden z-40 animate-fade-in-scale">
                        <div className="px-4 py-3 bg-[#090D16] text-white flex items-center justify-between">
                      <span className="font-semibold text-xs tracking-wide uppercase text-[#E5C77B]">
                        Demo Alerts & Status
                      </span>
                          <button
                              onClick={() => setNotifOpen(false)}
                              className="text-xs text-slate-400 hover:text-white"
                          >
                            Close
                          </button>
                        </div>
                        <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                          {notifications.length === 0 ? (
                              <div className="p-4 text-xs text-slate-500 text-center">No notifications</div>
                          ) : (
                              notifications.slice(0, 8).map((n) => (
                                  <div key={n.id} className="p-3.5 hover:bg-slate-50 transition">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-xs font-semibold text-[#090D16]">{n.title}</span>
                                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                                  </div>
                              ))
                          )}
                        </div>
                      </div>
                  )}
                </div>

                {/* User Pill */}
                <button
                    onClick={() => setActiveTab('settings')}
                    className="hidden sm:flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-slate-200 bg-white hover:border-[#C8A24A]/50 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0F1629] to-[#4F46E5] text-[#E5C77B] text-xs font-bold flex items-center justify-center">
                    {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                  </div>
                  <span className="text-xs font-semibold text-slate-800">{user.name.split(' ')[0]}</span>
                </button>
              </div>
            </header>

            {/* Animated Active Module Viewport */}
            <main key={activeTab} className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto animate-tab-reveal">
              {activeTab === 'dashboard' && (
                  <DashboardModule
                      user={user}
                      accounts={accounts}
                      transactions={transactions}
                      expenses={expenses}
                      subTab={dashboardSubTab}
                      setSubTab={setDashboardSubTab}
                      onNavigate={setActiveTab}
                      showToast={showToast}
                  />
              )}
              {activeTab === 'accounts' && (
                  <AccountsAndCardsModule
                      accounts={accounts}
                      setAccounts={setAccounts}
                      cards={cards}
                      setCards={setCards}
                      setTransactions={setTransactions}
                      user={user}
                      showToast={showToast}
                      pushNotification={pushNotification}
                  />
              )}
              {activeTab === 'transfers' && (
                  <TransfersAndUpiModule
                      accounts={accounts}
                      setAccounts={setAccounts}
                      beneficiaries={beneficiaries}
                      setBeneficiaries={setBeneficiaries}
                      setTransactions={setTransactions}
                      user={user}
                      showToast={showToast}
                      pushNotification={pushNotification}
                  />
              )}
              {activeTab === 'assistant' && (
                  <AIAssistantModule
                      rbiDocs={rbiDocs}
                      chatMessages={chatMessages}
                      setChatMessages={setChatMessages}
                      language={language}
                      setLanguage={setLanguage}
                      accounts={accounts}
                      expenses={expenses}
                      setExpenses={setExpenses}
                      budgets={budgets}
                      setBudgets={setBudgets}
                      showToast={showToast}
                      onNavigateKnowledge={() => setActiveTab('knowledge')}
                  />
              )}
              {activeTab === 'fraud' && <FraudAwarenessModule showToast={showToast} />}
              {activeTab === 'knowledge' && (
                  <KnowledgeCenterModule
                      rbiDocs={rbiDocs}
                      setRbiDocs={setRbiDocs}
                      showToast={showToast}
                      onOpenAI={() => setActiveTab('assistant')}
                  />
              )}
              {activeTab === 'settings' && (
                  <SettingsModule
                      user={user}
                      setUser={setUser}
                      language={language}
                      setLanguage={setLanguage}
                      notifications={notifications}
                      onResetDemoData={handleResetDemoData}
                      showToast={showToast}
                  />
              )}
            </main>

            {/* Footer with Mandatory Disclaimer */}
            <footer className="mt-auto border-t border-slate-900/8 bg-white px-4 sm:px-6 py-4 text-center">
              <p className="text-xs text-slate-600 max-w-4xl mx-auto font-medium">{DISCLAIMER_TEXT}</p>
              <p className="text-[11px] text-slate-400 mt-1">
                SmartBank AI Private Demo Edition • Official RBI Portal:{' '}
                <a
                    href="https://www.rbi.org.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4F46E5] font-medium hover:underline"
                >
                  https://www.rbi.org.in/
                </a>
              </p>
            </footer>
          </div>
        </div>

        <ToastStack toasts={toasts} />
      </div>
  );
}

// ============================================================================
// TOAST STACK COMPONENT
// ============================================================================
function ToastStack({ toasts }) {
  if (!toasts.length) return null;
  return (
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-[calc(100vw-2rem)]">
        {toasts.map((t) => (
            <div
                key={t.id}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-medium animate-slide-in-right ${
                    t.type === 'error'
                        ? 'bg-[#2A0B14] text-rose-100 border-rose-500/40'
                        : t.type === 'info'
                            ? 'bg-[#090D16] text-[#E5C77B] border-[#C8A24A]/40'
                            : 'bg-[#06281E] text-emerald-100 border-emerald-500/40'
                }`}
            >
              {t.type === 'error' ? (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : t.type === 'info' ? (
                  <Info className="w-4 h-4 text-[#C8A24A] shrink-0" />
              ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span>{t.message}</span>
            </div>
        ))}
      </div>
  );
}

// ============================================================================
// 1. ULTRA-PREMIUM AUTHENTICATION SCREEN (OBSIDIAN & CHAMPAGNE GOLD)
// ============================================================================
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('aarav.demo@smartbank.edu');
  const [demoPasscode, setDemoPasscode] = useState('demo-access-2026');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid demo email address.');
      return;
    }
    if (mode === 'signup' && name.trim().length < 2) {
      setError('Please enter a fictional demo name.');
      return;
    }
    if (demoPasscode.trim().length < 4) {
      setError('Enter any 4+ character demo code (never use real passwords).');
      return;
    }
    if (mode === 'signup') {
      const cleanFirst = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '') || 'student';
      onLogin({ name: name.trim(), email: email.trim(), upiId: `${cleanFirst}.demo@smartbank` });
    } else {
      onLogin({ email: email.trim() });
    }
  };

  return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-[#090D16]">
        {/* Left Luxury Obsidian Brand Panel */}
        <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-[#090D16] via-[#0F1629] to-[#162038] text-white relative overflow-hidden">
          <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-[#C8A24A]/12 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-[#4F46E5]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 animate-fade-in-up">
            <div className="flex items-center gap-3.5 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C8A24A] via-[#E5C77B] to-[#9E7B2F] flex items-center justify-center shadow-lg shadow-[#C8A24A]/30">
                <Landmark className="w-6 h-6 text-[#090D16]" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight">
                  SmartBank <span className="text-[#E5C77B]">AI</span>
                </div>
                <div className="text-xs text-[#C8A24A] font-medium tracking-wide uppercase">
                  Intelligent RBI-Powered Digital Banking
                </div>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-4">
              Private Banking Elegance Meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C77B] via-[#C8A24A] to-[#818CF8]">
              Grounded RBI AI
            </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed mb-8">
              Experience simulated digital accounts, obsidian-and-gold virtual cards, NEFT/IMPS/RTGS &amp; UPI
              payments, interactive fraud defense, and a conversational AI combining RBI RAG with live expense
              analytics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-lg">
              {[
                { icon: Bot, title: 'RBI RAG + Expense AI', desc: 'Cited RBI rules & live budget/expense mutations' },
                { icon: CreditCard, title: 'Accounts & Cards', desc: 'Simulated balances & luxury virtual card controls' },
                { icon: ArrowLeftRight, title: 'UPI & Rail Simulation', desc: 'Instant VPA, QR & RBI-validated NEFT/RTGS' },
                { icon: ShieldAlert, title: 'Fraud Defense Lab', desc: 'Helpline 1930 & 6-stage interactive scam quiz' }
              ].map((f, idx) => (
                  <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#C8A24A]/40 transition"
                  >
                    <f.icon className="w-5 h-5 text-[#E5C77B] mb-2" />
                    <div className="text-sm font-semibold text-white">{f.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{f.desc}</div>
                  </div>
              ))}
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="relative z-10 mt-8 p-4 rounded-2xl bg-[#C8A24A]/10 border border-[#C8A24A]/35 text-slate-200 text-xs leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 text-[#E5C77B] mb-1">
              <AlertTriangle className="w-4 h-4" /> MANDATORY EDUCATIONAL DISCLAIMER
            </div>
            {DISCLAIMER_TEXT}
          </div>
        </div>

        {/* Right Alabaster Auth Form */}
        <div className="lg:w-1/2 bg-[#F6F8FB] flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-900/8 p-7 sm:p-9 animate-fade-in-scale">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#090D16]">
                  {mode === 'login' ? 'Private Demo Access' : 'Create Demo Profile'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fictional sandbox only — never enter real credentials.
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#C8A24A]/15 text-[#8C6A1D] border border-[#C8A24A]/35">
              Demo
            </span>
            </div>

            {/* 1-Click Demo Login CTA */}
            <button
                type="button"
                onClick={() => onLogin(INITIAL_USER)}
                className="w-full mb-5 py-3.5 px-4 rounded-2xl bg-[#090D16] hover:bg-[#162038] text-[#E5C77B] border border-[#C8A24A]/50 font-bold text-sm shadow-lg shadow-slate-900/15 transition active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C8A24A]" />
              1-Click Demo Login (Aarav Sharma)
            </button>

            <div className="relative flex items-center justify-center my-5">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-xs text-slate-400 font-medium whitespace-nowrap">
              or use sandbox form
            </span>
              <div className="border-t border-slate-200 w-full" />
            </div>

            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 mb-5">
              <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition ${
                      mode === 'login' ? 'bg-white text-[#090D16] shadow-xs' : 'text-slate-500'
                  }`}
              >
                Demo Sign In
              </button>
              <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition ${
                      mode === 'signup' ? 'bg-white text-[#090D16] shadow-xs' : 'text-slate-500'
                  }`}
              >
                Demo Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Fictional Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Ananya Verma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A24A]"
                    />
                  </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Demo Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A24A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Demo Access Code <span className="text-slate-400 font-normal">(Do NOT use real passwords)</span>
                </label>
                <input
                    type="text"
                    value={demoPasscode}
                    onChange={(e) => setDemoPasscode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A24A]"
                />
              </div>

              {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {error}
                  </div>
              )}

              <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-sm transition active:scale-[0.98]"
              >
                {mode === 'login' ? 'Enter SmartBank AI Dashboard' : 'Create Fictional Demo Profile'}
              </button>
            </form>

            <p className="text-[11px] text-slate-400 text-center mt-5">
              No real banking APIs, PINs, CVVs, or OTPs are collected or processed.
            </p>
          </div>
        </div>
      </div>
  );
}

// ============================================================================
// 2. DASHBOARD WITH INTEGRATED TRANSACTIONS & STATEMENTS SUBPART
// ============================================================================
function DashboardModule({ user, accounts, transactions, expenses, subTab, setSubTab, onNavigate, showToast }) {
  const savings = accounts.find((a) => a.id === 'acc-sb') || accounts[0];
  const current = accounts.find((a) => a.id === 'acc-ca') || accounts[1];
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  const totalIncome = expenses.filter((e) => e.type === 'Income').reduce((s, e) => s + Number(e.amount), 0);
  const totalExpense = expenses.filter((e) => e.type === 'Expense').reduce((s, e) => s + Number(e.amount), 0);

  // Transactions Subpart Filter State
  const [search, setSearch] = useState('');
  const [accFilter, setAccFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [catFilter, setCatFilter] = useState('ALL');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [statementOpen, setStatementOpen] = useState(false);

  const trendData = [
    { month: 'Jun', income: 52000, expense: 31000 },
    { month: 'Jul', income: 54000, expense: 34500 },
    { month: 'Aug', income: 58000, expense: 32000 },
    { month: 'Sep', income: 55000, expense: 36800 },
    { month: 'Oct', income: 61000, expense: 35200 },
    { month: 'Nov', income: totalIncome || 63000, expense: totalExpense || 33500 }
  ];

  const categoryData = useMemo(() => {
    const map = {};
    expenses
        .filter((e) => e.type === 'Expense')
        .forEach((e) => {
          map[e.category] = (map[e.category] || 0) + Number(e.amount);
        });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const txCategories = useMemo(() => Array.from(new Set(transactions.map((t) => t.category))), [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (accFilter !== 'ALL' && tx.accountId !== accFilter) return false;
      if (typeFilter !== 'ALL' && tx.type !== typeFilter) return false;
      if (catFilter !== 'ALL' && tx.category !== catFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
            tx.title.toLowerCase().includes(q) ||
            tx.counterparty.toLowerCase().includes(q) ||
            tx.utr.toLowerCase().includes(q) ||
            tx.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [transactions, accFilter, typeFilter, catFilter, search]);

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Account', 'Title', 'Counterparty', 'Type', 'Mode', 'Category', 'Amount (INR)', 'UTR', 'Status'];
    const rows = filteredTransactions.map((t) => [
      t.id,
      t.date,
      t.accountLabel,
      `"${t.title}"`,
      `"${t.counterparty}"`,
      t.type,
      t.mode,
      t.category,
      t.amount,
      t.utr,
      t.status
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmartBank_AI_Demo_Statement_${todayStr()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Demo CSV Statement downloaded!');
  };

  return (
      <div className="space-y-6">
        {/* Luxury Obsidian Hero Banner with Integrated Dashboard Sub-Tabs */}
        <div className="rounded-3xl bg-gradient-to-r from-[#090D16] via-[#0F1629] to-[#162038] text-white p-6 sm:p-7 shadow-xl border border-[#C8A24A]/25 relative overflow-hidden animate-fade-in-up">
          <div className="absolute right-0 top-0 w-72 h-72 bg-[#C8A24A]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#C8A24A]/15 text-[#E5C77B] border border-[#C8A24A]/35 mb-3">
              <UserCheck className="w-3.5 h-3.5" /> {user.kycStatus} • PRIVATE DEMO
            </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back, {user.name}</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Customer ID: <span className="font-mono text-[#E5C77B]">{user.customerId}</span> • Demo UPI:{' '}
                <span className="text-slate-200 font-medium">{user.upiId}</span>
              </p>
            </div>

            {/* Smooth Animated Dashboard Sub-Tab Switcher */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white/8 border border-white/15 backdrop-blur-xs self-start md:self-center">
              <button
                  onClick={() => setSubTab('overview')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] flex items-center gap-2 ${
                      subTab === 'overview'
                          ? 'bg-gradient-to-r from-[#C8A24A] to-[#E5C77B] text-[#090D16] shadow-md'
                          : 'text-slate-300 hover:text-white'
                  }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Overview &amp; Analytics
              </button>
              <button
                  onClick={() => setSubTab('transactions')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] flex items-center gap-2 ${
                      subTab === 'transactions'
                          ? 'bg-gradient-to-r from-[#C8A24A] to-[#E5C77B] text-[#090D16] shadow-md'
                          : 'text-slate-300 hover:text-white'
                  }`}
              >
                <ReceiptText className="w-4 h-4" />
                Transactions &amp; Statements
              </button>
            </div>
          </div>
        </div>

        {/* SUB-TAB 1: OVERVIEW & ANALYTICS */}
        {subTab === 'overview' && (
            <div key="dash-overview" className="space-y-6 animate-tab-reveal">
              {/* Staggered KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="luxury-card luxury-card-hover rounded-2xl p-5 animate-fade-in-up stagger-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Balance</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C8A24A]/15 text-[#8C6A1D]">
                  DEMO DATA
                </span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#090D16] mt-3">{formatINR(totalBalance)}</div>
                  <div className="text-[11px] text-[#059669] font-semibold mt-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Combined Liquidity
                  </div>
                </div>

                <div className="luxury-card luxury-card-hover rounded-2xl p-5 animate-fade-in-up stagger-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Savings Account</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {savings.accountNumber}
                </span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#090D16] mt-3">{formatINR(savings.balance)}</div>
                  <div className="text-[11px] text-slate-500 mt-1.5">{savings.interestRate}% p.a. Demo Yield</div>
                </div>

                <div className="luxury-card luxury-card-hover rounded-2xl p-5 animate-fade-in-up stagger-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Current Account</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {current.accountNumber}
                </span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#090D16] mt-3">{formatINR(current.balance)}</div>
                  <div className="text-[11px] text-slate-500 mt-1.5">Zero-Limit Demo Business</div>
                </div>

                <div className="luxury-card luxury-card-hover rounded-2xl p-5 animate-fade-in-up stagger-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Monthly Spending</span>
                    <span className="p-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5]">
                  <PieChartIcon className="w-4 h-4" />
                </span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#090D16] mt-3">{formatINR(totalExpense)}</div>
                  <div className="text-[11px] text-[#4F46E5] font-semibold mt-1.5">
                    Income {formatINR(totalIncome)} (Demo)
                  </div>
                </div>
              </div>

              {/* Quick Action Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  { label: 'Send Money', sub: 'NEFT / IMPS / RTGS', icon: Send, action: () => onNavigate('transfers'), tone: 'bg-[#090D16] text-[#E5C77B]' },
                  { label: 'UPI Pay', sub: 'Instant VPA & QR', icon: QrCode, action: () => onNavigate('transfers'), tone: 'bg-[#4F46E5]/10 text-[#4F46E5]' },
                  { label: 'Deposit / Cards', sub: 'Manage Demo Funds', icon: Wallet, action: () => onNavigate('accounts'), tone: 'bg-[#059669]/10 text-[#059669]' },
                  { label: 'AI Expense Analysis', sub: 'Ask AI to Analyze', icon: Bot, action: () => onNavigate('assistant'), tone: 'bg-[#C8A24A]/15 text-[#8C6A1D]' }
                ].map((q, idx) => (
                    <button
                        key={idx}
                        onClick={q.action}
                        className="luxury-card luxury-card-hover flex items-center gap-3 p-4 rounded-2xl text-left active:scale-[0.98]"
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${q.tone}`}>
                        <q.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-[#090D16] truncate">{q.label}</div>
                        <div className="text-[11px] text-slate-500 truncate">{q.sub}</div>
                      </div>
                    </button>
                ))}
              </div>

              {/* Interactive Recharts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 luxury-card rounded-3xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-[#090D16] text-sm sm:text-base">Cashflow: Income vs Expense</h3>
                      <p className="text-xs text-slate-500">6-month simulated liquidity trend (Demo Data)</p>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#C8A24A]/12 text-[#8C6A1D]">
                  INR (₹)
                </span>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="goldInc" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#059669" stopOpacity={0.32} />
                            <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="indigoExp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.28} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => `₹${v / 1000}k`} />
                        <Tooltip formatter={(val) => formatINR(val)} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Area type="monotone" dataKey="income" name="Demo Income" stroke="#059669" strokeWidth={2.5} fill="url(#goldInc)" />
                        <Area type="monotone" dataKey="expense" name="Demo Expense" stroke="#4F46E5" strokeWidth={2.5} fill="url(#indigoExp)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="luxury-card rounded-3xl p-5 flex flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-[#090D16] text-sm sm:text-base">Spending by Category</h3>
                      <p className="text-xs text-slate-500">Live demo expenses</p>
                    </div>
                    <button
                        onClick={() => onNavigate('assistant')}
                        className="text-[11px] font-bold text-[#4F46E5] hover:underline"
                    >
                      AI Insights
                    </button>
                  </div>
                  <div className="h-56 w-full flex-1">
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={52}
                                outerRadius={80}
                                paddingAngle={3}
                            >
                              {categoryData.map((_, idx) => (
                                  <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(val) => formatINR(val)} />
                          </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-xs text-slate-400">
                          No expense entries yet.
                        </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                    {categoryData.slice(0, 6).map((c, idx) => (
                        <div key={c.name} className="flex items-center gap-1.5 text-[11px] text-slate-600 truncate">
                    <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                    />
                          <span className="truncate">{c.name}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity Preview -> Jumps smoothly to Transactions Subpart */}
              <div className="luxury-card rounded-3xl overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[#090D16] text-sm sm:text-base">Recent Activity</h3>
                    <p className="text-xs text-slate-500">Click any row for receipt or open the full Transactions subpart</p>
                  </div>
                  <button
                      onClick={() => setSubTab('transactions')}
                      className="px-3.5 py-2 rounded-xl bg-[#090D16] text-[#E5C77B] text-xs font-bold hover:bg-[#162038] transition active:scale-[0.98] flex items-center gap-1.5"
                  >
                    View All Transactions <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {transactions.slice(0, 5).map((tx) => (
                      <button
                          key={tx.id}
                          onClick={() => setSelectedReceipt(tx)}
                          className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/90 transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                  tx.type === 'Credit'
                                      ? 'bg-[#059669]/10 text-[#059669]'
                                      : 'bg-slate-100 text-[#090D16]'
                              }`}
                          >
                            {tx.type === 'Credit' ? (
                                <ArrowDownLeft className="w-4 h-4" />
                            ) : (
                                <ArrowUpRight className="w-4 h-4" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-[#090D16] truncate">{tx.title}</div>
                            <div className="text-xs text-slate-500 truncate">
                              {tx.counterparty} • {tx.mode} • {tx.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div
                              className={`text-sm font-bold ${
                                  tx.type === 'Credit' ? 'text-[#059669]' : 'text-[#090D16]'
                              }`}
                          >
                            {tx.type === 'Credit' ? '+' : '-'}
                            {formatINR(tx.amount)}
                          </div>
                          <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669]">
                      {tx.status}
                    </span>
                        </div>
                      </button>
                  ))}
                </div>
              </div>
            </div>
        )}

        {/* SUB-TAB 2: TRANSACTIONS & STATEMENTS (INTEGRATED SUBPART OF DASHBOARD) */}
        {subTab === 'transactions' && (
            <div key="dash-tx" className="space-y-5 animate-tab-reveal">
              {/* Filter Toolbar */}
              <div className="luxury-card rounded-3xl p-4 sm:p-5 space-y-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search transactions by title, counterparty, UTR, or category..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A24A]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select
                        value={accFilter}
                        onChange={(e) => setAccFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                    >
                      <option value="ALL">All Accounts</option>
                      {accounts.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.accountNumber}
                          </option>
                      ))}
                    </select>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                    >
                      <option value="ALL">Credit &amp; Debit</option>
                      <option value="Credit">Credits Only</option>
                      <option value="Debit">Debits Only</option>
                    </select>
                    <select
                        value={catFilter}
                        onChange={(e) => setCatFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                    >
                      <option value="ALL">All Categories</option>
                      {txCategories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Showing <strong className="text-[#090D16]">{filteredTransactions.length}</strong> demo entries • Click any row for simulated receipt
              </span>
                  <div className="flex gap-2">
                    <button
                        onClick={exportCSV}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white text-xs font-semibold transition active:scale-[0.98]"
                    >
                      <Download className="w-3.5 h-3.5" /> Export CSV
                    </button>
                    <button
                        onClick={() => setStatementOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#090D16] hover:bg-[#162038] text-[#E5C77B] text-xs font-semibold transition active:scale-[0.98]"
                    >
                      <Printer className="w-3.5 h-3.5" /> Printable Statement
                    </button>
                  </div>
                </div>
              </div>

              {/* Clickable Ledger Table */}
              <div className="luxury-card rounded-3xl overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[680px]">
                  <thead>
                  <tr className="bg-slate-50/90 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                    <th className="py-3.5 px-5">Date &amp; Time</th>
                    <th className="py-3.5 px-5">Particulars &amp; UTR</th>
                    <th className="py-3.5 px-5">Category</th>
                    <th className="py-3.5 px-5">Account / Mode</th>
                    <th className="py-3.5 px-5 text-right">Amount</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-xs text-slate-400">
                          No demo transactions match your current filters.
                        </td>
                      </tr>
                  ) : (
                      filteredTransactions.map((tx) => (
                          <tr
                              key={tx.id}
                              onClick={() => setSelectedReceipt(tx)}
                              className="hover:bg-[#C8A24A]/[0.05] cursor-pointer transition"
                          >
                            <td className="py-3.5 px-5 text-xs whitespace-nowrap">
                              <div className="font-semibold text-[#090D16]">{tx.date}</div>
                              <div className="text-[11px] text-slate-400">{tx.time}</div>
                            </td>
                            <td className="py-3.5 px-5">
                              <div className="font-semibold text-[#090D16] text-xs sm:text-sm">{tx.title}</div>
                              <div className="text-[11px] text-slate-500">
                                {tx.counterparty} • <span className="font-mono text-[#4F46E5]">{tx.utr}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-5">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {tx.category}
                        </span>
                            </td>
                            <td className="py-3.5 px-5 text-xs">
                              <div className="font-mono text-slate-700">{tx.accountLabel}</div>
                              <div className="text-[10px] font-bold text-[#8C6A1D]">{tx.mode}</div>
                            </td>
                            <td
                                className={`py-3.5 px-5 text-right font-bold whitespace-nowrap ${
                                    tx.type === 'Credit' ? 'text-[#059669]' : 'text-[#090D16]'
                                }`}
                            >
                              {tx.type === 'Credit' ? '+' : '-'}
                              {formatINR(tx.amount)}
                            </td>
                          </tr>
                      ))
                  )}
                  </tbody>
                </table>
              </div>
            </div>
        )}

        {/* Simulated Transaction Receipt Modal */}
        {selectedReceipt && (
            <div className="fixed inset-0 z-50 bg-[#090D16]/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#C8A24A]/30 space-y-4 animate-fade-in-scale">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#059669]/12 text-[#059669] flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg text-[#090D16]">Simulated Receipt Details</h3>
                  <p className="text-xs text-slate-500">Educational Demo Record • Not a real bank receipt</p>
                </div>
                <div className="bg-[#F6F8FB] rounded-2xl p-4 space-y-2.5 text-xs border border-slate-200/80">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount</span>
                    <span className={`font-extrabold text-sm ${selectedReceipt.type === 'Credit' ? 'text-[#059669]' : 'text-[#090D16]'}`}>
                  {selectedReceipt.type === 'Credit' ? '+' : '-'}
                      {formatINR(selectedReceipt.amount)}
                </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className="font-bold text-[#059669]">{selectedReceipt.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Particulars</span>
                    <span className="font-semibold text-[#090D16] text-right">{selectedReceipt.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Counterparty</span>
                    <span className="font-semibold text-slate-700 text-right">{selectedReceipt.counterparty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account &amp; Mode</span>
                    <span className="font-mono font-semibold text-slate-800">
                  {selectedReceipt.accountLabel} ({selectedReceipt.mode})
                </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">UTR / Ref ID</span>
                    <span className="font-mono font-bold text-[#4F46E5]">{selectedReceipt.utr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timestamp</span>
                    <span className="text-slate-700">
                  {selectedReceipt.date} • {selectedReceipt.time}
                </span>
                  </div>
                </div>
                <button
                    onClick={() => setSelectedReceipt(null)}
                    className="w-full py-2.5 rounded-xl bg-[#090D16] text-[#E5C77B] font-bold text-sm hover:bg-[#162038] transition active:scale-[0.98]"
                >
                  Close Receipt
                </button>
              </div>
            </div>
        )}

        {/* Printable Account Statement Modal */}
        {statementOpen && (
            <div className="fixed inset-0 z-50 bg-[#090D16]/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in-scale">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-[#090D16] text-white">
                  <span className="font-bold text-sm text-[#E5C77B]">SmartBank AI — Printable Demo Statement</span>
                  <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg bg-[#C8A24A] text-[#090D16] text-xs font-bold flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print / PDF
                    </button>
                    <button onClick={() => setStatementOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto space-y-4 text-xs">
                  <div className="flex justify-between items-start border-b pb-4">
                    <div>
                      <div className="text-lg font-extrabold text-[#090D16]">SmartBank AI (DEMO)</div>
                      <div className="text-slate-500">{user.branch}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#090D16]">{user.name}</div>
                      <div className="text-slate-500">{user.customerId}</div>
                      <div className="text-slate-500">Generated: {todayStr()}</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                    {DISCLAIMER_TEXT}
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b text-slate-500">
                      <th className="py-2">Date</th>
                      <th className="py-2">Particulars</th>
                      <th className="py-2">Mode</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map((t) => (
                        <tr key={t.id}>
                          <td className="py-2">{t.date}</td>
                          <td className="py-2">
                            {t.title} ({t.utr})
                          </td>
                          <td className="py-2">{t.mode}</td>
                          <td className="py-2 text-right font-semibold">
                            {t.type === 'Credit' ? '+' : '-'}
                            {formatINR(t.amount)}
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

// ============================================================================
// 3. ACCOUNTS & CARDS MODULE (OBSIDIAN & CHAMPAGNE GOLD VIRTUAL CARDS)
// ============================================================================
function AccountsAndCardsModule({
                                  accounts,
                                  setAccounts,
                                  cards,
                                  setCards,
                                  setTransactions,
                                  user,
                                  showToast,
                                  pushNotification
                                }) {
  const [cashModal, setCashModal] = useState(null);
  const [cashAmount, setCashAmount] = useState('');
  const [cashNote, setCashNote] = useState('');
  const [revealedCardIds, setRevealedCardIds] = useState({});

  const handleCashSubmit = (e) => {
    e.preventDefault();
    const amt = Number(cashAmount);
    if (!amt || amt <= 0) {
      showToast('Enter a valid positive demo amount.', 'error');
      return;
    }
    const acc = accounts.find((a) => a.id === cashModal.accountId);
    if (cashModal.mode === 'Withdraw' && amt > acc.balance) {
      showToast('Insufficient demo balance for withdrawal.', 'error');
      return;
    }
    setAccounts((prev) =>
        prev.map((a) =>
            a.id === acc.id
                ? { ...a, balance: cashModal.mode === 'Deposit' ? a.balance + amt : a.balance - amt }
                : a
        )
    );
    const newTx = {
      id: `TXN-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
      date: todayStr(),
      time: nowTimeStr(),
      accountId: acc.id,
      accountLabel: acc.accountNumber,
      title: cashNote.trim() || `Simulated ${cashModal.mode} (Demo)`,
      counterparty: 'SmartBank Demo Treasury',
      type: cashModal.mode === 'Deposit' ? 'Credit' : 'Debit',
      mode: 'Cash/Demo',
      category: cashModal.mode === 'Deposit' ? 'Freelance / Other' : 'Shopping',
      amount: amt,
      status: 'Completed',
      utr: `CASHDEMO${Date.now().toString().slice(-8)}`
    };
    setTransactions((prev) => [newTx, ...prev]);
    pushNotification(`Demo ${cashModal.mode}: ${formatINR(amt)}`, `${acc.accountNumber} updated.`, 'success');
    showToast(`Simulated ${cashModal.mode} of ${formatINR(amt)} completed!`);
    setCashModal(null);
    setCashAmount('');
    setCashNote('');
  };

  const toggleCardField = (cardId, field, label) => {
    setCards((prev) =>
        prev.map((c) => {
          if (c.id !== cardId) return c;
          const nextVal = !c[field];
          showToast(`${c.kind}: ${label} ${nextVal ? 'Enabled' : 'Disabled'} (Demo)`, 'info');
          return { ...c, [field]: nextVal };
        })
    );
  };

  return (
      <div className="space-y-8">
        {/* Demo Accounts Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#090D16]">Simulated Deposit Accounts</h2>
              <p className="text-xs text-slate-500">Manage fictional Savings &amp; Current demo balances</p>
            </div>
            <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#C8A24A]/15 text-[#8C6A1D]">
            DICGC Info: Up to ₹5L in Real Banks
          </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map((acc, i) => (
                <div
                    key={acc.id}
                    className={`luxury-card luxury-card-hover rounded-3xl p-6 flex flex-col justify-between animate-fade-in-up stagger-${i + 1}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#090D16] text-[#E5C77B]">
                    {acc.type} • DEMO
                  </span>
                      <span className="text-xs font-semibold text-[#059669]">{acc.status}</span>
                    </div>
                    <div className="text-3xl font-extrabold text-[#090D16] mb-1">{formatINR(acc.balance)}</div>
                    <p className="text-xs text-slate-500 mb-5">Available Fictional Balance</p>

                    <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F6F8FB] border border-slate-200/70 text-xs mb-5">
                      <div>
                        <div className="text-slate-400">Account Number</div>
                        <div className="font-mono font-bold text-[#090D16] mt-0.5">{acc.accountNumber}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Demo IFSC</div>
                        <div className="font-mono font-bold text-[#090D16] mt-0.5">{acc.ifsc}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Interest Rate</div>
                        <div className="font-bold text-[#090D16] mt-0.5">{acc.interestRate}% p.a.</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Holder</div>
                        <div className="font-bold text-[#090D16] mt-0.5 truncate">{user.name}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setCashModal({ accountId: acc.id, mode: 'Deposit' })}
                        className="py-2.5 px-4 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition active:scale-[0.98] flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Demo Deposit
                    </button>
                    <button
                        onClick={() => setCashModal({ accountId: acc.id, mode: 'Withdraw' })}
                        className="py-2.5 px-4 rounded-xl bg-[#090D16] hover:bg-[#162038] text-[#E5C77B] font-semibold text-xs sm:text-sm transition active:scale-[0.98] flex items-center justify-center gap-1.5"
                    >
                      <ArrowUpRight className="w-4 h-4" /> Demo Withdraw
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </section>

        {/* Luxury 3D-Styled Virtual Demo Cards */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-[#090D16]">Obsidian &amp; Gold Virtual Cards (Demo)</h2>
            <p className="text-xs text-slate-500">
              RBI Master Direction compliant controls: freeze card, reveal demo number, toggle channels &amp; adjust limits
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cards.map((card) => {
              const revealed = !!revealedCardIds[card.id];
              return (
                  <div key={card.id} className="luxury-card rounded-3xl p-6 space-y-5">
                    {/* 3D Luxury Card Surface */}
                    <div
                        className={`relative rounded-2xl p-6 text-white bg-gradient-to-br ${card.theme} border border-[#C8A24A]/45 shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                            card.frozen ? 'opacity-60 grayscale' : ''
                        }`}
                    >
                      <div className="absolute inset-0 shimmer-gold pointer-events-none opacity-45" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-xs font-bold text-[#E5C77B] tracking-wide">{card.kind}</span>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#C8A24A]/20 text-[#E5C77B] border border-[#C8A24A]/45">
                        DEMO CARD
                      </span>
                        </div>

                        <div className="flex items-center justify-between gap-2 mb-6">
                          <div className="text-base sm:text-lg font-mono tracking-widest text-white">
                            {revealed ? card.demoFullNumber : card.maskedNumber}
                          </div>
                          <button
                              onClick={() =>
                                  setRevealedCardIds((prev) => ({ ...prev, [card.id]: !prev[card.id] }))
                              }
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#E5C77B] transition"
                              title={revealed ? 'Hide Demo Number' : 'Reveal Demo Number'}
                          >
                            {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Card Holder</div>
                            <div className="text-sm font-bold tracking-wide text-white">{card.holder}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Valid Thru</div>
                            <div className="text-sm font-mono font-bold text-[#E5C77B]">{card.expiry}</div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
                          <span>{card.network}</span>
                          <span>{card.linkedAccount}</span>
                        </div>
                      </div>

                      {card.frozen && (
                          <div className="absolute inset-0 bg-[#090D16]/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                      <span className="px-4 py-1.5 rounded-full bg-rose-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> Card Frozen (Demo)
                      </span>
                          </div>
                      )}
                    </div>

                    {/* Card Controls */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F6F8FB] border border-slate-200/70">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                      {card.frozen ? (
                          <Lock className="w-4 h-4 text-[#E11D48]" />
                      ) : (
                          <Unlock className="w-4 h-4 text-[#059669]" />
                      )}
                      Card Status Control
                    </span>
                        <button
                            onClick={() => toggleCardField(card.id, 'frozen', 'Card Freeze')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition active:scale-[0.98] ${
                                card.frozen
                                    ? 'bg-[#059669] text-white hover:bg-emerald-700'
                                    : 'bg-[#E11D48] text-white hover:bg-rose-700'
                            }`}
                        >
                          {card.frozen ? 'Unfreeze Card' : 'Freeze Card'}
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          { key: 'onlineEnabled', label: 'Online', icon: ShoppingBag },
                          { key: 'internationalEnabled', label: 'International', icon: Globe },
                          { key: 'contactlessEnabled', label: 'Contactless', icon: Wifi }
                        ].map((ctrl) => (
                            <button
                                key={ctrl.key}
                                disabled={card.frozen}
                                onClick={() => toggleCardField(card.id, ctrl.key, ctrl.label)}
                                className={`p-3 rounded-xl border text-center transition active:scale-[0.98] disabled:opacity-45 ${
                                    card[ctrl.key]
                                        ? 'bg-[#090D16] border-[#C8A24A]/50 text-[#E5C77B]'
                                        : 'bg-slate-50 border-slate-200 text-slate-500'
                                }`}
                            >
                              <ctrl.icon className="w-4 h-4 mx-auto mb-1" />
                              <div className="text-xs font-bold">{ctrl.label}</div>
                              <div className="text-[10px] opacity-80">{card[ctrl.key] ? 'ACTIVE' : 'OFF'}</div>
                            </button>
                        ))}
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#F6F8FB] border border-slate-200/70">
                        <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-600 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#4F46E5]" /> Simulated Daily Limit
                      </span>
                          <span className="text-[#090D16] font-extrabold">{formatINR(card.dailyLimit)}</span>
                        </div>
                        <input
                            type="range"
                            min={5000}
                            max={card.maxLimit}
                            step={5000}
                            disabled={card.frozen}
                            value={card.dailyLimit}
                            onChange={(e) =>
                                setCards((prev) =>
                                    prev.map((c) => (c.id === card.id ? { ...c, dailyLimit: Number(e.target.value) } : c))
                                )
                            }
                            className="w-full accent-[#C8A24A]"
                        />
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </section>

        {/* Deposit / Withdraw Modal */}
        {cashModal && (
            <div className="fixed inset-0 z-50 bg-[#090D16]/70 backdrop-blur-xs flex items-center justify-center p-4">
              <form
                  onSubmit={handleCashSubmit}
                  className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#C8A24A]/30 space-y-4 animate-fade-in-scale"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#090D16]">Simulated {cashModal.mode} (Demo)</h3>
                  <button type="button" onClick={() => setCashModal(null)} className="p-1.5 rounded-lg hover:bg-slate-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (INR ₹)</label>
                  <input
                      type="number"
                      min="1"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder="e.g., 10000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#C8A24A] focus:outline-none"
                      autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                  <input
                      type="text"
                      value={cashNote}
                      onChange={(e) => setCashNote(e.target.value)}
                      placeholder={`Demo ${cashModal.mode} note`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#C8A24A] focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                      type="button"
                      onClick={() => setCashModal(null)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#090D16] hover:bg-[#162038] text-[#E5C77B] text-sm font-bold transition active:scale-[0.98]"
                  >
                    Confirm {cashModal.mode}
                  </button>
                </div>
              </form>
            </div>
        )}
      </div>
  );
}

// ============================================================================
// 4. TRANSFERS, UPI & BENEFICIARIES MODULE
// ============================================================================
function TransfersAndUpiModule({
                                 accounts,
                                 setAccounts,
                                 beneficiaries,
                                 setBeneficiaries,
                                 setTransactions,
                                 user,
                                 showToast,
                                 pushNotification
                               }) {
  const [subTab, setSubTab] = useState('transfer'); // transfer | upi | beneficiaries

  // Transfer State
  const [fromAccId, setFromAccId] = useState(accounts[0]?.id || 'acc-sb');
  const [transferTarget, setTransferTarget] = useState('beneficiary');
  const [toBenId, setToBenId] = useState(beneficiaries[0]?.id || '');
  const [toOwnAccId, setToOwnAccId] = useState(accounts[1]?.id || 'acc-ca');
  const [transferMode, setTransferMode] = useState('IMPS');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferRemarks, setTransferRemarks] = useState('');
  const [transferLoading, setTransferLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // UPI State
  const [upiAction, setUpiAction] = useState('pay');
  const [upiVpa, setUpiVpa] = useState('priya.demo@smartbank');
  const [upiAmount, setUpiAmount] = useState('');
  const [upiNote, setUpiNote] = useState('');
  const [upiAccountId, setUpiAccountId] = useState(accounts[0]?.id || 'acc-sb');
  const [upiProcessing, setUpiProcessing] = useState(false);

  // Beneficiary CRUD State
  const [benForm, setBenForm] = useState({ name: '', accountNumber: '', ifsc: '', bankName: '', upiId: '' });
  const [editingBenId, setEditingBenId] = useState(null);

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const amt = Number(transferAmount);
    const sourceAcc = accounts.find((a) => a.id === fromAccId);
    if (!sourceAcc) return;
    if (!amt || amt <= 0) return showToast('Enter a valid transfer amount.', 'error');
    if (amt > sourceAcc.balance) return showToast('Insufficient demo balance.', 'error');
    if (transferMode === 'RTGS' && amt < 200000)
      return showToast('RBI Rule: RTGS requires a minimum transfer of ₹2,00,000.', 'error');
    if (transferMode === 'IMPS' && amt > 500000)
      return showToast('RBI Rule: IMPS per-transaction maximum is ₹5,00,000.', 'error');
    if (transferTarget === 'own' && fromAccId === toOwnAccId)
      return showToast('Source and destination accounts must differ.', 'error');

    let destLabel = '';
    if (transferTarget === 'own') {
      const destAcc = accounts.find((a) => a.id === toOwnAccId);
      destLabel = `${destAcc.label} (${destAcc.accountNumber})`;
    } else {
      const ben = beneficiaries.find((b) => b.id === toBenId);
      if (!ben) return showToast('Select a demo beneficiary.', 'error');
      destLabel = `${ben.name} (${ben.accountNumber})`;
    }

    setTransferLoading(true);
    setTimeout(() => {
      const utr = `${transferMode}DEMO${Date.now().toString().slice(-9)}`;
      setAccounts((prev) =>
          prev.map((a) => {
            if (a.id === fromAccId) return { ...a, balance: a.balance - amt };
            if (transferTarget === 'own' && a.id === toOwnAccId) return { ...a, balance: a.balance + amt };
            return a;
          })
      );
      const tx = {
        id: `TXN-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
        date: todayStr(),
        time: nowTimeStr(),
        accountId: sourceAcc.id,
        accountLabel: sourceAcc.accountNumber,
        title: transferRemarks.trim() || `${transferMode} Demo Transfer`,
        counterparty: destLabel,
        type: 'Debit',
        mode: transferMode,
        category: 'Transfer',
        amount: amt,
        status: 'Completed',
        utr
      };
      const ownCredit =
          transferTarget === 'own'
              ? [
                {
                  ...tx,
                  id: `TXN-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
                  accountId: toOwnAccId,
                  accountLabel: accounts.find((a) => a.id === toOwnAccId)?.accountNumber,
                  counterparty: `Self (${sourceAcc.accountNumber})`,
                  type: 'Credit'
                }
              ]
              : [];
      setTransactions((prev) => [tx, ...ownCredit, ...prev]);
      setReceipt({ ...tx, fromAccount: sourceAcc.accountNumber });
      pushNotification(`${transferMode} Demo Transfer Sent`, `${formatINR(amt)} to ${destLabel}`, 'success');
      showToast(`${transferMode} simulation of ${formatINR(amt)} completed!`);
      setTransferAmount('');
      setTransferRemarks('');
      setTransferLoading(false);
    }, 800);
  };

  const handleUpiSubmit = (e) => {
    e.preventDefault();
    const amt = Number(upiAmount);
    if (!upiVpa.includes('@')) return showToast('Enter a valid fictional UPI ID (e.g., priya.demo@smartbank).', 'error');
    if (!amt || amt <= 0 || amt > 100000) return showToast('Enter a valid demo UPI amount (₹1 to ₹1,00,000).', 'error');
    const acc = accounts.find((a) => a.id === upiAccountId);
    if (upiAction === 'pay' && amt > acc.balance) return showToast('Insufficient demo balance.', 'error');

    setUpiProcessing(true);
    setTimeout(() => {
      const utr = `UPIDEMO${Date.now().toString().slice(-9)}`;
      if (upiAction === 'pay') {
        setAccounts((prev) => prev.map((a) => (a.id === acc.id ? { ...a, balance: a.balance - amt } : a)));
        const tx = {
          id: `TXN-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
          date: todayStr(),
          time: nowTimeStr(),
          accountId: acc.id,
          accountLabel: acc.accountNumber,
          title: upiNote.trim() || `UPI Pay to ${upiVpa}`,
          counterparty: upiVpa,
          type: 'Debit',
          mode: 'UPI',
          category: 'Shopping',
          amount: amt,
          status: 'Completed',
          utr
        };
        setTransactions((prev) => [tx, ...prev]);
        setReceipt({ ...tx, fromAccount: acc.accountNumber });
        showToast(`Demo UPI Payment of ${formatINR(amt)} sent! UTR: ${utr}`);
        pushNotification('UPI Demo Payment Sent', `${formatINR(amt)} to ${upiVpa}`, 'success');
      } else {
        showToast(`Simulated UPI Collect Request for ${formatINR(amt)} sent to ${upiVpa}`, 'info');
        pushNotification('UPI Collect Request Sent (Demo)', `Requested ${formatINR(amt)} from ${upiVpa}`, 'info');
      }
      setUpiAmount('');
      setUpiNote('');
      setUpiProcessing(false);
    }, 650);
  };

  const handleBenSubmit = (e) => {
    e.preventDefault();
    if (!benForm.name.trim() || !benForm.accountNumber.trim() || !benForm.ifsc.trim()) {
      return showToast('Please fill Name, Demo Account Number, and Fictional IFSC.', 'error');
    }
    if (editingBenId) {
      setBeneficiaries((prev) => prev.map((b) => (b.id === editingBenId ? { ...b, ...benForm } : b)));
      showToast('Demo beneficiary updated.');
      setEditingBenId(null);
    } else {
      setBeneficiaries((prev) => [
        ...prev,
        { id: `ben-${Date.now()}`, ...benForm, bankName: benForm.bankName || 'Demo Bank India' }
      ]);
      showToast('Demo beneficiary added.');
    }
    setBenForm({ name: '', accountNumber: '', ifsc: '', bankName: '', upiId: '' });
  };

  return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-900/8 shadow-xs">
          {[
            { id: 'transfer', label: 'NEFT / IMPS / RTGS', icon: ArrowLeftRight },
            { id: 'upi', label: 'UPI Simulation', icon: QrCode },
            { id: 'beneficiaries', label: 'Beneficiaries', icon: UserCheck }
          ].map((t) => (
              <button
                  key={t.id}
                  onClick={() => setSubTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition active:scale-[0.98] ${
                      subTab === t.id ? 'bg-[#090D16] text-[#E5C77B] shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
          ))}
        </div>

        {/* NEFT / IMPS / RTGS */}
        {subTab === 'transfer' && (
            <div key="tr-rail" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-tab-reveal">
              <form onSubmit={handleTransferSubmit} className="lg:col-span-2 luxury-card rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#090D16] text-base">Simulated Fund Transfer</h3>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#C8A24A]/15 text-[#8C6A1D]">
                Sandbox Simulation
              </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">From Demo Account</label>
                    <select
                        value={fromAccId}
                        onChange={(e) => setFromAccId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                    >
                      {accounts.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.accountNumber} ({formatINR(a.balance)})
                          </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Type</label>
                    <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100">
                      {['beneficiary', 'own'].map((t) => (
                          <button
                              key={t}
                              type="button"
                              onClick={() => setTransferTarget(t)}
                              className={`py-1.5 text-xs font-semibold rounded-lg capitalize ${
                                  transferTarget === t ? 'bg-white text-[#090D16] shadow-xs' : 'text-slate-500'
                              }`}
                          >
                            {t === 'own' ? 'Own Account' : 'Beneficiary'}
                          </button>
                      ))}
                    </div>
                  </div>
                </div>

                {transferTarget === 'beneficiary' ? (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Select Demo Beneficiary</label>
                      <select
                          value={toBenId}
                          onChange={(e) => setToBenId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                      >
                        {beneficiaries.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.name} — {b.accountNumber} ({b.bankName})
                            </option>
                        ))}
                      </select>
                    </div>
                ) : (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Demo Account</label>
                      <select
                          value={toOwnAccId}
                          onChange={(e) => setToOwnAccId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                      >
                        {accounts.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.label} — {a.accountNumber} ({formatINR(a.balance)})
                            </option>
                        ))}
                      </select>
                    </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Payment Rail (RBI Rules Enforced)</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'IMPS', desc: 'Instant • Max ₹5L' },
                      { id: 'NEFT', desc: '24x7 • Any Amount' },
                      { id: 'RTGS', desc: 'Instant • Min ₹2L' }
                    ].map((m) => (
                        <button
                            type="button"
                            key={m.id}
                            onClick={() => setTransferMode(m.id)}
                            className={`p-3 rounded-xl border text-left transition active:scale-[0.98] ${
                                transferMode === m.id
                                    ? 'border-[#C8A24A] bg-[#090D16] text-white'
                                    : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                            }`}
                        >
                          <div className={`text-xs font-bold ${transferMode === m.id ? 'text-[#E5C77B]' : ''}`}>{m.id}</div>
                          <div className={`text-[11px] ${transferMode === m.id ? 'text-slate-300' : 'text-slate-500'}`}>
                            {m.desc}
                          </div>
                        </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (INR ₹)</label>
                    <input
                        type="number"
                        min="1"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder={transferMode === 'RTGS' ? 'Min 200000' : 'e.g., 5000'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Remarks</label>
                    <input
                        type="text"
                        value={transferRemarks}
                        onChange={(e) => setTransferRemarks(e.target.value)}
                        placeholder="e.g., Team split"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <button
                    type="submit"
                    disabled={transferLoading}
                    className="w-full py-3 rounded-xl bg-[#090D16] hover:bg-[#162038] text-[#E5C77B] border border-[#C8A24A]/40 font-bold text-sm disabled:opacity-60 transition active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {transferLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Processing Demo {transferMode}...
                      </>
                  ) : (
                      <>
                        <Send className="w-4 h-4" /> Simulate {transferMode} Transfer
                      </>
                  )}
                </button>
              </form>

              <div className="bg-[#090D16] text-slate-200 rounded-3xl p-6 border border-[#C8A24A]/25 space-y-4">
                <div className="flex items-center gap-2 text-[#E5C77B] font-bold text-sm">
                  <Info className="w-4 h-4" /> RBI Payment Rail Guidelines
                </div>
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white">NEFT (24x7x365)</div>
                    <p className="text-slate-400 mt-0.5">No RBI minimum or maximum limit. Online NEFT is free for savings accounts.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white">IMPS (Instant 24x7)</div>
                    <p className="text-slate-400 mt-0.5">Real-time transfer capped at ₹5,00,000 per transaction under RBI guidelines.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white">RTGS (High Value 24x7)</div>
                    <p className="text-slate-400 mt-0.5">Mandatory ₹2,00,000 minimum threshold with no upper ceiling.</p>
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* UPI SIMULATION */}
        {subTab === 'upi' && (
            <div key="tr-upi" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-tab-reveal">
              <form onSubmit={handleUpiSubmit} className="lg:col-span-2 luxury-card rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#090D16] text-base">UPI Payment Simulation</h3>
                  <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100">
                    {['pay', 'request'].map((act) => (
                        <button
                            key={act}
                            type="button"
                            onClick={() => setUpiAction(act)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                                upiAction === act ? 'bg-white text-[#090D16] shadow-xs' : 'text-slate-500'
                            }`}
                        >
                          {act === 'pay' ? 'Pay Money' : 'Request Money'}
                        </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['priya.demo@smartbank', 'metro.demo@okdemo', 'hostel.demo@smartbank', 'rohan.demo@okdemo'].map((vpa) => (
                      <button
                          type="button"
                          key={vpa}
                          onClick={() => setUpiVpa(vpa)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition ${
                              upiVpa === vpa
                                  ? 'bg-[#090D16] border-[#C8A24A] text-[#E5C77B] font-semibold'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                      >
                        {vpa}
                      </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Fictional UPI ID</label>
                    <input
                        type="text"
                        value={upiVpa}
                        onChange={(e) => setUpiVpa(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Linked Demo Account</label>
                    <select
                        value={upiAccountId}
                        onChange={(e) => setUpiAccountId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                    >
                      {accounts.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.accountNumber} ({formatINR(a.balance)})
                          </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (INR ₹)</label>
                    <input
                        type="number"
                        min="1"
                        max="100000"
                        value={upiAmount}
                        onChange={(e) => setUpiAmount(e.target.value)}
                        placeholder="e.g., 450"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Note</label>
                    <input
                        type="text"
                        value={upiNote}
                        onChange={(e) => setUpiNote(e.target.value)}
                        placeholder="e.g., Coffee split"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#C8A24A]/10 border border-[#C8A24A]/30 text-xs text-[#6B5014] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#C8A24A] shrink-0" />
                  <span>Demo Safety: No real UPI PIN is collected. RBI reminds users: UPI PIN is ONLY for sending money.</span>
                </div>

                <button
                    type="submit"
                    disabled={upiProcessing}
                    className="w-full py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-sm transition active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {upiProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Simulating Instant UPI...
                      </>
                  ) : (
                      <>
                        <QrCode className="w-4 h-4" />{' '}
                        {upiAction === 'pay' ? 'Simulate Instant UPI Pay' : 'Send Demo Collect Request'}
                      </>
                  )}
                </button>
              </form>

              <div className="luxury-card rounded-3xl p-6 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#090D16] text-[#E5C77B] mb-3">
              YOUR DEMO UPI QR
            </span>
                <div className="p-4 rounded-2xl bg-[#090D16] border border-[#C8A24A]/40 shadow-lg mb-3">
                  <svg viewBox="0 0 100 100" className="w-36 h-36">
                    <rect width="100" height="100" fill="#ffffff" rx="6" />
                    <rect x="8" y="8" width="24" height="24" fill="#090D16" rx="3" />
                    <rect x="13" y="13" width="14" height="14" fill="#ffffff" rx="1" />
                    <rect x="16" y="16" width="8" height="8" fill="#C8A24A" />
                    <rect x="68" y="8" width="24" height="24" fill="#090D16" rx="3" />
                    <rect x="73" y="13" width="14" height="14" fill="#ffffff" rx="1" />
                    <rect x="76" y="16" width="8" height="8" fill="#4F46E5" />
                    <rect x="8" y="68" width="24" height="24" fill="#090D16" rx="3" />
                    <rect x="13" y="73" width="14" height="14" fill="#ffffff" rx="1" />
                    <rect x="16" y="76" width="8" height="8" fill="#C8A24A" />
                    <rect x="34" y="40" width="32" height="20" fill="#090D16" rx="3" />
                    <text x="50" y="53" textAnchor="middle" fill="#E5C77B" fontSize="9" fontWeight="bold">
                      DEMO
                    </text>
                    <rect x="40" y="12" width="18" height="6" fill="#090D16" />
                    <rect x="40" y="24" width="14" height="6" fill="#090D16" />
                    <rect x="12" y="42" width="14" height="6" fill="#090D16" />
                    <rect x="74" y="42" width="16" height="10" fill="#090D16" />
                    <rect x="40" y="68" width="12" height="12" fill="#090D16" />
                    <rect x="58" y="72" width="14" height="8" fill="#090D16" />
                    <rect x="78" y="70" width="12" height="20" fill="#090D16" />
                  </svg>
                </div>
                <div className="font-bold text-sm text-[#090D16]">{user.name}</div>
                <div className="text-xs font-mono text-[#4F46E5] bg-[#4F46E5]/10 px-3 py-1 rounded-full mt-1">
                  {user.upiId}
                </div>
              </div>
            </div>
        )}

        {/* BENEFICIARIES */}
        {subTab === 'beneficiaries' && (
            <div key="tr-ben" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-tab-reveal">
              <form onSubmit={handleBenSubmit} className="luxury-card rounded-3xl p-6 space-y-3.5 h-fit">
                <h3 className="font-bold text-[#090D16] text-base">
                  {editingBenId ? 'Edit Demo Beneficiary' : 'Add Demo Beneficiary'}
                </h3>
                <input
                    type="text"
                    value={benForm.name}
                    onChange={(e) => setBenForm({ ...benForm, name: e.target.value })}
                    placeholder="Fictional Name (e.g., Kabir Singh)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
                <input
                    type="text"
                    value={benForm.accountNumber}
                    onChange={(e) => setBenForm({ ...benForm, accountNumber: e.target.value })}
                    placeholder="Demo Account No. (SB-DEMO-5520)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
                <input
                    type="text"
                    value={benForm.ifsc}
                    onChange={(e) => setBenForm({ ...benForm, ifsc: e.target.value.toUpperCase() })}
                    placeholder="Fictional IFSC (DEMO0004412)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
                <input
                    type="text"
                    value={benForm.bankName}
                    onChange={(e) => setBenForm({ ...benForm, bankName: e.target.value })}
                    placeholder="Demo Bank Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
                <div className="flex gap-2">
                  <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#090D16] text-[#E5C77B] font-bold text-xs hover:bg-[#162038] transition active:scale-[0.98]"
                  >
                    {editingBenId ? 'Save Changes' : 'Add Beneficiary'}
                  </button>
                  {editingBenId && (
                      <button
                          type="button"
                          onClick={() => {
                            setEditingBenId(null);
                            setBenForm({ name: '', accountNumber: '', ifsc: '', bankName: '', upiId: '' });
                          }}
                          className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs"
                      >
                        Cancel
                      </button>
                  )}
                </div>
              </form>

              <div className="lg:col-span-2 luxury-card rounded-3xl overflow-hidden">
                <div className="p-5 border-b border-slate-100 font-bold text-[#090D16]">
                  Saved Demo Beneficiaries ({beneficiaries.length})
                </div>
                <div className="divide-y divide-slate-100">
                  {beneficiaries.map((b) => (
                      <div key={b.id} className="p-4 sm:px-5 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-[#090D16]">{b.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {b.accountNumber} • IFSC: {b.ifsc} • {b.bankName}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                              onClick={() => {
                                setEditingBenId(b.id);
                                setBenForm({
                                  name: b.name,
                                  accountNumber: b.accountNumber,
                                  ifsc: b.ifsc,
                                  bankName: b.bankName,
                                  upiId: b.upiId || ''
                                });
                              }}
                              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-[#4F46E5]"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                              onClick={() => {
                                setBeneficiaries((prev) => prev.filter((item) => item.id !== b.id));
                                showToast('Demo beneficiary removed.', 'info');
                              }}
                              className="p-2 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-[#E11D48]"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        )}

        {/* Simulated Transfer Receipt Modal */}
        {receipt && (
            <div className="fixed inset-0 z-50 bg-[#090D16]/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#C8A24A]/35 space-y-4 animate-fade-in-scale">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#059669]/12 text-[#059669] flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg text-[#090D16]">Demo Transfer Confirmed</h3>
                  <p className="text-xs text-slate-500">Simulated UTR generated • No real money moved</p>
                </div>
                <div className="bg-[#F6F8FB] rounded-2xl p-4 space-y-2 text-xs border border-slate-200/80">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount</span>
                    <span className="font-extrabold text-[#090D16] text-sm">{formatINR(receipt.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mode</span>
                    <span className="font-bold text-[#8C6A1D]">{receipt.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">To</span>
                    <span className="font-semibold text-[#090D16] text-right">{receipt.counterparty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Simulated UTR</span>
                    <span className="font-mono font-bold text-[#4F46E5]">{receipt.utr}</span>
                  </div>
                </div>
                <button
                    onClick={() => setReceipt(null)}
                    className="w-full py-2.5 rounded-xl bg-[#090D16] text-[#E5C77B] font-bold text-sm"
                >
                  Done
                </button>
              </div>
            </div>
        )}
      </div>
  );
}

// ============================================================================
// 5. AI ASSISTANT (RBI-POWERED RAG + FULL AI EXPENSE ANALYZER)
// ============================================================================
function AIAssistantModule({
                             rbiDocs,
                             chatMessages,
                             setChatMessages,
                             language,
                             setLanguage,
                             accounts,
                             expenses,
                             setExpenses,
                             budgets,
                             setBudgets,
                             showToast,
                             onNavigateKnowledge
                           }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [openInspectorId, setOpenInspectorId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, loading]);

  const expensePrompts = [
    'Analyze my monthly spending',
    'Add ₹1,200 Food expense for Zomato',
    'Change Shopping budget to ₹7,000',
    'Delete my last expense'
  ];

  const rbiPrompts =
      language === 'hi'
          ? [
            'हिन्दी में NEFT और RTGS का अंतर बताएं',
            'अनधिकृत UPI फ्रॉड होने पर RBI के नियम क्या हैं?',
            'UPI से पैसे कट गए लेकिन रिफंड नहीं आया—RBI जुर्माना?'
          ]
          : [
            "What is RBI's zero liability rule for unauthorized transactions?",
            'Explain UPI failed transaction auto-reversal TAT',
            'How much bank deposit is insured by DICGC?'
          ];

  const handleSend = async (customText) => {
    const query = (customText ?? input).trim();
    if (!query || loading) return;

    const userMsg = { id: `u-${Date.now()}`, role: 'user', text: query };
    setChatMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // 1. Check if this is an Expense Analyzer / Budgeting AI command (read or write!)
    const expenseResult = processExpenseAICommand(
        query,
        expenses,
        setExpenses,
        budgets,
        setBudgets,
        language,
        showToast
    );

    if (expenseResult.handled) {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: expenseResult.text,
            mode: expenseResult.mode,
            expenseCard: expenseResult.expenseCard,
            citations: [],
            retrieved: [],
            followUps: ['Add ₹500 Transport expense', 'Change Food & Dining budget to ₹10,000']
          }
        ]);
        setLoading(false);
      }, 420);
      return;
    }

    // 2. Otherwise run RBI-Powered RAG Retrieval + Gemini API
    const retrieved = retrieveRBIChunks(query, rbiDocs, 4);
    const totalBal = accounts.reduce((s, a) => s + a.balance, 0);
    const snap = buildExpenseSnapshot(expenses, budgets);
    const demoContext = `Total Demo Balance: ${formatINR(totalBal)}, Income: ${formatINR(snap.totalIncome)}, Expense: ${formatINR(snap.totalExpense)}, Savings Rate: ${snap.savingsRate}%`;

    const { text, mode } = await queryGeminiWithRAG({
      query,
      retrieved,
      history: chatMessages,
      language,
      demoContext
    });

    const seen = new Set();
    const citations = [];
    for (const r of retrieved) {
      if (!seen.has(r.chunk.docId)) {
        seen.add(r.chunk.docId);
        citations.push({
          docId: r.chunk.docId,
          title: r.chunk.title,
          circularRef: r.chunk.circularRef,
          section: r.chunk.section,
          date: r.chunk.date,
          status: r.chunk.status,
          officialUrl: r.chunk.officialUrl,
          score: r.score
        });
      }
    }

    setChatMessages((prev) => [
      ...prev,
      {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text,
        citations,
        retrieved,
        mode,
        followUps:
            language === 'hi'
                ? ['RBI Ombudsman में शिकायत कैसे करें?', 'मेरा मासिक खर्च और बजट बताएं']
                : ['How do I escalate to RBI Ombudsman?', 'Analyze my monthly spending']
      }
    ]);
    setLoading(false);
  };

  const totalChunksCount = useMemo(() => rbiDocs.flatMap(chunkRBIDocument).length, [rbiDocs]);

  return (
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Main Conversational Panel */}
        <div className="xl:col-span-3 luxury-card rounded-3xl flex flex-col h-[75vh] min-h-[540px] overflow-hidden">
          {/* Obsidian Chat Header */}
          <div className="px-5 py-3.5 bg-[#090D16] text-white flex flex-wrap items-center justify-between gap-2 border-b border-[#C8A24A]/25">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8A24A] to-[#9E7B2F] flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-[#090D16]" />
              </div>
              <div>
                <div className="font-bold text-sm flex flex-wrap items-center gap-2">
                  SmartBank AI Assistant
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C8A24A]/20 text-[#E5C77B] border border-[#C8A24A]/35">
                  RBI RAG ({rbiDocs.length} Docs / {totalChunksCount} Chunks) + Expense AI
                </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Grounded RBI Regulations &amp; Live Demo Expense Management (Not Official RBI)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-[#E5C77B] flex items-center gap-1"
              >
                <Languages className="w-3.5 h-3.5" />
                {language === 'en' ? 'English' : 'हिन्दी'}
              </button>
              <button
                  onClick={() =>
                      setChatMessages([
                        {
                          id: `clr-${Date.now()}`,
                          role: 'assistant',
                          text:
                              language === 'hi'
                                  ? 'चैट साफ़ हो गई है! आप RBI नियम पूछ सकते हैं या अपना डेमो खर्च/बजट मैनेज कर सकते हैं।'
                                  : 'Chat cleared! Ask me any RBI regulation question or say "Analyze my monthly spending".',
                          citations: [],
                          retrieved: [],
                          mode: 'System',
                          followUps: ['Analyze my monthly spending', 'Explain UPI failed transaction auto-reversal TAT']
                        }
                      ])
                  }
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-300"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#F6F8FB]">
            {chatMessages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex animate-fade-in-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                      className={`max-w-[94%] sm:max-w-[84%] rounded-2xl p-4 shadow-xs ${
                          msg.role === 'user'
                              ? 'bg-[#090D16] text-white border border-[#C8A24A]/30 rounded-br-xs'
                              : 'bg-white border border-slate-900/8 text-slate-800 rounded-bl-xs'
                      }`}
                  >
                    {/* Mode & RAG Inspector Bar */}
                    {msg.role === 'assistant' && msg.mode && msg.mode !== 'System' && (
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#C8A24A]/15 text-[#8C6A1D] border border-[#C8A24A]/30">
                      <Sparkles className="w-3 h-3" /> {msg.mode}
                      {msg.citations?.length > 0 ? ` • ${msg.citations.length} RBI Sources` : ''}
                    </span>
                          {msg.retrieved && msg.retrieved.length > 0 && (
                              <button
                                  onClick={() => setOpenInspectorId(openInspectorId === msg.id ? null : msg.id)}
                                  className="text-[11px] font-bold text-[#4F46E5] hover:underline flex items-center gap-1"
                              >
                                <Layers className="w-3 h-3" />
                                {openInspectorId === msg.id ? 'Hide RAG Inspector' : 'RAG Pipeline Inspector'}
                              </button>
                          )}
                        </div>
                    )}

                    {/* Formatted Text */}
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {msg.text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                          part.startsWith('**') && part.endsWith('**') ? (
                              <strong key={i} className={msg.role === 'user' ? 'text-[#E5C77B]' : 'text-[#090D16]'}>
                                {part.slice(2, -2)}
                              </strong>
                          ) : (
                              <span key={i}>{part}</span>
                          )
                      )}
                    </div>

                    {/* Inline Visual AI Spending Breakdown Card */}
                    {msg.expenseCard && (
                        <div className="mt-3.5 p-4 rounded-2xl bg-[#090D16] text-white border border-[#C8A24A]/35 space-y-3 animate-fade-in-scale">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                      <span className="text-xs font-bold text-[#E5C77B] flex items-center gap-1.5">
                        <PieChartIcon className="w-3.5 h-3.5" /> {msg.expenseCard.actionBadge}
                      </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#059669]/20 text-emerald-300">
                        Savings Rate: {msg.expenseCard.savingsRate}%
                      </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 rounded-xl bg-white/5">
                              <div className="text-[10px] text-slate-400">Income</div>
                              <div className="text-xs sm:text-sm font-bold text-emerald-400">
                                {formatINR(msg.expenseCard.totalIncome)}
                              </div>
                            </div>
                            <div className="p-2 rounded-xl bg-white/5">
                              <div className="text-[10px] text-slate-400">Expenses</div>
                              <div className="text-xs sm:text-sm font-bold text-rose-400">
                                {formatINR(msg.expenseCard.totalExpense)}
                              </div>
                            </div>
                            <div className="p-2 rounded-xl bg-white/5">
                              <div className="text-[10px] text-slate-400">Net Saved</div>
                              <div className="text-xs sm:text-sm font-bold text-[#E5C77B]">
                                {formatINR(msg.expenseCard.netSavings)}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 pt-1">
                            {msg.expenseCard.categories.slice(0, 6).map((c) => (
                                <div key={c.category} className="space-y-1">
                                  <div className="flex justify-between text-[11px]">
                                    <span className="text-slate-200 font-medium">{c.category}</span>
                                    <span className={c.over ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                              {formatINR(c.spent)} {c.budget > 0 ? `/ ${formatINR(c.budget)}` : ''}
                            </span>
                                  </div>
                                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${
                                            c.over ? 'bg-[#E11D48]' : 'bg-gradient-to-r from-[#C8A24A] to-[#E5C77B]'
                                        }`}
                                        style={{ width: `${c.pct}%` }}
                                    />
                                  </div>
                                </div>
                            ))}
                          </div>
                        </div>
                    )}

                    {/* Official RBI Citations */}
                    {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Official RBI Citations
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {msg.citations.map((cit) => (
                                <a
                                    key={cit.docId}
                                    href={cit.officialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl bg-[#F6F8FB] hover:bg-[#C8A24A]/10 border border-slate-200/80 hover:border-[#C8A24A]/50 transition block"
                                >
                                  <div className="flex items-center justify-between gap-1">
                            <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    cit.status === 'Active'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-800'
                                }`}
                            >
                              {cit.status}
                            </span>
                                    <ExternalLink className="w-3 h-3 text-[#4F46E5] shrink-0" />
                                  </div>
                                  <div className="text-xs font-bold text-[#090D16] mt-1 line-clamp-2">{cit.title}</div>
                                  <div className="text-[10px] text-slate-500 mt-0.5">
                                    {cit.circularRef} • {cit.date}
                                  </div>
                                </a>
                            ))}
                          </div>
                        </div>
                    )}

                    {/* Expandable RAG Pipeline Inspector */}
                    {openInspectorId === msg.id && msg.retrieved && (
                        <div className="mt-3 p-3.5 rounded-2xl bg-[#090D16] text-slate-200 text-xs space-y-2.5 animate-fade-in-scale border border-[#C8A24A]/30">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-bold text-[#E5C77B] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" /> RAG Pipeline Inspector (Query → Chunks → Scores)
                      </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        Grounded
                      </span>
                          </div>
                          {msg.retrieved.map((r, idx) => (
                              <div key={r.chunk.chunkId} className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] mb-1">
                          <span className="font-mono text-[#E5C77B] font-bold">
                            #{idx + 1} {r.chunk.chunkId} ({r.chunk.status})
                          </span>
                                  <span className="text-indigo-300 font-semibold">Similarity Score: {r.score}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 mb-1">
                                  Matched Terms: {r.matchedTerms.join(', ') || 'semantic match'}
                                </div>
                                <p className="text-[11px] text-slate-300 leading-relaxed">{r.chunk.text}</p>
                              </div>
                          ))}
                        </div>
                    )}

                    {/* Follow-Up Suggestion Chips */}
                    {msg.role === 'assistant' && msg.followUps && msg.followUps.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {msg.followUps.map((f, i) => (
                              <button
                                  key={i}
                                  onClick={() => handleSend(f)}
                                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#4F46E5]/8 hover:bg-[#4F46E5]/15 text-[#4F46E5] border border-[#4F46E5]/20 font-medium transition active:scale-[0.98]"
                              >
                                {f}
                              </button>
                          ))}
                        </div>
                    )}
                  </div>
                </div>
            ))}

            {/* Animated Typing Indicator */}
            {loading && (
                <div className="flex justify-start animate-fade-in-up">
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-600 flex items-center gap-2.5 shadow-xs">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#C8A24A] typing-dot" />
                      <span className="w-2 h-2 rounded-full bg-[#4F46E5] typing-dot" />
                      <span className="w-2 h-2 rounded-full bg-[#059669] typing-dot" />
                    </div>
                    <span>Analyzing RBI Knowledge Base &amp; live demo finances...</span>
                  </div>
                </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Chat Input Bar */}
          <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3.5 bg-white border-t border-slate-200/80 flex items-center gap-2"
          >
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === 'hi'
                      ? 'RBI नियम पूछें या लिखें "Add ₹850 Food expense"...'
                      : 'Ask RBI rules or command "Add ₹850 Food expense", "Analyze my spending"...'
                }
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A24A]"
            />
            <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#090D16] hover:bg-[#162038] text-[#E5C77B] border border-[#C8A24A]/40 font-bold text-sm disabled:opacity-50 transition active:scale-[0.98] flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>

        {/* Right Quick-Prompt Controls */}
        <div className="space-y-4">
          <div className="luxury-card rounded-2xl p-4 space-y-2.5">
            <div className="font-bold text-[11px] uppercase tracking-wider text-[#8C6A1D] flex items-center gap-1.5">
              <PieChartIcon className="w-3.5 h-3.5 text-[#C8A24A]" /> AI Expense Commands
            </div>
            <div className="space-y-2">
              {expensePrompts.map((p, idx) => (
                  <button
                      key={idx}
                      onClick={() => handleSend(p)}
                      className="w-full text-left p-2.5 rounded-xl bg-[#F6F8FB] hover:bg-[#C8A24A]/12 border border-slate-200/80 hover:border-[#C8A24A]/50 text-xs text-slate-800 font-medium transition active:scale-[0.98]"
                  >
                    {p}
                  </button>
              ))}
            </div>
          </div>

          <div className="luxury-card rounded-2xl p-4 space-y-2.5">
            <div className="font-bold text-[11px] uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> RBI RAG Questions
            </div>
            <div className="space-y-2">
              {rbiPrompts.map((p, idx) => (
                  <button
                      key={idx}
                      onClick={() => handleSend(p)}
                      className="w-full text-left p-2.5 rounded-xl bg-[#F6F8FB] hover:bg-[#4F46E5]/8 border border-slate-200/80 hover:border-[#4F46E5]/40 text-xs text-slate-800 font-medium transition active:scale-[0.98]"
                  >
                    {p}
                  </button>
              ))}
            </div>
            <button
                onClick={onNavigateKnowledge}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-[#090D16] text-[#E5C77B] text-xs font-bold hover:bg-[#162038] transition flex items-center justify-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" /> Manage RBI Knowledge Base
            </button>
          </div>
        </div>
      </div>
  );
}

// ============================================================================
// 6. FRAUD AWARENESS CENTER & INTERACTIVE SCAM QUIZ
// ============================================================================
function FraudAwarenessModule({ showToast }) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = FRAUD_QUIZ[quizIndex];

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
      showToast('Correct! Safe banking instinct.', 'success');
    } else {
      showToast('Watch out! Read the RBI safety explanation below.', 'error');
    }
  };

  return (
      <div className="space-y-6">
        {/* Helpline 1930 Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#2A0B14] via-[#090D16] to-[#162038] text-white p-6 border border-[#C8A24A]/25 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
          <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> RBI KEHTA HAI • CYBER SAFETY
          </span>
            <h2 className="text-xl sm:text-2xl font-bold">Report Financial Cyber Fraud Immediately</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Reporting within the Golden Hour helps freeze fraudulent money trails and preserves your RBI Zero Liability protection.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-[#C8A24A]/35 text-center">
              <div className="text-[10px] uppercase text-[#E5C77B] font-bold">National Helpline</div>
              <div className="text-xl font-extrabold tracking-wider flex items-center justify-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#E5C77B]" /> 1930
              </div>
            </div>
            <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-[#C8A24A] hover:bg-[#E5C77B] text-[#090D16] font-bold text-xs flex items-center gap-1.5 transition"
            >
              cybercrime.gov.in <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Educational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FRAUD_MODULES.map((m, idx) => (
              <div key={m.id} className={`luxury-card luxury-card-hover rounded-3xl p-5 space-y-3 animate-fade-in-up stagger-${idx + 1}`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-[#090D16] text-sm sm:text-base">{m.title}</h3>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#E11D48] border border-rose-200">
                {m.risk}
              </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/70">
                    <div className="font-bold text-[#059669] mb-1">Do&apos;s</div>
                    {m.dos.map((d, i) => (
                        <div key={i} className="text-emerald-950">• {d}</div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200/70">
                    <div className="font-bold text-[#E11D48] mb-1">Don&apos;ts</div>
                    {m.donts.map((d, i) => (
                        <div key={i} className="text-rose-950">• {d}</div>
                    ))}
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Interactive 6-Question Spot the Scam Quiz */}
        <div className="luxury-card rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[#090D16] text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C8A24A]" /> Interactive &quot;Spot the Scam&quot; Quiz
              </h3>
              <p className="text-xs text-slate-500">Test your real-world digital banking defenses</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#090D16] text-[#E5C77B]">
            Score: {score} / {FRAUD_QUIZ.length}
          </span>
          </div>

          {completed ? (
              <div className="text-center py-6 space-y-3 animate-fade-in-scale">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A24A] to-[#4F46E5] text-white flex items-center justify-center mx-auto shadow-lg">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-[#090D16]">
                  {score >= 5 ? 'Cyber-Safe Champion!' : score >= 3 ? 'Strong Awareness!' : 'Keep Practicing!'}
                </h4>
                <p className="text-sm text-slate-600">
                  You scored <strong>{score}</strong> out of <strong>{FRAUD_QUIZ.length}</strong> in the RBI Fraud Safety Quiz.
                </p>
                <button
                    onClick={() => {
                      setQuizIndex(0);
                      setSelected(null);
                      setScore(0);
                      setCompleted(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#090D16] text-[#E5C77B] font-bold text-xs"
                >
                  Retake Quiz
                </button>
              </div>
          ) : (
              <div key={quizIndex} className="space-y-4 animate-tab-reveal">
                <div className="text-xs font-bold text-[#4F46E5]">
                  Scenario {quizIndex + 1} of {FRAUD_QUIZ.length}
                </div>
                <div className="p-4 rounded-2xl bg-[#090D16] text-[#E5C77B] text-xs sm:text-sm font-mono leading-relaxed border border-[#C8A24A]/30">
                  &quot;{currentQ.scenario}&quot;
                </div>
                <div className="font-bold text-sm text-[#090D16]">{currentQ.question}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentQ.options.map((opt, idx) => {
                    let style = 'bg-[#F6F8FB] border-slate-200 hover:border-[#C8A24A] text-slate-800';
                    if (selected !== null) {
                      if (idx === currentQ.correctIndex) style = 'bg-emerald-50 border-[#059669] text-emerald-950 font-semibold';
                      else if (idx === selected) style = 'bg-rose-50 border-[#E11D48] text-rose-950';
                    }
                    return (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition active:scale-[0.99] ${style}`}
                        >
                          {opt}
                        </button>
                    );
                  })}
                </div>

                {selected !== null && (
                    <div className="p-4 rounded-2xl bg-[#C8A24A]/12 border border-[#C8A24A]/35 text-xs text-[#090D16] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in-up">
                      <span>{currentQ.explanation}</span>
                      <button
                          onClick={() => {
                            if (quizIndex + 1 < FRAUD_QUIZ.length) {
                              setQuizIndex((i) => i + 1);
                              setSelected(null);
                            } else setCompleted(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#090D16] text-[#E5C77B] font-bold shrink-0"
                      >
                        {quizIndex + 1 < FRAUD_QUIZ.length ? 'Next Scenario' : 'View Final Score'}
                      </button>
                    </div>
                )}
              </div>
          )}
        </div>
      </div>
  );
}

// ============================================================================
// 7. BANKING KNOWLEDGE CENTER & LIVE RBI DOCUMENT INGESTION
// ============================================================================
function KnowledgeCenterModule({ rbiDocs, setRbiDocs, showToast, onOpenAI }) {
  const [tab, setTab] = useState('rbi');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('ALL');
  const [expandedDocId, setExpandedDocId] = useState(null);

  const [newDoc, setNewDoc] = useState({
    title: '',
    circularRef: '',
    date: todayStr(),
    section: '',
    category: 'Digital Payments',
    officialUrl: 'https://www.rbi.org.in/',
    content: ''
  });

  const handleIngest = (e) => {
    e.preventDefault();
    if (!newDoc.title.trim() || newDoc.content.trim().length < 30) {
      return showToast('Enter a title and at least 30 characters of RBI guideline text.', 'error');
    }
    const created = {
      docId: `RBI-DOC-${rbiDocs.length + 1}`,
      ...newDoc,
      circularRef: newDoc.circularRef.trim() || 'Custom Ingested RBI Sample Guideline',
      section: newDoc.section.trim() || 'General Provision',
      status: 'Active'
    };
    const chunkCount = chunkRBIDocument(created).length;
    setRbiDocs((prev) => [created, ...prev]);
    setNewDoc({
      title: '',
      circularRef: '',
      date: todayStr(),
      section: '',
      category: 'Digital Payments',
      officialUrl: 'https://www.rbi.org.in/',
      content: ''
    });
    showToast(`Ingested & split into ${chunkCount} RAG chunks! Ready in AI Assistant.`);
  };

  const filteredArticles = KNOWLEDGE_ARTICLES.filter((a) => {
    if (catFilter !== 'ALL' && a.category !== catFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q);
    }
    return true;
  });

  return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-900/8 shadow-xs">
          <div className="flex gap-2">
            <button
                onClick={() => setTab('rbi')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition ${
                    tab === 'rbi' ? 'bg-[#090D16] text-[#E5C77B]' : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <Database className="w-4 h-4" /> RBI RAG Knowledge Base ({rbiDocs.length})
            </button>
            <button
                onClick={() => setTab('articles')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition ${
                    tab === 'articles' ? 'bg-[#090D16] text-[#E5C77B]' : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <BookOpen className="w-4 h-4" /> Banking Education Library
            </button>
          </div>
          <button
              onClick={onOpenAI}
              className="px-3.5 py-2 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/25 text-xs font-bold hover:bg-[#4F46E5]/15 flex items-center gap-1.5 transition"
          >
            <Bot className="w-3.5 h-3.5" /> Query in AI Assistant
          </button>
        </div>

        {tab === 'rbi' && (
            <div key="kb-rbi" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-tab-reveal">
              <form onSubmit={handleIngest} className="luxury-card rounded-3xl p-5 space-y-3 h-fit">
                <div className="flex items-center gap-2 text-[#8C6A1D] font-bold text-sm">
                  <Layers className="w-4 h-4 text-[#C8A24A]" /> Ingest Sample RBI Document
                </div>
                <p className="text-[11px] text-slate-500">
                  Add a new RBI guideline passage. It will be chunked with metadata and immediately searchable in the RAG AI Assistant.
                </p>
                <input
                    type="text"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                    placeholder="Document Title (e.g., RBI UPI Lite Limit)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <input
                    type="text"
                    value={newDoc.circularRef}
                    onChange={(e) => setNewDoc({ ...newDoc, circularRef: e.target.value })}
                    placeholder="Official Circular Reference"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                      type="text"
                      value={newDoc.section}
                      onChange={(e) => setNewDoc({ ...newDoc, section: e.target.value })}
                      placeholder="Section Name"
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <input
                      type="date"
                      value={newDoc.date}
                      onChange={(e) => setNewDoc({ ...newDoc, date: e.target.value })}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <textarea
                    rows={4}
                    value={newDoc.content}
                    onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                    placeholder="Paste official RBI guideline text here..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#090D16] hover:bg-[#162038] text-[#E5C77B] font-bold text-xs transition active:scale-[0.98]"
                >
                  Chunk &amp; Index into RAG Store
                </button>
              </form>

              <div className="lg:col-span-2 space-y-3">
                {rbiDocs.map((doc) => {
                  const chunks = chunkRBIDocument(doc);
                  const open = expandedDocId === doc.docId;
                  return (
                      <div key={doc.docId} className="luxury-card rounded-2xl p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {doc.docId}
                        </span>
                              <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                      doc.status === 'Active'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : 'bg-amber-100 text-amber-800'
                                  }`}
                              >
                          {doc.status}
                        </span>
                              <span className="text-[11px] text-slate-400">{doc.date}</span>
                              <span className="text-[11px] text-[#4F46E5] font-semibold">{chunks.length} RAG chunks</span>
                            </div>
                            <h4 className="font-bold text-sm text-[#090D16]">{doc.title}</h4>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {doc.circularRef} • {doc.section}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <a
                                href={doc.officialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-[#4F46E5] hover:bg-[#4F46E5]/10"
                                title="Open Official RBI Source"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => setExpandedDocId(open ? null : doc.docId)}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                            >
                              {open ? 'Hide Chunks' : 'View Chunks'}
                            </button>
                          </div>
                        </div>
                        {open && (
                            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 animate-fade-in-up">
                              {chunks.map((ch) => (
                                  <div key={ch.chunkId} className="p-2.5 rounded-xl bg-[#F6F8FB] border border-slate-200/70 text-xs">
                                    <div className="font-mono text-[10px] text-[#8C6A1D] font-bold mb-1">{ch.chunkId}</div>
                                    <p className="text-slate-700 leading-relaxed">{ch.text}</p>
                                  </div>
                              ))}
                            </div>
                        )}
                      </div>
                  );
                })}
              </div>
            </div>
        )}

        {tab === 'articles' && (
            <div key="kb-art" className="space-y-4 animate-tab-reveal">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search banking concepts (UPI, NEFT, Credit Score, Deposits, RBI)..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                  />
                </div>
                <select
                    value={catFilter}
                    onChange={(e) => setCatFilter(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                >
                  <option value="ALL">All Categories</option>
                  {['Accounts', 'Digital Payments', 'Deposits', 'Loans & Credit', 'RBI Regulations'].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((art) => (
                    <div key={art.id} className="luxury-card luxury-card-hover rounded-2xl p-5 space-y-2">
                      <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#C8A24A]/15 text-[#8C6A1D]">
                    {art.category}
                  </span>
                        <span className="text-[11px] text-slate-400">{art.readTime}</span>
                      </div>
                      <h4 className="font-bold text-[#090D16] text-base">{art.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{art.summary}</p>
                      <p className="text-xs text-slate-700 leading-relaxed pt-1.5 border-t border-slate-100">{art.content}</p>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );
}

// ============================================================================
// 8. PROFILE & SETTINGS MODULE
// ============================================================================
function SettingsModule({ user, setUser, language, setLanguage, notifications, onResetDemoData, showToast }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [upiId, setUpiId] = useState(user.upiId);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return showToast('Demo name cannot be empty.', 'error');
    setUser((prev) => ({ ...prev, name: name.trim(), email: email.trim(), upiId: upiId.trim() }));
    showToast('Demo profile preferences saved!');
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSave} className="luxury-card rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-[#090D16] text-base">Demo Profile &amp; Preferences</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Display Name (Demo)</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Demo Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Fictional UPI ID</label>
            <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Default AI Language</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition ${
                      language === 'en' ? 'bg-[#090D16] border-[#C8A24A] text-[#E5C77B]' : 'border-slate-200 text-slate-600'
                  }`}
              >
                Simple English
              </button>
              <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition ${
                      language === 'hi' ? 'bg-[#090D16] border-[#C8A24A] text-[#E5C77B]' : 'border-slate-200 text-slate-600'
                  }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>
          <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-sm transition active:scale-[0.98]"
          >
            Save Demo Settings
          </button>
        </form>

        <div className="space-y-6">
          <div className="luxury-card rounded-3xl p-6 space-y-3">
            <h3 className="font-bold text-[#090D16] text-base">Sandbox Data Management</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All demo balances, transactions, beneficiaries, budgets, AI expense records, and ingested RBI documents persist locally in your browser.
            </p>
            {!confirmReset ? (
                <button
                    onClick={() => setConfirmReset(true)}
                    className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#E11D48] border border-rose-200 font-bold text-xs flex items-center gap-2 transition active:scale-[0.98]"
                >
                  <RefreshCw className="w-4 h-4" /> Reset All Demo Data
                </button>
            ) : (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2.5 animate-fade-in-scale">
                  <div className="text-xs font-bold text-rose-900">
                    Reset all demo accounts, transactions, AI expenses, budgets, and chat history?
                  </div>
                  <div className="flex gap-2">
                    <button
                        onClick={() => {
                          onResetDemoData();
                          setConfirmReset(false);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-[#E11D48] text-white text-xs font-bold"
                    >
                      Yes, Reset Demo
                    </button>
                    <button
                        onClick={() => setConfirmReset(false)}
                        className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
            )}
          </div>

          <div className="luxury-card rounded-3xl p-6">
            <h3 className="font-bold text-[#090D16] text-base mb-3">Recent Simulated Notifications</h3>
            <div className="space-y-2.5 max-h-56 overflow-y-auto">
              {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-[#F6F8FB] border border-slate-200/70">
                    <div className="flex justify-between text-xs font-semibold text-[#090D16]">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">{n.message}</div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}