import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserStore from '@stores/user.store';

const useUserInformationQuery = () => {
  const { credentials } = useUserStore();

  return useQuery(
    ['user', 'information'],
    () => {
      return axios.get('/api/account/information', {
        headers: {
          Authorization: `Bearer ${credentials?.accessToken}`,
        },
      });
    },
    {
      retry: false,
      staleTime: Infinity,
      enabled: !!credentials?.accessToken,
    },
  );
};

export default useUserInformationQuery;
