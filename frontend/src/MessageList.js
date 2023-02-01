import MessageSendForm from './MessageSendForm';
import {useSelector} from "react-redux";

const MessageList = () => {
    const messages = useSelector(state => state.message);
    const currentChannelId = useSelector(state => state.channelsInfo.currentChannelId);

    const messagesContent = Object.entries(messages)
        .filter(([k, v]) => v.channelId === currentChannelId)
        .map(([k, v]) => (
            <div key={k} className="text-break mb-2"><b>{v.username}</b>: {v.body}</div>
        ))

    const count = Object.keys(messages).length;

    return (
        <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0"><b># general</b></p>
                <span className="text-muted">{count} сообщения</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                {messagesContent}
            </div>
            <MessageSendForm/>
        </div>
    )
}

export default MessageList;