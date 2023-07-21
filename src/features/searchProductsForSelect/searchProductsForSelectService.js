import apiService from '../../services/api';

const getProducts = async (query) => {
  const response = await apiService.get(`user/products/search?query=${query}`);

  return response.data;
};

const searchProductsForSelectService = {
  getProducts,
};

export default searchProductsForSelectService;
