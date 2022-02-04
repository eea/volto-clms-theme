import { CclInfoContainer, CclInfoDescription } from '../CclInfoDescription';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion } from 'semantic-ui-react';
import AnimateHeight from 'react-animate-height';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
import CclCitation from '@eeacms/volto-clms-theme/components/CclCitation/CclCitation';
import { Icon } from '@plone/volto/components';
import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import config from '@plone/volto/registry';
import { searchContent } from '@plone/volto/actions';

const DataSetInfoContent = (props) => {
  const dispatch = useDispatch();
  const { UID, id } = props;
  const path = props['@id'];
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  let libraries = searchSubrequests?.[id]?.items || [];

  React.useEffect(() => {
    dispatch(
      searchContent(
        path,
        {
          fullobjects: 1,
          portal_type: 'TechnicalLibrary',
          path: '/',
          associated_datasets: UID,
        },
        id,
      ),
    );
  }, [path, id, UID, dispatch]);

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

  function iconName(iProps, iTitleIcons) {
    return iProps?.data?.right_arrows
      ? iTitleIcons.rightPosition
      : iTitleIcons.leftPosition;
  }

  return (
    <div>
      {props?.validation?.data && (
        <CclCitation
          title="Validation status"
          marginBottom={true}
          children={<StringToHTML string={props.validation.data} />}
        ></CclCitation>
      )}
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
      {libraries?.length > 0 && (
        <div className="dataset-info-documents dropdown">
          <div className="accordion-block">
            <Accordion fluid styled>
              <React.Fragment>
                <Accordion.Title
                  as={'h2'}
                  onClick={handleClick}
                  className={'accordion-title align-arrow-right'}
                >
                  {isExclusive() ? (
                    <Icon
                      name={iconName(props, titleIcons.opened)}
                      size="24px"
                    />
                  ) : (
                    <Icon
                      name={iconName(props, titleIcons.closed)}
                      size="24px"
                    />
                  )}
                  <span>Technical documents</span>
                </Accordion.Title>
                <Accordion.Content active={isExclusive()}>
                  <AnimateHeight animateOpacity duration={500} height={'auto'}>
                    {libraries.map((item, index) => (
                      <CclCard key={index} type="doc" card={item} />
                    ))}
                  </AnimateHeight>
                </Accordion.Content>
              </React.Fragment>
            </Accordion>
          </div>
        </div>
      )}

      <CclCitation title="Dataset citation" marginBottom={true}>
        <p>
          © European Union, Copernicus Land Monitoring Service , European
          Environment Agency (EEA)
        </p>
      </CclCitation>
    </div>
  );
};

export default DataSetInfoContent;
