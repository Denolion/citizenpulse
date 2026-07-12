import {
  BarChart3, Trophy, Film, Cpu, Leaf, Landmark, Newspaper,
  ShoppingBag, Users, Globe, Activity, type LucideIcon,
} from "lucide-react";

export type PollOption = {
  label: string;
  percentage: number;
};

export type Poll = {
  id: string;
  question: string;
  category: string;
  country: string;
  countryCode: string;
  flag: string;
  participants: number;
  daysLeft: number;
  options: PollOption[];
  trending?: boolean;
  live?: boolean;
  image?: string;
  author?: string;
  createdAt?: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  pollCount: number;
  color: string;
};

export type Country = {
  name: string;
  code: string;
  flag: string;
  pollCount: number;
  activeUsers: number;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
};

export type LiveResult = {
  id: string;
  question: string;
  country: string;
  totalResponses: number;
  leadingOption: string;
  leadingPercentage: number;
  options: { label: string; percentage: number }[];
};

export type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "vote" | "result" | "system" | "social";
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  country: string;
  flag: string;
  joinedDate: string;
  pollsCreated: number;
  votesCast: number;
  status: "active" | "suspended";
};

export type AdminPoll = {
  id: string;
  question: string;
  category: string;
  author: string;
  country: string;
  flag: string;
  participants: number;
  createdAt: string;
  status: "active" | "closed" | "draft";
};

export const featuredPoll: Poll = {
  id: "p-001",
  question: "Should the African Continental Free Trade Area prioritize digital trade over traditional goods?",
  category: "Economy",
  country: "Continental",
  countryCode: "AU",
  flag: "🌍",
  participants: 48230,
  daysLeft: 3,
  options: [
    { label: "Prioritize digital trade", percentage: 52 },
    { label: "Traditional goods first", percentage: 31 },
    { label: "Equal priority", percentage: 17 },
  ],
  live: true,
  image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
  author: "CitizenPulse Editorial",
  createdAt: "2026-07-08",
};

export const trendingPolls: Poll[] = [
  {
    id: "p-002",
    question: "Is your country doing enough to combat youth unemployment?",
    category: "Economy",
    country: "Nigeria",
    countryCode: "NG",
    flag: "🇳🇬",
    participants: 12840,
    daysLeft: 5,
    options: [
      { label: "Yes", percentage: 18 },
      { label: "No", percentage: 67 },
      { label: "Not sure", percentage: 15 },
    ],
    trending: true,
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "p-003",
    question: "Do you support the transition to renewable energy in your region?",
    category: "Environment",
    country: "Kenya",
    countryCode: "KE",
    flag: "🇰🇪",
    participants: 9320,
    daysLeft: 2,
    options: [
      { label: "Strongly support", percentage: 61 },
      { label: "Support with concerns", percentage: 24 },
      { label: "Oppose", percentage: 15 },
    ],
    trending: true,
    image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "p-004",
    question: "Should voting age be lowered to 16 in national elections?",
    category: "Politics",
    country: "South Africa",
    countryCode: "ZA",
    flag: "🇿🇦",
    participants: 7210,
    daysLeft: 7,
    options: [
      { label: "Yes", percentage: 44 },
      { label: "No", percentage: 49 },
      { label: "Undecided", percentage: 7 },
    ],
    trending: true,
    image: "https://images.pexels.com/photos/3240163/pexels-photo-3240163.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "p-005",
    question: "Is free public healthcare achievable in the next decade?",
    category: "Health",
    country: "Ghana",
    countryCode: "GH",
    flag: "🇬🇭",
    participants: 5640,
    daysLeft: 4,
    options: [
      { label: "Yes, achievable", percentage: 38 },
      { label: "Unlikely", percentage: 47 },
      { label: "No opinion", percentage: 15 },
    ],
    trending: true,
    image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "p-006",
    question: "Should universities prioritize STEM over humanities programs?",
    category: "Education",
    country: "Egypt",
    countryCode: "EG",
    flag: "🇪🇬",
    participants: 4180,
    daysLeft: 6,
    options: [
      { label: "Prioritize STEM", percentage: 57 },
      { label: "Balance both", percentage: 33 },
      { label: "Prioritize humanities", percentage: 10 },
    ],
    trending: true,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "p-007",
    question: "Do you feel safe reporting corruption to authorities?",
    category: "Governance",
    country: "Senegal",
    countryCode: "SN",
    flag: "🇸🇳",
    participants: 3890,
    daysLeft: 1,
    options: [
      { label: "Yes", percentage: 22 },
      { label: "No", percentage: 71 },
      { label: "Sometimes", percentage: 7 },
    ],
    trending: true,
    image: "https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const allPolls: Poll[] = [featuredPoll, ...trendingPolls];

export const liveResults: LiveResult[] = [
  {
    id: "lr-1",
    question: "Most pressing issue facing your community",
    country: "🇳🇬 Nigeria",
    totalResponses: 24800,
    leadingOption: "Unemployment",
    leadingPercentage: 42,
    options: [
      { label: "Unemployment", percentage: 42 },
      { label: "Infrastructure", percentage: 28 },
      { label: "Security", percentage: 19 },
      { label: "Healthcare", percentage: 11 },
    ],
  },
  {
    id: "lr-2",
    question: "Confidence in democratic institutions",
    country: "🇿🇦 South Africa",
    totalResponses: 18200,
    leadingOption: "Low confidence",
    leadingPercentage: 54,
    options: [
      { label: "Low confidence", percentage: 54 },
      { label: "Moderate", percentage: 29 },
      { label: "High confidence", percentage: 17 },
    ],
  },
  {
    id: "lr-3",
    question: "Preferred mobile payment method",
    country: "🇰🇪 Kenya",
    totalResponses: 15600,
    leadingOption: "Mobile money",
    leadingPercentage: 73,
    options: [
      { label: "Mobile money", percentage: 73 },
      { label: "Bank transfer", percentage: 18 },
      { label: "Cash", percentage: 9 },
    ],
  },
];

export const trendData = [
  { time: "Mon", value: 12400 },
  { time: "Tue", value: 15800 },
  { time: "Wed", value: 14200 },
  { time: "Thu", value: 18900 },
  { time: "Fri", value: 22300 },
  { time: "Sat", value: 20100 },
  { time: "Sun", value: 24800 },
];

export const categoryDistributionData = [
  { name: "Politics", value: 1240 },
  { name: "Current Affairs", value: 980 },
  { name: "Consumer & Brands", value: 645 },
  { name: "Sports", value: 512 },
  { name: "Entertainment", value: 430 },
  { name: "Technology", value: 367 },
  { name: "Economy", value: 298 },
  { name: "Environment", value: 184 },
];

export const monthlyGrowthData = [
  { month: "Jan", polls: 820, votes: 2400000 },
  { month: "Feb", polls: 910, votes: 2890000 },
  { month: "Mar", polls: 1020, votes: 3120000 },
  { month: "Apr", polls: 980, votes: 3450000 },
  { month: "May", polls: 1120, votes: 3890000 },
  { month: "Jun", polls: 1240, votes: 4200000 },
  { month: "Jul", polls: 1380, votes: 4600000 },
];

export const categories: Category[] = [
  { id: "politics", name: "Politics", description: "Elections, governance, and civic participation", icon: Landmark, pollCount: 1240, color: "bg-primary/10 text-primary" },
  { id: "current-affairs", name: "Current Affairs", description: "Breaking news and ongoing public discourse", icon: Newspaper, pollCount: 980, color: "bg-secondary/10 text-secondary" },
  { id: "consumer-brands", name: "Consumer & Brands", description: "Products, services, and brand preferences", icon: ShoppingBag, pollCount: 645, color: "bg-green-100 text-green-700" },
  { id: "sports", name: "Sports", description: "Football, athletics, and continental competitions", icon: Trophy, pollCount: 512, color: "bg-amber-100 text-amber-700" },
  { id: "entertainment", name: "Entertainment", description: "Music, film, and cultural conversations", icon: Film, pollCount: 430, color: "bg-rose-100 text-rose-700" },
  { id: "technology", name: "Technology", description: "Innovation, startups, and digital adoption", icon: Cpu, pollCount: 367, color: "bg-cyan-100 text-cyan-700" },
  { id: "economy", name: "Economy", description: "Trade, employment, and financial policy", icon: BarChart3, pollCount: 298, color: "bg-blue-100 text-blue-700" },
  { id: "environment", name: "Environment", description: "Climate, conservation, and sustainability", icon: Leaf, pollCount: 184, color: "bg-emerald-100 text-emerald-700" },
];

export const countries: Country[] = [
  { name: "Nigeria", code: "NG", flag: "🇳🇬", pollCount: 1240, activeUsers: 48200 },
  { name: "Kenya", code: "KE", flag: "🇰🇪", pollCount: 980, activeUsers: 31400 },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", pollCount: 870, activeUsers: 28900 },
  { name: "Ghana", code: "GH", flag: "🇬🇭", pollCount: 645, activeUsers: 19800 },
  { name: "Egypt", code: "EG", flag: "🇪🇬", pollCount: 590, activeUsers: 22300 },
  { name: "Senegal", code: "SN", flag: "🇸🇳", pollCount: 430, activeUsers: 12700 },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹", pollCount: 410, activeUsers: 15600 },
  { name: "Morocco", code: "MA", flag: "🇲🇦", pollCount: 380, activeUsers: 14200 },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿", pollCount: 340, activeUsers: 11800 },
  { name: "Uganda", code: "UG", flag: "🇺🇬", pollCount: 298, activeUsers: 9400 },
  { name: "Rwanda", code: "RW", flag: "🇷🇼", pollCount: 256, activeUsers: 8200 },
  { name: "Côte d'Ivoire", code: "CI", flag: "🇨🇮", pollCount: 230, activeUsers: 7600 },
];

export const newsItems: NewsItem[] = [
  {
    id: "n-1",
    title: "AfCFTA digital trade negotiations enter final phase",
    excerpt: "Member states are finalizing protocols on digital commerce that could reshape cross-border trade across the continent.",
    category: "Economy",
    author: "Amara Okafor",
    date: "Jul 9, 2026",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "n-2",
    title: "Youth voter registration surges ahead of regional elections",
    excerpt: "New data shows a 40% increase in first-time voter registration among citizens aged 18-25 across three nations.",
    category: "Politics",
    author: "Kwame Mensah",
    date: "Jul 7, 2026",
    readTime: "4 min read",
    image: "https://images.pexels.com/photos/3240163/pexels-photo-3240163.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "n-3",
    title: "Renewable energy investments hit record high in East Africa",
    excerpt: "Geothermal and solar projects are driving unprecedented growth in clean energy capacity across the region.",
    category: "Environment",
    author: "Zainab Hassan",
    date: "Jul 5, 2026",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const stats: Stat[] = [
  { label: "Active Polls", value: "1,240", icon: BarChart3, color: "from-blue-500 to-blue-600" },
  { label: "Registered Users", value: "2.4M+", icon: Users, color: "from-green-500 to-green-600" },
  { label: "Countries Covered", value: "54", icon: Globe, color: "from-blue-400 to-cyan-500" },
  { label: "Total Votes", value: "42M+", icon: Activity, color: "from-green-400 to-emerald-500" },
];

export const navCategories = [
  { label: "Home", href: "/" },
  { label: "Politics", href: "/category/politics" },
  { label: "Current Affairs", href: "/category/current-affairs" },
  { label: "Consumer & Brands", href: "/category/consumer-brands" },
  { label: "Sports", href: "/category/sports" },
  { label: "Entertainment", href: "/category/entertainment" },
  { label: "Technology", href: "/category/technology" },
  { label: "Results", href: "/#live-results" },
  { label: "News", href: "/#news" },
  { label: "About", href: "/#about" },
];

export const userNotifications: Notification[] = [
  { id: "n1", title: "New poll in your area", message: "A poll about renewable energy in Kenya was just published.", time: "5m ago", read: false, type: "vote" },
  { id: "n2", title: "Results are in", message: "The poll 'Youth unemployment policy' has closed. See the results!", time: "2h ago", read: false, type: "result" },
  { id: "n3", title: "Your poll is trending", message: "Your poll on digital trade has reached 10,000 participants.", time: "1d ago", read: true, type: "social" },
  { id: "n4", title: "Welcome to CitizenPulse", message: "Complete your profile to get personalized poll recommendations.", time: "3d ago", read: true, type: "system" },
];

export const userVotes = [
  { pollId: "p-002", question: "Is your country doing enough to combat youth unemployment?", choice: "No", date: "2026-07-10", category: "Economy" },
  { pollId: "p-003", question: "Do you support the transition to renewable energy in your region?", choice: "Strongly support", date: "2026-07-09", category: "Environment" },
  { pollId: "p-004", question: "Should voting age be lowered to 16 in national elections?", choice: "Yes", date: "2026-07-08", category: "Politics" },
];

export const savedPolls = [
  { pollId: "p-001", question: "Should the African Continental Free Trade Area prioritize digital trade?", category: "Economy", daysLeft: 3 },
  { pollId: "p-005", question: "Is free public healthcare achievable in the next decade?", category: "Health", daysLeft: 4 },
  { pollId: "p-007", question: "Do you feel safe reporting corruption to authorities?", category: "Governance", daysLeft: 1 },
];

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "Amara Okafor", email: "amara@example.com", country: "Nigeria", flag: "🇳🇬", joinedDate: "2026-01-15", pollsCreated: 12, votesCast: 89, status: "active" },
  { id: "u2", name: "Kwame Mensah", email: "kwame@example.com", country: "Ghana", flag: "🇬🇭", joinedDate: "2026-02-20", pollsCreated: 5, votesCast: 142, status: "active" },
  { id: "u3", name: "Zainab Hassan", email: "zainab@example.com", country: "Kenya", flag: "🇰🇪", joinedDate: "2026-03-10", pollsCreated: 8, votesCast: 67, status: "active" },
  { id: "u4", name: "Thabo Nkosi", email: "thabo@example.com", country: "South Africa", flag: "🇿🇦", joinedDate: "2026-03-25", pollsCreated: 3, votesCast: 210, status: "active" },
  { id: "u5", name: "Fatima El-Sayed", email: "fatima@example.com", country: "Egypt", flag: "🇪🇬", joinedDate: "2026-04-01", pollsCreated: 0, votesCast: 34, status: "suspended" },
  { id: "u6", name: "Mamadou Diallo", email: "mamadou@example.com", country: "Senegal", flag: "🇸🇳", joinedDate: "2026-04-15", pollsCreated: 7, votesCast: 98, status: "active" },
];

export const adminPolls: AdminPoll[] = [
  { id: "p-001", question: "Should the AfCFTA prioritize digital trade over traditional goods?", category: "Economy", author: "CitizenPulse Editorial", country: "Continental", flag: "🌍", participants: 48230, createdAt: "2026-07-08", status: "active" },
  { id: "p-002", question: "Is your country doing enough to combat youth unemployment?", category: "Economy", author: "Amara Okafor", country: "Nigeria", flag: "🇳🇬", participants: 12840, createdAt: "2026-07-06", status: "active" },
  { id: "p-003", question: "Do you support the transition to renewable energy in your region?", category: "Environment", author: "Zainab Hassan", country: "Kenya", flag: "🇰🇪", participants: 9320, createdAt: "2026-07-05", status: "active" },
  { id: "p-004", question: "Should voting age be lowered to 16 in national elections?", category: "Politics", author: "Thabo Nkosi", country: "South Africa", flag: "🇿🇦", participants: 7210, createdAt: "2026-07-03", status: "closed" },
  { id: "p-008", question: "Which Afrobeats artist will dominate the charts this summer?", category: "Entertainment", author: "Kwame Mensah", country: "Ghana", flag: "🇬🇭", participants: 0, createdAt: "2026-07-11", status: "draft" },
];

export const adminStats = [
  { label: "Total Users", value: "2,438,920", change: "+12.5%", trend: "up" },
  { label: "Active Polls", value: "1,240", change: "+8.2%", trend: "up" },
  { label: "Votes This Week", value: "1.8M", change: "+23.1%", trend: "up" },
  { label: "Avg. Engagement", value: "73.4%", change: "-2.1%", trend: "down" },
];
