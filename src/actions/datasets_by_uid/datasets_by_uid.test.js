import { getDatasetsByUid, DATASETS_BY_UID } from './datasets_by_uid';

describe('Dataset action', () => {
  describe('getDatasetsByUid', () => {
    it('should create an action to get datasets', () => {
      const uids = ['uid1', 'uid2'];
      const action = getDatasetsByUid(uids);

      expect(action.type).toEqual(DATASETS_BY_UID);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@datasets_by_uid?UID=' + uids);
    });
  });
});
