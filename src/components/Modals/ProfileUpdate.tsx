import React, {useState} from 'react';
import {Modal, View, StyleSheet, TouchableOpacity} from 'react-native';

// Components
import TextInput from 'components/Input/TextInput';
import Header from 'components/Layouts/Header';
import Button from 'components/Button/Button';

// Services
import firebaseServices from 'services/firebase';

// Utils
import {colors} from 'utils/colors';

const ProfileUpdateModal = ({visible, onClose}) => {
  const userInfo = firebaseServices.user;

  const [updateNm, setUpdateNm] = useState(userInfo?.displayName || '');
  const [loading, setLoading] = useState(false);

  const updateName = async () => {
    setLoading(true);
    const status = await firebaseServices.updateProfile(updateNm);
    setLoading(false);
    if (status) {
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.closeBtn}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          <Header title={'Update Profile'} textstyle={styles.modalTitle} />

          <TextInput value={updateNm} onChangeValue={setUpdateNm} />

          <View style={styles.spaceH} />

          <Button
            title={'Update'}
            style={styles.btn}
            isLoading={loading}
            isDisable={updateNm.length === 0}
            textstyle={styles.btnTxt}
            onPress={updateName}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)', // Semi-transparent background
  },
  modalContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: colors.forground,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  closeBtn: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  spaceH: {
    height: '7%',
  },
  btn: {
    borderColor: colors.text,
  },
  btnTxt: {
    textDecorationLine: 'none',
    fontSize: 18,
    color: colors.text,
  },
});

export default ProfileUpdateModal;
