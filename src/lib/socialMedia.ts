import { FACEBOOK_APP_ID } from './config';

// Konfiguracja aplikacji Facebook
const FB_API_VERSION = 'v18.0';
const REQUIRED_SCOPES = [
  'public_profile',
  'email',
  'pages_show_list',
  'pages_read_engagement',
  'pages_manage_posts',
  'pages_manage_metadata',
  'pages_read_user_content',
  'business_management',
  'instagram_basic',
  'instagram_content_publish',
  'instagram_manage_insights',
  'instagram_manage_comments',
  'instagram_shopping_tag_products'
];

let isFBInitialized = false;

export const initializeFacebookSDK = (): Promise<void> => {
  return new Promise((resolve) => {
    if (isFBInitialized) {
      resolve();
      return;
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: FB_API_VERSION
      });
      
      FB.getLoginStatus(function(response) {
        console.log('FB Login Status:', response.status);
      });
      
      isFBInitialized = true;
      resolve();
    };

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = `https://connect.facebook.net/pl_PL/sdk.js`;
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    } else {
      if (window.FB) {
        window.FB.init({
          appId: FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: FB_API_VERSION
        });
        isFBInitialized = true;
        resolve();
      }
    }
  });
};

export const loginWithFacebook = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK nie jest załadowane'));
      return;
    }

    window.FB.login((response) => {
      if (response.authResponse) {
        resolve(response.authResponse.accessToken);
      } else {
        reject(new Error('Logowanie do Facebooka nie powiodło się'));
      }
    }, {
      scope: REQUIRED_SCOPES.join(','),
      return_scopes: true,
      enable_profile_selector: true
    });
  });
};

export const getFacebookPages = async (accessToken: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK nie jest załadowane'));
      return;
    }

    window.FB.api(
      '/me/accounts',
      'GET',
      { access_token: accessToken },
      (response: FacebookApiResponse) => {
        if (response.error) {
          console.error('Error getting Facebook pages:', response.error);
          reject(new Error(response.error.message));
          return;
        }

        const pages = response.data?.map(page => ({
          id: page.id,
          name: page.name,
          access_token: page.access_token
        })) || [];

        resolve(pages);
      }
    );
  });
};

export const getInstagramAccounts = async (pageId: string, pageAccessToken: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK nie jest załadowane'));
      return;
    }

    window.FB.api(
      `/${pageId}?fields=instagram_business_account{id,username,profile_picture_url,followers_count,media_count}`,
      'GET',
      { access_token: pageAccessToken },
      (response: FacebookApiResponse) => {
        if (response.error) {
          console.error('Error getting Instagram accounts:', response.error);
          reject(new Error(response.error.message));
          return;
        }

        if (!response.instagram_business_account) {
          resolve([]);
          return;
        }

        const igAccount = response.instagram_business_account;
        resolve([{
          id: igAccount.id,
          username: igAccount.username,
          profilePicture: igAccount.profile_picture_url,
          followersCount: igAccount.followers_count,
          mediaCount: igAccount.media_count
        }]);
      }
    );
  });
};

export const getInstagramMedia = async (igAccountId: string, accessToken: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK nie jest załadowane'));
      return;
    }

    window.FB.api(
      `/${igAccountId}/media`,
      'GET',
      {
        access_token: accessToken,
        fields: ['id', 'caption', 'media_type', 'media_url', 'thumbnail_url', 'permalink', 'timestamp', 'like_count', 'comments_count'],
        limit: 25
      },
      (response: FacebookApiResponse) => {
        if (response.error) {
          console.error('Error getting Instagram media:', response.error);
          reject(new Error(response.error.message));
          return;
        }
        resolve(response.data || []);
      }
    );
  });
};

export const getInstagramInsights = async (igAccountId: string, accessToken: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK nie jest załadowane'));
      return;
    }

    window.FB.api(
      `/${igAccountId}/insights`,
      'GET',
      {
        access_token: accessToken,
        metric: ['impressions', 'reach', 'profile_views'],
        period: 'day'
      },
      (response: FacebookApiResponse) => {
        if (response.error) {
          console.error('Error getting Instagram insights:', response.error);
          reject(new Error(response.error.message));
          return;
        }
        resolve(response.data || []);
      }
    );
  });
};

export const publishToFacebook = async (pageId: string, accessToken: string, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK nie jest załadowane'));
      return;
    }

    window.FB.api(
      `/${pageId}/feed`,
      'POST',
      {
        message: content,
        access_token: accessToken
      },
      (response: FacebookApiResponse) => {
        if (response.error) {
          console.error('Error publishing to Facebook:', response.error);
          reject(new Error(response.error.message));
          return;
        }
        resolve();
      }
    );
  });
};

export const publishToInstagram = async (igAccountId: string, accessToken: string, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK nie jest załadowane'));
      return;
    }

    window.FB.api(
      `/${igAccountId}/media`,
      'POST',
      {
        caption: content,
        access_token: accessToken
      },
      (containerResponse: FacebookApiResponse) => {
        if (containerResponse.error) {
          console.error('Error creating Instagram media container:', containerResponse.error);
          reject(new Error(containerResponse.error.message));
          return;
        }

        window.FB.api(
          `/${igAccountId}/media_publish`,
          'POST',
          {
            creation_id: containerResponse.id,
            access_token: accessToken
          },
          (publishResponse: FacebookApiResponse) => {
            if (publishResponse.error) {
              console.error('Error publishing to Instagram:', publishResponse.error);
              reject(new Error(publishResponse.error.message));
              return;
            }
            resolve();
          }
        );
      }
    );
  });
};