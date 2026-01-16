
export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  ADMIN = 'ADMIN',
  STATISTICS = 'STATISTICS'
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  category: string;
}

export interface UsageData {
  name: string;
  requests: number;
  tokens: number;
}
