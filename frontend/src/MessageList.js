import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MessageSendForm from './MessageSendForm';

const MessageList = () => {
  const messages = useSelector((state) => state.message);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { t } = useTranslation();

  const messagesContent = Object.values(messages)
    .filter((channel) => channel.channelId === currentChannelId)
    .map((channel) => (
      <div key={channel.id} className="text-break mb-2">
        <b>{channel.username}</b>: {channel.body}
      </div>
    ));

  const msgCount = messagesContent.length;
  const channelName = channels[currentChannelId] ? channels[currentChannelId].name : '';

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># {channelName}</b>
        </p>
        <span className="text-muted">{t('chat.msgList.head', { count: msgCount })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messagesContent}
      </div>
      <MessageSendForm />
    </div>
  );
};

export default MessageList;
