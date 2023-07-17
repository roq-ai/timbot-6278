import { TradingHistoryInterface } from 'interfaces/trading-history';
import { TradingParameterInterface } from 'interfaces/trading-parameter';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TokenInterface {
  id?: string;
  name: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  trading_history?: TradingHistoryInterface[];
  trading_parameter?: TradingParameterInterface[];
  organization?: OrganizationInterface;
  _count?: {
    trading_history?: number;
    trading_parameter?: number;
  };
}

export interface TokenGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
