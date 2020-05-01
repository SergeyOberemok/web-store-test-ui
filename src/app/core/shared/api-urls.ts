const host = 'api';

export interface ApiUrls {
  auth: { login: string; register: string };
  products: { index: string };
}

export const API_URLS: ApiUrls = {
  auth: {
    login: `${host}/login`,
    register: `${host}/register`,
  },
  products: {
    index: `${host}/products`,
  },
};
