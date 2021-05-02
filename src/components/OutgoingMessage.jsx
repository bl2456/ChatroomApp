import React from 'react';

const OutgoingMessage = ({message}) => {
    //if message is an image
    if(message?.attachments?.length > 0){
        return(
            <img 
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{float: 'right'}}/>
        );
    }

    //otherwise it is just text
    return(
        <div className="message" style={{float: 'right', marginRight: '18px', color: '#ffffff', backgroundColor: '#1982FC'}}>
            {message.text}
        </div>
    );
};

export default OutgoingMessage;