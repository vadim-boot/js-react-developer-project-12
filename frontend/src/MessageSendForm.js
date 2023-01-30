import {useFormik} from "formik";
import {useContext, useState, useRef} from "react";
import {ApiContext} from "./ChatAPI";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    messageBody: Yup.string().required()
})

const MessageSendForm = () => {
    const [sendOk, setSendOk] = useState(true);
    const {sendMessage} = useContext(ApiContext);
    const inputRef = useRef(null);
    const formik = useFormik({
        initialValues: {
            messageBody: ''
        },
        onSubmit: (values, {resetForm}) => {
            setSendOk(false);
            sendMessage(values.messageBody, () => {
                setSendOk(true)
                // inputRef.current.focus();
            });
            resetForm();
            // inputRef.current.focus();
            // console.log(`inputRef.current.value = ${inputRef.current.value}`);
        },
        validationSchema: validationSchema
    })

    return (
        <div className="mt-auto px-5 py-3">
            <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                <Form.Group className="input-group">
                    <Form.Control type="text"
                                  name="messageBody"
                                  id="messageBody"
                                  placeholder="Введите сообщение..."
                                  className="border-0 p-0 ps-2 form-control"
                                  onChange={formik.handleChange}
                                  value={formik.values.messageBody}
                                  disabled={!sendOk}
                                  ref={inputRef}
                    />
                    <Button className="btn-group-vertical"
                            type="submit"
                            variant=""
                            disabled={!((formik.isValid && formik.dirty))}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"
                             fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
                            </path>
                        </svg>
                        <span className="visually-hidden">Отправить</span>
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default MessageSendForm;