import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

// Utils
import {colors} from 'utils/colors';

// Components
import IconButton from 'components/Button/IconButton';

/**
 * Header - This normal button using in submit button.
 * @param title This must be required!
 */
interface Props {
  title: string;
  rightIcon?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  textstyle?: StyleProp<TextStyle>;
  isDisable?: boolean;
  onRightBtnClick?: () => void;
}

const Header: React.FC<Props> = ({
  title,
  rightIcon,
  style,
  textstyle,
  isDisable = false,
  onRightBtnClick,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, textstyle]}>{title}</Text>
      {!!rightIcon && (
        <IconButton
          style={styles.editBtn}
          isDisable={isDisable}
          icon={rightIcon}
          onPress={onRightBtnClick}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  title: {fontSize: 26, fontWeight: 'bold', color: colors.text},
  lowOpacity: {opacity: 0.5},
  editBtn: {position: 'absolute', right: '5%', width: 40, height: 40},
});
