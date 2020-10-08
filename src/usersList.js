import React from 'react';
import { usersListUrl as Ulurl } from './url';

export default class UsersList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { users: [{ Id: 'Loading...', Name: 'Loading...', Login: 'Loading...' }] };

        this.getUsersList();
    }

    getUsersList() {
        fetch(Ulurl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.message) this.setState({ users: [{ Id: 'Отказано', Name: 'Отказано', Login: 'Отказано' }] })
                else this.setState({ users: res });
            })
    }

    render() {
        let changeColor = true;
        const token = localStorage.token;

        if (token) {

            return (
                <div>
                    <div><strong>Имя пользователья | Логин пользователя</strong></div>
                    <ul class="list-group">
                        {this.state.users.map(item => {
                            changeColor = !changeColor;
                            if (changeColor) {
                                return (
                                    <li class="list-group-item list-group-item-primary" key={item.Id}>
                                        {item.Name} - { item.Login}
                                    </li>
                                );
                            }
                            else return (
                                <li class="list-group-item list-group-item-secondary" key={item.Id}>
                                    {item.Name} - { item.Login}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )
        }
        else return (
            <h2>Отказано в доступе!</h2>
        )
    }
}