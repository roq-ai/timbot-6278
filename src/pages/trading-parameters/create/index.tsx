import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTradingParameter } from 'apiSdk/trading-parameters';
import { Error } from 'components/error';
import { tradingParameterValidationSchema } from 'validationSchema/trading-parameters';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { TokenInterface } from 'interfaces/token';
import { getTokens } from 'apiSdk/tokens';
import { TradingParameterInterface } from 'interfaces/trading-parameter';

function TradingParameterCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TradingParameterInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTradingParameter(values);
      resetForm();
      router.push('/trading-parameters');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TradingParameterInterface>({
    initialValues: {
      parameter: '',
      token_id: (router.query.token_id as string) ?? null,
    },
    validationSchema: tradingParameterValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Trading Parameter
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="parameter" mb="4" isInvalid={!!formik.errors?.parameter}>
            <FormLabel>Parameter</FormLabel>
            <Input type="text" name="parameter" value={formik.values?.parameter} onChange={formik.handleChange} />
            {formik.errors.parameter && <FormErrorMessage>{formik.errors?.parameter}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TokenInterface>
            formik={formik}
            name={'token_id'}
            label={'Select Token'}
            placeholder={'Select Token'}
            fetcher={getTokens}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'trading_parameter',
    operation: AccessOperationEnum.CREATE,
  }),
)(TradingParameterCreatePage);
