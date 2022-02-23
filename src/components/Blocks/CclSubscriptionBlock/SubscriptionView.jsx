import { SubscriptionView } from '@eeacms/volto-clms-theme/components/CLMSSubscriptionView';

const SubscriptionBlockView = (props) => {
  const { data } = props;

  return <SubscriptionView type={data.type || 'events'} />;
};

export default SubscriptionBlockView;
