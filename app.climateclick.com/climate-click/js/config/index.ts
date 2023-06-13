import { getDevelopmentConfig } from "./development";
import { getProductionConfig } from "./production";
import { getStagingConfig } from "./staging";

export interface Config {
  API_URL: string;
  SHOPIFY_API_KEY: string;
}

export const getConfig = (): Config => {
  if (window.location.hostname === `localhost`) {
    return getDevelopmentConfig();
  }

  if (window.location.hostname.indexOf(`climateclick.io`) !== -1) {
    return getStagingConfig();
  }

  return getProductionConfig();
};
