// // /solana-crowdfunding-platform/frontend/src/redux/store.js

// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// import authReducer from './reducers/authReducer';
// import projectReducer from './reducers/projectReducer';
// import contributionReducer from './reducers/contributionReducer';
// import reviewReducer from './reducers/reviewReducer';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   project: projectReducer,
//   contribution: contributionReducer,
//   review: reviewReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
// /solana-crowdfunding-platform/frontend/src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import projectReducer from './reducers/projectReducer';
import contributionReducer from './reducers/contributionReducer';
import reviewReducer from './reducers/reviewReducer';
import profileReducer from './reducers/profileReducer';
import dashboardReducer from './reducers/dashboardReducer';
import userReducer from './reducers/userReducer';
import settingsReducer from './reducers/settingsReducer';


const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    contribution: contributionReducer,
    review: reviewReducer,
    profile: profileReducer,
    dashboard: dashboardReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export default store;