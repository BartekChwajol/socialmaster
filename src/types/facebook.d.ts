interface FacebookLoginStatus {
  status: 'connected' | 'not_authorized' | 'unknown';
  authResponse: {
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
  };
}

interface FacebookLoginResponse {
  authResponse: {
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
  } | null;
  status: string;
}

interface FacebookApiResponse {
  error?: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id: string;
  };
  data?: any[];
  [key: string]: any;
}

interface FacebookSDK {
  init(params: {
    appId: string;
    cookie?: boolean;
    xfbml?: boolean;
    version: string;
    status?: boolean;
    debug?: boolean;
  }): void;
  login(
    callback: (response: FacebookLoginResponse) => void,
    options?: { scope: string }
  ): void;
  api(
    path: string,
    method?: string,
    params?: any,
    callback?: (response: FacebookApiResponse) => void
  ): void;
  getLoginStatus(callback: (response: FacebookLoginStatus) => void): void;
}

interface Window {
  FB: FacebookSDK;
  fbAsyncInit: () => void;
}