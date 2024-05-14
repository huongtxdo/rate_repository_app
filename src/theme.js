import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e', // almost black
    textSecondary: '#586069', // grey
    appBar: '#f2f4f7', // almost white
    white: 'white',
    error: '#d73a4a', //pinkish red
    blue: '#0366d6',
  },
  backgroundColors: {
    appBar: '#24292e', // almost black
    main: '#e1e4e8', // grey
    white: 'white', // white
    blue: '#0366d6', // blue
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
};

export default theme;

