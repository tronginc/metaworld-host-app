import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
  return useMutation<Payload, Error, Payload>(['register'], async payload => {
    return axios.post('/api/account/verify-register', payload);
  });
};

export default useVerifyRegisterMutation;
