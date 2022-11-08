export const formatNaming = (item) => {
  return item?.format?.token || item?.format;
};

export const originalFormatNaming = (item) => {
  const original = item?.original_format?.token || item?.original_format;
  const format = item?.format?.token || item?.format;
  return format ? format : original;
};

export const getDownloadToolPostBody = (selectedItems) => {
  const datasetList = selectedItems.map((item) => {
    let body_extras = {};
    if (item.file_id) {
      body_extras['FileID'] = item.file_id;
    } else {
      if (item.area?.type === 'polygon') {
        body_extras['BoundingBox'] = item.area.value;
      }
      if (item.area?.type === 'nuts') {
        body_extras['NUTS'] = item.area.value;
      }
      if (item.timeExtent?.length > 0) {
        body_extras['TemporalFilter'] = {
          StartDate: item.timeExtent[0],
          EndDate: item.timeExtent[1],
        };
      }
      if (item.format) {
        body_extras['OutputFormat'] = formatNaming(item);
      }
      if (item.projection) {
        body_extras['OutputGCS'] = item.projection;
      }
      if (item.type) {
        body_extras['DatasetDownloadInformationID'] = item.type;
      }
    }
    return { DatasetID: item.dataset_uid, ...body_extras };
  });
  return {
    Datasets: datasetList,
  };
};

export const getCartObjectFromPrepackaged = (file_data, dataset_data) => {
  return {
    name: dataset_data.title,
    title: file_data.title,
    file: file_data.file,
    area: file_data.area,
    format: file_data.format?.token || file_data.format,
    resolution: file_data.resolution,
    size: file_data.size,
    source: 'Pre-packaged',
    type: file_data.type,
    version: file_data.version,
    year: file_data.year,
    file_id: file_data['@id'],
    unique_id: `${dataset_data.UID}_${file_data['@id']}`,
    dataset_uid: dataset_data.UID,
    task_in_progress: false,
    projection: file_data.projection,
  };
};

export const getCartObjectFromMapviewer = (
  local_cart_data,
  dataset_data,
  projections,
  nutsnames,
) => {
  const area = local_cart_data.area;
  const file = local_cart_data.file;
  if (area?.type === 'nuts' && Object.keys(nutsnames).includes(area.value)) {
    area.valueName = nutsnames[area.value];
  }
  const type_options = [];
  if (dataset_data.dataset_download_information?.items.length > 0) {
    dataset_data.dataset_download_information.items.forEach((item) => {
      type_options.push({
        id: item['@id'],
        name: item.name,
        full_format: item.full_format,
        collection: item.collection,
      });
    });
  }
  return {
    name: dataset_data.title || '-',
    area: area || '-',
    file: file || '-',
    format: type_options.length > 0 ? type_options[0].full_format : null,
    original_format:
      type_options.length > 0 ? type_options[0].full_format : null,
    resolution: dataset_data.resolution || '-',
    size: dataset_data.size || '-',
    source: 'Map viewer',
    type: type_options.length > 0 ? type_options[0].id : null,
    type_options: type_options,
    version: dataset_data.version || '-',
    year: dataset_data.year || '-',
    id: local_cart_data.id,
    unique_id: local_cart_data.unique_id,
    dataset_uid: dataset_data.UID,
    task_in_progress: false,
    projection: dataset_data.projection || projections[0],
    timeExtent: local_cart_data.timeExtent || [],
  };
};
