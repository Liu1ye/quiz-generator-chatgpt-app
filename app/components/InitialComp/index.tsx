'use client';

import { useOpenAIGlobal, useWidgetProps } from '@/app/hooks';
import '@/app/i18n';
import i18next from 'i18next';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/app/i18n';

const InitialComp = ({children}: {children: React.ReactNode}) => {
    const widgetProps = useWidgetProps<{ language?: string }>();
    const language = widgetProps?.language;
    const theme = useOpenAIGlobal("theme");

    console.log('language', language);
    console.log('theme', theme);

    useEffect(() => {
        if (language) {
            i18next.changeLanguage(language);
        }
    }, [language]);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}

export default InitialComp;