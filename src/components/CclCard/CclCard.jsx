import React from 'react';
import { Link } from 'react-router-dom';
import './cards.less';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  accessToProduct: {
    id: 'Access to product',
    defaultMessage: 'Access to product',
  },
});

function CclCard(props) {
  var { type, children, card } = props;
  const intl = useIntl();

  return (
    <div className={'card-' + type}>
      <div className="card-image">
        {card.image && <img src={card.image.src} alt={card.image.alt} />}
      </div>
      <div className="card-text">
        <div className="card-title">
          <a href="./dataset-catalogue/dataset-info.html">{card.product}</a>
        </div>
        <div className="card-description">{card.description}</div>
        {type == 'block' && (
          <div className="card-button">
            <Link to={card.Url} className="ccl-button ccl-button--default">
              {intl.formatMessage(messages.accessToProduct)}
            </Link>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default CclCard;
