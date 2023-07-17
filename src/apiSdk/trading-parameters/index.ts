import axios from 'axios';
import queryString from 'query-string';
import { TradingParameterInterface, TradingParameterGetQueryInterface } from 'interfaces/trading-parameter';
import { GetQueryInterface } from '../../interfaces';

export const getTradingParameters = async (query?: TradingParameterGetQueryInterface) => {
  const response = await axios.get(`/api/trading-parameters${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTradingParameter = async (tradingParameter: TradingParameterInterface) => {
  const response = await axios.post('/api/trading-parameters', tradingParameter);
  return response.data;
};

export const updateTradingParameterById = async (id: string, tradingParameter: TradingParameterInterface) => {
  const response = await axios.put(`/api/trading-parameters/${id}`, tradingParameter);
  return response.data;
};

export const getTradingParameterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/trading-parameters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTradingParameterById = async (id: string) => {
  const response = await axios.delete(`/api/trading-parameters/${id}`);
  return response.data;
};
