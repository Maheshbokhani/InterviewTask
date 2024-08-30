// Redux
import {
  fetchingUser,
  fetchedUserInfo,
  fetchError,
} from 'redux/reducers/userReducer';
import dbServices from 'services/database';

export const fetchUser = () => {
  return async dispatch => {
    dispatch(fetchingUser());
    try {
      const response = await dbServices.userList;
      dispatch(fetchedUserInfo(response));
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};
