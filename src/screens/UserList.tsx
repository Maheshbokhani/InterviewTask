import React, {useEffect, useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import Layout from 'components/Layouts/MainLayout';
import Header from 'components/Layouts/Header';

// Utils
import {colors} from 'utils/colors';

// Services
import dbServices from 'services/database';
import UserListItem from 'components/UserListItem';

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => dbServices.fetchDB(setUserList);

  return (
    <Layout
      headerContent={
        <Header
          title={'User list'}
          rightIcon={<AntDesign name="reload1" size={20} color={colors.text} />}
          onRightBtnClick={fetch}
        />
      }>
      <UserListItem userList={userList} />
    </Layout>
  );
};

export default UserList;
