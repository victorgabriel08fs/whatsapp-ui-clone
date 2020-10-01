import React from 'react';
import Api from '../../Api';
import './styles.css';

const Login = ({ onReceive }) => {

    const handleLogin = async () => {
        let result = await Api.fbPopup();
        if (result) {
            onReceive(result.user);
        }
        else {
            alert('Erro!');
        }
    }

    return (
        <div className="page">
            <div className="conteiner">
                <div className="title">
                    <h1>Seja Bem-vindo<br /> ao clone do WhatsApp</h1>
                </div>
                <button className="loginButton" onClick={handleLogin}>Entre com o Facebook</button>
            </div>

            <div className="foot">
                Isso é uma aplicação criada inspirada na UI do WhatsApp Web<br />com fins didáticos<br />
                por Victor Gabriel<br />
                Direitos de imagem para WhatsApp

            </div>
        </div>
    );
}

export default Login;