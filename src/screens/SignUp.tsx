import React, {useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

// Components
import Layout from 'components/Layouts/MainLayout';
import TextInput from 'components/Input/TextInput';
import Button from 'components/Button/Button';
import TextButton from 'components/Button/TextButton';

// Utils
import {validateEmail, onChangeEmail} from 'utils/index';
import {colors} from 'utils/colors';

// Services
import firebaseServices from 'services/firebase';

const SignUp = () => {
  const {navigate, reset}: any = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const isEmailValidate = useMemo(() => {
    if (validateEmail(email)) {
      return true;
    }
    return false;
  }, [email]);

  const isPasswordValidate = useMemo(() => {
    if (password.length < 6) {
      return false;
    }
    return true;
  }, [password]);

  const onChangeEmailValue = text => {
    const value = onChangeEmail(text);
    setEmail(value);
  };

  const onSignInPress = () => {
    navigate('SignIn');
  };

  const onSignUp = async () => {
    setLoading(true);
    const status = await firebaseServices.signUp(name, email, password);
    setLoading(false);
    if (status) {
      reset({index: 0, routes: [{name: 'MainTab'}]});
    }
  };

  return (
    <Layout headerContent={<Text style={styles.title}>Sign up</Text>}>
      <View style={styles.inputContainer}>
        <TextInput
          title="Full name"
          value={name}
          isInvalid={name.length === 0}
          placeholder="Enter name here"
          onChangeValue={setName}
        />

        <View style={styles.spaceH} />

        <TextInput
          title="Email"
          value={email}
          isInvalid={!isEmailValidate}
          placeholder="Enter email here"
          onChangeValue={onChangeEmailValue}
        />

        <View style={styles.spaceH} />

        <TextInput
          title="Password"
          value={password}
          isInvalid={!isPasswordValidate}
          isSecureEntry={isSecureEntry}
          placeholder="Enter password here"
          onChangeValue={setPassword}
          rightBtnPress={() => setIsSecureEntry(!isSecureEntry)}
          icon={
            <Icon
              name={isSecureEntry ? 'eye' : 'eye-off'}
              size={20}
              color={colors.text}
            />
          }
        />
        {!isPasswordValidate && password.length !== 0 && (
          <Text style={styles.passHint}>Hint: Min 6 letters required</Text>
        )}

        <View style={styles.spaceH} />
        <View style={styles.spaceH} />

        <Button
          title={'Sign up'}
          isLoading={loading}
          isDisable={
            !isEmailValidate || !isPasswordValidate || name?.length === 0
          }
          onPress={onSignUp}
        />

        <View style={styles.spaceH} />

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomTxt}>Already have an account?</Text>
          <TextButton title={'Sign in'} onPress={onSignInPress} />
        </View>
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
  title: {
    fontSize: 32,
    color: colors.blue,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: '20%',
  },
  mainContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.forground + 20,
  },
  inputContainer: {
    marginHorizontal: '5%',
    marginVertical: '10%',
  },
  spaceH: {marginTop: '5%'},
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passHint: {
    fontSize: 14,
    color: colors.text,
  },
  bottomTxt: {fontSize: 16, color: colors.text, marginRight: 5},
});

export default SignUp;
