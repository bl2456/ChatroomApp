import { ChatEngine } from 'react-chat-engine';

import './App.css';

import ChatFeed from './components/ChatFeed';
import JoinForm from './components/JoinForm';
import Options from './components/Options';

const App = () => {
    //If we are not "logged in", render join form
    if(!localStorage.getItem('zooUsername')){
        return <JoinForm />
    }

    //else render the chat UI
    return (
        <ChatEngine 
            height="100vh"
            projectID="870b77de-6cfe-4b98-bceb-b6c8343a389b"
            userName={localStorage.getItem('zooUsername')}
            userSecret={localStorage.getItem('zooPassword')}
            renderChatFeed={(props) => <ChatFeed {...props}/>}
            renderOptionsSettings={(props) => <Options {...props}/>}
        />
        //ChatEngine props taken
        // height - height of the component
        // projectID - your project id given on chatengine.io
        // userName - username on chatengine.io
        // userSecret - user password on chatengine.io
        // renderChatFeed - use your own created component to display chat
    );
}

export default App;
//exports the App component whenever another file calls (import 'App.js')