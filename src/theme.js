import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069', // grey
    primary: '#0366d6',
    appBar: '#f2f4f7', // almost white
    white: 'white',
    error: '#d73a4a',
  },
  fontSizes: {
    subheading: 16,
    body: 14,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      main: 'Sans-serif',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  backgroundColors: {
    appBar: '#24292e', // almost black
    main: '#e1e4e8', // grey
    languageTag: '#0366d6', // blue
    white: 'white', // white
  },
};

export default theme;

