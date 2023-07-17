import axios from 'axios';
import queryString from 'query-string';
import { TokenInterface, TokenGetQueryInterface } from 'interfaces/token';
import { GetQueryInterface } from '../../interfaces';

export const getTokens = async (query?: TokenGetQueryInterface) => {
  const response = await axios.get(`/api/tokens${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createToken = async (token: TokenInterface) => {
  const response = await axios.post('/api/tokens', token);
  return response.data;
};

export const updateTokenById = async (id: string, token: TokenInterface) => {
  const response = await axios.put(`/api/tokens/${id}`, token);
  return response.data;
};

export const getTokenById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tokens/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTokenById = async (id: string) => {
  const response = await axios.delete(`/api/tokens/${id}`);
  return response.data;
};
