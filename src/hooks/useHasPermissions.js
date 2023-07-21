import {useSelector} from 'react-redux';

export const useHasPermissions = () => {
  const {user} = useSelector((state) => state.userInfo);
  const permissions = user?.permissions;

  const can = (permission) =>
    permissions?.find((p) => p == permission) ? true : false;

  return can;
};
