import React, { useState } from 'react';

import { SidebarPortal, BlocksToolbar, Icon, BlocksForm } from '@plone/volto/components'; // BlocksForm, Icon,
import { CardContainerSchema, ContainerSelectorSchema } from './CardContainerSchema';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';

import { setSidebarTab } from '@plone/volto/actions';
import CclCard from '@eea/volto-clms-theme/components/CclCard/CclCard';

import "./styles.less"


import { compose } from 'redux';
import { TextWidget, SelectWidget, ObjectBrowserWidget } from '@plone/volto/components';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { defineMessages, injectIntl } from 'react-intl';

import Select from 'react-select';
import { useSelector } from 'react-redux';






import { CardBlockSchema } from '@eea/volto-clms-theme/components/Blocks/CclCardBlock/CardBlockSchema'
import { isEmpty } from 'lodash';
import { emptyCard, getPanels } from './utils';
import { emptyBlocksForm } from '@plone/volto/helpers';
import { Accordion, Input } from 'semantic-ui-react';


const CclCardContainerBlockEdit = props => {
    const {
            block,
            data,
            onChangeBlock,
            onMutateBlock,
            pathname,
            selected,
            manage,
            openObjectBrowser,
            intl,
        } = props;

    const messages = defineMessages({
      SelectCard: {
        id: 'Select card container',
        defaultMessage: 'Select card container',
      },
      more: {
        id: 'Card container selector',
        defaultMessage: 'Card container selector',
      },
    });

    const [selectedBlock, setSelectedBlock] = useState(-1);

    const regex = /[a-zA-Z]+(?!.*[a-zA-Z]+)/;
    const types = useSelector(state => state.types.types);
    const type_options = types.map((type) => ([type.['@id'].match(regex)[0], type.title]))

    const card = {
      "@id": "/en/product-portfolio/how-our-products-are-created",
      "title": "Dataset preview title",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus mauris ante, a iaculis leo placerat quis. Nullam vitae vulputate leo, et ultricies dolor.",
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
    const properties = isEmpty(data?.customCards?.blocks)
      ? emptyCard(2)
      : data.customCards;
    const metadata = props.metadata || props.properties;
    
    const panelData = properties;
    const panels = getPanels(panelData);
    React.useEffect(() => {
      if (isEmpty(data?.customCards)) {
        onChangeBlock(block, {
          ...data,
          customCards: {
            ...properties,
          },
        });
      }
      /* eslint-disable-next-line */
      if (!selected){
        setSelectedBlock(-1)
      }
    }, []);

    let extras = []
    if (data.cardOrigin == 'selection'){
        extras.push('containerSelection')
        extras.push('contentTypes')
    } else if(data.cardOrigin == 'current'){
        extras.push('contentTypes')
    } else if(data.cardOrigin == 'custom'){
        extras.push('customCards')
    }
    console.log(extras)

    return (
        <>
            <div 
                className="cardContainer-header"
                onClick={() => {
                    props.setSidebarTab(1);
                    setSelectedBlock(-1)
                  }}
                  aria-hidden="true">
                  {data.title || 'Card container'}
            </div>
            <div>
                {data.cardOrigin == "custom" ? (
                        <>
                        {panels.map(([uid, panel], index) => (
                            <div key={index} className={uid == selectedBlock && ("block selected")}
                                    onClick={() => {
                                      setSelectedBlock(uid);
                                    }}
                            >
                                <CclCard 
                                    type={data.cardStyle || "line"} 
                                    card={data.customCards.blocks[uid]}
                                />
                            </div>
                        ))}
                        </>
                    ) : (
                    <div className="card-container">
                        <CclCard type={data.cardStyle} card={card} />
                        <CclCard type={data.cardStyle} card={card} />
                    </div>
                    ) }
            
            </div>
                <SidebarPortal selected={selected && selectedBlock == -1}>
                    <InlineForm
                    schema={CardContainerSchema(type_options, extras)}
                    title="Card container block"
                    onChangeField={(id, value) => {
                      onChangeBlock(block, {
                        ...data,
                        [id]: value,
                      });
                    }}
                    formData={data}
                    />
                </SidebarPortal>
                <SidebarPortal selected={selected && selectedBlock != -1 && data.customCards?.blocks}>
                    <InlineForm
                    schema={CardBlockSchema()}
                    title="Card block"
                    onChangeField={(id, value) => {
                       onChangeBlock(block, {
                        ...data,
                        customCards: {
                            ...data.customCards,
                            blocks: {
                                ...data.customCards.blocks,
                                [selectedBlock]: {
                                    ...data.customCards.blocks[selectedBlock],
                                    [id]: value
                                }
                            }
                        }
                      });
                    }}
                    formData={data.customCards?.blocks.[selectedBlock]}
                    />
                </SidebarPortal>
        </>

        )
};

export default compose(withObjectBrowser, injectIntl)(CclCardContainerBlockEdit);
