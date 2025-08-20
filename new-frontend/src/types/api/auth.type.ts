export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar: File[] | undefined;
  coverImage: File[] | undefined;
}

export interface UpdateNameEmailParams {
  fullName: string;
  email: string;
}

export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}