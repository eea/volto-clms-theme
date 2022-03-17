import React from 'react';
import PropTypes from 'prop-types';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import { Image } from 'semantic-ui-react';
import './styles.less';
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
          fullobjects: true,
        },
        'images',
      ),
    );
    return () => {
      dispatch(searchContent([]));
    };
  }, [dispatch]);

  return (
    <>
      <div>
        <LightGallery plugins={[lgZoom]} mode="lg-fade">
          {images?.map((item, index) => (
            <a
              key={index}
              className="gallery-item"
              href={flattenToAppURL(item?.image?.download)}
              data-sub-html={item.description}
              data-src={flattenToAppURL(item?.image?.scales?.huge?.download)}
            >
              <Image
                src={flattenToAppURL(item?.image?.scales?.large?.download)}
                className="img-responsive"
                alt={item.description}
              />
            </a>
          ))}
        </LightGallery>
      </div>
    </>
  );
};
LightGalleryListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default LightGalleryListing;
