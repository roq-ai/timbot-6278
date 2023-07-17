import { TokenInterface } from 'interfaces/token';
import { GetQueryInterface } from 'interfaces';

export interface TradingHistoryInterface {
  id?: string;
  trade_date: any;
  trade_amount: number;
  token_id?: string;
  created_at?: any;
  updated_at?: any;

  token?: TokenInterface;
  _count?: {};
}

export interface TradingHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  token_id?: string;
}
