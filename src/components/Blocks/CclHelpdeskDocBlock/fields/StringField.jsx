import { Input } from 'semantic-ui-react';

import { FormFieldWrapper } from '@plone/volto/components';

export const StringField = ({ label, placeholder, formData, setFormData }) => {
  return (
    <FormFieldWrapper title={`${label}:`} id={label} className="text">
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setFormData({ ...formData, [label]: e.target.value });
        }}
      />
    </FormFieldWrapper>
  );
};
