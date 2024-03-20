import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { SidebarPortal } from '@plone/volto/components';
import { SubscriptionSchema } from './schema';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';

const SubscriptionBlockEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;

  return (
    <>
      <div className="ccl-block-editor-header">
        <legend
          onClick={() => {
            props.setSidebarTab(1);
          }}
          aria-hidden="true"
        />
      </div>
      <CclButton mode={'filled'}>{data.title || 'Text example...'}</CclButton>
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={SubscriptionSchema()}
          title="Subscription button block"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default SubscriptionBlockEdit;
