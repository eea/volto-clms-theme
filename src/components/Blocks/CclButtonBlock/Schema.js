export const cclButtonSchema = () => ({
    title: 'Button default',
    fieldsets: [
        {
            id: 'default',
            title: 'Default',
            fields: ['title', 'href', 'style', "target", "disabled"],
        },
    ],
    properties: {
        title: {
            title: 'Title',
            description: 'Card container block friendly name',
            type: 'string',
        },
        href: {
            title: 'URL',
            widget: 'object_browser',
            mode: 'link',
            selectedItemAttrs: ['Title', 'Description', '@type', '@id'],
            allowExternals: true
        },
        style: {
            title: 'Button style',
            choices: [
                ['default', 'Default'],
                ['filled', 'Filled']
            ],
            default: "default"
        },
        target: {
            title: 'Target',
            choices: [
                ['_self', 'Default'],
                ['_blank', 'Blank']
            ],
            default: "_self"
        },
        disabled: {
            title: 'Disabled',
            type: 'boolean',
            default: false,
        }

    },
    required: ['title', 'style'],
});



export const downloadSchema = () => ({
    download: {
        title: 'Download',
        type: 'boolean',
        default: true
    }
});


export function addSchemaItem(full_schema, item_schema){
    let item_key = Object.keys(item_schema)[0];
    full_schema.properties[item_key] = item_schema[item_key];
    full_schema.fieldsets[0].fields.push(item_key);
}

export function deleteSchemaItem(full_schema, item_schema){
    let item_key = Object.keys(item_schema)[0];
    full_schema.fieldsets[0].fields = full_schema.fieldsets[0].fields.filter(item => item !== item_key);
    delete full_schema.properties[item_key];
}