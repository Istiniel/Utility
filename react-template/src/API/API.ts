const API_URL = 'https://64143550600d6c8387434f0a.mockapi.io/api/';

const getConfig = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

type GoodsType = {
  url: string;
  title: string;
  measure_type: 'volume' | 'weight';
  measure_value: number;
  barcode: number;
  producer: string;
  brand: string;
  description: string;
  price: number;
  id: number | string;
};

type ApiSettingsType = {
  fetchGoodsList: () => Promise<GoodsType[]>;
};

const APIQuerys: ApiSettingsType = {
  fetchGoodsList: async () => {
    const endpoint = API_URL + `goods`;
    return await (await fetch(endpoint, getConfig)).json();
  },
};

export const { fetchGoodsList } = APIQuerys;
