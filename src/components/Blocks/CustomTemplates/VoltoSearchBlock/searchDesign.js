export const usesGlobalSearchDesign = ({ data, location, path }) => {
  const currentPath = location?.pathname || path || '';
  const normalizedPath = currentPath.replace(/\/$/, '');
  return (
    data?.listingBodyTemplate === 'CclGlobalSearch' ||
    normalizedPath.endsWith('/dataset-catalog')
  );
};
