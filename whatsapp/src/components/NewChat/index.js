import React, { useState, useEffect } from 'react';
import './styles.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Api from '../../Api';

const NewChat = ({ chatlist, user, show, setShow }) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results);
            }
        }
        getList();
    }, user)

    const handleBack = () => {
        setShow(false);
    }

    const handleOpenChat = async (user2) => {
        await Api.addNewChat(user, user2);
        setShow(false);
    }

    return (
        <div className="newChat" style={{ left: show ? 0 : -415 }}>
            <div className="newChat-head">
                <div onClick={handleBack} className="newChat-backbutton">
                    <ArrowBackIcon style={{ color: '#FFF' }} />
                </div>
                <div className="newChat-headtitle">
                    Nova conversa
                </div>
            </div>
            <div className="newChat-list">
                {list.map((item, key) => (
                    <div key={key} onClick={() => handleOpenChat(item)} className="newChat-item">
                        <img className="newChat-itemavatar" src={item.avatar} alt="Foto" />
                        <div className="newChat-itemname">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewChat;