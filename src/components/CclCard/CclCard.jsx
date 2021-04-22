import React from 'react'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import "./cards.less"
import CclCardBlockEdit from '@eea/volto-clms-theme/components/Blocks/CclCardBlock/CclCardBlockEdit';


import { defineMessages, useIntl } from 'react-intl';
const messages = defineMessages({
  accessToProduct: {
    id: 'Access to product',
    defaultMessage: 'Access to product',
  },
});

function CclCard(props) {
  var {type, children, card} = props
  const intl = useIntl();
/*  const card2 = ({
    "product": "Product Title 11",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.",
    "image": {
      "src": "https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
      "alt": "Image alt text",
    },
    "Url": "/en/product-portfolio/how-our-products-are-created",
  });*/

  return (
      <div className={"card-" + type}>
          <div className="card-image">
            {card.image && <img src={card.image.src} alt={card.image.alt} /> }
          </div>
        <div className="card-text">
          <div className="card-title">
            <a href="./dataset-catalogue/dataset-info.html">{card.product}</a>
          </div>
          <div className="card-description">
            {card.description}
          </div>
          {type == 'block' &&
            <div className="card-button">
              <Link
                to={card.Url}
                className="ccl-button ccl-button--default"
              >
                {intl.formatMessage(messages.accessToProduct)}
              </Link>
            </div>
          }
          {children}
        </div>
      </div>
  )
}

export default CclCard