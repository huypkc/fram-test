import { useEffect, useReducer, useState } from 'react';
import { fetchUsers } from '../services/users';
import { Pagination } from '../components/Pagination';
import './List.css';
import { UserModal } from './UserModal';

const ITEM_PER_PAGE = 5;
const ACTIONS = {
  START_FETCHING: 'start fetching',
  FETCHED_SUCCESSFULLY: 'fetched successfully',
  FETCHED_FAILED: 'fetch failed',
  CHANGE_PAGE: 'change page'
}
const initialState: any = {
  users: {
    loading: false,
    error: null,
    data: [],
    page: 0
  },
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTIONS.START_FETCHING:
      return { ...state, users: { ...state.users, loading: true, error: null, data: [], page: 0 } };
    case ACTIONS.FETCHED_SUCCESSFULLY:
      return { ...state, users: { ...state.users, loading: false, data: action.payload } };
    case ACTIONS.FETCHED_FAILED:
      return { ...state, users: { ...state.users, loading: false, error: action.payload } };
    case ACTIONS.CHANGE_PAGE:
      return { ...state, users: { ...state.users, page: action.payload } };
    default:
      return state;
  }
}

export function List() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPopup, setShowPopup] = useState(false);
  const { users: { loading, error, data, page } } = state;
  const numOfPages = Math.ceil(data.length / ITEM_PER_PAGE);
  const handlePageChange = (_page: number) => dispatch({ type: ACTIONS.CHANGE_PAGE, payload: _page });
  const handleFetch = () => {
    dispatch({ type: ACTIONS.START_FETCHING })
    fetchUsers()
      .then(_users => dispatch({ type: ACTIONS.FETCHED_SUCCESSFULLY, payload: _users }))
      .catch(error => dispatch({ type: ACTIONS.FETCHED_FAILED, payload: error }));
  }
  useEffect(handleFetch, []);
  return (
    <>
      <h1>Employees</h1>
      <table className="table tableList mt-5">
        <thead>
          <tr>
            <th scope="col" className="text-secondary"><i className="fa fa-font" aria-hidden="true"></i>Name</th>
            <th scope="col" className="text-secondary"><span>@</span>Email</th>
            <th scope="col" className="text-secondary"><i className="fa fa-indent" aria-hidden="true"></i>Position</th>
          </tr>
        </thead>
        <tbody>
          {loading ?
            <tr>
              <td colSpan={3} className="text-center">
                <div className="spinner-border text-primary" role="status">
                </div>
              </td>
            </tr> :
            (error ?
              <tr>
                <td colSpan={3} className="text-center text-danger">Can not fetch users. Please try again!</td>
              </tr> :
              data.slice(page * ITEM_PER_PAGE, page * ITEM_PER_PAGE + ITEM_PER_PAGE).map((user: any) => <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
              </tr>))}
          <tr>
            <td colSpan={3}>
              <button type="button" className="btn btn-light text-secondary" onClick={() => setShowPopup(true)}>
                <i className="fa fa-plus" aria-hidden="true"></i> New
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {numOfPages > 0 && <Pagination page={page} numOfPages={numOfPages} onPageChange={handlePageChange} />}
      <UserModal show={showPopup} onClose={() => setShowPopup(false)} onSubmitted={handleFetch}/>
    </>
  );
}
