import {
  POST_IMPORT_API_LAYERS,
  postImportAPILayers,
} from './import_api_layers';

describe('Import geonetwork action', () => {
  describe('postImportAPILayers', () => {
    it('should create an action to post geonetwork', () => {
      const url = 'http://localhost';
      const action = postImportAPILayers(url);

      expect(action.type).toEqual(POST_IMPORT_API_LAYERS);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@import-api-layers`);
    });
  });
});
