import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors} from 'utils/colors';

/**
 * TextButton - This normal button using in submit button.
 * @param title This must be required!
 * @param onPress This must be required!
 * @param style (Optional)
 * @param textStyle (Optional)
 * @param isDisable (Optional)
 */
interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textstyle?: StyleProp<TextStyle>;
  isDisable?: boolean;
}

const TextButton: React.FC<Props> = ({
  title,
  onPress,
  style,
  textstyle,
  isDisable = false,
}) => {
  return (
    <TouchableOpacity
      style={[style, isDisable && styles.lowOpacity]}
      disabled={isDisable}
      onPress={onPress}>
      <Text style={[styles.title, textstyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 26,
    borderColor: colors.blue,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blue,
    textDecorationLine: 'underline',
  },
  lowOpacity: {opacity: 0.5},
});
