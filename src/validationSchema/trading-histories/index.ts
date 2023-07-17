import * as yup from 'yup';

export const tradingHistoryValidationSchema = yup.object().shape({
  trade_date: yup.date().required(),
  trade_amount: yup.number().integer().required(),
  token_id: yup.string().nullable(),
});
