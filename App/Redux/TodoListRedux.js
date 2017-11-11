import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import _ from 'lodash'

const { Types, Creators } = createActions({
    create: [],
    read: ['id'],
    toggle: ['id'],
    deleteItem: ['id']
})

export const TodoListTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
    items: [],
    read_item: undefined,
    updatedAt: undefined
})

const create = (state) => {
    let item = {
        id: state.items.length + 1,
        done: false,
        title: " "
    }
    let next = state.merge({items: [...state.items, item], updatedAt: Date.now()})
    return next
}

const read = (state, { id }) => {
    if (id === undefined) {
        return state.merge({updatedAt: Date.now()})
    } else {
        let read_item = state.items.find((i) => {
            i.id == id
        })
        let next = state.merge({read_item: read_item, updatedAt: Date.now()})
        return next
    }
}

const toggleDone = (state, { id }) => {
    let index = _.findIndex(state.items, (item) => item.id === id)
    if (index === -1) {
        return state
    }
    let target = state.items[index]
    let next = state.merge({
        items: [
            ...state.items.slice(0, index),
            Object.assign({}, state.items[index], {
                done: !target.done
            }),
            ...state.items.slice(index+1)
        ]
    })
    return next
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CREATE]: create,
    [Types.READ]: read,
    [Types.TOGGLE]: toggleDone,
})