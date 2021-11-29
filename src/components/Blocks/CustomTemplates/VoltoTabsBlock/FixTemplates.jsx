import React from 'react';
import config from '@plone/volto/registry';
import { TABS_BLOCK } from '@eeacms/volto-tabs-block/constants';

const FixTemplates = (TabView) =>
  function Component(props) {
    const deprecated_templates =
      config.blocks.blocksConfig[TABS_BLOCK].deprecated_templates;
    const { data = {} } = props;
    const deprecated = deprecated_templates.includes(data.template);
    const new_props = {
      ...props,
      data: { ...data, template: deprecated ? 'default' : data.template },
    };

    return <TabView {...new_props} />;
  };

export default FixTemplates;
