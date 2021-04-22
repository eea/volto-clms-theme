import React from 'react';

import CclCard from '@eea/volto-clms-theme/components/CclCard/CclCard'; 

const CclCardContainerBlockView = props => {
    const card = {
      "title": "Product Title 11",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.",
      "image": {
        "src": "https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
        "alt": "Image alt text",
      },
      "absolute_url": "/en/product-portfolio/how-our-products-are-created",
    }
    var cards = props.metadata ? props.metadata.items : props.properties.items

    return <div className="card-container">
        {props.data.customCards ? (
            <>
                <CclCard type={props.data.cardStyle || "line"} card={card} />
                <CclCard type={props.data.cardStyle || "line"} card={card} />
            </>
        ) : (
            cards && cards.map((card)=>(
                    <CclCard type={props.data.cardStyle || "line"} card={card} />
                ))
            
        )}
        </div>;
};

export default CclCardContainerBlockView;