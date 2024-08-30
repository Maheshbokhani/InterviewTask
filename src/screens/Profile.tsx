import React, {useState} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import Layout from 'components/Layouts/MainLayout';
import Header from 'components/Layouts/Header';
import ProfileUpdateModal from 'components/Modals/ProfileUpdate';
import Button from 'components/Button/Button';

// Utils
import {colors} from 'utils/colors';

// Services
import firebaseServices from 'services/firebase';

const Profile = () => {
  const {reset}: any = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const userInfo = firebaseServices.user;

  const signOut = async () => {
    const status = await firebaseServices.signOut();
    if (status) {
      reset({index: 0, routes: [{name: 'SignUp'}]});
    }
  };

  return (
    <Layout
      headerContent={
        <Header
          title={'Profile'}
          rightIcon={<AntDesign name="edit" size={20} color={colors.text} />}
          onRightBtnClick={function (): void {
            setModalVisible(true);
          }}
        />
      }>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png',
          }}
          style={styles.profileImg}
          resizeMode="cover"
        />

        <View style={styles.spaceH} />
        <View style={styles.spaceH} />

        <Text style={styles.text}>{userInfo?.displayName}</Text>

        <View style={styles.spaceH} />

        <Text style={styles.text}>{userInfo?.email}</Text>

        <View style={styles.spaceXL} />

        <Button title={'Sign out'} style={styles.btn} onPress={signOut} />

        <ProfileUpdateModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: '10%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.text,
  },

  profileImg: {
    width: 150,
    height: 150,
    backgroundColor: colors.forground,
    borderRadius: 100,
  },
  spaceH: {height: '1%'},
  spaceXL: {height: '5%'},
  btn: {
    width: '80%',
  },
});

export default Profile;
