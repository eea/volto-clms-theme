// eslint-disable-next-line import/no-unresolved
import {
  GET_TOKENS,
  CREATE_TOKENS,
  DELETE_TOKENS,
} from '../../constants/ActionTypes';

/**
 * Get tokens.
 * @function getTokens
 * @returns {Object} Get tokens action.
 */
export function getTokens() {
  return {
    type: GET_TOKENS,
    request: {
      op: 'get',
      path: `/@service-keys`,
    },
  };
}
/**
 * Create token function.
 * @function createTokens
 * @param {Object|Array} content Token data.
 * @returns {Object} Create token action.
 */
export function createTokens(content) {
  return {
    type: CREATE_TOKENS,
    request: {
      op: 'post',
      path: `/@service-keys`,
      data: content,
    },
  };
}

/**
 * Delete token function.
 * @function deletetoken
 * @param {string} key_id token id
 * @returns {Object} Delete token action.
 */
export function deleteTokens(key_id) {
  return {
    type: DELETE_TOKENS,
    request: {
      op: 'del',
      path: `/@service-keys/${key_id}`,
    },
  };
}
