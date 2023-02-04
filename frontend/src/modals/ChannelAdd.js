import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from '../slices/uiSlice'
import {useContext, useEffect} from "react";
import {ApiContext} from "../ChatAPI";
import * as Yup from "yup";
import {useRef} from "react";
import {useTranslation} from "react-i18next";

const ChannelAdd = () => {
    const inputEl = useRef(null);
    const dispatch = useDispatch();
    const {addChannel} = useContext(ApiContext)
    const channels = useSelector(state => state.channelsInfo.channels);
    const channelsNames = Object.values(channels).map(c => c.name);
    const {t} = useTranslation();

    useEffect(() => {
        inputEl.current.focus();
    },[]);

    const validationSchema = (names) => {
        return Yup.object().shape({
            name: Yup.string()
                .required(t('channelModal.nameReq'))
                .min(3, t('channelModal.nameLength'))
                .max(20, t('channelModal.nameLength'))
                .test(t('channelModal.nameTestName'), t('channelModal.nameTestMsg'), value => !names.includes(value))
        })
    };

    const f = useFormik({
        initialValues: {name: ''},
        onSubmit: values => {
            dispatch(closeModal());
            addChannel(values.name);
        },
        validationSchema: validationSchema(channelsNames)
    });

    const onHide = () => {
        dispatch(closeModal());
    };

    return (
        <Modal
            show
            keyboard={true}
            onEscapeKeyDown={onHide}>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>{t('channelModal.addHead')}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate={true} onSubmit={f.handleSubmit}>
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
}

export default ChannelAdd;