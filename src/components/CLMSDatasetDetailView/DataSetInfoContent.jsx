import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import { CclInfoDescription, CclInfoContainer } from '../CclInfoDescription';
import CclCitation from '@eeacms/volto-clms-theme/components/CclCitation/CclCitation';
import { Accordion } from 'semantic-ui-react';
import AnimateHeight from 'react-animate-height';
import { Icon } from '@plone/volto/components';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
import config from '@plone/volto/registry';

const DataSetInfoContent = (props) => {
  const dispatch = useDispatch();
  const path = props.parent['@id'];
  const parent = useSelector((state) => state.reduxAsyncConnect.content.parent);
  const parentId = parent['@id'].split('/').pop();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  let libraries = searchSubrequests?.[props.id]?.items || [];

  React.useEffect(() => {
    dispatch(
      searchContent(
        path,
        {
          fullobjects: 1,
          portal_type: 'TechnicalLibrary',
          path: '/',
          associated_products: parentId,
        },
        props.id,
      ),
    );
  }, [path, props.id, parentId, dispatch]);

  const [activeIndex, setActiveIndex] = React.useState([0]);

  const handleClick = (e, itemProps) => {
    const { index } = itemProps;
    const newIndex =
      activeIndex.indexOf(index) === -1
        ? [...activeIndex, index]
        : activeIndex.filter((item) => item !== index);

    setActiveIndex(newIndex);
  };
  const { titleIcons } = config.blocks.blocksConfig.accordion;

  const isExclusive = (index) => {
    return activeIndex.includes(index);
  };

  return (
    <div>
      <CclCitation title="Validation status" marginBottom={true}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
          mauris ante, a iaculis leo placerat quis.
        </p>
      </CclCitation>
      <CclInfoContainer>
        <h2>General Info</h2>

        {props?.dataResourceAbstract?.data && (
          <CclInfoDescription
            title="Data resource title"
            description={props.dataResourceTitle}
            tooltip="Name by which the cited resource is known"
          ></CclInfoDescription>
        )}

        {props?.dataResourceAbstract?.data && (
          <CclInfoDescription
            title="Data resource abstract"
            description={
              <StringToHTML string={props.dataResourceAbstract.data} />
            }
            tooltip="Brief narrative summary of the content of the resource(s) with coverage, main attributes, data sources, important of the work, etc."
          ></CclInfoDescription>
        )}

        {props?.dataSources?.data && (
          <CclInfoDescription
            title="Resource type"
            description={<StringToHTML string={props.dataSources.data} />}
            tooltip="Scope to which metadata applies."
          ></CclInfoDescription>
        )}
      </CclInfoContainer>
      <div className="dataset-info-documents dropdown">
        <Accordion fluid styled>
          <React.Fragment>
            <Accordion.Title
              as={'h2'}
              onClick={handleClick}
              className={'accordion-title align-arrow-right'}
            >
              {isExclusive() ? (
                <Icon
                  name={
                    props?.data?.right_arrows
                      ? titleIcons.opened.rightPosition
                      : titleIcons.opened.leftPosition
                  }
                  size="24px"
                />
              ) : (
                <Icon
                  name={
                    props?.data?.right_arrows
                      ? titleIcons.closed.rightPosition
                      : titleIcons.closed.leftPosition
                  }
                  size="24px"
                />
              )}{' '}
              <span>Technical documents (X docs)</span>
            </Accordion.Title>
            <Accordion.Content active={isExclusive()}>
              <AnimateHeight animateOpacity duration={500} height={'auto'}>
                {libraries.length > 0 ? (
                  libraries.map((item, index) => (
                    <CclCard key={index} type="doc" card={item} />
                  ))
                ) : (
                  <p>There are no technical libraries for this product.</p>
                )}{' '}
              </AnimateHeight>
            </Accordion.Content>
          </React.Fragment>
        </Accordion>
      </div>
    </div>
  );
};

export default DataSetInfoContent;
