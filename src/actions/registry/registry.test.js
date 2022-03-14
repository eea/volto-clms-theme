import { getRegistry, GET_REGISTRY } from './registry';

describe('Registry action', () => {
  describe('getRegistry', () => {
    it('should create an action to get the registry', () => {
      const registry_key = 'registry_key';
      const action = getRegistry(registry_key);

      expect(action.type).toEqual(GET_REGISTRY);
      expect(action.registry_key).toEqual(registry_key);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@anon-registry/${registry_key}`);
    });
  });
});
