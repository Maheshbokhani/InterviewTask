import React, {useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import Layout from 'components/Layouts/MainLayout';
import TextInput from 'components/Input/TextInput';
import Button from 'components/Button/Button';
import TextButton from 'components/Button/TextButton';
import IconButton from 'components/Button/IconButton';

// Utils
import {colors} from 'utils/colors';
import {onChangeEmail, validateEmail} from 'utils/index';

// Services
import firebaseServices from 'services/firebase';

const SignIn = () => {
  const {reset, goBack}: any = useNavigation();

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

  const onSignin = async () => {
    setLoading(true);
    const status = await firebaseServices.signIn(email, password);
    setLoading(false);
    if (status) {
      reset({index: 0, routes: [{name: 'MainTab'}]});
    }
  };

  return (
    <Layout
      headerContent={
        <>
          <IconButton
            icon={
              <AntDesign name={'arrowleft'} size={20} color={colors.text} />
            }
            style={styles.backIcn}
            onPress={goBack}
          />
          <Text style={styles.title}>Sign in</Text>
        </>
      }>
      <View style={styles.inputContainer}>
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
          title={'Sign in'}
          isLoading={loading}
          isDisable={!isEmailValidate || !isPasswordValidate}
          onPress={onSignin}
        />

        <View style={styles.spaceH} />

        <TextButton title={'Forgot password?'} onPress={function (): void {}} />
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
  passHint: {
    fontSize: 14,
    color: colors.text,
  },
  backIcn: {position: 'absolute', left: '5%', top: '5%'},
});

export default SignIn;
