import React from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Accordion, Loader, Segment, Grid, Label } from 'semantic-ui-react';

import { searchContent } from '@plone/volto/actions';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import config from '@plone/volto/registry';
import CclCitation from '@eeacms/volto-clms-theme/components/CclCitation/CclCitation';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import CclRelatedListingView from '@eeacms/volto-clms-theme/components/Blocks/CclRelatedListingBlock/CclRelatedListingView';
import { MetadataPaginatedListing } from './MetadataPaginatedListing';
import { CclInfoContainer, CclInfoDescription } from '../CclInfoDescription';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { hasBlocksData } from '@plone/volto/helpers';

import './datasetinfocontent.less';
import { sanitizedHTML } from '../CclUtils';

const DataSetInfoContent = (props) => {
  const dispatch = useDispatch();
  const { UID, id, validation, data, geonetwork_identifiers, citation } = props;
  const location = useLocation();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  let libraries = searchSubrequests?.[id]?.items || [];
  let librariesPending = searchSubrequests?.[id]?.loading;
  let validationClearHTMLTags = sanitizedHTML(validation?.data);
  let citationClearHTMLTags = sanitizedHTML(citation?.data);
  let technical_documents_accordion_text = sanitizedHTML(
    props.technical_documents_accordion_text?.data,
  );

  React.useEffect(() => {
    if (UID) {
      dispatch(
        searchContent(
          '',
          {
            portal_type: 'TechnicalLibrary',
            path: '/',
            associated_datasets: UID,
            b_size: 99999,
          },
          id,
        ),
      );
      dispatch(
        searchContent(
          '',
          {
            portal_type: 'DataSetAccordion',
            review_state: 'published',
            path: location.pathname,
            b_size: 99999,
            metadata_fields: ['blocks', 'blocks_layout'],
            sort_on: 'getObjPositionInParent',
          },
          'accordions',
        ),
      );
    }
  }, [id, UID, dispatch, location]);

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

  const CharacteristicsMetadata = ({
    title,
    value,
    token = false,
    extraSpace = false,
  }) => {
    return (
      value && (
        <>
          <Grid.Row className="characteristic-row">
            <strong>{title}: </strong>
            <br />
            <Label>{token ? value?.token : value}</Label>
          </Grid.Row>
          {extraSpace && (
            <>
              <br />
              <br />
            </>
          )}
        </>
      )
    );
  };

  let accordionsState = searchSubrequests?.['accordions'] || {};

  return (
    <div>
      <CclInfoContainer>
        {props?.description ? (
          <CclInfoDescription
            description={<StringToHTML string={props.description} />}
          ></CclInfoDescription>
        ) : (
          ''
        )}
      </CclInfoContainer>
      {validation?.data && validationClearHTMLTags !== '' && (
        <CclCitation
          title="Validation status"
          marginBottom={true}
          children={<StringToHTML string={validation.data} />}
        ></CclCitation>
      )}
      {citation?.data && citationClearHTMLTags !== '' && (
        <CclCitation
          title="Dataset citation"
          marginBottom={true}
          children={<StringToHTML string={citation?.data} />}
        ></CclCitation>
      )}
      <div className="dataset-info-documents dropdown">
        <div className="accordion-block">
          {renderAccordion(geonetwork_identifiers?.items, libraries) && (
            <Segment basic>
              <Accordion fluid styled>
                <Accordion.Title
                  as={'h2'}
                  onClick={() => handleClick({ index: 99 })}
                  active={activeIndex.includes(99)}
                  index={99}
                  className={'accordion-title align-arrow-right'}
                >
                  {activeIndex.includes(99) ? (
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
                  <span>Characteristics</span>
                </Accordion.Title>
                <Accordion.Content active={activeIndex.includes(99)}>
                  <AnimateHeight animateOpacity duration={500} height={'auto'}>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={3}>
                          <CharacteristicsMetadata
                            title="Release / Major version"
                            value={props?.characteristics_release_major_version}
                          />
                          <CharacteristicsMetadata
                            title="Projection"
                            value={props?.characteristics_projection}
                          />
                          <CharacteristicsMetadata
                            title="Spatial coverage"
                            value={props?.characteristics_spatial_coverage}
                          />
                          <CharacteristicsMetadata
                            title="Spatial resolution"
                            value={props?.characteristics_spatial_resolution}
                          />

                          <CharacteristicsMetadata
                            title="Spatial representation"
                            value={
                              props?.characteristics_spatial_representation_type
                            }
                            token={true}
                          />
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <CharacteristicsMetadata
                            title="Temporal extent"
                            value={props?.characteristics_temporal_extent}
                          />
                          <CharacteristicsMetadata
                            title="Temporal usability"
                            value={props?.characteristics_temporal_usability}
                            token={true}
                          />

                          <CharacteristicsMetadata
                            title="Update frequency"
                            value={props?.characteristics_update_frequency}
                            token={true}
                          />

                          <CharacteristicsMetadata
                            title="Timeliness"
                            value={props?.characteristics_timeliness}
                          />
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <CharacteristicsMetadata
                            title="Type"
                            value={props?.characteristics_type}
                            token={true}
                          />
                          <CharacteristicsMetadata
                            title="Platform"
                            value={props?.characteristics_platform}
                          />
                          <CharacteristicsMetadata
                            title="Sensor"
                            value={props?.characteristics_sensor}
                          />
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <CharacteristicsMetadata
                            title="Position accuracy"
                            value={props?.characteristics_position_accuracy}
                          />
                          <CharacteristicsMetadata
                            title="Thematic accuracy"
                            value={props?.characteristics_thematic_accuracy}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    {geonetwork_identifiers?.items?.length > 0 && (
                      <>
                        <br />
                        <br />
                        <h3>Access full metadata here</h3>
                        <MetadataPaginatedListing
                          id={'metadata-access'}
                          geonetwork_identifiers_items={
                            geonetwork_identifiers.items
                          }
                        />
                      </>
                    )}
                  </AnimateHeight>
                </Accordion.Content>
              </Accordion>

              {accordionsState?.loaded &&
                accordionsState.items.map((item, key) => (
                  <Accordion fluid styled key={key}>
                    <Accordion.Title
                      as={'h2'}
                      onClick={() => handleClick({ index: key })}
                      active={activeIndex === key}
                      index={key}
                      className={'accordion-title align-arrow-right'}
                    >
                      {activeIndex.includes(key) ? (
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
                      <span>{item.title}</span>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex.includes(key)}>
                      <AnimateHeight
                        animateOpacity
                        duration={500}
                        height={'auto'}
                      >
                        {hasBlocksData(item) && <RenderBlocks content={item} />}
                      </AnimateHeight>
                    </Accordion.Content>
                  </Accordion>
                ))}

              {librariesPending && <Loader active inline="centered" />}
              {libraries?.length > 0 && (
                <Accordion fluid styled>
                  <Accordion.Title
                    as={'h2'}
                    onClick={() => handleClick({ index: 98 })}
                    className={'accordion-title align-arrow-right'}
                  >
                    {activeIndex.includes(98) ? (
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
                  <Accordion.Content active={activeIndex.includes(98)}>
                    <AnimateHeight
                      animateOpacity
                      duration={500}
                      height={'auto'}
                    >
                      {props.technical_documents_accordion_text?.data &&
                        technical_documents_accordion_text !== '' && (
                          <StringToHTML
                            string={
                              props.technical_documents_accordion_text?.data
                            }
                          />
                        )}
                      <CclRelatedListingView
                        id={'dataset-info-technicals'}
                        properties={{ ...props }}
                        data={{
                          variation: 'CclCardsdoc',
                          content_type: 'TechnicalLibrary',
                        }}
                        associated_elements="dataset"
                        searchParamsExecution={() => {
                          const newIndex =
                            activeIndex.indexOf(1) === -1
                              ? [...activeIndex, 1]
                              : activeIndex.filter((item) => item !== 1);
                          setActiveIndex(newIndex);
                        }}
                      />
                    </AnimateHeight>
                  </Accordion.Content>
                </Accordion>
              )}

              {props.jrc_show_related_datasets && props.datasets.length > 0 && (
                <Accordion fluid styled>
                  <Accordion.Title
                    as={'h2'}
                    onClick={() => handleClick({ index: 95 })}
                    active={activeIndex === 95}
                    index={95}
                    className={'accordion-title align-arrow-right'}
                  >
                    {activeIndex.includes(95) ? (
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
                    <span>Related datasets</span>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex.includes(95)}>
                    <AnimateHeight
                      animateOpacity
                      duration={500}
                      height={'auto'}
                    >
                      <CclRelatedListingView
                        id={'dataset-info-datasets'}
                        properties={{ ...props }}
                        data={{
                          variation: 'CclCardsdoc',
                          content_type: 'DataSet',
                        }}
                        associated_elements="datasets"
                        directRelation={true}
                        directQuery={{
                          UID: props.datasets.map((item) => item.token),
                        }}
                        searchParamsExecution={() => {
                          const newIndex =
                            activeIndex.indexOf(1) === -1
                              ? [...activeIndex, 1]
                              : activeIndex.filter((item) => item !== 1);
                          setActiveIndex(newIndex);
                        }}
                      />
                    </AnimateHeight>
                  </Accordion.Content>
                </Accordion>
              )}
            </Segment>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSetInfoContent;
