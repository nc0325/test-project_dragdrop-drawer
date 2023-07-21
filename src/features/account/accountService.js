import apiService from '../../services/api';

const getAccountData = async () => {
  const response = await apiService.get('/account');

  return response.data;
};

const getPublicAccountData = async (id) => {
  const response = await apiService.get('/public/account/' + id);

  return response.data;
};

const updateAccount = async (data) => {
  const response = await apiService.post('/account?_method=PUT', data);

  return response.data;
};

const testAccountFeedbackMessage = async (data) => {
  const response = await apiService.post(
    '/account/test-feedback-message',
    data,
  );

  return response.data;
};

const testAccountLoyaltyMessage = async (data) => {
  const response = await apiService.post('/account/test-loyalty-message', data);

  return response.data;
};

const accountService = {
  getAccountData,
  getPublicAccountData,
  updateAccount,
  testAccountFeedbackMessage,
  testAccountLoyaltyMessage,
};

export default accountService;
