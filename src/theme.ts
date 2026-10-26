import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    AppBarBackground: "#53bf5c",
    MainBackground: "#53bf5c",
    appBarText: "#ffffff"
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System"
    }),
  },
  fontWeights: {
    light: '100',
    normal: '400',
    bold: '700',
  },
  borders: {
    borderRadius: 8
  }
};

export default theme;
