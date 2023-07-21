import apiService from '../../services/api';

const getProducts = async (params) => {
  const response = await apiService({
    url: `/user/products`,
    method: 'get',
    params: {
      ...(params.page && params.page > 1 && {page: params.page}),
      ...(params.q && {q: params.q}),
    },
  });

  return response.data;
};

const createProduct = async (data) => {
  const response = await apiService.post(`/user/products`, data);

  return response.data;
};

const getProduct = async (id) => {
  const response = await apiService.get(`/user/products/${id}`);

  return response.data;
};

const updateProduct = async ({id, data}) => {
  const response = await apiService.put(`/user/products/${id}`, data);

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await apiService.delete(`/user/products/${id}`);

  return response.data;
};

const productsService = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default productsService;
