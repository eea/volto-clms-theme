import { SubscriptionView } from '@eeacms/volto-clms-theme/components/CLMSSubscriptionView';
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
      <SubscriptionView type={data.type || 'events'} />
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={SubscriptionSchema()}
          title="Product card block"
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
