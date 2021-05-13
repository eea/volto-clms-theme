/**
 * Full view component.
 * @module components/theme/View/EventsDetailView
 */
import React from 'react';
/**
 * Full view component class.
 * @function EventsDetailView
 * @returns {string} Markup of the component.
 */
export const EventDetailView = () => {
  return (
    <>
      <div className="ccl-container">
        <div className="event-detail">
          <img
            src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
            alt="Placeholder"
          ></img>
          <div className="event-detail-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailView;
