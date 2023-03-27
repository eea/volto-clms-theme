import { FormattedMessage } from 'react-intl';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

const NoResultsComponent = (props) => {
  const noResultsData = props?.noResults?.data;
  return noResultsData && noResultsData !== '<p></p>' ? (
    <StringToHTML string={noResultsData} />
  ) : (
    <FormattedMessage
      id="No results found."
      defaultMessage="No results found."
    />
  );
};

export default NoResultsComponent;
