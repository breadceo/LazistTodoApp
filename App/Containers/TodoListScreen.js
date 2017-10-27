import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList } from 'react-native'
import CheckBox from 'react-native-check-box'
import { Images } from '../Themes'

// Styles
import styles from './Styles/TodoListScreenStyles'

export default class TodoListScreen extends Component {
    render () {
        return (
        <View style={styles.mainContainer}>
            <View style={styles.section}>
                <Text style={styles.titleText}>
                Todo List
                </Text>
            </View>
            <ScrollView style={styles.section}>
                <TodoList />
            </ScrollView>
        </View>
        )
  }
}

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{text: 'a', checked: false}, {text: 'b', checked: false}, {text: 'c', checked: true}]
        };
    }
    _keyExtractor = (item, index) => index

    _renderItem = ({item}) => (
        <TodoListItem style={styles.section} data={item} />
    );

    render() {
        return (
            <FlatList
                data={this.state.data}
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
                {...this.props}
                leftText={this.props.data.text} 
                checked={this.props.data.checked}
                onClick={() => {}} />
        )
    }
}