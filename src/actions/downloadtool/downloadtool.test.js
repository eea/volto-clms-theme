import { DELETE_DOWNLOADTOOL, deleteDownloadtool } from './delete_downloadtool';
import {
  GET_DOWNLOADTOOL,
  getDownloadtool,
  GET_NUTSNAME,
  getNutsNames,
} from './get_downloadtool';
import { POST_DOWNLOADTOOL, postDownloadtool } from './post_downloadtool';

describe('Downloadtool actions', () => {
  describe('deleteDownloadtool', () => {
    it('should create an action to delete downloadtool', () => {
      const task_id = 'task_id';
      const action = deleteDownloadtool(task_id);

      expect(action.type).toEqual(DELETE_DOWNLOADTOOL);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual('/@datarequest_delete');
      expect(action.request.data).toEqual({ TaskID: task_id });
    });
  });
  describe('getDownloadtool', () => {
    it('should create an action to get downloadtool', () => {
      const action = getDownloadtool();

      expect(action.type).toEqual(GET_DOWNLOADTOOL);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@datarequest_search');
    });
  });
  describe('getNutsNames', () => {
    it('should create an action to get downloadtool', () => {
      const nutsids = 'nutsids';
      const action = getNutsNames(nutsids);

      expect(action.type).toEqual(GET_NUTSNAME);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@nuts_name?nuts_ids=${nutsids}`);
    });
  });
  describe('postDownloadtool', () => {
    it('should create an action to post downloadtool', () => {
      const item = { data: 'data' };
      const unique_ids = ['unique_ids'];
      const action = postDownloadtool(item, unique_ids);

      expect(action.type).toEqual(POST_DOWNLOADTOOL);
      expect(action.request.op).toEqual('post');
      expect(action.request.data).toEqual(item);
      expect(action.request.path).toEqual('/@datarequest_post');
      expect(action.unique_ids).toEqual(unique_ids);
    });
  });
});
