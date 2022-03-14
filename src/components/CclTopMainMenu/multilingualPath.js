import config from '@plone/volto/registry';
import { useSelector } from 'react-redux';

export const SetLanguagePath = (path) => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl?.locale);
  return settings.isMultilingual ? `/${lang}/${path}` : path;
};
