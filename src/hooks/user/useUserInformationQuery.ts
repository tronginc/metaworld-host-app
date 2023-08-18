import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserStore from '@stores/user.store';
import { User } from 'src/types/User';

const useUserInformationQuery = () => {
  const { credentials } = useUserStore();

  return useQuery(
    ['user', 'information', credentials?.accessToken],
    async () => {
      return axios
        .get<User>('/api/mobile/account/information', {
          headers: {
            Authorization: `Bearer ${credentials?.accessToken}`,
          },
        })
        .then(response => response.data);
    },
    {
      retry: false,
      enabled: !!credentials?.accessToken,
    },
  );
};

export default useUserInformationQuery;
