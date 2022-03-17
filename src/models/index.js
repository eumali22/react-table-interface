// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TransactionModel, AccountModel, BudgetModel } = initSchema(schema);

export {
  TransactionModel,
  AccountModel,
  BudgetModel
};