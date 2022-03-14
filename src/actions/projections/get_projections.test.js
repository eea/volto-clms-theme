import { getProjections, GET_PROJECTIONS } from './get_projections';

describe('Projections action', () => {
  describe('getProjections', () => {
    it('should create an action to get the projections', () => {
      const action = getProjections();

      expect(action.type).toEqual(GET_PROJECTIONS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@projections');
    });
  });
});
