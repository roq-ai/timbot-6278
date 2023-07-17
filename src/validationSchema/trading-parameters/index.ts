import * as yup from 'yup';

export const tradingParameterValidationSchema = yup.object().shape({
  parameter: yup.string().required(),
  token_id: yup.string().nullable(),
});
