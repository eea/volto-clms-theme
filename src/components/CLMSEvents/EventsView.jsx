/**
 * Full view component.
 * @module components/theme/View/EventsView
 */

import React from 'react';
import PropTypes from 'prop-types';
import CclCard from '@eeacms/volto-clms-theme/components/CclCard/CclCard';
/**
 * Full view component class.
 * @function EventsView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

const EventsView = (content) => {
  return (
    <>
      <div className="ccl-container">
        <h1 className="page-title">{'Events'}</h1>
        <CclCard
          type={'event'}
          title={content.title}
          description={content.description}
          when={content.when}
          where={content.where}
        ></CclCard>
        <CclCard
          type={'event'}
          title={content.title}
          description={content.description}
          when={content.when}
          where={content.where}
        ></CclCard>
        <CclCard
          type={'event'}
          title={content.title}
          description={content.description}
          when={content.when}
          where={content.where}
        ></CclCard>
      </div>
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
EventsView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Date of the object
     */
    when: PropTypes.string,
    /**
     * Place of the object
     */
    where: PropTypes.string,
  }),
};

export default EventsView;
