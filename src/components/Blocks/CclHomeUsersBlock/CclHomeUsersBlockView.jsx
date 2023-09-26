import React from 'react';
import Slider from 'react-slick';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.less';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

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
  let cards = data?.customCards?.blocks_layout?.items.map(
    (uid) => data.customCards.blocks[uid],
  );
  return (
    <div className="home-meet-container">
      <div className="ccl-container">
        <h3>{data.title}</h3>
        <Slider className="ccl-list-carousel ccl-list-items" {...settings}>
          {cards.map((card, index) => {
            const loading = card.lazyLoad ? { loading: 'lazy' } : {};
            return (
              <div index={index} key={index}>
                <div className="ccl-list-item ">
                  <div className="ccl-list-item-image">
                    {card?.image?.url ? (
                      <img
                        src={flattenToAppURL(
                          `${card.image.url}/@@images/image/teaser`,
                        )}
                        alt={card.image.alt}
                        {...loading}
                      />
                    ) : card.productUrl &&
                      card.productUrl.length > 0 &&
                      card.productUrl[0].image_field ? (
                      <img
                        src={flattenToAppURL(
                          `${card.productUrl[0]['@id']}/@@images/${card.productUrl[0].image_field}/preview`,
                        )}
                        alt={card?.productUrl[0].title || 'Placeholder'}
                        {...loading}
                      />
                    ) : (
                      <img
                        src={
                          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
                        }
                        alt={'placeholder'}
                        {...loading}
                      />
                    )}
                  </div>
                  <ConditionalLink
                    condition={card.productUrl && card.productUrl.length > 0}
                    item={
                      card.productUrl && card.productUrl.length > 0
                        ? card.productUrl[0]
                        : {}
                    }
                  >
                    <h4>
                      {card.title
                        ? card.title
                        : card.productUrl &&
                          card.productUrl.length > 0 &&
                          card.productUrl[0]['@id'].indexOf('http') !== 0
                        ? card.productUrl[0].title
                        : card.title}
                    </h4>
                  </ConditionalLink>
                  <p>
                    {card.description
                      ? card.description
                      : card.productUrl && card.productUrl.length > 0
                      ? card.productUrl[0].description
                      : card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
        {data.moreLinkUrl && data.moreLinkText && (
          <CclButton url={data.moreLinkUrl[0]['@id']}>
            {data.moreLinkText}
          </CclButton>
        )}
      </div>
    </div>
  );
};
export default CclHomeUsersBlockView;
