export type UserCredentinals = {
  id: number;
  accessToken: string;
  refreshToken: string;
  applicationId: null;
  scope: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  identityProvider: string;
  avatar: string;
  browser: string;
  phone: string;
  wallet: string;
  accountRole: string;
  latestLoginAt: string;
  createdAt: string;
  verified: boolean;
  kycStatus: string;
  kycData: any;
  detail: any;
  referralCode: string;
  presenterId: number;
  accountRank: any;
  hyraWalletAddress: string;
  verify2StepType: string;
  havePassword: boolean;
};
