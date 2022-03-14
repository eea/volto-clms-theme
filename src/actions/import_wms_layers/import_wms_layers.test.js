import {
  POST_IMPORT_WMS_LAYERS,
  postImportWMSLayers,
} from './import_wms_layers';

describe('Import geonetwork action', () => {
  describe('postImportWMSLayers', () => {
    it('should create an action to post geonetwork', () => {
      const url = 'http://localhost';
      const action = postImportWMSLayers(url);

      expect(action.type).toEqual(POST_IMPORT_WMS_LAYERS);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@import-wms-layers`);
    });
  });
});
