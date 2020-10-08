import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";
import Registration from "./registration";
import Auth from "./auth";
import UsersList from "./usersList";



export default function ModalGalleryExample() {
    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

function ModalSwitch() {
    return (
        <div>
            <Switch>
                <Route exact path="/" children={<Home />} />
                <Route path="/registration" children={<Registration />} />
                <Route path="/auth" children={<Auth />} />
                <Route path="/users" children={<UsersList />} />
            </Switch>
        </div>
    );
}

function Home() {
    return (
        <div>
            <h2>Управление аккаунтом</h2>
            <div>
                <Link to="/auth">Войти в систему</Link>
            </div>
            <div>
                <Link to="/registration">Зарегистрироваться</Link>
            </div>
        </div>
    );
}
