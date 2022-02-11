import { Accordion, Loader, Segment } from 'semantic-ui-react';
import { CclInfoContainer, CclInfoDescription } from '../CclInfoDescription';
import { useDispatch, useSelector } from 'react-redux';

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
  const {
    UID,
    id,
    validation,
    dataResourceAbstract,
    data,
    geonetwork_identifiers,
    citation,
  } = props;
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  let libraries = searchSubrequests?.[id]?.items || [];
  let librariesPending = searchSubrequests?.[id]?.loading;
  React.useEffect(() => {
    UID &&
      dispatch(
        searchContent(
          '',
          {
            fullobjects: 1,
            portal_type: 'TechnicalLibrary',
            path: '/',
            associated_datasets: UID,
          },
          id,
        ),
      );
  }, [id, UID, dispatch]);

  const [activeIndex, setActiveIndex] = React.useState([99]);

  const handleClick = ({ index }) => {
    const newIndex =
      activeIndex.indexOf(index) === -1
        ? [...activeIndex, index]
        : activeIndex.filter((item) => item !== index);

    setActiveIndex(newIndex);
  };
  const titleIcons = config.blocks?.blocksConfig?.accordion?.titleIcons;

  const renderAccordion = (gn, lib) => {
    return gn?.length > 0 || lib?.length > 0;
  };

  function iconName(iconData, iTitleIcons) {
    return iconData?.right_arrows
      ? iTitleIcons.rightPosition
      : iTitleIcons.leftPosition;
  }

  return (
    <div>
      {validation?.data && validation?.data !== '<p><br/></p>' && (
        <CclCitation
          title="Validation status"
          marginBottom={true}
          children={<StringToHTML string={validation.data} />}
        ></CclCitation>
      )}
      <CclInfoContainer>
        {dataResourceAbstract?.data && (
          <CclInfoDescription
            title="Data resource abstract"
            description={<StringToHTML string={dataResourceAbstract.data} />}
            tooltip="Brief narrative summary of the content of the resource(s) with coverage, main attributes, data sources, important of the work, etc."
          ></CclInfoDescription>
        )}
      </CclInfoContainer>
      <div className="dataset-info-documents dropdown">
        <div className="accordion-block">
          {renderAccordion(geonetwork_identifiers?.items, libraries) && (
            <Segment basic>
              {geonetwork_identifiers?.items?.length > 0 && (
                <Accordion fluid styled>
                  <Accordion.Title
                    as={'h2'}
                    onClick={() => handleClick({ index: 0 })}
                    className={'accordion-title align-arrow-right'}
                  >
                    {activeIndex.includes(0) ? (
                      <Icon
                        name={iconName(data, titleIcons.opened)}
                        size="24px"
                      />
                    ) : (
                      <Icon
                        name={iconName(data, titleIcons.closed)}
                        size="24px"
                      />
                    )}
                    <span>Metadata</span>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex.includes(0)}>
                    <AnimateHeight
                      animateOpacity
                      duration={500}
                      height={'auto'}
                    >
                      <ul>
                        {geonetwork_identifiers.items.map((geonetwork, key) => (
                          <li key={key}>
                            <strong>{geonetwork.title}</strong> -{' '}
                            <a
                              href={
                                geonetwork.type === 'EEA'
                                  ? `https://sdi.eea.europa.eu/catalogue/srv/api/records/${geonetwork.id}/formatters/xsl-view?output=pdf&language=eng&approved=true`
                                  : `https://land.copernicus.vgt.vito.be/geonetwork/srv/api/records/${geonetwork.id}/formatters/xsl-view?root=div&output=pdf`
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              PDF
                            </a>{' '}
                            -{' '}
                            <a
                              href={
                                geonetwork.type === 'EEA'
                                  ? `https://sdi.eea.europa.eu/catalogue/srv/api/records/${geonetwork.id}/formatters/xml?approved=true`
                                  : `https://land.copernicus.vgt.vito.be/geonetwork/srv/api/records/${geonetwork.id}/formatters/xml?attachment=true`
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              XML
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AnimateHeight>
                  </Accordion.Content>
                </Accordion>
              )}
              {librariesPending && <Loader active inline="centered" />}
              {libraries?.length > 0 && (
                <Accordion fluid styled>
                  <Accordion.Title
                    as={'h2'}
                    onClick={() => handleClick({ index: 1 })}
                    className={'accordion-title align-arrow-right'}
                  >
                    {activeIndex.includes(1) ? (
                      <Icon
                        name={iconName(data, titleIcons.opened)}
                        size="24px"
                      />
                    ) : (
                      <Icon
                        name={iconName(data, titleIcons.closed)}
                        size="24px"
                      />
                    )}
                    <span>Technical documents</span>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex.includes(1)}>
                    <AnimateHeight
                      animateOpacity
                      duration={500}
                      height={'auto'}
                    >
                      {libraries.map((item, index) => (
                        <CclCard key={index} type="doc" card={item} />
                      ))}
                    </AnimateHeight>
                  </Accordion.Content>
                </Accordion>
              )}
            </Segment>
          )}
        </div>
      </div>

      {citation?.data && citation?.data !== '<p><br/></p>' && (
        <CclCitation
          title="Citation status"
          marginBottom={true}
          children={<StringToHTML string={citation?.data} />}
        ></CclCitation>
      )}
    </div>
  );
};

export default DataSetInfoContent;
