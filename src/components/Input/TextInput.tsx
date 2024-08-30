import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInput as RNTextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

// Utils
import {colors} from 'utils/colors';

/**
 * TextInput
 * @param value This must be required!
 * @param onChangeValue This must be required!
 */
interface Props {
  title?: string;
  value: string;
  onChangeValue: (value: string) => void;
  isInvalid?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  textstyle?: StyleProp<TextStyle>;
  isDisable?: boolean;
  isSecureEntry?: boolean;
  icon?: JSX.Element;
  rightBtnPress?: () => void;
}

const TextInput: React.FC<Props> = ({
  title,
  value,
  onChangeValue,
  placeholder,
  isInvalid = false,
  style,
  textstyle,
  isDisable = false,
  isSecureEntry = false,
  icon,
  rightBtnPress,
}) => {
  const [onSubmitted, setOnSubmitted] = useState(false);

  const onChange = text => {
    if (onSubmitted) {
      setOnSubmitted(false);
    }
    onChangeValue(text);
  };

  const isInValidInput = onSubmitted && isInvalid;

  return (
    <>
      {!!title && (
        <Text style={[styles.title, isInValidInput && {color: colors.red}]}>
          {title}
        </Text>
      )}
      <View
        style={[
          styles.container,
          style,
          isInValidInput && {borderColor: colors.red},
        ]}>
        <RNTextInput
          value={value}
          editable={!isDisable}
          onChangeText={onChange}
          style={[styles.txtInput, textstyle]}
          placeholder={placeholder}
          placeholderTextColor={colors.forground}
          secureTextEntry={isSecureEntry}
          onSubmitEditing={() => setOnSubmitted(true)}
        />
        {!!icon && (
          <TouchableOpacity onPress={rightBtnPress}>{icon}</TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 6,
    borderColor: colors.forground + 80,
    backgroundColor: colors.black,
    minHeight: 20,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '5%',
    paddingVertical: Platform.OS === 'android' ? '1%' : '5%',
  },
  txtInput: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {fontSize: 16, color: colors.text},
});
