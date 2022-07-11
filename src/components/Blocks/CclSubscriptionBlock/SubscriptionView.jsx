import { SubscriptionView } from '@eeacms/volto-clms-theme/components/CLMSSubscriptionView';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

const SubscriptionBlockView = (props) => {
  const { data } = props;

  return (
    <CclModal
      trigger={
        <CclButton mode={'filled'}>{data.title || 'Text example...'}</CclButton>
      }
      size="small"
    >
      <SubscriptionView type={data.type || 'events'} />
    </CclModal>
  );
};

export default SubscriptionBlockView;
