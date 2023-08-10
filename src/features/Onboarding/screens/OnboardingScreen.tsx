import React, { useMemo, ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import Screen from '@components/UI/Screen';
import OnboardFlow from '@features/components/OnboardFlow';
import train_to_earn from '@assets/images/onboarding/train_to_earn.png';
import manage_assets from '@assets/images/onboarding/manage_assets.png';
import discover_app from '@assets/images/onboarding/discover_app.png';

type Props = {};

const OnboardingScreen: React.FC<Props> = ({}) => {
  const [t] = useTranslation('onboarding');

  const pages = useMemo<ComponentProps<typeof OnboardFlow>['pages']>(() => {
    return [
      {
        title: t('contents.page_1.title'),
        subtitle: t('contents.page_1.description'),
        imageSource: train_to_earn,
      },
      {
        title: t('contents.page_2.title'),
        subtitle: t('contents.page_2.description'),
        imageSource: manage_assets,
      },
      {
        title: t('contents.page_3.title'),
        subtitle: t('contents.page_3.description'),
        imageSource: discover_app,
      },
    ];
  }, [t]);

  return (
    <Screen safeAreaEdge="all" backgroundColor="#070C21">
      <OnboardFlow pages={pages} />
    </Screen>
  );
};

export default OnboardingScreen;
