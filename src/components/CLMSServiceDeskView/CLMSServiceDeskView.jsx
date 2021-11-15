/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

const ServiceDeskView = () => {
  return (
    <>
      <div className="ui container">
        <section className="page-section">
          <h1 className="page-title">Service desk</h1>
          <div className="page-description">
            <p>
              Have you checked our <a href="/en/faq">FAQ section</a>? If you
              haven't found an answer to your problem or question, please fill
              in this form to contact the Copernicus land service desk.
            </p>
            <p>
              We will try to respond as soon as possible within office working
              hours from Monday to Friday.
            </p>
            <p>Please note, that the support is provided in English only.</p>
          </div>
          <div className="ccl-container">
            <form className="ccl-form user-form contact-form">
              <div className="ccl-fieldset">
                <div className="ccl-form-group">
                  <label
                    className="ccl-form-label"
                    htmlFor="contact_form_email"
                  >
                    E-mail
                    <span className="label-required">*</span>
                  </label>
                  <input
                    // maxlength="10"
                    type="text"
                    className="ccl-text-input"
                    id="contact_form_email"
                    name=""
                    placeholder="Enter an email address"
                  />
                </div>
                <div className="ccl-form-group">
                  <label
                    className="ccl-form-label"
                    htmlFor="contact_form_subject"
                  >
                    Subject
                    <span className="label-required">*</span>
                  </label>
                  <span className="form-tip">
                    A short indication of the problem, question or issue, i.e.
                    login, download, errors in the product, thematic question
                    etc.
                  </span>
                  <input
                    type="text"
                    className="ccl-text-input"
                    id="contact_form_subject"
                    name=""
                    placeholder="Enter an subject"
                  />
                </div>
                <div className="ccl-form-group">
                  <label
                    className="ccl-form-label"
                    htmlFor="contact_form_message"
                  >
                    Message
                    <span className="label-required">*</span>
                  </label>
                  <span className="form-tip">
                    A short description of the problem, question or issue.
                    Please don't forget to specify which product(s) you are
                    referring to in your message.
                  </span>
                  <textarea
                    className="ccl-textarea"
                    id="contact_form_message"
                    name=""
                    cols="30"
                    rows="10"
                    placeholder="Enter a message"
                  ></textarea>
                </div>
                <div className="ccl-form-group">
                  <label
                    className="ccl-form-label"
                    htmlFor="contact_form_verification"
                  >
                    Verification
                    <span className="label-required">*</span>
                  </label>
                  <div className="validation-image"></div>
                  <input
                    type="text"
                    className="ccl-text-input"
                    id="contact_form_verification"
                    name=""
                    placeholder="Enter validation code"
                  />
                </div>
              </div>
              <CclButton mode="default">Submit</CclButton>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDeskView;
