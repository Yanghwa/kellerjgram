//imports

//actions

const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT'
const SET_USER_LIST = 'SET_USER_LIST';
const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';

//action creators

function saveToken(token) {
    return {
        type: SAVE_TOKEN,
        token
    }
}

function logout() {
    return {
        type: LOGOUT
    };
}

function setUserList(userList) {
    return {
        type: SET_USER_LIST,
        userList
    };
}

function setFollowUser(userId) {
    return {
        type: FOLLOW_USER,
        userId
    }
}

function setUnfollowUser(userId) {
    return {
        type: UNFOLLOW_USER,
        userId
    }
}

//API actions

function facebookLogin(access_token) {
    return function(dispatch) {
        fetch('/users/login/facebook/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_token
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token) {
                // console.log('hey');
                dispatch(saveToken(json.token));
            }
        })
        .catch(err => console.log(err))
    };
}

function usernameLogin(username, password) {
    return function(dispatch) {
        fetch('/rest-auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token) {
                dispatch(saveToken(json.token));
            }
        })
        .catch(err => console.log(err));
    };
}

function createAccount(username, password, email, name) {
    return function(dispatch) {
        fetch('/rest-auth/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password1: password,
                password2: password,
                email,
                name
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token) {
                dispatch(saveToken(json.token));
            }
        })
        .catch(err => console.log(err));
    };
}

function getPhotoLikes(photoId) {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/images/${photoId}/likes/`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            }
            return response.json();
        })
        .then(json => {
            dispatch(setUserList(json));
        });
    };
}

function followUser(userId) {
    return (dispatch, getState) => {
        dispatch(setFollowUser(userId));
        const { user: { token }} = getState();
        fetch(`/users/${userId}/follow/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(logout());
            } else if(!response.ok) {
                dispatch(setUnfollowUser(userId));
            }
        });
    }
}

function unfollowUser(userId) {
    return (dispatch, getState) => {
        dispatch(setUnfollowUser(userId));
        const { user: { token }} = getState();
        fetch(`/users/${userId}/unfollow/`, {
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(logout());
            } else if(!response.ok) {
                dispatch(setFollowUser(userId));
            }
        });
    }
}

function getExplore() {
    return (dispatch, getState) => {
        const { user: { token }} = getState();
        fetch(`/users/explore/`, {
            method: 'GET',
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(logout());
            } 
            return response.json();
        })
        .then(json => dispatch(setUserList(json)));
    }
}

//initial state
const initialState = {
    isLoggedIn: localStorage.getItem('jwt') ? true : false,
    token: localStorage.getItem('jwt')
};

//reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_TOKEN:
            return applySetToken(state, action);
        case LOGOUT:
            return applyLogout(state, action);
        case SET_USER_LIST:
            return applyUserList(state, action);
        case FOLLOW_USER:
            return applyFollowUser(state, action);
        case UNFOLLOW_USER:
            return applyUnfollowUser(state, action);
        default:
            return state;
    }
}

//reducer functions

function applySetToken(state, action) {
    const { token } = action;
    localStorage.setItem("jwt", token);
    return {
        ...state,
        isLoggedIn: true,
        token
    }
}

function applyLogout(state, action) {
    localStorage.removeItem('jwt');
    return {
        isLoggedIn: false
    };
}

function applyUserList(state, action) {
    const { userList } = action;
    return {
        ...state,
        userList
    };
}

function applyFollowUser(state, action) {
    const { userId } = action;
    const { userList } = state;
    const updatedUserList = userList.map(user => {
        if(user.id === userId) {
            return { ...user, following: true };
        }
        return user;
    });
    return { ...state, userList: updatedUserList }
}

function applyUnfollowUser(state, action) {
    const { userId } = action;
    const { userList } = state;
    const updatedUserList = userList.map(user => {
        if(user.id === userId) {
            return { ...user, following: false };
        }
        return user;
    });
    return { ...state, userList: updatedUserList }
}

//exports

const actionCreators = {
    facebookLogin,
    usernameLogin,
    createAccount,
    logout,
    getPhotoLikes,
    followUser,
    unfollowUser,
    getExplore
};

export { actionCreators };

//reducer export
export default reducer;