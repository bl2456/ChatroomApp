import React from 'react';
import {useState} from 'react';

import {sendMessage, isTyping} from 'react-chat-engine';

import {SendOutlined, PictureOutlined} from '@ant-design/icons';

const MessageForm = (props) => {
    //value is the getter, setValue is the setter for the values in the input element
    const [value, setValue] = useState('');
    const {chatId, creds} = props;
    // console.log('creds is');
    // console.log(creds);
    const handleSubmit = (e) => {
        //stop the default page refresh when we submit html forms
        e.preventDefault();

        //remove leading and ending white spaces
        const message = value.trim();

        if(message.length > 0){
            //sendMessage takes in credentials, the chat id, and an object with the message
            //https://chatengine.io/docs/functions#send_message
            sendMessage(creds, chatId, {'text' : message});
        }
        setValue('');
    };

    const handleChange = (e) => {
        //on every keystroke event, save value in input inside useState
        
        //console.log(e.target.value);
        setValue(e.target.value);

        isTyping(props, chatId);

    };

    //for handling image uploads 
    const handleUpload = (e) => {
        sendMessage(creds, chatId, {'files': e.target.files, 'text': ''});
    }
    return(
        <form className="message-form" onSubmit={handleSubmit}>
            {/* text input */}
            <input 
                className="message-input" 
                placeholder="Chat away :D !" 
                value={value} 
                onChange={handleChange}
                onSubmit={handleSubmit}/>
            
            {/* image input */}
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon"/>
                </span>
            </label>
            <input 
                id="upload-button"
                type="file"
                multiple={false}
                style={{display: 'none'}}
                onChange={handleUpload}/>
            <button
                className='send-button'
                type='submit'>
                    <SendOutlined className="send-icon" />
            </button>
        </form>
    );
};

export default MessageForm;