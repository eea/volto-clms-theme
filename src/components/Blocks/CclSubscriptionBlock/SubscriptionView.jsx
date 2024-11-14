import { UniversalLink } from '@plone/volto/components';

const SubscriptionBlockView = (props) => {
  const { data } = props;

  return (
    <UniversalLink
      href={
        'https://subscriptions.copernicus-land.eea.europa.eu/copernicus-land-monitoring-service-subscription'
      }
      className="ccl-button ccl-button-green"
    >
      {data.title || 'Text example...'}
    </UniversalLink>
  );
};

export default SubscriptionBlockView;
