import React from 'react';
import { CclInfoDescription, CclInfoContainer } from '../CclInfoDescription';
// import CclCitation from '../CclCitation/CclCitation';
import CclCitation from '@eeacms/volto-clms-theme/components/CclCitation/CclCitation';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

const DataSetInfoContent = (data) => {
  return (
    <div>
      <CclCitation title="TITLE" marginBottom={true}>
        <p>Kaixo mundua citation</p>
      </CclCitation>
      <CclInfoContainer>
        <h2>Dataset Info</h2>
        <CclInfoDescription
          title="Data resource title"
          description={data.dataResourceTitle}
        ></CclInfoDescription>
        <CclInfoDescription
          title="Data resource abstract"
          description={<StringToHTML string={data.dataResourceAbstract.data} />}
        ></CclInfoDescription>
      </CclInfoContainer>
    </div>
  );
};

export default DataSetInfoContent;
