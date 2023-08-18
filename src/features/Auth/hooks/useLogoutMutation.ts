import useUserStore from '@stores/user.store';
import { useMutation } from '@tanstack/react-query';

const useLogoutMutation = () => {
  const { clearStore } = useUserStore();

  return useMutation(() => {
    return new Promise<void>(resolve => {
      clearStore();
      resolve();
    });
  });
};

export default useLogoutMutation;
