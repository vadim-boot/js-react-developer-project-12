import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ApiContext } from '../ChatAPI';
import { closeModal } from '../slices/uiSlice';

const ChannelDelete = () => {
  const dispatch = useDispatch();
  const channelToDelete = useSelector((state) => state.ui.currentChannel);
  const { deleteChannel } = useContext(ApiContext);
  const { t } = useTranslation();

  const onHide = () => {
    dispatch(closeModal());
  };

  const onDelete = () => {
    dispatch(closeModal());
    deleteChannel(channelToDelete);
  };

  return (
    <Modal
      show
      keyboard
      onEscapeKeyDown={onHide}
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channelModal.delHead')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channelModal.delMsg')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('channelModal.btCancel')}
        </Button>
        <Button variant="danger" onClick={onDelete}>
          {t('channelModal.btSubmit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChannelDelete;
