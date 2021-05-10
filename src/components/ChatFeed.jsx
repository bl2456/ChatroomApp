import React, {useEffect, useRef} from 'react';


import MessageForm from './MessageForm';
import OutgoingMessage from './OutgoingMessage';
import IncomingMessage from './IncomingMessage';
import axios from 'axios';



const ChatFeed = (props) => {
    //destructuring props
    const { chats, activeChat, userName, messages} = props;
    //console.log(activeChat);
    //console.log(messages);

    //if users are in some chats, then get the active one
    const chat = chats && chats[activeChat];
    //console.log(chat);
    //console.log(chat, userName, messages);
    //console.log(props)

    //The code block below is for removing users that have just closed their tabs instead of logging out

    const removeUserConfig = (roomId, name) => {
        return {
            method: 'put',
            url: `https://api.chatengine.io/chats/${roomId}/people/`,
            headers: { 
                'Project-ID': "870b77de-6cfe-4b98-bceb-b6c8343a389b",
                'User-Name': 'Brian_Blue_Lu',
                'User-Secret': 'abc123',
            },
            data : {
                'username': name
            }
        }
    }
    
    // const adminAnnoucementConfig = (roomId, username) => {
    //     return{
    //         method: 'post',
    //         url: `https://api.chatengine.io/chats/${roomId}/messages/`,
    //         headers: { 
    //             'Project-ID': "870b77de-6cfe-4b98-bceb-b6c8343a389b",
    //             'User-Name': 'Brian_Blue_Lu',
    //             'User-Secret': 'abc123',
    //         },
    //         data : {
    //             'text' : `${username} has left the biome`
    //         }
    //     }
    // }
    
    const personLefted = (username) => {
        Object.keys(chats).forEach(async(key) => {
            try {
                await axios(removeUserConfig(key, username));
                console.log(`${username} removed from chat ${key}`);
                // await axios(adminAnnoucementConfig(key, username));
                // console.log('Brian posted leave message for animal');
            } catch(error) {
                console.log(error);
            }
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////

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
        //console.log(chat);
        
        //return all who saw this message last
        return chat.people.map((person, index) => {
            if (person.person.is_online === false && person.person.username !== 'Brian_Blue_Lu'){
                return null;
            }
            const color = person.person.username.split('_')[1];
            //console.log(color);
            return (person.last_read === message.id) && (
                <div 
                    key={`read-${index}`} 
                    className="read-receipt" 
                    style={{float: isMyMessage ? 'right' : 'left', backgroundColor: color}}/>
            )
        })
    }

    const renderMessages = () => {
        const keys = Object.keys(messages);
        //console.log(keys);

        return keys.map((key, index) => {
            const message = messages[key];
            //console.log(message);
            //find previous message
            //useful for not rendering the username/profilepic again if prev msg is from same person
            const lastMessageKey = (index === 0) ? null : keys[index - 1];
            //console.log(lastMessageKey);
            
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
        <>
            {(!chat) ? 'Loading ...' :
                <div className="chat-feed" ref={feed}>
                    {chat?.people.forEach(person => {
                        if (person.person.is_online === false && person.person.username !== 'Brian_Blue_Lu' && person.last_read){
                            personLefted(person.person.username);

                        }
                    })}
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
            }
        </>
    )
}

export default ChatFeed;
