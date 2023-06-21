import React from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Accordion, Loader, Segment, Grid } from 'semantic-ui-react';

import { searchContent } from '@plone/volto/actions';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import config from '@plone/volto/registry';
import CclCitation from '@eeacms/volto-clms-theme/components/CclCitation/CclCitation';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import CclRelatedListingView from '@eeacms/volto-clms-theme/components/Blocks/CclRelatedListingBlock/CclRelatedListingView';
import { MetadataPaginatedListing } from './MetadataPaginatedListing';
import { CclInfoContainer, CclInfoDescription } from '../CclInfoDescription';

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
                        <Grid.Column width={3}>
                          <Grid.Row>
                            <Segment>
                              <strong>Type: </strong>
                              {props?.characteristics_type?.token}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row>
                            <Segment>
                              <strong>Release / Major version: </strong>
                              {props?.characteristics_release_major_version}
                            </Segment>
                          </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Grid.Row>
                            <Segment>
                              <strong>Spatial coverage: </strong>{' '}
                              {props?.characteristics_spatial_coverage}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row>
                            <Segment>
                              <strong>Spatial resolution: </strong>{' '}
                              {props?.characteristics_spatial_resolution}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row>
                            <Segment>
                              <strong>Spatial representation type: </strong>{' '}
                              {
                                props
                                  ?.characteristics_spatial_representation_type
                                  ?.token
                              }
                            </Segment>
                          </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Grid.Row>
                            <Segment>
                              <strong>Temporal extent: </strong>{' '}
                              {props?.characteristics_temporal_extent}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row>
                            <Segment>
                              <strong>Temporal usability: </strong>{' '}
                              {props?.characteristics_temporal_usability?.token}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row>
                            <Segment>
                              <strong>Update frequency: </strong>{' '}
                              {props?.characteristics_update_frequency?.token}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row>
                            <Segment>
                              <strong>Timeliness: </strong>{' '}
                              {props?.characteristics_timeliness}
                            </Segment>
                          </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Grid.Row>
                            <Segment>
                              <strong>Platform: </strong>{' '}
                              {props?.characteristics_platform}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row>
                            <Segment>
                              <strong>Sensor: </strong>{' '}
                              {props?.characteristics_sensor}
                            </Segment>
                          </Grid.Row>
                          <br></br>
                          <br></br>
                          <Grid.Row>
                            <Segment>
                              <strong>Thematic accuracy: </strong>{' '}
                              {props?.characteristics_thematic_accuracy}
                            </Segment>
                          </Grid.Row>
                          <Grid.Row>
                            <Segment>
                              <strong>Position accuracy: </strong>{' '}
                              {props?.characteristics_position_accuracy}
                            </Segment>
                          </Grid.Row>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <br></br>
                    <br></br>
                    {geonetwork_identifiers?.items?.length > 0 && (
                      <MetadataPaginatedListing
                        geonetwork_identifiers_items={
                          geonetwork_identifiers.items
                        }
                      />
                    )}
                  </AnimateHeight>
                </Accordion.Content>
              </Accordion>
              {/* {geonetwork_identifiers?.items?.length > 0 && (
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
                      <MetadataPaginatedListing
                        geonetwork_identifiers_items={
                          geonetwork_identifiers.items
                        }
                      />
                    </AnimateHeight>
                  </Accordion.Content>
                </Accordion>
              )} */}
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
