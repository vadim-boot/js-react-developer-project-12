import {useSelector} from "react-redux";

const MessageList = () => {
    const messages = useSelector(state => state.message);

    return (
        <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0"><b># general</b></p>
                <span className="text-muted">2 сообщения</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                <div className="text-break mb-2"><b>admin</b>: gfhjkl</div>
                <div className="text-break mb-2"><b>admin</b>: dfsdf</div>
            </div>
            <div className="mt-auto px-5 py-3">
            </div>
        </div>
    )
}

export default MessageList;