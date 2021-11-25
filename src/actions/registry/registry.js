/**
 * Get cart selection to downloadtool.
 * @module actions/registry
 */
export const GET_REGISTRY = 'GET_REGISTRY';

/**
 * Get cart selection to registry.
 * @function GetRegistry
 * @returns {Object} Get extra items action.
 */
export function getRegistry(registry_key) {
  return {
    type: GET_REGISTRY,
    request: {
      op: 'get',
      path: `/@registry/${registry_key}`,
    },
  };
}
