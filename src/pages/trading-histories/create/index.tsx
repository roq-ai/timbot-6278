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
import { createTradingHistory } from 'apiSdk/trading-histories';
import { Error } from 'components/error';
import { tradingHistoryValidationSchema } from 'validationSchema/trading-histories';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { TokenInterface } from 'interfaces/token';
import { getTokens } from 'apiSdk/tokens';
import { TradingHistoryInterface } from 'interfaces/trading-history';

function TradingHistoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TradingHistoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTradingHistory(values);
      resetForm();
      router.push('/trading-histories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TradingHistoryInterface>({
    initialValues: {
      trade_date: new Date(new Date().toDateString()),
      trade_amount: 0,
      token_id: (router.query.token_id as string) ?? null,
    },
    validationSchema: tradingHistoryValidationSchema,
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
            Create Trading History
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="trade_date" mb="4">
            <FormLabel>Trade Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.trade_date ? new Date(formik.values?.trade_date) : null}
                onChange={(value: Date) => formik.setFieldValue('trade_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="trade_amount" mb="4" isInvalid={!!formik.errors?.trade_amount}>
            <FormLabel>Trade Amount</FormLabel>
            <NumberInput
              name="trade_amount"
              value={formik.values?.trade_amount}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('trade_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.trade_amount && <FormErrorMessage>{formik.errors?.trade_amount}</FormErrorMessage>}
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
    entity: 'trading_history',
    operation: AccessOperationEnum.CREATE,
  }),
)(TradingHistoryCreatePage);
