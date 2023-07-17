const mapping: Record<string, string> = {
  organizations: 'organization',
  tokens: 'token',
  'trading-histories': 'trading_history',
  'trading-parameters': 'trading_parameter',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
