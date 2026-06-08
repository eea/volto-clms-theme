const clmsLoginPaths = [
  '/login',
  '/**/login',
  '/login-plone',
  '/**/login-plone',
];

const routeHasCLMSLoginPath = (route) => {
  const paths = Array.isArray(route.path) ? route.path : [route.path];
  return paths.some((path) => clmsLoginPaths.includes(path));
};

export const buildLoginRoutes = (Login, LoginPlone) => [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/**/login',
    component: Login,
  },
  {
    path: '/login-plone',
    component: LoginPlone,
  },
  {
    path: '/**/login-plone',
    component: LoginPlone,
  },
];

export const withCLMSLoginRoutes = (addonRoutes, Login, LoginPlone) => [
  ...buildLoginRoutes(Login, LoginPlone),
  ...(addonRoutes || []).filter((route) => !routeHasCLMSLoginPath(route)),
];
