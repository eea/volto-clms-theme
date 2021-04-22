import React from 'react';
import CclCard from '@eea/volto-clms-theme/components/CclCard/CclCard'; 

const CclCardBlockView = props => {
    const card = {
        "product": "Dataset preview title",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.",
        "image": {
          "src": "https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
          "alt": "Image alt text",
        },
        "absolute_url": "/en/product-portfolio/how-our-products-are-created",
      }

    return <CclCard card={card} />;
};

export default CclCardBlockView;