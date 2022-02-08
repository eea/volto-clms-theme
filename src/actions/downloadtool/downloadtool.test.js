import { DELETE_DOWNLOADTOOL } from './delete_downloadtool';
import { deleteDownloadtool } from './delete_downloadtool';
import { GET_DOWNLOADTOOL } from './get_downloadtool';
import { getDownloadtool } from './get_downloadtool';
import { GET_NUTSNAME } from './get_downloadtool';
import { getNutsNames } from './get_downloadtool';
import { POST_DOWNLOADTOOL } from './post_downloadtool';
import { postDownloadtool } from './post_downloadtool';

describe('Downloadtool actions', () => {
  describe('deleteDownloadtool', () => {
    it('should create an action to delete downloadtool', () => {
      const url = 'http://localhost';
      const action = deleteDownloadtool(url);

      expect(action.type).toEqual(DELETE_DOWNLOADTOOL);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual(`${url}/@datarequest_delete`);
    });
  });
  describe('getDownloadtool', () => {
    it('should create an action to get downloadtool', () => {
      const url = 'http://localhost';
      const action = getDownloadtool(url);

      expect(action.type).toEqual(GET_DOWNLOADTOOL);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@datarequest_search`);
    });
  });
  describe('getNutsNames', () => {
    it('should create an action to get downloadtool', () => {
      const url = 'http://localhost';
      const nutsids = 'nutsids';
      const action = getNutsNames(url);

      expect(action.type).toEqual(GET_NUTSNAME);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `${url}//@nuts_name?nuts_ids=${nutsids}`,
      );
    });
  });
  describe('postDownloadtool', () => {
    it('should create an action to post downloadtool', () => {
      const url = 'http://localhost';
      const action = postDownloadtool(url);

      expect(action.type).toEqual(POST_DOWNLOADTOOL);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@datarequest_post`);
    });
  });
});
