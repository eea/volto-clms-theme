import React from 'react';
import Slider from 'react-slick';

const CclHomeUsersBlockEdit = (props) => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div>
      <Slider {...settings}>
        <div className="ccl-list-item ">
          <div className="ccl-list-item-image">
            <img
              src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
              alt="Placeholder "
            />
          </div>
          <h4>This is a title 4</h4>
          <p>
            This is a text with some info about the product. This is a text with
            some info about the product.{' '}
          </p>
        </div>
        <div className="ccl-list-item ">
          <div className="ccl-list-item-image">
            <img
              src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
              alt="Placeholder "
            />
          </div>
          <h4>This is a title 4</h4>
          <p>
            This is a text with some info about the product. This is a text with
            some info about the product.{' '}
          </p>
        </div>
        <div className="ccl-list-item ">
          <div className="ccl-list-item-image">
            <img
              src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
              alt="Placeholder "
            />
          </div>
          <h4>This is a title 4</h4>
          <p>
            This is a text with some info about the product. This is a text with
            some info about the product.{' '}
          </p>
        </div>
      </Slider>
    </div>
  );
};
export default CclHomeUsersBlockEdit;
