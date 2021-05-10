import React, { useState } from 'react';

import axios from 'axios';

import getRandomName from '../functions/getRandomName';

const JoinForm = () => {
    const [name, setName] = useState('');
    const [room1, setRoom1] = useState(true);
    const [room2, setRoom2] = useState(true);
    const [room3, setRoom3] = useState(true);
    const [room4, setRoom4] = useState(true);
    //console.log(room1);

    //sending login info to backend
    const projectID = "870b77de-6cfe-4b98-bceb-b6c8343a389b";
    const password = 'abc123';

    const handleSubmit = async (e) => {
        //prevent page from reloading upon submit
        e.preventDefault();
        if (name === ''){
            document.querySelector('#error').style.display = 'flex';
            return;
        }
        else {
            document.querySelector('.button').setAttribute("disabled", "disabled");
        }

        const createUserConfig = {
            method: 'post',
            url: 'https://api.chatengine.io/users/',
            headers: { 
              'PRIVATE-KEY': "10759215-7c25-44de-b0d9-9c3e4b528420"
            },
            data : {
                'username': name,
                'secret':password
            }
        };

        const addUserConfig = (roomId) => {
            return {
                method: 'post',
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
        try {
            console.log(name,password);
            await axios(createUserConfig);
            console.log('after creating user');
            if(room1){
                await axios(addUserConfig('20540'));
            }
            if(room2){
                await axios(addUserConfig('20541'));
            }
            if(room3){
                await axios(addUserConfig('20542'));
            }
            if(room4){
                await axios(addUserConfig('20543'));
            }
            console.log('after adding user to testing rooms');
            await axios({
                method: 'get',
                url: 'https://api.chatengine.io/chats/',
                headers: { 
                    'Project-ID': projectID, 
                    'User-Name': name, 
                    'User-Secret': password
                }
            })

            sessionStorage.setItem('zooUsername', name);
            sessionStorage.setItem('zooPassword', password);

            //reload to render chat app instead of JoinForm
            window.location.reload();
        }
        catch (err) {
            //what if request fails
            console.log(err);
        }

    }

    const getNameData = () => {
        //console.log('hi');
        let randomName = getRandomName();
        // console.log(randomName);
        // console.log(color);
        setName(randomName);
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">
                    Zoo Chat
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input
                            className="input"
                            type="text"
                            value={name}
                            placeholder="Keep clicking randomize to get a new name"
                            disabled />
                        <button
                            id="random-button"
                            type="button"
                            onClick={getNameData}>
                            <span>
                                Get Name
                            </span>
                        </button>
                    </div>
                    <div id='error' align="center">
                        <span className='error-icon'>
                            &#x26A0;  
                        </span>
                        <span id='error-message'>
                            Please get a name first
                        </span>
                    </div>
                    <div className="room-options-wrapper">
                        <h3>Room Options</h3>
                        <div className="room-options">
                            <div>
                                <input
                                    type="checkbox"
                                    name="option1" 
                                    checked={room1}
                                    onChange={()=>{
                                        setRoom1(!room1);
                                    }}/>
                                <label htmlFor="option1">Sports</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="option2" 
                                    checked={room2}
                                    onChange={()=>{
                                        setRoom2(!room2);
                                    }}/>
                                <label htmlFor="option2">Art</label> 
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="option3" 
                                    checked={room3}
                                    onChange={()=>{
                                        setRoom3(!room3);
                                    }}/>
                                <label htmlFor="option3">Technology</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="option4" 
                                    checked={room4}
                                    onChange={()=>{
                                        setRoom4(!room4);
                                    }}/>
                                <label htmlFor="option4">Gaming</label>
                            </div>
                        </div>
                    </div>
                    <div align="center">
                        <button className="button" type="submit">
                            <span>Enter the biome.</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default JoinForm;