import React from 'react';
import Api from '../../Api';
import './styles.css';

const Login = ({ onReceive }) => {

    const handleLogin = async () => {
        let result = await Api.fbPopup();
        console.log('debug2');
        if (result) {
            onReceive(result.user);
        }
        else {
            alert('Erro!');
        }
        console.log('debug2 '+result);
    }

    return (
        <div className="page">
            <button className="loginButton" onClick={handleLogin}>Logar com o Facebook</button>
        </div>
    );
}

export default Login;