import { IUserForm } from "../models/user";

const API = 'https://60d30c38858b410017b2ec87.mockapi.io';
const API_USERS = `${API}/users`;

export const fetchUsers = () => fetch(API_USERS).then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Something went wrong');
    }
});
export const createUser = (data: IUserForm) => fetch(API_USERS, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Something went wrong');
    }
});;