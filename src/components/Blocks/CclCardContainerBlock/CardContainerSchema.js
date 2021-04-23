import { CardBlockSchema } from '@eea/volto-clms-theme/components/Blocks/CclCardBlock/CardBlockSchema'

export const CardContainerSchema = (types, extras) => ({
    title: 'Card container',
    fieldsets: [{
        id: 'default',
        title: 'Default',
        fields: ['title', 'cardStyle', 'contentTypes', 'cardOrigin', 'customCards', ...extras],
    }, ],
    properties: {
        title: {
            title: 'Title',
            description: 'Card container block friendly name',
            type: 'string',
        },
        cardStyle: {
            title: 'Card style',
            choices: [
                ['line', 'Line card'],
                ['block', 'Block card'],
                ['line-color', 'Colored Line card'],
            ],
            default: 'line'
        },
        contentTypes: {
            title: 'Content Types',
            choices: types,
            isMulti: true,
        },
        cardOrigin: {
            title: 'Cards origin',
            choices: [
                ['current', 'Current folder children'],
                ['selection', 'Selected folder children'],
                ['custom', 'Customized cards'],
            ],
            default: 'current'
        },
        containerSelection: {
            title: 'Card container selector',
            widget: 'object_browser',
            mode: 'link',
        },
        customCards: {
          title: 'Custom cards',
          type: 'panels',
          schema: CardBlockSchema,
        },
    },
    required: ['cardStyle', 'cardOrigin'],
});
