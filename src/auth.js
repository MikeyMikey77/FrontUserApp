import React from 'react';
import { authUserUrl as authUrl } from './url';
import { Redirect } from 'react-router-dom';

export default class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = { login: '', pass: '', TEMP: null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        switch (e.target.id) {
            case 'inputLogin':
                this.setState({ login: e.target.value });
                break;
            case 'inputPass':
                this.setState({ pass: e.target.value });
                break;
            default:
                break;
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.login === '') return alert('Поле Логин* не должно быть пустым!');
        else if (this.state.login.length > 255) return alert('Поле Логин* не должно занимать больше 255 символов!');

        if (this.state.pass === '') return alert('Поле Пароль* не должно быть пустым!');
        else if (this.state.pass.length > 255) return alert('Поле Пароль* не должно занимать больше 255 символов!');

        fetch(authUrl, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ login: this.state.login, password: this.state.pass }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
                //redirect
                this.setState({ TEMP: res.token });
                localStorage.setItem("token", res.token);
            })
    }

    render() {

        if (this.state.TEMP) {
            return <Redirect to="/users" />;
        }
        else return (
            <div class="container">
                <div class="row justify-content-center align-items-start">
                    <div class="col-md-auto">
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label>Логин:</label>
                                <input class="form-control" id="inputLogin" type="text" value={this.state.login} onChange={this.handleChange} />
                            </div>
                            <div class="form-group">
                                <label>Пароль:</label>
                                <input class="form-control" id="inputPass" type="text" value={this.state.pass} onChange={this.handleChange} />
                            </div>
                            <input class="btn btn-primary mb-2" type="submit" value="OK" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}