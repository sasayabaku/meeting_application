import { createSlice } from '@reduxjs/toolkit';

export const skywayReducer = createSlice({
    name: "skywayReducer",
    initialState: {
        id:  null,
        room: null
    },
    reducers: {
        setId: (state, action) =>  {
            return {
                ...state,
                id: action.payload.value,
            };
        },
        setRoom: (state, action) => {
            return {
                ...state,
                room: action.payload.value
            };
        }
    }
});

export  const {setId, setRoom} = skywayReducer.actions;

export const selectId = state => state.skyway.id;
export const selectRoom = state => state.skyway.room;

export default skywayReducer.reducer;