import { flattenToAppURL } from '@plone/volto/helpers';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DefaultView from '@plone/volto/components/theme/View/DefaultView';

const CLMSDataSetAccordionView = (props) => {
  const { content } = props;
  const parent_url = content?.parent?.['@id'];
  const userSession = useSelector((state) => state.userSession);
  const isLoggedIn = userSession?.token;

  // if (!__SERVER__) {
  //   window.location.href = flattenToAppURL(parent_url);
  // }

  if (isLoggedIn) {
    return (
      <DefaultView
        key={props.content['@id']}
        content={props.content}
        location={props.location}
        token={props.token}
        history={props.history}
      />
    );
  } else {
    return <Redirect to={flattenToAppURL(parent_url)} />;
  }
};

export default CLMSDataSetAccordionView;
