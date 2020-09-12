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
        console.log('debug2 ' + result);
    }

    return (
        <div className="page">
            <div className="conteiner">
                <div className="title">
                    <h1>Seja Bem-vindo<br /> ao clone do WhatsApp</h1>
                </div>
                <button className="loginButton" onClick={handleLogin}>Entre com o Facebook</button>
            </div>
        </div>
    );
}

export default Login;