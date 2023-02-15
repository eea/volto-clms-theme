/**
 * FileWidget component.
 * @module components/manage/Widgets/FileWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Dimmer } from 'semantic-ui-react';
import { readAsDataURL } from 'promise-file-reader';
import { injectIntl } from 'react-intl';
import deleteSVG from '@plone/volto/icons/delete.svg';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import loadable from '@loadable/component';
import { flattenToAppURL } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';

import { Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';

const imageMimetypes = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/jpg',
  'image/gif',
  'image/svg+xml',
  'image/tif',
  'image/tiff',
  'image/bmp',
];
const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  releaseDrag: {
    id: 'Drop images here ...',
    defaultMessage: 'Drop images here ...',
  },
  editFile: {
    id: 'Drop image here to replace the existing image',
    defaultMessage: 'Drop image here to replace the existing image',
  },
  fileDrag: {
    id: 'Drop image here to upload a new image',
    defaultMessage: 'Drop image here to upload a new image',
  },
  replaceFile: {
    id: 'Replace existing image',
    defaultMessage: 'Replace existing image',
  },
  addNewFile: {
    id: 'Choose an image',
    defaultMessage: 'Choose an image',
  },
  invalid_file: {
    id: 'The uploaded file is not valid',
    defaultMessage: 'The uploaded file must be an image.',
  },
  invalid_file_size: {
    id: 'The uploaded file size is too big',
    defaultMessage: 'The uploaded file size must be at most 10 MB.',
  },
});

/**
 * FileWidget component class.
 * @function FileWidget
 * @returns {string} Markup of the component.
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "File",
 *  widget: 'file',
 * }
 * ```
 * or:
 *
 * ```jsx
 * {
 *  title: "File",
 *  type: 'object',
 * }
 * ```
 *
 */
const FileWidget = (props) => {
  const { id, value, onChange } = props;
  const [fileType, setFileType] = React.useState(false);
  const intl = useIntl();

  const FILE_SIZE_LIMIT = 1024 * 1024 * 10;

  React.useEffect(() => {
    if (value && imageMimetypes.includes(value['content-type'])) {
      setFileType(true);
    }
  }, [value]);

  const imgsrc = value?.download
    ? `${flattenToAppURL(value?.download)}?id=${Date.now()}`
    : null || value?.data
    ? `data:${value['content-type']};${value.encoding},${value.data}`
    : null;

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  const onDrop = (files) => {
    const file = files[0];
    if (file.size > FILE_SIZE_LIMIT) {
      toast.error(
        <Toast
          autoClose={5000}
          title={intl.formatMessage(messages.invalid_file_size)}
        />,
      );
      return;
    }
    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      if (!imageMimetypes.includes(fields[1])) {
        toast.error(
          <Toast
            autoClose={5000}
            title={intl.formatMessage(messages.invalid_file)}
          />,
        );

        return;
      } else {
        onChange(id, {
          data: fields[3],
          encoding: fields[2],
          'content-type': fields[1],
          filename: file.name,
        });
      }
    });

    let reader = new FileReader();
    reader.onload = function () {
      const fields = reader.result.match(/^data:(.*);(.*),(.*)$/);
      if (fields[1] === 'image/tif' || fields[1] === 'image/tiff') {
        setFileType(true);
        let imagePreview = document.getElementById(`field-${id}-image`);
        imagePreview.src = '';
      } else if (imageMimetypes.includes(fields[1])) {
        setFileType(true);
        let imagePreview = document.getElementById(`field-${id}-image`);
        imagePreview.src = reader.result;
      } else {
        setFileType(false);
      }
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <FormFieldWrapper {...props}>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div className="file-widget-dropzone" {...getRootProps()}>
            {isDragActive && <Dimmer active></Dimmer>}
            {fileType ? (
              <Image
                className="image-preview"
                id={`field-${id}-image`}
                size="small"
                src={imgsrc}
              />
            ) : (
              <div className="dropzone-placeholder">
                {isDragActive ? (
                  <p className="dropzone-text">
                    {intl.formatMessage(messages.releaseDrag)}
                  </p>
                ) : value ? (
                  <p className="dropzone-text">
                    {intl.formatMessage(messages.editFile)}
                  </p>
                ) : (
                  <p className="dropzone-text">
                    {intl.formatMessage(messages.fileDrag)}
                  </p>
                )}
              </div>
            )}

            <label className="label-file-widget-input">
              {value
                ? intl.formatMessage(messages.replaceFile)
                : intl.formatMessage(messages.addNewFile)}
            </label>
            <input
              {...getInputProps({
                type: 'file',
                style: { display: 'none' },
              })}
              id={`field-${id}`}
              name={id}
              type="file"
            />
          </div>
        )}
      </Dropzone>
      <div className="field-file-name">
        {value && value.filename}
        {value && (
          <Button
            icon
            basic
            className="delete-button"
            aria-label="delete file"
            onClick={() => {
              onChange(id, null);
              setFileType(false);
            }}
          >
            <Icon name={deleteSVG} size="20px" />
          </Button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FileWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.shape({
    '@type': PropTypes.string,
    title: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
FileWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default injectIntl(FileWidget);
