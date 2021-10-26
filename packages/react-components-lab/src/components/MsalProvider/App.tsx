import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';

// MSAL imports
import {
  MsalProvider,
  useIsAuthenticated,
  useMsal,
  MsalAuthenticationResult,
  MsalAuthenticationTemplate,
  useAccount,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  IMsalContext,
} from '@azure/msal-react';
import {
  IPublicClientApplication,
  InteractionType,
  InteractionStatus,
  InteractionRequiredAuthError,
  // AccountInfo,
} from '@azure/msal-browser';
import CustomNavigationClient from './NavigationClient';

// Config
import { loginRequest, DSConfig } from './authConfig';

type AppProps = {
  pca: IPublicClientApplication;
};

export const PCA = {} as AppProps;

export const callTimeSeries = async (): Promise<void> => {
  const account = PCA.pca.getActiveAccount();
  if (!account) {
    throw Error(
      'No active account! Verify a user has been signed in and setActiveAccount has been called.'
    );
  }

  const response = await PCA.pca.acquireTokenSilent({
    ...loginRequest,
    account,
  });

  const headers = new Headers();
  const bearer = `Bearer ${response.accessToken}`;
  headers.append('Authorization', bearer);

  return fetch(DSConfig.dfs0TimeSeries, {
    method: 'GET',
    headers,
  })
    .then((data) => data.json())
    .catch((error) => console.log(error));
};

export const DSTimeseries = () => {
  const { instance, inProgress } = useMsal();
  const [dsData, setDsData] = useState<null | any>(null);

  useEffect(() => {
    if (!dsData && inProgress === InteractionStatus.None) {
      setDsData('Loading..');
      callTimeSeries()
        .then((response) => setDsData(response))
        .catch((e) => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount(),
            }) as Promise<any>;
          }
        });
    }
  }, [inProgress, dsData, instance]);

  return (
    <>
      <textarea
        readOnly
        style={{ minWidth: '50%', minHeight: '100px' }}
        value={JSON.stringify(dsData)}
      />
    </>
  );
};

export const ErrorComponent: React.FC<MsalAuthenticationResult> = ({
  error,
}) => <>An Error Occurred: {error ? error.errorCode : 'unknown error'}</>;
export const Loading: React.FC<IMsalContext> = () => (
  <>Authentication in progress...</>
);

export function LandingPage() {
  const { inProgress, instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [name, setName] = useState('');

  useEffect(() => {
    if (account && account.name) {
      setName(account.name.split(' ')[0]);
    } else {
      setName('');
    }
  }, [account]);

  return (
    <>
      {/* Conditional redering of authentication **NB Redirect is not working in storybook */}
      {isAuthenticated &&
      inProgress !== InteractionStatus.Startup &&
      inProgress !== InteractionStatus.HandleRedirect ? (
        <>
          <h3>Welcome {name}</h3>
          <Button onClick={() => instance.logoutPopup(loginRequest)}>
            Logout PopUp
          </Button>
          <Button onClick={() => instance.logoutRedirect(loginRequest)}>
            Logout Redirect
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => instance.loginPopup(loginRequest)}>
            Login PopUp
          </Button>
          <Button onClick={() => instance.loginRedirect(loginRequest)}>
            Login Redirect
          </Button>
        </>
      )}

      <br />
      {/* Wrapper redering of authentication **NB Redirect is not working in storybook */}
      <AuthenticatedTemplate>
        <div>Authenticated</div>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <div>Unauthenticated</div>
      </UnauthenticatedTemplate>

      {/* Wrapper redering of authentication only if authenticated */}
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={loginRequest}
        errorComponent={ErrorComponent}
        loadingComponent={Loading}
      >
        <div>Data:</div>
        <DSTimeseries />
      </MsalAuthenticationTemplate>
    </>
  );
}

function App({ pca }: AppProps) {
  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const history = useHistory();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  // Unreachable new PublicClientApplication() from Auth.Stories.tsx
  PCA.pca = pca;

  return (
    <MsalProvider instance={pca}>
      <LandingPage />
    </MsalProvider>
  );
}

export default App;
