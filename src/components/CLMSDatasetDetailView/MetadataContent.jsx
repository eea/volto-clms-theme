import React from 'react';
import { CclInfoDescription, CclInfoContainer } from '../CclInfoDescription';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

const MetadataContent = (data) => {
  return (
    <>
      <CclButton
        className="ccl-button ccl-button--default download-dataset-metadata"
        url={data['@id']}
        download={true}
      >
        Download metadata
      </CclButton>
      <CclInfoContainer>
        <h2>Data identification</h2>
        <CclInfoDescription
          title="Resource title"
          tooltip="Name by which the cited resource is known"
          description={data.dataResourceTitle}
        />
        <CclInfoDescription
          title="Resource abstract"
          tooltip="Brief narrative summary of the content of the resource(s) with coverage, main attributes, data sources, important of the work, etc."
          description={
            <StringToHTML string={data.dataResourceAbstract?.data || ''} />
          }
        />
      </CclInfoContainer>
      <CclInfoContainer>
        <h2>Classification of spatial data</h2>
      </CclInfoContainer>
      <CclInfoContainer>
        <h2>Geographic reference</h2>
        <CclInfoDescription
          title="Coordinate Reference System"
          tooltip="CRS of the resource"
          description={data.coordinateReferenceSystem}
        />
      </CclInfoContainer>
      <CclInfoContainer>
        <h2>Temporal reference</h2>
      </CclInfoContainer>
      <CclInfoContainer>
        <h2>Quality and validity</h2>
        <CclInfoDescription
          title="Lineage"
          tooltip="General explanation of the data produce knowledge's about the lineage of a dataset"
          description={<StringToHTML string={data.qualityLineage.data} />}
        />
        <CclInfoDescription
          title="Spatial resolution"
          tooltip="A set of zero to many resolution distances (typically for gridded data and imagery-derived products) or equivalent scales (typically for maps or map-derived products)"
          description={
            <StringToHTML string={data.qualitySpatialResolution.data} />
          }
        />
      </CclInfoContainer>
      <CclInfoContainer>
        <h2>Conformity</h2>
        <CclInfoDescription
          title="Specification"
          tooltip="A citation of the implementing rules adopted under Article 7(1) of Directive 2007/2/EC or other specification to which a particular resource conforms"
          description={
            <StringToHTML string={data.conformitySpecification.data} />
          }
        />
      </CclInfoContainer>
      <CclInfoContainer>
        <h2>Constraints related to access and use</h2>
        <CclInfoDescription
          title="Conditions applying to access and use"
          tooltip="Restriction on the access and use of a resource or metadata"
          description={
            <StringToHTML string={data.accessAndUseConstraints.data} />
          }
        />
        <CclInfoDescription
          title="Limitation of public access"
          tooltip="Limitation and other reason for public access"
          description={
            <StringToHTML string={data.accessAndUseLimitationPublic.data} />
          }
        />
      </CclInfoContainer>
      <CclInfoContainer>
        <h2>Responsible organisation</h2>
        <CclInfoDescription
          title="Responsible party"
          tooltip="Organisation associated with the resource. Organisation name, contact information (email)."
          description={<StringToHTML string="{data.owners.data}" />}
        />
        <CclInfoDescription
          title="Responsible party role"
          tooltip="Function performed by the party"
          description={
            <StringToHTML string="{data.responsiblePartyRole.data}" />
          }
        />
      </CclInfoContainer>
    </>
  );
};

export default MetadataContent;
