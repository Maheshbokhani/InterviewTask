import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

// Utils
import {colors} from 'utils/colors';

type Props = {
  headerContent?: JSX.Element;
  footerContent?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  children: JSX.Element;
};

const MainLayout = ({
  headerContent,
  footerContent,
  children,
  style,
}: Props): React.JSX.Element => {
  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.background}
      />

      {headerContent && (
        <View style={styles.headerContainer}>{headerContent}</View>
      )}

      <View style={[styles.mainContainer, style]}>{children}</View>

      {footerContent && (
        <View style={styles.bottomContainer}>{footerContent}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  mainContainer: {},
  bottomContainer: {
    alignItems: 'center',
    marginBottom: '3%',
  },
});

export default MainLayout;
