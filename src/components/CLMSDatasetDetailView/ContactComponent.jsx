import React from 'react';

const ContactComponent = (props) => {
  const {
    organisationName,
    deliveryPoint,
    city,
    administrativeArea,
    postalCode,
    country,
    electronicMailAddress,
    url,
    urlTitle,
    roleCode,
  } = props.contact;

  return (
    <div className="contact-container">
      <h3>Contact</h3>
      <div className="contact-item">
        {city && <div className="contact-item">{city}</div>}
        {organisationName && (
          <div className="contact-item">{organisationName}</div>
        )}
        {deliveryPoint && <div className="contact-item">{deliveryPoint}</div>}
        {city && <div className="contact-item">{city}</div>}
        {administrativeArea && (
          <div className="contact-item">{administrativeArea}</div>
        )}
        {postalCode && <div className="contact-item">{postalCode}</div>}
        {country && <div className="contact-item">{country}</div>}
        {electronicMailAddress && (
          <div className="contact-item">{electronicMailAddress}</div>
        )}
        {url && <div className="contact-item">{url}</div>}
        {urlTitle && <div className="contact-item">{urlTitle}</div>}
        {roleCode && <div className="contact-item">{roleCode}</div>}
      </div>
      <br />
    </div>
  );
};

export default ContactComponent;
