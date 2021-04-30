import React from 'react';
import { CclInfoDescription, CclInfoContainer } from '../CclInfoDescription';
import CclCitation from '@eeacms/volto-clms-theme/components/CclCitation/CclCitation';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
import CclCardContainerBlockView from '@eeacms/volto-clms-theme/components/Blocks/CclCardContainerBlock/CclCardContainerBlockView';

const DataSetInfoContent = (data) => {
  return (
    <div>
      <CclCitation title="Validation status (MOCK)" marginBottom={true}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus
          mauris ante, a iaculis leo placerat quis.
        </p>
      </CclCitation>
      <CclInfoContainer>
        <h2>Dataset Info</h2>

        {data?.dataResourceAbstract?.data && (
          <CclInfoDescription
            title="Data resource title"
            description={data.dataResourceTitle}
          ></CclInfoDescription>
        )}

        {data?.dataResourceAbstract?.data && (
          <CclInfoDescription
            title="Data resource abstract"
            description={
              <StringToHTML string={data.dataResourceAbstract.data} />
            }
            tooltip="Hello word!"
          ></CclInfoDescription>
        )}

        {data?.dataSources?.data && (
          <CclInfoDescription
            title="Resource type"
            description={<StringToHTML string={data.dataSources.data} />}
            tooltip="Hello word!"
          ></CclInfoDescription>
        )}
        {data?.dataResourceLocator && (
          <>
            <CclInfoDescription
              title="Resource locator"
              description={
                <>
                  {data.dataResourceLocator}
                  <br />
                  <CclButton url={data.dataResourceLocator} target="_blank">
                    Go to resource locator
                  </CclButton>
                </>
              }
            ></CclInfoDescription>
          </>
        )}
        <div class="dataset-info-documents dropdown">
          <div class="ccl-expandable__button" aria-expanded="true">
            <h2>Technical documents (X docs)</h2>
          </div>
          <div class="documents-dropdown">
            <CclCard
              title={data.title}
              description={data.description}
              docInfo={data.docInfo}
            ></CclCard>
            <CclCard
              title={data.title}
              description={data.description}
              docInfo={data.docInfo}
            ></CclCard>
          </div>
        </div>
        <h2>Found the dataset in this products</h2>
        <div class="card-container">
          <CclCard
          type="block"
          title="Dataset title"
          description={data.description}
          image={data.image}
        ></CclCard><CclCard
        type="block"
        title="Dataset title"
        description={data.description}
        image={data.image}
      ></CclCard>    
        </div>
      </CclInfoContainer>
    </div>
  );
};

export default DataSetInfoContent;
