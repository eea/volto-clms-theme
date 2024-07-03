# CLMS website integration with ECAS

CLMS uses pas.plugins.oidc, from the special branch `clms-site`.

The oidc plugin is not activated for any PAS interface or functionality, so the
entire functionality is setup client-side. On the client side, the website
provides a "EU Login" button which goes to the ECAS website and has a callback
URL set to the `/acl_users/oidc/@@callback` URL.

This callback first authenticates the request and then calls `rememberIdentity`
which generates a token. The token is used in the computed return url, passed
as `access_token`.

In the `Header` component the `access_token` is read, jwt-decoded and set as an
`auth_token` cookie, which is used by the jwt authentication plugin.
