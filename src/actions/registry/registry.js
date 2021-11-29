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
    registry_key: registry_key,
    request: {
      op: 'get',
      path: `/@anon-registry/${registry_key}`,
    },
  };
}
