import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Label } from 'semantic-ui-react';

import LatLonImg from '@eeacms/volto-clms-theme/../theme/clms/img/lat_lon.png';
import CclModal from '@eeacms/volto-clms-theme/components/CclModal/CclModal';

export const AreaNaming = (areaProps) => {
  const { item } = areaProps;
  switch (item?.area?.type) {
    case 'polygon':
      return (
        <>
          <CclModal
            draggable={true}
            trigger={<span className="cart-modal-trigger">Bounding Box</span>}
            size={'medium'}
          >
            <div className="image-modal">
              <TransformWrapper>
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <React.Fragment>
                    <div className="tools">
                      <button
                        className="tool-button ccl-button ccl-button--default"
                        onClick={() => zoomIn()}
                      >
                        Zoom in
                      </button>
                      <button
                        className="tool-button ccl-button ccl-button--default"
                        onClick={() => zoomOut()}
                      >
                        Zoom out
                      </button>
                      <button
                        className="tool-button ccl-button ccl-button--default"
                        onClick={() => resetTransform()}
                      >
                        Reset zoom
                      </button>
                    </div>
                    <TransformComponent>
                      <img src={LatLonImg} alt={'Lat Lon World'} />
                    </TransformComponent>
                  </React.Fragment>
                )}
              </TransformWrapper>
              <span className="modal-cart-bounding-boxes">
                <span className="cart-bounding-box-row">
                  <Label>{`N: ${item?.area.value[1].toFixed(1)}º`}</Label>&nbsp;
                  <Label>{`E: ${item?.area.value[2].toFixed(1)}º`}</Label>&nbsp;
                  {/* </span>
            <span className="cart-bounding-box-row"> */}
                  <Label>{`S: ${item?.area.value[3].toFixed(1)}º`}</Label>&nbsp;
                  <Label>{`W: ${item?.area.value[0].toFixed(1)}º`}</Label>
                </span>
              </span>
            </div>
          </CclModal>
          <span className="cart-bounding-boxes">
            <span className="cart-bounding-box-row">
              <Label>{`N: ${item?.area.value[1].toFixed(1)}º`}</Label>&nbsp;
              <Label>{`E: ${item?.area.value[2].toFixed(1)}º`}</Label>&nbsp;
              {/* </span>
            <span className="cart-bounding-box-row"> */}
              <Label>{`S: ${item?.area.value[3].toFixed(1)}º`}</Label>&nbsp;
              <Label>{`W: ${item?.area.value[0].toFixed(1)}º`}</Label>
            </span>
          </span>
        </>
      );
    case 'nuts':
      return item?.area.valueName || item?.area.value;
    case undefined:
      return item?.area || item?.file || '-';
    case typeof item?.area === 'string':
      return item?.area || item?.file || '-';
    default:
      return '-';
  }
};
