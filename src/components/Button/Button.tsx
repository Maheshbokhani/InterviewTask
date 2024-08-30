import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {colors} from 'utils/colors';

/**
 * Button - This normal button using in submit button.
 * @param title This must be required!
 * @param onPress This must be required!
 */
interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textstyle?: StyleProp<TextStyle>;
  isDisable?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  style,
  textstyle,
  isDisable = false,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, isDisable && styles.lowOpacity]}
      disabled={isLoading || isDisable}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.blue} />
      ) : (
        <Text style={[styles.title, textstyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blue,
  },
  lowOpacity: {opacity: 0.5},
});
