import ScreenList from '@constants/screenList';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { UserCredentinals } from 'src/types/User';

type Payload = {
  otpCode: string;
  newPassword: string;
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

const useSetNewPasswordMutation = () => {
  const navigation = useNavigation();
  return useMutation<UserCredentinals, Error, Payload>(
    async payload => {
      return axios
        .post('/api/mobile/account/change-password', payload)
        .then(response => response.data);
    },
    {
      onSuccess: data => {
        console.log('useSetNewPasswordMutation', data);
      },
    },
  );
};

export default useSetNewPasswordMutation;
