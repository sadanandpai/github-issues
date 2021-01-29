import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './issuesSlice';

export default configureStore({
  reducer: {
    issues: issuesReducer,
  },
});
