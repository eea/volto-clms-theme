import React from 'react';

import { FontAwesomeIcon } from '@eeacms/volto-clms-utils/components';
import { withFontAwesomeLibs } from '@eeacms/volto-clms-utils/helpers';

function InfoDownloadDataSet({ temporalLimitExtent, fontAwesomeSolid }) {
  return (
    <div className="info-download-dataset-container">
      <span className="info-download-icon" direction="up">
        <FontAwesomeIcon icon={fontAwesomeSolid.faInfoCircle} />
      </span>
      <div className="info-download-dataset-description">
        For this product the maximum download period is{' '}
        <span className="info-download-days">{temporalLimitExtent} days.</span>
      </div>
    </div>
  );
}

export default withFontAwesomeLibs(InfoDownloadDataSet);
