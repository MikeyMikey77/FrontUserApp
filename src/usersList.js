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
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHRzIjpbeyJJZCI6MSwiTmFtZSI6Im1pa2UiLCJMb2dpbiI6Im1pa2UiLCJQYXNzd29yZCI6Imdvb2RQYXNzNCJ9XSwiaWF0IjoxNjAxOTk4Nzc1fQ.qjaN7regnWE0wYW7NoiWuLqe19OKkfu7FdGt3w-T3x4`
            }
        })
            .then(res => res.json())
            .then(res => this.setState({ users: res }));
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