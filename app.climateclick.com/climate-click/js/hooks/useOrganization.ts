import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getConfig } from "../config";

const { API_URL } = getConfig();

export interface Organization {
  id: string;
  firstName: string;
  lastName: string;
  compensationStrategy: "MERCHANT_PAYING" | "CUSTOMER_PAYING";
  phoneNumber: string;
  email: string;
  isEnabled: boolean;
  doNotShowEnableButtonSetting: boolean;
  showEligibleButtons: boolean;
  buttonOption: "SWITCH" | "CHECKBOX" | "DETAILED"
}

export async function request(accessToken: string, path: string, opts?: RequestInit) {
  return fetch(`${API_URL}${path}`, {
    ...opts,
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${accessToken}`,
      ...opts?.headers,
    },
  });
}

async function findOrganization(accessToken: string): Promise<
  | {
      organization: Organization;
      error: undefined;
    }
  | {
      organization: undefined;
      error: string;
    }
> {
  try {
    const response = await request(accessToken, `/dashboard/organization`);
    if (!response.ok) {
      // TODO: map status code to some sort of error

      return { error: `ErrorOccured`, organization: undefined };
    }

    const json: {
      settings: {
        id: string;
        compensationStrategy: "MERCHANT_PAYING" | "CUSTOMER_PAYING";
        phoneNumber: string;
        firstName: string;
        lastName: string;
        email: string;
        isEnabled: boolean;
        doNotShowEnableButtonSetting: boolean;
        showEligibleButtons: boolean
        buttonOption: "SWITCH" | "CHECKBOX" | "DETAILED"
      };
    } = await response.json();

    // TODO: remove the settings
    return { error: undefined, organization: json.settings };
  } catch (e) {
    if (!window.navigator.onLine) {
      return { error: `Offline`, organization: undefined };
    }

    return { error: `NetworkError`, organization: undefined };
  }
}

async function saveOrganizationSettings(
  accessToken: string,
  organization: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    compensationStrategy: "MERCHANT_PAYING" | "CUSTOMER_PAYING";
    isEnabled: boolean;
    buttonOption:  "SWITCH" | "CHECKBOX" | "DETAILED"
  }
) {
  try {
    const response = await request(accessToken, `/dashboard/organization`, {
      method: `PUT`,
      body: JSON.stringify(organization),
    });
    return response;
  } catch (e) {
    return undefined;
  }
}

export const getAccessTokenFromLocalStorage = () => {
  try {
    return window.localStorage.getItem(`climateClickAccessToken`) || undefined;
  } catch (e) {
    return undefined;
  }
};

const setAccessTokenToLocalStorage = (accessToken: string) => {
  try {
    return window.localStorage.setItem(`climateClickAccessToken`, accessToken);
  } catch (e) {
    return undefined;
  }
};

export type UseOrganization = ReturnType<typeof useOrganization>;
export type SaveOrganizationFn = UseOrganization["saveOrganization"];

export const useOrganization = () => {
  const [accessToken, setAccessToken] = useState(
    getAccessTokenFromLocalStorage()
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [organization, setOrganization] = useState<Organization | undefined>(
    undefined
  );
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log(`Search params `, searchParams);

    const accessToken = searchParams.get(`accessToken`);
    if (accessToken) {
      searchParams.delete(`accessToken`);
      setSearchParams(searchParams);
      setAccessToken(accessToken);
      setAccessTokenToLocalStorage(accessToken);
    } else {
      console.log(`No access token`);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    console.log(`Initial params `, searchParams);

    const accessToken = searchParams.get(`accessToken`);
    if (accessToken) {
      searchParams.delete(`accessToken`);
      setSearchParams(searchParams);
      setAccessToken(accessToken);
      setAccessTokenToLocalStorage(accessToken);
    } else {
      console.log(`No access token`);
    }
  }, []);

  useEffect(() => {
    console.log(`Access token `, accessToken);

    if (!accessToken) {
      return;
    }

    setIsLoading(true);

    async function main() {
      const result = await findOrganization(accessToken!);

      if (result.error) {
        setOrganization(undefined);
        setError(result.error);
      } else {
        setOrganization(result.organization);
      }

      setIsLoading(false);
    }

    main();
  }, [accessToken]);

  const saveOrganization = async (request: {
    firstName: string;
    lastName: string;
    email: string;
    isEnabled: boolean;
    phoneNumber: string;
    compensationStrategy: "MERCHANT_PAYING" | "CUSTOMER_PAYING";
    buttonOption: "SWITCH" | "CHECKBOX" | "DETAILED";
  }) => {
    const response = await saveOrganizationSettings(accessToken!, request);
    if (!response || !response.ok) {
      return false;
    }

    // Optimistcally update the organization to avoid calling the GET again which may return old
    // data.
    setOrganization({
      ...organization!,
      ...request,
    });
    return true;
  };

  return {
    organization,
    isLoading,
    saveOrganization,
  };
};
