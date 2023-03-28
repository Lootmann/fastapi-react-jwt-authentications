type AccountType = {
  username: string;
  password: string;
};
type AccountCreateFormType = { formData: AccountType };
type AccountLoaderArgs = AccountType;
type AccountFormErrorType = AccountTYpe & { message: string };

type UserType = {
  id: number;
  username: string;
};
