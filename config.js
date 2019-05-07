var settings = require("./local.settings");
exports.creds = {
  // Required
  identityMetadata: process.env.identityMetadata || settings.identityMetadata,
  // or equivalently: 'https://login.microsoftonline.com/<tenant_guid>/.well-known/openid-configuration'
  //
  // or you can use the common endpoint
  // 'https://login.microsoftonline.com/common/.well-known/openid-configuration'
  // To use the common endpoint, you have to either set `validateIssuer` to false, or provide the `issuer` value.
  // Required, the client ID of your app in AAD
  clientID: process.env.clientID || settings.clientID,
  // Required, must be 'code', 'code id_token', 'id_token code' or 'id_token'
  responseType: process.env.responseType || settings.responseType,
  // Required
  responseMode: process.env.responseMode || settings.responseMode,
  // Required, the reply URL registered in AAD for your app
  redirectUrl: process.env.redirectUrl || settings.redirectUrl,
  // Required if we use http for redirectUrl
  allowHttpForRedirectUrl:
    process.env.allowHttpForRedirectUrl == "true" ||
    settings.allowHttpForRedirectUrl,
  // Required if `responseType` is 'code', 'id_token code' or 'code id_token'.
  // If app key contains '\', replace it with '\\'.
  clientSecret: process.env.clientSecret || settings.clientSecret,
  // Required to set to false if you don't want to validate issuer
  validateIssuer: true,
  // Required to set to true if you are using B2C endpoint
  // This sample is for v1 endpoint only, so we set it to false
  isB2C: false,
  // Required if you want to provide the issuer(s) you want to validate instead of using the issuer from metadata
  issuer: null,
  // Required to set to true if the `verify` function has 'req' as the first parameter
  passReqToCallback: false,
  // Recommended to set to true. By default we save state in express session, if this option is set to true, then
  // we encrypt state and save it in cookie instead. This option together with { session: false } allows your app
  // to be completely express session free.
  useCookieInsteadOfSession: true,
  // Required if `useCookieInsteadOfSession` is set to true. You can provide multiple set of key/iv pairs for key
  // rollover purpose. We always use the first set of key/iv pair to encrypt cookie, but we will try every set of
  // key/iv pair to decrypt cookie. Key can be any string of length 32, and iv can be any string of length 12.
  cookieEncryptionKeys: [
    {
      key:
        process.env.cookieEncryptionKeyOne ||
        settings.cookieEncryptionKeys[0].key,
      iv:
        process.env.cookieEncryptionIvOne || settings.cookieEncryptionKeys[0].iv
    },
    {
      key:
        process.env.cookieEncryptionKeyTwo ||
        settings.cookieEncryptionKeys[1].key,
      iv:
        process.env.cookieEncryptionIvTwo || settings.cookieEncryptionKeys[1].iv
    }
  ],
  // Optional. The additional scope you want besides 'openid', for example: ['email', 'profile'].
  scope: null,
  // Optional, 'error', 'warn' or 'info'
  loggingLevel: process.env.loggingLevel || settings.loggingLevel,
  // Optional. The lifetime of nonce in session or cookie, the default value is 3600 (seconds).
  nonceLifetime: null,
  // Optional. The max amount of nonce saved in session or cookie, the default value is 10.
  nonceMaxAmount: 5,
  // Optional. The clock skew allowed in token validation, the default value is 300 seconds.
  clockSkew: null
};
// Optional.
// If you want to get access_token for a specific resource, you can provide the resource here; otherwise,
// set the value to null.
// Note that in order to get access_token, the responseType must be 'code', 'code id_token' or 'id_token code'.
exports.resourceURL = "https://graph.windows.net";
// The url you need to go to destroy the session with AAD
exports.destroySessionUrl =
  "https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri="; // redirect_url value will be added in app.js based on dev/prod
// If you want to use the mongoDB session store for session middleware, set to true; otherwise we will use the default
// session store provided by express-session.
// Note that the default session store is designed for development purpose only.
// exports.useMongoDBSessionStore = false;
// If you want to use mongoDB, provide the uri here for the database.
// exports.databaseUri = "mongodb://localhost/OIDCStrategy";
// How long you want to keep session in mongoDB.
// exports.mongoDBSessionMaxAge = 24 * 60 * 60; // 1 day (unit is second)