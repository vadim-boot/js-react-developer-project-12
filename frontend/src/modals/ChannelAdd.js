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

const validationSchema = (names) => {
    return Yup.object().shape({
        name: Yup.string()
            .required('Обязательное поле')
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .test('Уникальный канал', 'Должно быть уникальным', value => !names.includes(value))
    })
};

const ChannelAdd = () => {
    const inputEl = useRef(null);
    const dispatch = useDispatch();
    const {addChannel} = useContext(ApiContext)
    const channels = useSelector(state => state.channelsInfo.channels);
    const channelsNames = Object.values(channels).map(c => c.name);

    useEffect(() => {
        inputEl.current.focus();
    });

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

    // const

    return (
        <Modal
            show
            keyboard={true}
            onEscapeKeyDown={onHide}>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>Добавить канал</Modal.Title>
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
                        />
                        <Form.Control.Feedback type="invalid">
                            {f.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отменить
                </Button>
                <Button variant="primary" onClick={f.handleSubmit}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ChannelAdd;