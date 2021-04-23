import React from 'react';
import CclCard from '@eea/volto-clms-theme/components/CclCard/CclCard';

const CclCardBlockView = props => {
    const { data } = props
    const card = {
        "title": data.title,
        "description": data.description,
        "image": {
          "scales": {
            "icon": {
              "download":"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
            },
            "large": {
              "download":"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
            },
            "listing": {
              "download":"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
            },
            "mini": {
              "download":"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
            },
            "preview": {
              "download":"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
            },
            "thumb": {
              "download":"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
            },
            "tile": {
              "download":"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
            },
          },
        },
        "url": data.url,
      }

  return <CclCard card={card} />;
};

export default CclCardBlockView;
