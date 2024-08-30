import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Components
import Layout from 'components/Layouts/MainLayout';

// Utils
import {colors} from 'utils/colors';

const Home = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Contact Form screen</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.text,
  },
});

export default Home;
