import React from 'react';
import { registrationUrl as regUrl } from './url';
import { Redirect } from 'react-router-dom';

let TEMP;

export default class Registration extends React.Component {

    constructor(props) {
        super(props);

        this.state = { name: '', login: '', pass: '', secondpass: '', TEMP: null };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {

        switch (e.target.id) {
            case 'inputName':
                this.setState({ name: e.target.value });
                break;
            case 'inputLogin':
                this.setState({ login: e.target.value });
                break;
            case 'inputPass':
                this.setState({ pass: e.target.value });
                break;
            case 'inputSecondPass':
                this.setState({ secondpass: e.target.value });
                break;
            default:
                break;
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.name === '') return alert('Поле Имя* не должно быть пустым!');
        else if (this.state.name.length > 255) return alert('Поле Имя* не должно занимать больше 255 символов!');

        if (this.state.login === '') return alert('Поле Логин* не должно быть пустым!');
        else if (this.state.login.length > 255) return alert('Поле Логин* не должно занимать больше 255 символов!');

        if (this.state.pass === '') return alert('Поле Пароль* не должно быть пустым!');
        else if (this.state.pass.length > 255) return alert('Поле Пароль* не должно занимать больше 255 символов!');

        if (this.state.secondpass === '') return alert('Поле (Подтверждение пароля)* не должно быть пустым!');
        else if (this.state.secondpass.length > 255) return alert('Поле (Подтверждение пароля)* не должно занимать больше 255 символов!');

        // check password
        if (this.state.pass !== this.state.secondpass) {
            return alert('Введенные пароли не совпадают!');
        }

        fetch(regUrl, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ name: this.state.name, login: this.state.login, password: this.state.pass }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.message) //redirect to UsersList
                {
                    alert(res.message);
                    this.setState({ TEMP: res.token });
                    localStorage.setItem("token", res.token);
                }
                else {
                    if (res.err.includes('Duplicate')) {
                        if (res.err.includes('Password')) {
                            alert('Такой пароль уже есть!');
                        }
                        else alert('Такой логин уже есть!');
                    }
                    else ('Ошибка в базе данных');
                }
            })
    }

    render() {

        if (this.state.TEMP) {
            return <Redirect to="/users" />;
        }
        else return (
            <div>
                <div class="container">
                    <div class="row justify-content-center align-items-start">
                        <div class="col-md-auto">
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group">
                                    <label>Имя:</label>
                                    <input class="form-control" id="inputName" type="text" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div class="form-group">
                                    <label>Логин:</label>
                                    <input class="form-control" id="inputLogin" type="text" value={this.state.login} onChange={this.handleChange} />
                                </div>
                                <div class="form-group">
                                    <label>Пароль:</label>
                                    <input class="form-control" id="inputPass" type="text" value={this.state.pass} onChange={this.handleChange} />
                                </div>
                                <div class="form-group">
                                    <label>Подтверждение Пароля:</label>
                                    <input class="form-control" id="inputSecondPass" type="text" value={this.state.secondpass} onChange={this.handleChange} />
                                </div>
                                <input class="btn btn-primary mb-2" type="submit" value="OK" />
                            </form>
                        </div>
                    </div >
                </div >
            </div >
        )
    }
}