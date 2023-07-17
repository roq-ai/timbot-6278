import * as yup from 'yup';

export const tokenValidationSchema = yup.object().shape({
  name: yup.string().required(),
  organization_id: yup.string().nullable(),
});
