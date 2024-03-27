import { StringField } from './fields/StringField';
import { DatasetField } from './fields/DatasetField';
import { DatasetInfoField } from './fields/DatasetInfoField';
const widgets = {
  default: StringField,
  dataset_uid: DatasetField,
  uid: DatasetField,
  download_information_id: DatasetInfoField,
};

export const getWidget = (id) => {
  if (widgets[id]) {
    return widgets[id];
  } else {
    return widgets['default'];
  }
};
