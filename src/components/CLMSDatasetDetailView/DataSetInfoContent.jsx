import React from 'react';
import { CclInfoDescription, CclInfoContainer } from '../CclInfoDescription';
const DataSetInfoContent = (data) => {
  return (
    <div>
      <CclInfoContainer>
        <h2>Container title</h2>
        <CclInfoDescription
          title="Kaixo"
          description="Kaixo deskribapena"
        ></CclInfoDescription>
      </CclInfoContainer>
    </div>
  );
};

export default DataSetInfoContent;
