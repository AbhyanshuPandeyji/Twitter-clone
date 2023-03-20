import {createSlice} from '@reduxjs/toolkit';

// initial state of the data of user in browser
const initialState = {
    currentUser: null, // no user
    isLoading: false, // no loading of it
    error: false, // no error of any kind for its data
};


// creating the data to be stored and worked with - its the reducer of the work
export const userSlice = createSlice({
    name: "user",
    // data key in browser
    initialState,
    // set and work on the data in different manner
    reducers: {
        loginStart: (state) => {
            state.isLoading = true; // start login process
        },
        // state to change the current state and action is the data to be taken to change it to
        loginSuccess: (state, action) => {
            state.isLoading = false; // user loading is complete
            state.currentUser = action.payload; // changing the key of current user in browser database to the given one in state
        },
        // when cannot login due to mismatch or different kind of errors
        loginFailed: (state) => {
            state.isLoading = false; // loading already done
            state.error = true; // error of cannot login
        },
        // when user logout  - set state of the user in browser to none data
        logout: (state) => {
            return initialState;
        },
        // for creating the profile image of the user
        changeProfile: (state, action) => {
            state.currentUser.profilePicture = action.payload;
        },
        following: (state, action) => {
            if(state.currentUser.following.includes(action.payload)) {
                // take out that id from array by its index init if following
                state.currentUser.following.splice(state.currentUser.follwing.findIndex((followingId) => followingId === action.payload));
            } else {
                // push that id into the array if not
                state.currentUser.following.push(action.payload);
            }
        },

    },

});

// functionality we want to use in the client side
export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logout,
    changeProfile,
    following,
} = userSlice.actions;


export default userSlice.reducer;
