import ScreenList from '@constants/screenList';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { UserCredentinals } from 'src/types/User';

type Payload = {} & (
  | {
      email: string;
      type: 'email';
    }
  | {
      phone: string;
      type: 'phone';
    }
);

const useCheckOTPMutation = () => {
  const navigation = useNavigation();
  return useMutation<UserCredentinals, Error, Payload>(
    async payload => {
      return axios
        .post('/api/mobile/account/forgot-password', payload)
        .then(response => response.data);
    },
    {
      onSuccess: (_, variables) => {
        navigation.navigate(ScreenList.AUTH_CONFIRM_CODE, {
          email_or_phone:
            'email' in variables ? variables.email : variables.phone,
          referralCode: '',
          password: '',
          isForgotPassword: true,
        });
      },
    },
  );
};

export default useCheckOTPMutation;
