import { useSelector } from 'react-redux';
import ChannelAdd from './ChannelAdd';
import ChannelRename from './ChannelRename';
import ChannelDelete from './ChannelDelete';

const renderModal = (modalName) => {
  switch (modalName) {
    case 'addingChannel':
      return <ChannelAdd />;
    case 'renamingChannel':
      return <ChannelRename />;
    case 'deletingChannel':
      return <ChannelDelete />;
    default:
      return '';
  }
};

const ModalService = () => {
  const currentModalName = useSelector((state) => state.ui.modalName);

  return (
    <>
      {renderModal(currentModalName)}
    </>
  );
};

export default ModalService;
