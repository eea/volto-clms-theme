import React from 'react';
import { Link } from 'react-router-dom';

const CclFooterMenuElement = ({ element }) => {
  return (
    <li>
      <Link to={{ pathname: element['remoteUrl'] }}>{element.title}</Link>
    </li>
  );
};

export default CclFooterMenuElement;
