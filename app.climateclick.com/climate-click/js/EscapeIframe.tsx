import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge, Loading } from "@shopify/app-bridge-react";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Provider } from "@shopify/app-bridge-react";
import { getConfig } from "./config";

const { SHOPIFY_API_KEY } = getConfig();

export const EscapeIframe = () => {
  const config = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const host = searchParams.get("host");

    return {
      apiKey: SHOPIFY_API_KEY,
      host: host ? atob(host) : "",
    };
  }, []);

  return (
    <Provider config={config}>
      <Shopify />
    </Provider>
  );
};

export const Shopify = () => {
  const app = useAppBridge();
  const { search } = useLocation();

  useEffect(() => {
    if (!!app && !!search) {
      const params = new URLSearchParams(search);
      const redirectUri = params.get("redirectUri")!;
      const url = new URL(decodeURIComponent(redirectUri));

      if (url.hostname === window.location.hostname) {
        const redirect = Redirect.create(app);
        redirect.dispatch(
          Redirect.Action.REMOTE,
          decodeURIComponent(redirectUri)
        );
      }
    }
  }, [app, search]);

  return <Loading />;
};
