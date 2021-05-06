import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

const CclHomeUsersBlockView = (props) => {
  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { data } = props;
  let cards = data.customCards.blocks_layout.items.map(
    (uid) => data.customCards.blocks[uid],
  );
  const slide = (
    <>
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
          some info about the product.
        </p>
      </div>
    </>
  );
  
  return (
    
    <div className="home-meet-container">
      <div className="ccl-container">
        <h3>{data.title}</h3>
        <Slider className="ccl-list-carousel ccl-list-items" {...settings}>
          {/* <div index={1}>{slide}</div>
          <div index={2}>{slide}</div>
          <div index={3}>{slide}</div>
          <div index={4}>{slide}</div>
          <div index={5}>{slide}</div>
          <div index={6}>{slide}</div> */}
          {cards.map((card, index) => (
              <div
                index={index}
                key={index}>
                <div className="ccl-list-item ">
                  <div className="ccl-list-item-image">
                 
                    {card?.image?.scales ? (
                      <img
                        src={card.image.scales.preview.download}
                        alt={card.image.alt}
                      />
                    ) : (
                      <img
                        src={
                          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                        }
                        alt={'placeholder'}
                      />
                    )}
                  
                  </div>
                  <h4>{card.title}</h4>
                  <p>
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
      <a className="ccl-button ccl-button--default" href="./use-cases.html">
        All use cases
      </a>
    </div>
    
  );
};
export default CclHomeUsersBlockView;
