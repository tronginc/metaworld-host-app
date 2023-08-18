import useUserStore from '@stores/user.store';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
const useResendCodeMutation = () => {
  const { lastEmailSent, setLastEmailSent } = useUserStore();
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const calculateCountdown = () => {
      if (!lastEmailSent) {
        return 0;
      }
      const now = Date.now();
      const diff = Math.floor((lastEmailSent + 60000 - now) / 1000);
      const positiveDiff = diff > 0 ? diff : 0;
      setCountdown(positiveDiff);
      return positiveDiff;
    };
    calculateCountdown();

    const interval = setInterval(() => {
      const positiveDiff = calculateCountdown();
      if (positiveDiff === 0) {
        setLastEmailSent(0);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastEmailSent, setLastEmailSent]);

  const mutation = useMutation<unknown, Error, Payload>(
    async payload => {
      return axios.post('/api/mobile/account/resend-verify', payload);
    },
    {
      onSuccess: () => {
        setLastEmailSent(Date.now());
      },
    },
  );

  return {
    ...mutation,
    lastEmailSent,
    setLastEmailSent,
    countdown,
  };
};

export default useResendCodeMutation;
