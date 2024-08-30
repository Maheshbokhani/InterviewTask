import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

// Components
import Layout from 'components/Layouts/MainLayout';

// Utils
import {colors} from 'utils/colors';

// Services
import firebaseServices from 'services/firebase';

const Splash = () => {
  const {reset}: any = useNavigation();

  useEffect(() => {
    (async () => {
      const currentUser = await firebaseServices.currentUser();
      if (currentUser) {
        reset({index: 0, routes: [{name: 'MainTab'}]});
        return;
      }
      reset({index: 0, routes: [{name: 'SignUp'}]});
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={styles.layoutContainer}>
      <View style={styles.mainContainer}>
        <ActivityIndicator size={'large'} color={colors.blue} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.forground + 20,
  },
});

export default Splash;
