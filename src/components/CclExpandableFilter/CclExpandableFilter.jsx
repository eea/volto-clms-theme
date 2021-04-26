import React, { useState } from 'react';

const CclExpandableFilter = (props) => {
  var { title, children } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className="ccl-dropdown__link  ccl-expandable__button"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={() => setExpanded(!expanded)}
        tabIndex="0"
        role="button"
      >
        {title}
      </div>
      <div className="ccl-form">{children}</div>
    </>
  );
};

export default CclExpandableFilter;
