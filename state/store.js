import { configureStore } from '@reduxjs/toolkit';
import skywayReducer from './slices/skyway';

export default configureStore({
    reducer: {
        skyway: skywayReducer
    },
});