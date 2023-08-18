import ScreenList from '@constants/screenList';

export type RootStackParamList = {
  [ScreenList.AUTH_SIGN_UP]: undefined;
  [ScreenList.AUTH_LOGIN]:
    | undefined
    | {
        email_or_phone: string;
      };
  [ScreenList.AUTH_FORGOT_PASSWORD]: undefined;
  [ScreenList.AUTH_CONFIRM_CODE]: {
    email_or_phone: string;
    password: string;
    referralCode: string;
    isLogin?: boolean;
    isForgotPassword?: boolean;
  };
  [ScreenList.AUTH_SET_NEW_PASSWORD]: {
    email_or_phone: string;
    code: string;
  };
};
