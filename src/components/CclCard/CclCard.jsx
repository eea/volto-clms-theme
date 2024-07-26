import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';

import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { UniversalLink, Icon as VoltoIcon } from '@plone/volto/components';

import PlaceHolder from '@eeacms/volto-clms-theme/../theme/clms/img/ccl-thumbnail-placeholder.jpg';
import { cclDateFormat } from '@eeacms/volto-clms-theme/components/CclUtils';
// import { When } from '@plone/volto/components/theme/View/EventDatesInfo';
import { When } from '@eeacms/volto-clms-theme/components/CclWhen/CclWhen';
import { FontAwesomeIcon } from '@eeacms/volto-clms-utils/components';

import { portal_types_labels } from '../Blocks/CustomTemplates/VoltoSearchBlock';
// import { HomeBgImg } from '@eeacms/volto-clms-theme/components/Blocks/CclHomeBgImageBlock/HomeBgImg';

import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';
import { CLMSTechnicalLibraryAdminInfo } from '../CLMSTechnicalLibraryAdminInfo';

import penSVG from '@plone/volto/icons/pen.svg';

const CardImage = ({ card, size = 'preview', isCustomCard }) => {
  return card?.image_field ? (
    <img
      src={`${flattenToAppURL(card.getURL)}/@@images/${
        card?.image_field
      }/${size}`}
      alt={card?.image?.alt || 'Placeholder'}
    />
  ) : isCustomCard && card?.image?.url ? (
    <img
      src={`${flattenToAppURL(card.image.url)}/@@images/image`}
      alt={card.image.alt}
    />
  ) : (
    <img src={PlaceHolder} alt={card?.image?.alt || 'Placeholder'} />
  );
};

const CardLink = ({ url, children, className, condition = true }) => {
  function hasProtocol(protocolUrl) {
    return (
      protocolUrl.startsWith('https://') || protocolUrl.startsWith('http://')
    );
  }
  const RenderElement = hasProtocol(url) ? UniversalLink : Link;
  return !condition ? (
    children
  ) : hasProtocol(url) ? (
    <RenderElement className={className} href={url}>
      {children}
    </RenderElement>
  ) : (
    <RenderElement className={className} to={url}>
      {children}
    </RenderElement>
  );
};

const DocCard = ({ card, url, showEditor, children }) => {
  return (
    <>
      <div className="card-doc-header">
        <div className="card-doc-title">
          {card?.['@type'] === 'TechnicalLibrary' ? (
            card?.ondemand ? (
              <a href={`${card['@id']}`}>{card?.title}</a>
            ) : (
              <a href={`${card['@id']}/@@download/file`}>{card?.title}</a>
            )
          ) : (
            <Link to={url}>{card?.title}</Link>
          )}
          {card?.['@type'] === 'TechnicalLibrary' && showEditor && (
            <Link
              to={`${url}/edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="technical-library-edit-link"
            >
              <VoltoIcon
                name={penSVG}
                size="12px"
                className="circled"
                title={'Edit'}
              />
            </Link>
          )}
        </div>
        {card?.['@type'] === 'TechnicalLibrary' && (
          <div className="card-doc-size">{card.getObjSize || ''}</div>
        )}
      </div>
      {card?.['@type'] === 'TechnicalLibrary' &&
        (card.publication_date || card.version) && (
          <div className="card-doc-extrametadata">
            {card?.['@type'] === 'TechnicalLibrary' &&
              card.publication_date && (
                <>
                  <strong>Publication date: </strong>
                  <span>{cclDateFormat(card.publication_date)}</span>
                </>
              )}{' '}
            &nbsp;
            {card?.['@type'] === 'TechnicalLibrary' && card.version && (
              <>
                <strong>Version: </strong> <span>{card.version}</span>
              </>
            )}
          </div>
        )}
      <CLMSTechnicalLibraryAdminInfo uid={card.UID} id={card['@id']} />
      <div className="card-doc-description">{card?.description}</div>
      {children}
    </>
  );
};

const SearchResultExtras = (props) => {
  const { content } = props;
  const locale = useSelector((state) => state.intl.locale);
  const isAuxiliary = content?.mapviewer_viewservice
    ? content?.mapviewer_viewservice
        .toLowerCase()
        .startsWith(
          'https://trial.discomap.eea.europa.eu/arcgis/services/clms/worldcountries/mapserver/wmsserver',
        )
    : false;

  return (
    <div className="card-doc-extrametadata">
      {content?.['@type'] === 'DataSet' && (
        <>
          <br />
          <CclButton mode="small" url={content['@id']}>
            <FormattedMessage id="View more" defaultMessage="View more" />
          </CclButton>
          &nbsp; &nbsp; &nbsp;
        </>
      )}

      {content?.downloadable_dataset && content?.['@type'] === 'DataSet' && (
        <>
          <CclButton mode="small" url={`${content['@id']}#download`}>
            <FormattedMessage id="Download" defaultMessage="Download" />
          </CclButton>
          &nbsp; &nbsp; &nbsp;
        </>
      )}

      {content?.mapviewer_viewservice?.length > 0 &&
        !isAuxiliary &&
        content?.['@type'] === 'DataSet' && (
          <CclButton
            mode="small"
            url={'/' + locale + '/map-viewer?dataset=' + content.UID}
          >
            <FormattedMessage
              id="View in the data viewer"
              defaultMessage="View in the data viewer"
            />
          </CclButton>
        )}
    </div>
  );
};

function CclCard(props) {
  const {
    type,
    children,
    card,
    showEditor = false,
    CclImageEditor = null,
    showDates = true,
    onClickImage = () => {
      return '';
    },
    isCustomCard = false,
  } = props;
  let url = '/';
  let content_type = '';
  if (card?.getRemoteUrl) {
    url = card.getRemoteUrl || '/';
  } else if (card && !isCustomCard) {
    url = card['@id'] || '/';
    content_type = portal_types_labels[card['@type']] || card['@type'];
  } else if (card?.url?.length > 0 && !card?.getRemoteUrl) {
    url = card.url[0]['@id'] || '/';
  }
  const conditional_types = [
    'doc',
    'news',
    'event',
    'block',
    'threeColumns',
    'globalSearch',
    'file',
    'downloadFile',
    'fileWithoutDates',
    'cardWithBgImage',
  ];
  const wrapperClass =
    'card-' +
    (type === 'globalSearch'
      ? 'doc'
      : type === 'downloadFile'
      ? 'file'
      : type === 'fileWithoutDates'
      ? 'file card-file-aligned'
      : type === 'line-no-description'
      ? 'line card-line-no-description'
      : type === 'cardWithBgImage'
      ? 'home-map-banner'
      : type || 'line');

  return (
    <CardLink
      url={url}
      className={wrapperClass}
      condition={type === 'block' || type === 'threeColumns'}
    >
      <div
        tabIndex="0"
        role="button"
        onClick={() => onClickImage()}
        onKeyDown={() => onClickImage()}
        className={
          !(type === 'block' || type === 'threeColumns') && wrapperClass
        }
      >
        {conditional_types.includes(type) ? (
          <>
            {type === 'doc' && (
              <>
                <DocCard card={card} url={url} showEditor={showEditor}>
                  {children}
                </DocCard>
              </>
            )}
            {type === 'file' && (
              <>
                <div className="card-icon">
                  <Icon name="file alternate outline" />
                </div>
                <div className="card-text">
                  <div className="card-file-title">
                    <CardLink url={url}>{card?.title}</CardLink>
                  </div>
                  {showDates && (
                    <div className="card-file-date">
                      {card?.effective
                        ? cclDateFormat(card?.effective)
                        : cclDateFormat(card?.created)}
                    </div>
                  )}
                  {children}
                </div>
              </>
            )}
            {type === 'downloadFile' && (
              <>
                <div className="card-icon">
                  <Icon name="file alternate outline" />
                </div>
                <div className="card-text">
                  <div className="card-file-title">
                    <CardLink url={url + '/@@download/file'}>
                      {card?.title}
                    </CardLink>
                  </div>
                  {showDates && (
                    <div className="card-file-date">
                      {card?.effective
                        ? cclDateFormat(card?.effective)
                        : cclDateFormat(card?.created)}
                    </div>
                  )}
                  {children}
                </div>
              </>
            )}
            {type === 'fileWithoutDates' && (
              <>
                <div className="card-icon">
                  <Icon name="file alternate outline" />
                </div>
                <div className="card-text">
                  <div className="card-file-title">
                    <CardLink url={url}>{card?.title}</CardLink>
                  </div>
                  {children}
                </div>
              </>
            )}
            {type === 'globalSearch' && (
              <>
                <Label ribbon="right" color="olive">
                  {content_type}
                </Label>
                <DocCard card={card} url={url} showEditor={showEditor}>
                  {children}

                  <SearchResultExtras content={card} />
                </DocCard>
              </>
            )}
            {(type === 'block' || type === 'threeColumns') && (
              <>
                <div className={`card-${type}-image`}>
                  {isCustomCard && CclImageEditor ? (
                    CclImageEditor
                  ) : (
                    <CardImage
                      isCustomCard={isCustomCard}
                      card={card}
                      size={'preview'}
                    />
                  )}
                </div>
                <div className="card-text">
                  <div className="card-title">{card?.title}</div>
                  <div className="card-description">{card?.description}</div>
                  {children}
                </div>
              </>
            )}
            {type === 'news' && (
              <>
                <div className="card-news-image">
                  {isCustomCard && CclImageEditor ? (
                    CclImageEditor
                  ) : (
                    <CardImage
                      isCustomCard={isCustomCard}
                      card={card}
                      size={'preview'}
                    />
                  )}
                </div>
                <div className="card-news-text">
                  <div className="card-news-title">
                    <CardLink url={url}>{card?.title}</CardLink>
                    {/* <CardLink url={url} title={card?.title} /> */}
                  </div>
                  <div className="card-news-date">
                    {cclDateFormat(card?.effective)}
                  </div>
                  <p className="card-news-description">{card?.description}</p>
                </div>
              </>
            )}
            {type === 'event' && (
              <>
                <div className={'card-event-text'}>
                  <div className="card-event-title">
                    <CardLink url={url}>{card?.title}</CardLink>
                    {/* <CardLink url={url} title={card?.title} /> */}
                  </div>
                  <div className="card-event-when">
                    <FontAwesomeIcon icon={['far', 'calendar-alt']} />
                    <div className="card-event-when-text">
                      <When
                        start={card.start}
                        end={card.whole_day ? card.start : card.end}
                        whole_day={card.whole_day}
                      />
                    </div>
                  </div>
                  {card?.location ? (
                    <div className="card-event-where">
                      <>
                        <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                        <div className="card-event-where-text">
                          {card?.location}
                        </div>
                      </>
                    </div>
                  ) : (
                    ''
                  )}
                  <p className="card-event-description">{card?.description}</p>
                </div>
              </>
            )}
            {type === 'cardWithBgImage' && (
              <>
                {card.title && <h1>{card?.title}</h1>}
                {card.subtitle && <h2>{card?.subtitle}</h2>}
                {card.description && <h3>{card?.description} </h3>}
                {card?.buttonTitle && (
                  <CclButton
                    url={url === '/' ? '#' : url}
                    disabled={card?.disabled}
                    download={
                      card?.download || card?.href?.[0]?.['@type'] === 'File'
                    }
                    target={
                      card?.target ||
                      (card?.download &&
                        card?.href[0]['@type'] === 'File' &&
                        '_blank')
                    }
                    mode={card?.style}
                  >
                    {card?.buttonTitle}
                  </CclButton>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div className="card-image">
              {isCustomCard && CclImageEditor ? (
                CclImageEditor
              ) : (
                <CardImage
                  isCustomCard={isCustomCard}
                  card={card}
                  size={'preview'}
                />
              )}
            </div>
            <div className={'card-text'}>
              <div className="card-title">
                <CardLink url={url}>{card?.title}</CardLink>
                {/* <CardLink url={url} title={card?.title} /> */}
              </div>
              {type !== 'line-no-description' && (
                <div className="card-description">{card?.description}</div>
              )}
              {children}

              <SearchResultExtras content={card} />
            </div>
          </>
        )}
      </div>
    </CardLink>
  );
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CclCard.propTypes = {
  type: PropTypes.string,
  card: PropTypes.shape({
    '@id': PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    docInfo: PropTypes.string,
    image: PropTypes.shape({
      scales: PropTypes.shape({
        icon: PropTypes.shape({
          download: PropTypes.string,
        }),
        large: PropTypes.shape({
          download: PropTypes.string,
        }),
        listing: PropTypes.shape({
          download: PropTypes.string,
        }),
        mini: PropTypes.shape({
          download: PropTypes.string,
        }),
        preview: PropTypes.shape({
          download: PropTypes.string,
        }),
        thumb: PropTypes.shape({
          download: PropTypes.string,
        }),
        tile: PropTypes.shape({
          download: PropTypes.string,
        }),
      }),
    }),
    start: PropTypes.string,
    end: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default CclCard;
