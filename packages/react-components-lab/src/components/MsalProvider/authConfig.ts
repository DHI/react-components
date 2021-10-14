import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "8bda1e2c-0fc0-4e32-9b34-f731f81e6a9b",
    authority: "https://login.microsoftonline.com/4c2ebde0-11c8-45fa-9a22-3be5b8203a88",
    redirectUri: "/",
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: ["8bda1e2c-0fc0-4e32-9b34-f731f81e6a9b/.default"],
};

// Add here the endpoints for any API services you would like to use.
export const DSConfig = {
  dfs0TimeSeries: "https://me-test-brain.westeurope.cloudapp.azure.com/mikecloudsamplewebapi/api/timeseries/dfs0-timeseries",
};
