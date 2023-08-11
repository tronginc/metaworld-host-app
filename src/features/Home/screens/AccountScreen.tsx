import Form from '@components/Form';
import Screen from '@components/UI/Screen';
import useUserStore from '@stores/user.store';
import React from 'react';

type Props = {};

const AccountScreen: React.FC<Props> = ({}) => {
  const { clearStore } = useUserStore();
  return (
    <Screen safeAreaEdge="all">
      <Form.FormButton onPress={clearStore}>Logout</Form.FormButton>
    </Screen>
  );
};

export default AccountScreen;
