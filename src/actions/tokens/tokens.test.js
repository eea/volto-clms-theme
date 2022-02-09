import {
  GET_TOKENS,
  CREATE_TOKENS,
  DELETE_TOKENS,
} from '../../constants/ActionTypes';
import { getTokens, createTokens, deleteTokens } from './tokens';

describe('Tokens actions', () => {
  describe('getTokens', () => {
    it('should create an action to get tokens', () => {
      const action = getTokens();

      expect(action.type).toEqual(GET_TOKENS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@service-keys');
    });
  });
  describe('createTokens', () => {
    it('should create an action to post tokens', () => {
      const tokenTitle = 'tokentitle';
      const action = createTokens(tokenTitle);

      expect(action.type).toEqual(CREATE_TOKENS);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@service-keys');
      expect(action.request.data).toEqual({ title: tokenTitle });
    });
  });
  describe('deleteTokens', () => {
    it('should create an action to delete tokens', () => {
      const key_id = 'key_id';
      const action = deleteTokens(key_id);

      expect(action.type).toEqual(DELETE_TOKENS);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual(`/@service-keys/${key_id}`);
    });
  });
});
