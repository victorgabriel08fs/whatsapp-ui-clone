import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

//componentes
import MessageItem from '../MessageItem';

//dependencias
import EmojiPicker from 'emoji-picker-react';
//ícones
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import Api from '../../Api';


const ChatWindow = ({ user, data }) => {

    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [recording, setRecording] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setList([]);

        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId]);

    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = (body.current.scrollHeight - body.current.offsetHeight);
        }
    }, [list]);

    function handleEmojiClick(e, emojiObject) {
        setText(text + emojiObject.emoji);
    }

    function handleInputKeyUp(e) {
        if (e.keyCode === 13) {
            handleSend();
        }
    }

    function handleSend() {
        if (text !== '') {
            Api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }

    function handleMic() {
        if (recognition !== null) {
            recognition.onstart = () => {
                setRecording(true);
            }
            recognition.onend = () => {
                setRecording(false);
            }
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }

            recognition.start();

        }
    }



    return (
        <div className="chatWindow">
            <div className="chatWindow-header">

                <div className="chatWindow-headerinfo">
                    <img className="chatWindow-avatar" src={data.image} alt="Foto" />
                    <div className="chatWindow-name">{data.title}</div>
                </div>

                <div className="chatWindow-headerbuttons">

                    <div className="chatWindow-btn">
                        <SearchIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow-btn">
                        <AttachFileIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow-btn">
                        <MoreVertIcon style={{ color: '#919191' }} />
                    </div>

                </div>

            </div>
            <div ref={body} className="chatWindow-body">
                {list !== undefined &&
                    list.map((item, key) =>

                        (
                            <MessageItem
                                key={key}
                                data={item}
                                user={user}
                            />
                        ))}
            </div>

            <div className="chatWindow-emojiarea" style={{ height: emojiOpen ? '320px' : '0px' }} >
                <EmojiPicker
                    style={{ width: '2000px' }}
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            <div className="chatWindow-footer">
                <div className="chatWindow-pre">

                    <div onClick={() => setEmojiOpen(false)} className="chatWindow-btn" style={{ width: emojiOpen ? 40 : 0 }}>
                        <CloseIcon style={{ color: '#FF0000' }} />
                    </div>

                    <div onClick={() => setEmojiOpen(true)} className="chatWindow-btn" style={{ width: !emojiOpen ? 40 : 0 }}>
                        <InsertEmoticonIcon style={{ color: '#4ADF83' }} />
                    </div>


                </div>

                <div className="chatWindow-inputarea">
                    <input onKeyUp={handleInputKeyUp} className="chatWindow-input" placeholder="Digite uma mensagem" type="text" value={text} onChange={e => setText(e.target.value)} />
                </div>

                <div className="chatWindow-pos" >

                    {text !== '' &&
                        <div className="chatWindow-btn" onClick={handleSend}>
                            <SendIcon style={{ color: '#919191' }} />
                        </div>}

                    {text === '' &&
                        <div className="chatWindow-btn" onClick={handleMic}>
                            <MicIcon style={{ color: !recording ? '#919191' : '#126ECE' }} />
                        </div>}



                </div>
            </div>
        </div>
    );
}

export default ChatWindow;