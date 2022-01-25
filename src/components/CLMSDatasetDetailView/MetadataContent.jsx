import { CclInfoContainer, CclInfoDescription } from '../CclInfoDescription';

import BoundingBoxComponent from './BoundingBoxComponent';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import ContactComponent from './ContactComponent';
import DistributionInfoComponent from './DistributionInfoComponent';
import { Label } from 'semantic-ui-react';
import React from 'react';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

const MetadataContent = (data) => {
  return (
    <>
      {data?.geonetwork_identifiers?.items.map((item, key) => {
        return (
          <CclButton
            key={key}
            className="ccl-button ccl-button--default download-dataset-metadata"
            url={
              item.type === 'EEA'
                ? 'https://sdi.eea.europa.eu/catalogue/srv/api/records/' +
                  item.id +
                  '/formatters/xsl-view?output=pdf&language=eng&approved=true'
                : 'https://land.copernicus.vgt.vito.be/geonetwork/srv/api/records/' +
                  item.id +
                  '/formatters/xsl-view?root=div&output=pdf'
            }
            download={true}
          >
            Download metadata: {item.title}
          </CclButton>
        );
      })}

      <CclInfoContainer>
        <h2>Data identification</h2>
        {data?.dataResourceTitle && (
          <CclInfoDescription
            title="Resource title"
            tooltip="Name by which the cited resource is known"
            description={data?.dataResourceTitle}
          />
        )}
        {data?.resourceEffective && (
          <CclInfoDescription
            title="Date of publication"
            tooltip=""
            description={new Date(data?.resourceEffective).toLocaleDateString()}
          />
        )}
        {data?.resourceModified && (
          <CclInfoDescription
            title="Revision date"
            tooltip=""
            description={new Date(data?.resourceModified).toLocaleDateString()}
          />
        )}
        <CclInfoDescription
          title="Resource abstract"
          tooltip="Brief narrative summary of the content of the resource(s) with coverage, main attributes, data sources, important of the work, etc."
          description={
            <StringToHTML string={data?.dataResourceAbstract?.data || ''} />
          }
        />
        <CclInfoDescription
          title="Keywords"
          tooltip=""
          description={
            data?.keywords &&
            data?.keywords?.length > 0 && (
              <Label.Group>
                {data?.keywords.map((keyword, key) => {
                  return (
                    <Label key={key} color="olive">
                      {keyword}
                    </Label>
                  );
                })}
              </Label.Group>
            )
          }
        />
        {data?.geographicCoverage?.geolocation && (
          <CclInfoDescription
            title="Geographic coverage"
            tooltip=""
            description={
              <Label.Group>
                {data?.geographicCoverage?.geolocation.map((location, key) => {
                  return (
                    <Label key={key} color="olive">
                      {location.label}
                    </Label>
                  );
                })}
              </Label.Group>
            }
          />
        )}
        {data?.accessAndUseLimitationPublic_line && (
          <CclInfoDescription
            title="Limitation of public access"
            tooltip=""
            description={data?.accessAndUseLimitationPublic_line}
          />
        )}
        <CclInfoDescription
          title="Conditions applying to access and use"
          tooltip=""
          description={
            <StringToHTML string={data?.accessAndUseConstraints?.data || ''} />
          }
        />
        <CclInfoDescription
          title="Spatial Resolution"
          tooltip=""
          description={data?.qualitySpatialResolution_line}
        />
        {data?.classificationTopicCategory && (
          <CclInfoDescription
            title="Topic of Category"
            tooltip=""
            description={
              <Label.Group>
                {data?.classificationTopicCategory &&
                  data?.classificationTopicCategory.map((topic, key) => {
                    return (
                      <Label key={key} color="olive">
                        {topic.title}
                      </Label>
                    );
                  })}
              </Label.Group>
            }
          />
        )}
        {data?.geographicBoundingBox?.items?.length > 0 && (
          <CclInfoDescription
            title="Bounding Boxes"
            tooltip=""
            description={data?.geographicBoundingBox?.items.map((bbox, key) => {
              return <BoundingBoxComponent key={key} bbox={bbox} />;
            })}
          />
        )}
        {data?.temporalCoverage && (
          <CclInfoDescription
            title="Temporal Extent"
            tooltip=""
            description={
              <Label.Group>
                {data?.temporalCoverage &&
                  data?.temporalCoverage.map((year, key) => {
                    return (
                      <Label key={key} color="olive">
                        {year}
                      </Label>
                    );
                  })}
              </Label.Group>
            }
          />
        )}
      </CclInfoContainer>
      {data?.dataResourceType && (
        <CclInfoContainer>
          <h2>Hierarchy Level</h2>
          <CclInfoDescription
            title="Resource Type"
            tooltip=""
            description={data?.dataResourceType}
          />
        </CclInfoContainer>
      )}
      {data?.responsiblePartyWithRole?.items &&
        data?.responsiblePartyWithRole?.items?.length > 0 && (
          <CclInfoContainer>
            <h2>Contacts</h2>
            <CclInfoDescription
              title="Responsible Party with Role"
              tooltip=""
              description={data?.responsiblePartyWithRole?.items.map(
                (item, key) => {
                  return <ContactComponent key={key} contact={item} />;
                },
              )}
            />
          </CclInfoContainer>
        )}
      {data?.coordinateReferenceSystemList &&
        data?.coordinateReferenceSystemList.length > 0 && (
          <CclInfoContainer>
            <h2>Reference system info</h2>
            <CclInfoDescription
              title="Coordinate Reference System"
              tooltip="CRS of the resource"
              description={
                <Label.Group>
                  {data?.coordinateReferenceSystemList &&
                    data?.coordinateReferenceSystemList.map(
                      (reference, key) => {
                        return (
                          <Label key={key} color="olive">
                            {reference}
                          </Label>
                        );
                      },
                    )}
                </Label.Group>
              }
            />
          </CclInfoContainer>
        )}
      <CclInfoContainer>
        <h2>Data quality info</h2>
        <CclInfoDescription
          title="Specification"
          tooltip="A citation of the implementing rules adopted under Article 7(1) of Directive 2007/2/EC or other specification to which a particular resource conforms"
          description={
            <StringToHTML string={data?.conformitySpecification?.data} />
          }
        />
        <CclInfoDescription
          title="Pass"
          tooltip=""
          description={data?.conformityPass?.title}
        />
        <CclInfoDescription
          title="Lineage"
          tooltip="General explanation of the data produce knowledge's about the lineage of a dataset"
          description={<StringToHTML string={data?.qualityLineage?.data} />}
        />
      </CclInfoContainer>
      {data?.distributionInfo?.items &&
        data?.distributionInfo?.items?.length > 0 && (
          <CclInfoContainer>
            <h2>Distribution info</h2>
            <CclInfoDescription
              title="Resource Locator and Services"
              tooltip=""
              description={data?.distributionInfo?.items.map(
                (resource, key) => {
                  return (
                    <DistributionInfoComponent key={key} resource={resource} />
                  );
                },
              )}
            />
          </CclInfoContainer>
        )}
    </>
  );
};

export default MetadataContent;
