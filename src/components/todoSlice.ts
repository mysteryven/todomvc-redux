import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

type Mode = 'view' | 'edit';

export interface TodoItem {
  id: number;
  content: string;
  done: boolean;
  mode: Mode;
}

export type Tab = 'all' | 'active' | 'completed';

interface InitialState {
  list: TodoItem[],
  tab: Tab
}

const initialState: InitialState = {
  list: [],
  tab: 'all'
};

const findItemById = (id: number, state: Draft<InitialState>) => state.list.find(item => item.id === id);

export const todoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TodoItem>) => {
      state.list.push(action.payload);
    },
    toggle: (state, action: PayloadAction<{ done: boolean; id: number }>) => {
      const item = findItemById(action.payload.id, state);
      if (item) {
        item.done = action.payload.done;
      }
    },
    edit: (state, action: PayloadAction<{ content: string; id: number }>) => {
      const item = findItemById(action.payload.id, state);
      if (item) {
        item.content = action.payload.content;
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      const index = state.list.findIndex(item => item.id === action.payload);
      if (index > -1) {
        state.list.splice(index, 1);
      }
    },
    switchMode: (state, action: PayloadAction<{ id: number; mode: Mode }>) => {
      const item = findItemById(action.payload.id, state);
      if (item) {
        item.mode = action.payload.mode;
      }
    },
    changeTab(state, action: PayloadAction<Tab>) {
      state.tab = action.payload;
    }
  }
});


export const getTodos = (state: RootState) => state.todo.list;

export const {add, remove, toggle, edit, switchMode, changeTab} = todoSlice.actions;


export default todoSlice.reducer;
