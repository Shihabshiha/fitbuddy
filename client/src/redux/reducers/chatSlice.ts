import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { MessageType } from '../../types/chatType';
import { RootState } from '../store';


interface ChatState {
  messages: MessageType[];
}

const initialState: ChatState = {
  messages: [],
};


const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setMessages } = chatSlice.actions;

export const selectMessages = (state :RootState) => state.chat.messages

export const chatReducer = chatSlice.reducer;
