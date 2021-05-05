import React, { useState } from 'react';

import axios from 'axios';

import getRandomName from '../functions/getRandomName';

const JoinForm = () => {
    const [name, setName] = useState('');
    //sending login info to backend
    const projectID = "870b77de-6cfe-4b98-bceb-b6c8343a389b";
    const password = 'abc123';

    const handleSubmit = async (e) => {
        //prevent page from reloading upon submit
        e.preventDefault();


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
            await axios(addUserConfig('19273'));
            await axios(addUserConfig('19274'));
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

            localStorage.setItem('zooUsername', name);
            localStorage.setItem('zooPassword', password);

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