import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList } from 'react-native'
import CheckBox from 'react-native-check-box'
import { Colors, Images } from '../Themes'
import { connect } from 'react-redux'
import TodoListActions from '../Redux/TodoListRedux'
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';

// Styles
import styles from './Styles/TodoListScreenStyles'

class TodoListScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.readAll()
    }
    
    render () {
        const { todolist } = this.props
        return (
        <View style={styles.mainContainer}>
            <View style={styles.section}>
                <Text style={styles.titleText}>
                Todo List
                </Text>
            </View>
            <ScrollView style={styles.section}>
                <TodoList data={todolist !== undefined && todolist.items}/>
            </ScrollView>
            <RectangleButton
                onPress={() => this.props.createItem()}
                text="Add"
                height={100}
            />
        </View>
        )
  }
}

class TodoList extends Component {
    constructor(props) {
        super(props);
    }
    _keyExtractor = (item, index) => index

    _renderItem = ({item}) => (
        <TodoListItem style={styles.itemSection} data={item} />
    );

    componentWillReceiveProps(next) {
        console.log(next);
    }

    render() {
        if (!this.props.data) {
            return null;
        }
        return (
            <FlatList
                data={this.props.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }
}

class TodoListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <CheckBox 
                rightText={this.props.data.title}
                rightTextStyle={[styles.listItemText, this.props.data.checked && styles.listItemDoneText]}
                isChecked={this.props.data.checked}
                checkBoxColor={Colors.snow}
                onClick={() => {}} />
        )
    }
}

const mapStateToProps = (state, { todolist } = state) => {
    console.log(state);
    return {
        todolist: todolist
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          readAll: () => dispatch(TodoListActions.read()),
          createItem: () => dispatch(TodoListActions.create())
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TodoListScreen)
  