import { getProjections } from './get_projections';
import { GET_PROJECTIONS } from './get_projections';

describe('Projections action', () => {
  describe('getProjections', () => {
    it('should create an action to get the projections', () => {
      const url = 'http://localhost';
      const action = getProjections(url);

      expect(action.type).toEqual(GET_PROJECTIONS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@projections`);
    });
  });
});
