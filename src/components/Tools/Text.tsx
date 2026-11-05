import { Text as NativeText, StyleSheet, TextProps, TextStyle } from 'react-native';
import theme from '../../theme.ts';
import { ReactElement } from 'react';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  } as TextStyle,
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  white: {
    color: theme.colors.appBarText,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  } as TextStyle,
});

interface IProps extends TextProps {
  color?: 'textSecondary' | 'primary' | "white";
  fontSize?: 'subheading';
  fontWeight?: 'bold';
};

const Text = ({ color, fontSize, fontWeight, style, ...props }: IProps): ReactElement => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.white,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;