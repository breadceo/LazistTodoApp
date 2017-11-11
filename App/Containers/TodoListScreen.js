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

    toggleDone({item}) {
        this.props.toggleDone(item.id)
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
                <TodoList data={todolist !== undefined && todolist.items} toggleDone={this.toggleDone.bind(this)} />
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
        console.log(this.props);
    }
    _keyExtractor = (item, index) => index

    _renderItem = ({item}) => {
        return (
        <TodoListItem style={styles.itemSection} data={item} toggleDone={this.props.toggleDone} />
    )};

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
        console.log(this.props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <CheckBox 
                isChecked={this.props.data.done}
                checkBoxColor={Colors.snow}
                rightTextStyle={[]}
                onClick={() => this.props.toggleDone({item: this.props.data})} />
                <Text style={[styles.listItemText, this.props.data.checked && styles.listItemDoneText]}>ABCDEFG{this.props.data.title}</Text>
            </View>
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
          createItem: () => dispatch(TodoListActions.create()),
          toggleDone: (id) => dispatch(TodoListActions.toggleDone(id))
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TodoListScreen)
  