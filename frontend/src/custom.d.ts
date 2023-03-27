type UserType = {
  username: string;
  password: string;
};

type UserCreateFormType = {
  formData: UserType;
};
type UserLoaderArgs = UserType;
type UserFormErrorType = UserType & {
  message: string;
};
