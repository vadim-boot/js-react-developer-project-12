import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../slices/uiSlice';
import { ApiContext } from '../ChatAPI';

const ChannelRename = () => {
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const { renameChannel } = useContext(ApiContext);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelToRename = useSelector((state) => state.ui.currentChannel);
  const channelsNames = Object
    .values(channels)
    .filter((c) => c.id !== channelToRename.id)
    .map((c) => c.name);
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const validationSchema = (names) => {
    return Yup.object().shape({
      name: Yup.string()
        .required(t('channelModal.nameReq'))
        .min(3, t('channelModal.nameLength'))
        .max(20, t('channelModal.nameLength'))
        .test(t('channelModal.nameTestName'), t('channelModal.nameTestMsg'), (value) => !names.includes(value)),
    });
  };

  const f = useFormik({
    initialValues: channelToRename,
    onSubmit: (values) => {
      dispatch(closeModal());
      renameChannel(values);
    },
    validationSchema: validationSchema(channelsNames),
  });

  const onHide = () => {
    dispatch(closeModal());
  };

  // const

  return (
    <Modal
      show
      keyboard
      onEscapeKeyDown={onHide}
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channelModal.renameHead')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              autoFocus
              required
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              name="name"
              isInvalid={!!f.errors.name}
              ref={inputEl}
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('channelModal.btCancel')}
        </Button>
        <Button variant="primary" onClick={f.handleSubmit}>
          {t('channelModal.btSubmit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChannelRename;
