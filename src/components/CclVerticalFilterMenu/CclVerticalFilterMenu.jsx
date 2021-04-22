import React from 'react';
import CclExpandableFilter from '@eea/volto-clms-theme/components/CclExpandableFilter/CclExpandableFilter';

const CclVerticalFilterMenu = (props) => {
  var { filters } = props;
  return (
    <nav className="dropdown dropdown-filters">
      {filters &&
        filters.map((filter) => (
          <CclExpandableFilter key={filter['@id']} title={filter.title}>
            {filter.children}
          </CclExpandableFilter>
        ))}
    </nav>
  );
};

export default CclVerticalFilterMenu;
