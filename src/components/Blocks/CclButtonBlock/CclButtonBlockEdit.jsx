import React, { useState, useEffect } from 'react';
import CclButton from '@eea/volto-clms-theme/components/CclButton/CclButton';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { cclButtonSchema, downloadSchema, addSchemaItem, deleteSchemaItem } from "./schema";
import "./styles.less";

const CclButtonBlockEdit = props => {

    const {
        block,
        data,
        onChangeBlock,
        selected
    } = props;
    console.log("PROPS: ", props)
    let [schema, setSchema] = useState(cclButtonSchema());

    useEffect(() => {
        checkPanelValues('href', data.href);
    }, []);
    function checkPanelValues(id, value) {
        if (id == 'href') {
            if (value[0]?.['@type'] == 'File') {
                addSchemaItem(schema, downloadSchema());
            } else {
                deleteSchemaItem(schema, downloadSchema());
            }
        }
    }

    return (
        <>
            <div className="ccl-block-editor-header">
                <legend
                    onClick={() => {
                        props.setSidebarTab(1);
                    }}
                    aria-hidden="true"
                >
                    {data.style || 'Default'} button {data.disabled && 'disabled'}
                </legend>
            </div>

            <CclButton url={data.href || '#'} disabled={data.disabled} download={data.download} mode={data.style}>
                {data.title || 'Text example...'}
            </CclButton>

            <SidebarPortal selected={selected}>
                <InlineForm
                    schema={schema}
                    title="Button component block"
                    onChangeField={(id, value) => {
                        onChangeBlock(block, {
                            ...data,
                            [id]: value,
                        });
                        checkPanelValues(id, value, block);
                    }}
                    formData={data}
                />
            </SidebarPortal>
        </>
    );
};

export default CclButtonBlockEdit;