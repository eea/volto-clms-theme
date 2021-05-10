import config from '@plone/volto/registry';
import { useSelector } from 'react-redux';

const SetLanguagePath = (path) => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl?.locale);
  return settings.isMultilingual ? `/${lang}/${path}` : path;
};

export default SetLanguagePath;
