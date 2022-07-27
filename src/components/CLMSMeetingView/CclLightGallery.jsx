import React from 'react';
import PropTypes from 'prop-types';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import './styles.less';

import { Image } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '@plone/volto/actions';

export const LightGalleryListing = () => {
  const dispatch = useDispatch();
  const images = useSelector(
    (state) => state?.search?.subrequests?.images?.items,
  );

  React.useEffect(() => {
    dispatch(
      searchContent(
        window.location.pathname,
        {
          'path.depth': 1,
          portal_type: 'Image',
        },
        'images',
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        {images?.length > 0 && (
          <LightGallery plugins={[lgZoom]} mode="lg-fade">
            {images?.map((item, index) => (
              <a
                key={index}
                className="gallery-item"
                href={flattenToAppURL(
                  `${item['@id']}/@@images/${item?.image_field}/huge`,
                )}
                data-sub-html={item?.description}
                data-src={flattenToAppURL(
                  `${item['@id']}/@@images/${item?.image_field}/huge`,
                )}
              >
                <Image
                  src={`${item['@id']}/@@images/${item?.image_field}/large`}
                  className="img-responsive"
                  alt={item?.description}
                />
              </a>
            ))}
          </LightGallery>
        )}
      </div>
    </>
  );
};
LightGalleryListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};
export default LightGalleryListing;
