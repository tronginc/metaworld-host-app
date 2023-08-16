import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserStore from '@stores/user.store';
import { User } from 'src/types/User';

const useUserInformationQuery = () => {
  const { credentials } = useUserStore();

  return useQuery(
    ['user', 'information'],
    () => {
      return axios
        .get<User>('/api/account/information', {
          headers: {
            Authorization: `Bearer ${credentials?.accessToken}`,
          },
        })
        .then(response => response.data);
    },
    {
      retry: false,
      staleTime: Infinity,
      enabled: !!credentials?.accessToken,
    },
  );
};

export default useUserInformationQuery;
