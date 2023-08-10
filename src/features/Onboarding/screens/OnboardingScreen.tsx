import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { OnboardFlow, OnboardFlowProps } from 'react-native-onboard';
import { Image, StyleSheet } from 'react-native';
import Screen from '@components/UI/Screen';

type Props = {};

const OnboardingScreen: React.FC<Props> = ({}) => {
  const [t] = useTranslation('onboarding');

  const pages = useMemo<OnboardFlowProps['pages']>(() => {
    return [
      {
        id: '1',
        title: t('contents.page_1.title'),
        subtitle: t('contents.page_1.description'),
        imageUri: Image.resolveAssetSource(
          require('@assets/images/onboarding/train_to_earn.png'),
        ).uri,
      },
      {
        id: '2',
        title: t('contents.page_2.title'),
        subtitle: t('contents.page_2.description'),
        imageUri: Image.resolveAssetSource(
          require('@assets/images/onboarding/manage_assets.png'),
        ).uri,
      },
      {
        id: '3',
        title: t('contents.page_3.title'),
        subtitle: t('contents.page_3.description'),
        imageUri: Image.resolveAssetSource(
          require('@assets/images/onboarding/discover_app.png'),
        ).uri,
      },
    ];
  }, [t]);

  useEffect(() => {
    console.log('OnboardingScreen mounted');
    return () => {
      console.log('OnboardingScreen unmounted');
    };
  }, []);

  return (
    <Screen backgroundColor="#070C21">
      <OnboardFlow
        titleStyle={styles.title}
        textStyle={styles.text}
        pages={pages}
        type="inline"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'HelveticaNowDisplay',
    fontWeight: 'bold',
    color: '#FCFCFD',
    fontSize: 28,
  },
  text: {
    fontFamily: 'HelveticaNowDisplay',
    color: '#707A8F',
    fontSize: 14,
  },
});

export default OnboardingScreen;
