const host = 'api';

export interface ApiUrls {
  products: { index: string };
}

export const API_URLS: ApiUrls = {
  products: {
    index: `${host}/products`,
  },
};
