import axios from 'axios';
import useUserStore from '@stores/user.store';
import { useMutation } from '@tanstack/react-query';
import { UserCredentinals } from 'src/types/User';

type Payload = {
  verifyCode: string;
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

const useVerifyRegisterMutation = () => {
  const { setCredentials } = useUserStore();

  return useMutation<UserCredentinals, Error, Payload>(
    async payload => {
      return axios
        .post<UserCredentinals>('/api/mobile/account/verify-register', payload)
        .then(response => response.data);
    },
    {
      onSuccess: setCredentials,
    },
  );
};

export default useVerifyRegisterMutation;
