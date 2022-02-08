import { postImportGeonetwork } from './import_geonetwork';
import { POST_IMPORT_GEONETWORK } from './import_geonetwork';

describe('Import geonetwork action', () => {
  describe('postImportGeonetwork', () => {
    it('should create an action to post geonetwork', () => {
      const url = 'http://localhost';
      const action = postImportGeonetwork(url);

      expect(action.type).toEqual(POST_IMPORT_GEONETWORK);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@import-from-geonetwork`);
    });
  });
});
