import { getRegistry } from './registry';
import { GET_REGISTRY } from './registry';

describe('Registry action', () => {
  describe('getRegistry', () => {
    it('should create an action to get the registry', () => {
      const url = 'http://localhost';
      const action = getRegistry(url);
      const registry_key = 'registry_key';

      expect(action.type).toEqual(GET_REGISTRY);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `${url}/@anon-registry/${registry_key}`,
      );
    });
  });
});
