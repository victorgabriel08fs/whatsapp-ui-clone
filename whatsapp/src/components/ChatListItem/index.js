import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Api from '../../Api';
import './styles.css';

const ChatListItem = ({ onClick, active, setActive, data, userId }) => {

    const [time, setTime] = useState('');

    function handleDeleteChat() {
        let unsub = Api.deleteChat(data.chatId, userId);
        setActive(undefined);
    }

    useEffect(() => {
        if (data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            setTime(`${hours}:${minutes}`);
        }
    }, [data])
    return (
        <div onClick={onClick} className={`chatListItem ${active ? 'active' : ''}`}>
            <img className="chatListItem-avatar" src={data.image} alt="" />
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-name">{data.title}</div>
                    <div className="chatListItem-date">{time}</div>
                </div>
                <div className="chatListItem-line">
                    <div className="chatListItem-lastMsg">
                        <p>{data.lastMessage}</p>
                        <DeleteIcon fontSize='small' onClick={handleDeleteChat} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatListItem;