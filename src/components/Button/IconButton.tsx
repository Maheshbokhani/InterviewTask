import React from 'react';
import {TouchableOpacity, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {colors} from 'utils/colors';

/**
 * IconButton - This normal button using in submit button.
 * @param icon This must be required!
 * @param onPress This must be required!
 */
interface Props {
  icon: JSX.Element;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isDisable?: boolean;
}

const IconButton: React.FC<Props> = ({
  icon,
  onPress,
  style,
  isDisable = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, isDisable && styles.lowOpacity]}
      disabled={isDisable}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    height: 42,
    width: 42,
    borderRadius: 26,
    backgroundColor: colors.forground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blue,
  },
  lowOpacity: {opacity: 0.5},
});
