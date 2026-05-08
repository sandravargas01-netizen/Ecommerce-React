import api from './api';

export const getProfile = () =>
  api.get('/users/me');

export const getPersonalInfo = () =>
  api.get('/users/me/personal-info');

export const updatePersonalInfo = (data: any) =>
  api.put('/users/me/personal-info', data);

export const getAddresses = () =>
  api.get('/users/me/addresses');

export const addAddress = (data: any) =>
  api.post('/users/me/addresses', data);

export const updateAddress = (addressId: string, data: any) =>
  api.put(`/users/me/addresses/${addressId}`, data);

export const deleteAddress = (addressId: string) =>
  api.delete(`/users/me/addresses/${addressId}`);
