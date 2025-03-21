import { cleanDuplicatesEntries } from '@eeacms/volto-clms-utils/utils';

export const formatNaming = (item) => {
  if (
    item.id === '0517fd1b7d944d8197a2eb5c13470db8' ||
    item.id === '7df9bdf94fe94cb5919c11c9ef5cac65'
  ) {
    return 'Geotiff';
  }
  return item?.format?.token || item?.format;
};

export const originalFormatNaming = (item) => {
  if (
    item.id === '0517fd1b7d944d8197a2eb5c13470db8' ||
    item.id === '7df9bdf94fe94cb5919c11c9ef5cac65'
  ) {
    return 'Geotiff';
  }
  const original = item?.original_format?.token || item?.original_format;
  const collection = getCollectionByItem(item);
  const format = collection?.full_format?.token || collection?.full_format;
  return format ? format : original;
};

export const getCollectionByItem = (item) => {
  return item?.type_options
    ? item?.type_options.find((t_o) => t_o['id'] === item?.type)
    : { id: '' };
};

export const getDownloadToolPostBody = (selectedItems) => {
  const datasetList = selectedItems.map((item) => {
    let body_extras = {};

    if (item?.file_id) {
      body_extras['FileID'] = item?.file_id;
    } else {
      if (item?.area?.type === 'polygon') {
        body_extras['BoundingBox'] = item?.area.value;
      }
      if (item?.area?.type === 'nuts') {
        body_extras['NUTS'] = item?.area.value;
      }
      // if (item?.timeExtent?.length > 0) {
      //   body_extras['TemporalFilter'] = {
      //     StartDate: item?.timeExtent[0],
      //     EndDate: item?.timeExtent[1],
      //   };
      // }
      if (item?.format) {
        body_extras['OutputFormat'] = formatNaming(item);
      }
      if (item?.projection) {
        body_extras['OutputGCS'] = item?.projection;
      }
      if (item?.type) {
        body_extras['DatasetDownloadInformationID'] = item?.type;
      }
      if (item?.layer) {
        body_extras['Layer'] = item?.layer;
      }
      if (item?.TemporalFilter) {
        body_extras['TemporalFilter'] = {
          StartDate: new Date(item?.TemporalFilter?.StartDate).getTime(),
          EndDate: new Date(item?.TemporalFilter?.EndDate).getTime(),
        };
      }
    }
    return { DatasetID: item?.dataset_uid, ...body_extras };
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
  cartRequestedItem,
) => {
  let area = local_cart_data.area;
  const file = local_cart_data.file;
  if (area?.type === 'nuts' && Object.keys(nutsnames).includes(area.value)) {
    area.valueName = nutsnames[area.value];
  }
  const type_options = [];
  if (dataset_data.dataset_download_information?.items.length > 0) {
    dataset_data.dataset_download_information.items.forEach((item) => {
      type_options.push({
        id: item['@id'],
        name: item?.name,
        full_format: item?.full_format,
        collection: item?.collection,
        layers: item?.layers || [],
      });
    });
  }

  return {
    name: dataset_data.title || '-',
    TemporalFilter: cartRequestedItem?.TemporalFilter || null,
    area: area || '-',
    file: file || '-',
    format: cartRequestedItem?.format
      ? cartRequestedItem?.format
      : type_options.length > 0
      ? type_options[0].full_format
      : null,
    original_format:
      type_options.length > 0 ? type_options[0].full_format : null,
    resolution: dataset_data.resolution || '-',
    size: dataset_data.size || '-',
    source: 'Data viewer',
    type: cartRequestedItem?.type
      ? cartRequestedItem?.type
      : type_options.length > 0
      ? type_options[0].id
      : null,
    type_options: type_options,
    version: dataset_data.version || '-',
    year: dataset_data.year || '-',
    id: local_cart_data.id,
    unique_id: local_cart_data.unique_id,
    dataset_uid: dataset_data.UID,
    task_in_progress: false,
    projection: cartRequestedItem?.projection,
    original_projection: dataset_data.original_projection || '',
    timeExtent: local_cart_data.timeExtent || [],
    layer:
      type_options.length > 0 && type_options[0].layers.length > 0
        ? type_options[0].layers[0]
        : null,
    download_show_auxiliary_calendar:
      dataset_data.download_show_auxiliary_calendar,
  };
};

export const duplicateCartItem = (
  unique_id,
  cartItems,
  setCartItems,
  updateCart,
) => {
  if (cartItems.length > 0) {
    const itemIndex = cartItems.findIndex((obj) => obj.unique_id === unique_id);
    const new_item = Object.assign(
      {},
      {
        ...cartItems[itemIndex],
        unique_id: cartItems[itemIndex].unique_id + '-copy',
      },
    );
    while (cartItems.some((c_i) => c_i.unique_id === new_item?.unique_id)) {
      new_item['unique_id'] = new_item?.unique_id + '-copy';
    }
    // new_item['projection'] = null;
    // new_item['type'] = null;
    new_item['format'] = null;
    if (new_item['TemporalFilter']) {
      new_item['TemporalFilter'] = null;
    }
    cartItems.splice(itemIndex + 1, 0, new_item);
    refreshCart(cartItems, setCartItems, updateCart);
  }
};

export const refreshCart = (cartItems, setCartItems, updateCart) => {
  setCartItems([...cartItems]);
  updateCart([
    ...[...cartItems].reverse().map((c_i) => {
      const file_id = c_i.file_id ? { file_id: c_i.file_id } : {};
      const id = c_i.id ? { id: c_i.id } : {};
      return {
        ...file_id,
        ...id,
        UID: c_i.dataset_uid,
        unique_id: c_i.unique_id,
        area: c_i.area,
      };
    }),
  ]);
};

export const concatRequestedCartItem = (
  cartItems,
  setCartItems,
  localSessionCart,
  datasets_items,
  projections,
  nutsnames,
) => {
  setCartItems(
    cleanDuplicatesEntries(
      [...localSessionCart]
        .reverse()
        .filter((localItem) => {
          const requestedItem = datasets_items
            ? datasets_items.find((req) => req.UID === localItem?.UID)
            : false;
          return requestedItem;
        })
        .map((localItem) => {
          const requestedItem = datasets_items
            ? datasets_items.find((req) => req.UID === localItem?.UID)
            : false;
          const cartRequestedItem = cartItems
            ? cartItems.find((req) => req.unique_id === localItem?.unique_id)
            : false;
          const file_data = requestedItem?.downloadable_files?.items.find(
            (item) => item['@id'] === localItem?.file_id,
          );
          if (file_data) {
            return getCartObjectFromPrepackaged(file_data, requestedItem);
          } else {
            return getCartObjectFromMapviewer(
              localItem,
              requestedItem,
              projections,
              nutsnames,
              cartRequestedItem,
            );
          }
        }),
    ),
  );
};

export const isChecked = (cartSelectionCh, cartItemsCh) => {
  return cartItemsCh.length > 0
    ? cartItemsCh
        .filter((item) => item?.task_in_progress === false)
        .map((item, key) => item?.unique_id)
        .every(function (val) {
          return cartSelectionCh.indexOf(val) !== -1;
        })
    : false;
};

export const contentOrDash = (content) => {
  return content || '-';
};

export const getNutsIDList = (cart_data) => {
  const nuts_ids = [];
  cart_data?.length > 0 &&
    cart_data.forEach((cart_item) => {
      cart_item.area?.type === 'nuts' && nuts_ids.push(cart_item.area.value);
    });
  return nuts_ids;
};
