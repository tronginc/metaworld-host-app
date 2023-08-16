import useUserStore from '@stores/user.store';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { UserCredentinals } from 'src/types/User';

type Payload = {
  password: string;
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

const useLoginMutation = () => {
  const { setCredentials } = useUserStore();
  return useMutation<UserCredentinals, Error, Payload>(
    ['login'],
    async payload => {
      return axios
        .post('/api/account/login', payload)
        .then(response => response.data);
    },
    {
      onSuccess: setCredentials,
    },
  );
};

export default useLoginMutation;
