import React from 'react';

const IncomingMessage = ({message, lastMessage}) => {
    //is this the user's first message?
    const isUserFirstMessage = !lastMessage || (lastMessage.sender.username !== message.sender.username);

    return(
        <div className="message-row">
            {/* Include picture if it is first message */}
            {isUserFirstMessage && (
            <div className="message-avatar" style={{backgroundImage: `url(${message?.sender?.avatar})`}}/>)}
        
            {/*  Message structure same as outgoing message, so copied code from there
                Check if image*/}
            
            {(message?.attachments?.length > 0) 
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
    );
};

export default IncomingMessage;