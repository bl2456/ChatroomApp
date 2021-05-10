import React from 'react';

const IncomingMessage = ({message, lastMessage}) => {
    //is this the user's first message?
    const isUserFirstMessage = !lastMessage || (lastMessage.sender.username !== message.sender.username);
    const userName = message.sender.username.split('_');
    const adj = userName[0];
    const color = userName[1];
    const name = userName[2];
    // console.log(message.id);
    // console.log(lastMessage);
    return(
        <>
            {isUserFirstMessage && (
                <div className="message-username" style={{color: color}}>{message.sender.username}</div>
            )}
            <div className="message-row">
                {/* Include "avatar" if it is first message */}

                {isUserFirstMessage && (
                    
                    <div className="message-avatar" style={{backgroundColor: color}}>
                        <div className="message-avatar-text">{`${adj[0]}${color[0]}${name[0]}`}</div>
                    </div>
                )}
                {/*  Message structure same as outgoing message, so copied code from there
                    Check if image*/}
                
                {(message.attachments.length > 0) 
                    ? (<img 
                        src={message.attachments[0].file}
                        alt="message-attachment"
                        className="message-image"
                        style={{ marginLeft: isUserFirstMessage ? '4px' : '48px'}}/>)
                    : (<div 
                        className="message" 
                        style={{ marginLeft: isUserFirstMessage ? '4px' : '48px', float: 'left',  backgroundColor: '#CABCDC'}}
                        >
                            {message.text}
                    </div>)
                }
            </div>
        </>
    );
};

export default IncomingMessage;