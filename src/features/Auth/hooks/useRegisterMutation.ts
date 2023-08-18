import ScreenList from '@constants/screenList';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Payload = {
  password: string;
  referralCode: string;
} & (
  | {
      email: string;
      type: 'email';
    }
  | {
      phone: string;
      type: 'phone';
    }
);

const useRegisterMutation = () => {
  const navigation = useNavigation();
  return useMutation<Payload, Error, Payload>(
    async payload => {
      return axios
        .post('/api/mobile/account/register', payload)
        .then(response => response.data);
    },
    {
      onSuccess: (_, variables) => {
        const email_or_phone =
          'email' in variables ? variables.email : variables.phone;
        navigation.navigate({
          name: ScreenList.AUTH_CONFIRM_CODE,
          params: {
            email_or_phone,
            password: variables.password,
            referralCode: variables.referralCode,
          },
        });
      },
    },
  );
};

export default useRegisterMutation;
