import { useFormik } from 'formik';
import { useContext, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { ApiContext } from './ChatAPI';

const validationSchema = Yup.object().shape({
  messageBody: Yup.string().required(),
});

const MessageSendForm = () => {
  const [sendOk, setSendOk] = useState(true);
  const { sendMessage } = useContext(ApiContext);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      messageBody: '',
    },
    onSubmit: (values, { resetForm }) => {
      setSendOk(false);
      sendMessage(values.messageBody, () => {
        setSendOk(true);
        // inputRef.current.focus();
      });
      resetForm();
      // inputRef.current.focus();
      // console.log(`inputRef.current.value = ${inputRef.current.value}`);
    },
    validationSchema,
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <Form.Group className="input-group">
          <Form.Control
            type="text"
            name="messageBody"
            id="messageBody"
            placeholder={t('chat.msgSend.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.messageBody}
            disabled={!sendOk}
            ref={inputRef}
            autoComplete="off"
          />
          <Button
            className="btn-group-vertical"
            type="submit"
            variant=""
            disabled={!((formik.isValid && formik.dirty))}
          >
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('chat.msgSend.bt')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageSendForm;
