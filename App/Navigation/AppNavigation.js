import { StackNavigator } from 'react-navigation'
import TodoListScreen from '../Containers/TodoListScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  TodoListScreen: { screen: TodoListScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'TodoListScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
