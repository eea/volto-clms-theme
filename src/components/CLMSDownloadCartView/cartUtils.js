export const getDownloadToolPostBody = (selectedItems) => {
  const datasetList = selectedItems.map((item) => {
    let body_extras = {};
    if (item.file_id) {
      body_extras['FileID'] = item.file_id;
    } else {
      if (item.area.type === 'polygon') {
        body_extras['BoundingBox'] = item.area.value;
      }
      if (item.area.type === 'nuts') {
        body_extras['NUTS'] = item.area.value;
      }
      if (item.timeExtent.length > 0) {
        body_extras['TemporalFilter'] = {
          StartDate: item.timeExtent[0],
          EndDate: item.timeExtent[1],
        };
      }
      if (item.format) {
        body_extras['OutputFormat'] = item.format;
      }
      if (item.format) {
        body_extras['OutputGCS'] = item.projection;
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
  if (area.type === 'nuts' && Object.keys(nutsnames).includes(area.value)) {
    area.valueName = nutsnames[area.value];
  }
  return {
    name: dataset_data.dataResourceTitle || '-',
    area: area || '-',
    format:
      dataset_data.dataset_full_format?.token ||
      dataset_data.dataset_full_format ||
      '-',
    resolution: dataset_data.resolution || '-',
    size: dataset_data.size || '-',
    source: 'Map viewer',
    type: dataset_data.dataResourceType || '-',
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
