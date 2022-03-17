import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TransactionModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AccountModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BudgetModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TransactionModel {
  readonly id: string;
  readonly amount?: string;
  readonly accountmodelID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TransactionModel, TransactionModelMetaData>);
  static copyOf(source: TransactionModel, mutator: (draft: MutableModel<TransactionModel, TransactionModelMetaData>) => MutableModel<TransactionModel, TransactionModelMetaData> | void): TransactionModel;
}

export declare class AccountModel {
  readonly id: string;
  readonly name?: string;
  readonly budgetmodelID: string;
  readonly TransactionModels?: (TransactionModel | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AccountModel, AccountModelMetaData>);
  static copyOf(source: AccountModel, mutator: (draft: MutableModel<AccountModel, AccountModelMetaData>) => MutableModel<AccountModel, AccountModelMetaData> | void): AccountModel;
}

export declare class BudgetModel {
  readonly id: string;
  readonly name?: string;
  readonly AccountModels?: (AccountModel | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BudgetModel, BudgetModelMetaData>);
  static copyOf(source: BudgetModel, mutator: (draft: MutableModel<BudgetModel, BudgetModelMetaData>) => MutableModel<BudgetModel, BudgetModelMetaData> | void): BudgetModel;
}