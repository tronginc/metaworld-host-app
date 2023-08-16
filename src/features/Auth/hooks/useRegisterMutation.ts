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
  return useMutation<Payload, Error, Payload>(['register'], async payload => {
    return axios.post('/api/account/register', payload);
  });
};

export default useRegisterMutation;
