
import { createSlice } from '@reduxjs/toolkit'

const loadFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem('myData')
    return serializedData ? JSON.parse(serializedData) : []
  } catch (e) {
    return []
  }
}

const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem('myData', JSON.stringify(data))
  } catch (e) {

  }
}

const initialState = {
  items: loadFromLocalStorage(),
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
      saveToLocalStorage(state.items)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      saveToLocalStorage(state.items)
    },
  
  },
})

export const { addItem, removeItem } = dataSlice.actions
export default dataSlice.reducer
