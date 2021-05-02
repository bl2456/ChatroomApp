import React, {useEffect, useRef} from 'react';

import MessageForm from './MessageForm';
import OutgoingMessage from './OutgoingMessage';
import IncomingMessage from './IncomingMessage';



const ChatFeed = (props) => {
    //destructuring props
    const { chats, activeChat, userName, messages} = props;
    //console.log(activeChat);
    //console.log(messages);

    //if users are in some chats, then get the active one
    const chat = chats && chats[activeChat];
    //console.log(chat);
    //console.log(chat, userName, messages);

    const feed = useRef(null);

    const scrollToBottom = () => {
        if(chat){
            //console.log(feed.current);
            feed.current.scrollTop = feed.current.scrollHeight;
        } else {
            return null;
        }
    }

    const renderReadReceipts = (message, isMyMessage) => {
        //return all who saw this message last
        return chat.people.map((person, index) => {
            return (person.last_read === message.id) && (
                <div 
                    key={`read-${index}`} 
                    className="read-receipt" 
                    style={{float: isMyMessage ? 'right' : 'left', backgroundImage: `url(${person?.person?.avatar})`}}/>
            )
        })
    }

    const renderMessages = () => {
        const keys = Object.keys(messages);
        //console.log(keys);

        return keys.map((key, index) => {
            const message = messages[key];
            //find previous message
            //useful for not rendering the username/profilepic again if prev msg is from same person
            const lastMessageKey = (index === 0) ? null : key[index - 1];
            // did "client" send this message?
            const isMyMessage = userName === message.sender.username;

            return (
                <div 
                    key={`msg-${index}`} 
                    style={{width: '100%'}}>
                    <div 
                        className="message-block">
                            {/* if it message by client, render OutgoingMessage, otherwise render IncomingMessage */}
                            {isMyMessage 
                                ? <OutgoingMessage message={message}/> 
                                : <IncomingMessage message={message} lastMessage={messages[lastMessageKey]}/>
                            }
                    </div>
                    <div 
                        className="read-receipts" 
                        style={{
                            marginRight: isMyMessage ? '15px' : '0px',
                            marginLeft: isMyMessage ? '0px' : '68px'
                            }}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        })
    }
    
    useEffect( () => {scrollToBottom()}, [messages]);

    if(!chat) return 'Loading ...';

    return (
        <div className="chat-feed" ref={feed}>
            {/*Header Section */}
            <div className='chat-title-container'>
                <div className="chat-title">
                    {chat.title}
                </div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => {
                        return ` ${person.person.username}`;
                    })}
                </div>
            </div>
            
            {/*Messages Section */}
            {renderMessages()}

            <div style={{height:'100px'}} />
            
            {/*Form Section*/}
            <div className="message-form-container">
                <MessageForm {... props} chatId={activeChat} />
            </div>

        </div>
    )
}

export default ChatFeed;
