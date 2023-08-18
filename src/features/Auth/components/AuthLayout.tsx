import React, { PropsWithChildren } from 'react';
import Box from '@components/UI/Box';
import { sizeScale } from '@helpers/scale';
import { useNavigation, useTheme } from '@react-navigation/native';
import Screen from '@components/UI/Screen';
import Image from '@components/UI/Image';
import Text from '@components/UI/Text';
import Pressable from '@components/UI/Pressable';

type Props = {
  title: string;
  subtitle: string;
  canGoBack?: boolean;
};

const AuthLayout: React.FC<PropsWithChildren<Props>> = ({
  title,
  subtitle,
  children,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const goBack = () => {
    return navigation.goBack();
  };

  return (
    <Screen enableScroll safeAreaEdge="all" backgroundColor={colors.background}>
      <Box paddingVertical={sizeScale(36)}>
        <Box alignItems="center" gap={sizeScale(24)}>
          {navigation.canGoBack() ? (
            <Box
              paddingHorizontal={sizeScale(10)}
              height={sizeScale(48)}
              width="100%">
              <Pressable onPress={goBack} padding={sizeScale(10)}>
                <Image
                  source={require('@assets/images/icons/arrow-left.png')}
                  tintColor={colors.text}
                  height={24}
                  width={24}
                />
              </Pressable>
            </Box>
          ) : (
            <Image
              source={require('@assets/images/logo.png')}
              height={48}
              width={48}
            />
          )}

          <Box
            paddingHorizontal={sizeScale(21)}
            alignItems="center"
            gap={sizeScale(8)}>
            <Text fontWeight="bold" fontSize={28} color={colors.text}>
              {title}
            </Text>
            <Text textAlign="center" fontSize={16} color="#8D9BB9">
              {subtitle}
            </Text>
          </Box>
        </Box>
      </Box>
      {children}
    </Screen>
  );
};

export default AuthLayout;
