import { flattenToAppURL } from '@plone/volto/helpers';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { Redirect } from 'react-router-dom';

const CLMSDataSetAccordionView = (props) => {
  const { content } = props;
  const parent_url = content?.parent?.['@id'];

  // if (!__SERVER__) {
  //   window.location.href = flattenToAppURL(parent_url);
  // }

  return <Redirect to={flattenToAppURL(parent_url)} />;
};

export default CLMSDataSetAccordionView;
