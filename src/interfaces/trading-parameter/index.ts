import { TokenInterface } from 'interfaces/token';
import { GetQueryInterface } from 'interfaces';

export interface TradingParameterInterface {
  id?: string;
  parameter: string;
  token_id?: string;
  created_at?: any;
  updated_at?: any;

  token?: TokenInterface;
  _count?: {};
}

export interface TradingParameterGetQueryInterface extends GetQueryInterface {
  id?: string;
  parameter?: string;
  token_id?: string;
}
