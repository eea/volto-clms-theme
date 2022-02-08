import { getDatasetsByUid } from './datasets_by_uid';
import { DATASETS_BY_UID } from './datasets_by_uid';

describe('Dataset action', () => {
  describe('getDatasetsByUid', () => {
    it('should create an action to get datasets', () => {
      const url = 'http://localhost:3000';
      const action = getDatasetsByUid(url);

      expect(action.type).toEqual(DATASETS_BY_UID);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@datasets_by_uid`);
    });
  });
});
