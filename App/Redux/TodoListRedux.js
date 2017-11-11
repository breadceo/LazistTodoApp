import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'

const { Types, Creators } = createActions({
    create: [],
    read: ['id'],
    updateItem: ['id', 'data'],
    deleteItem: ['id']
})

export const TodoListTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    items: [],
    read_item: undefined,
    updatedAt: undefined
})

export const create = (state) => {
    let item = {
        id: state.items.length + 1,
        checked: false,
        title: " "
    }
    let next = state.merge({items: [...state.items, item], updatedAt: Date.now()})
    return next
}

export const read = (state, { id }) => {
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

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CREATE]: create,
    [Types.READ]: read,
})