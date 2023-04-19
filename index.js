// async actions- api calling:
// api url -https://jsonplaceholder.typicode.com/todos
//middlewares- redux-thunk:
//axios-api:
//constants:
const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;

const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILED = "GET_TODOS_FAILED";
const API_URL = "https://jsonplaceholder.typicode.com/todos";

//async action creator:
const fetchData = () => {
  return dispatch => {
    dispatch(getTodoRequest());
    axios
      .get(API_URL)
      .then(res => {
        const todos = res.data;
        const title = todos.map(todo => todo.title);
        dispatch(getTodoSuccess(title));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(getTodoFailed(errorMsg));
      });
  };
};

//Initial state:
const initialTodoState = {
  todos: [],
  isLoading: false,
  error: null
};

//actions
const getTodoRequest = () => {
  return {
    type: GET_TODOS_REQUEST
  };
};
const getTodoSuccess = todos => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos
  };
};
const getTodoFailed = error => {
  return {
    type: GET_TODOS_FAILED,
    payload: error
  };
};

//reducers:
const todosReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload
      };
    case GET_TODOS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

//store
const store = createStore(todosReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});
//dispatch:
store.dispatch(fetchData());
