import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  itemSection: {
    margin: Metrics.section,
    padding: Metrics.baseMargin
  },
  listItemText: {
    ...Fonts.style.h4,
    color: Colors.snow,
    textAlign: 'left'
  },
  listItemDoneText: {
    textDecorationLine: 'line-through'
  }
})
