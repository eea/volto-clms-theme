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

import './datasetinfocontent.less';

const DataSetInfoContent = (props) => {
  const dispatch = useDispatch();
  const { UID, id, validation, data, geonetwork_identifiers, citation } = props;
  const location = useLocation();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  let libraries = searchSubrequests?.[id]?.items || [];
  let librariesPending = searchSubrequests?.[id]?.loading;
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

  return (
    <div>
      {validation?.data &&
        validation?.data !== '<p><br/></p>' &&
        validation?.data !== '<p></p>' && (
          <CclCitation
            title="Validation status"
            marginBottom={true}
            children={<StringToHTML string={validation.data} />}
          ></CclCitation>
        )}
      <CclInfoContainer>
        {props?.description ? (
          <CclInfoDescription
            description={<StringToHTML string={props.description} />}
          ></CclInfoDescription>
        ) : (
          ''
        )}
      </CclInfoContainer>
      {citation?.data &&
        citation?.data !== '<p><br/></p>' &&
        citation?.data !== '<p></p>' && (
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
                  active={activeIndex === 99}
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
                        <Grid.Column width={4}>
                          <CharacteristicsMetadata
                            title="Release / Major version"
                            value={props?.characteristics_release_major_version}
                            extraSpace={true}
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
                        <Grid.Column width={2}>
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
                          geonetwork_identifiers_items={
                            geonetwork_identifiers.items
                          }
                        />
                      </>
                    )}
                  </AnimateHeight>
                </Accordion.Content>
              </Accordion>
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
                      <CclRelatedListingView
                        id={'dataset-info-technicals'}
                        properties={{ ...props }}
                        data={{
                          variation: 'CclCardsdoc',
                          content_type: 'TechnicalLibrary',
                        }}
                        associated_elements="dataset"
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
