import config from '@plone/volto/registry';
const getListingBodyVariation = (data) => {
  const { variations } = config.blocks.blocksConfig.listing;
  const variation = data.variation
    ? variations.find(
        ({ id, templateID }) => id === data.variation && templateID,
      )
    : variations.find(({ isDefault, templateID }) => isDefault && templateID);

  return variation;
};

export default getListingBodyVariation;
