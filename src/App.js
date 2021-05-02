import { ChatEngine } from 'react-chat-engine';

import './App.css';

import ChatFeed from './components/ChatFeed';

const App = () => {
    return (
        <ChatEngine 
            height="100vh"
            projectID="870b77de-6cfe-4b98-bceb-b6c8343a389b"
            userName="BrianLu"
            userSecret="abc123"
            renderChatFeed={(props) => <ChatFeed {...props}/>}
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