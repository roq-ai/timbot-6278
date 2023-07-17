import axios from 'axios';
import queryString from 'query-string';
import { TradingHistoryInterface, TradingHistoryGetQueryInterface } from 'interfaces/trading-history';
import { GetQueryInterface } from '../../interfaces';

export const getTradingHistories = async (query?: TradingHistoryGetQueryInterface) => {
  const response = await axios.get(`/api/trading-histories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTradingHistory = async (tradingHistory: TradingHistoryInterface) => {
  const response = await axios.post('/api/trading-histories', tradingHistory);
  return response.data;
};

export const updateTradingHistoryById = async (id: string, tradingHistory: TradingHistoryInterface) => {
  const response = await axios.put(`/api/trading-histories/${id}`, tradingHistory);
  return response.data;
};

export const getTradingHistoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/trading-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTradingHistoryById = async (id: string) => {
  const response = await axios.delete(`/api/trading-histories/${id}`);
  return response.data;
};
