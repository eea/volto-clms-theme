import React, { useState }  from 'react';

import CclCard from '@eea/volto-clms-theme/components/CclCard/CclCard'; 
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '@plone/volto/actions';

const CclCardContainerBlockView = props => {
    const card = {
      "title": "Product Title 11",
      "description": "This is a preview of description to use when we don't have real information or simply to see how will really render",
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
        }
      },
      "url": "/en/product-portfolio/how-our-products-are-created",
    }
    const {data, metadata, properties, id} = props;

    const searchSubrequests = useSelector(state => state.search.subrequests);
    const dispatch = useDispatch();
    let cards = searchSubrequests?.[props.id]?.items;
    
    let path = ""
    if (data.cardOrigin == "current") {
        path = metadata ? (metadata.['@id']) : (properties.['@id'])
    } else if (data.cardOrigin == "selection" && data.containerSelection[0]){
        path = data.containerSelection[0]?.['@id']
    }
    let portal_type = data.contentTypes?.length > 0 ? {portal_type: data.contentTypes} : {}
    console.log(portal_type)
    React.useEffect(() => {
        dispatch(
          searchContent(
            path,
            {
              sort_on: 'effective',
              sort_order: 'reverse',
              fullobjects: 1,
              ...portal_type,
            },
            id,
          ),
        );
    }, [dispatch, id]);

    if (data.cardOrigin == "custom" || path == "") {
        cards = [card, card]
    }
    var cardStyle = data.cardStyle || "line"
    return <div className={cardStyle == "line" ? "" : "card-container"}>
        {data.cardOrigin == "custom" ? (
            <>
                <CclCard type={cardStyle || "line"} card={card} />
                <CclCard type={cardStyle || "line"} card={card} />
            </>
        ) : (
            cards && cards.map((card, index)=>(
                    <CclCard key={index} type={cardStyle} card={card} />
                ))
            
        )}
        </div>;
};

export default CclCardContainerBlockView;