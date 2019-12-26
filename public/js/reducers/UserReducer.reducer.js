// export default function reducer (
//     state = {
//         users: [],
//         user: null,
//         fetched: false,
//         error: null
//     },
//     action
// ) {
//     switch (action.type) {
//         case "FETCH_USERS_REJECTED":
//             return {
//                 ...state,
//                 fetched: false,
//                 error: action.payload
//             };

//         case "FETCH_USERS_FULFILLED":
//             return {
//                 ...state,
//                 fetched: true,
//                 users: action.payload.data.users
//             };

//         case "FETCH_USER_REJECTED":
//             return {
//                 ...state,
//                 fetched: false,
//                 error: action.payload
//             };

//         case "FETCH_USER_FULFILLED":
//             return {
//                 ...state,
//                 fetched: true,
//                 user: action.payload
//             };
//     }
//     return state;
// }

// import { SET_CURRENT_USER } from '../actions/types';
// import isEmpty from '../validation/is-empty';

// const initialState = {
//     users: [],
//     user: null,
//     fetched: false,
//     error: null
// }

// // export default function (state = initialState, action) {
// //     switch (action.type) {
// //         case FETCH_USERS_REJECTED:
// //             return {
// //                 ...state,
// //                 isAuthenticated: !isEmpty(action.payload),
// //                 user: action.payload
// //             }
// //         case FETCH_USERS_FULFILLED:
// //             return {
// //                 ...state,
// //                 isAuthenticated: !isEmpty(action.payload),
// //                 user: action.payload
// //             }import { SET_CURRENT_USER } from '../actions/types';
// import isEmpty from "../validation/is-empty";

const initialState = {
    users: [],
    user: null,
    fetched: false,
    error: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "FETCH_USERS_REJECTED":
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case "FETCH_USERS_FULFILLED":
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case "FETCH_USER_REJECTED":
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case "FETCH_USER_FULFILLED":
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}
