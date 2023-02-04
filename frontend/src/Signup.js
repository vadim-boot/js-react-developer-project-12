import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from 'react-bootstrap/Alert';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "./contexts/AuthContext";
import {useTranslation} from "react-i18next";


const Signup = () => {
    const inputEl = useRef(null);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const auth = useContext(AuthContext);
    const {t} = useTranslation();

    useEffect(()=>{
        inputEl.current.focus();
    }, [])

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required(t('signupForm.reqField'))
            .min(3, t('signupForm.usernameLength'))
            .max(20, t('signupForm.usernameLength')),
        password: Yup.string()
            .required(t('signupForm.reqField'))
            .min(6, t('signupForm.passLength')),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password')], t('signupForm.passCheck'))
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirm: ''
        },
        onSubmit: values => {
            axios.post('/api/v1/signup', {
                username: values.username,
                password: values.password
            }).then((response) => {
                if (response.status === 201) {
                    setShowError(false);
                    auth.logIn({username: response.data.username, token: response.data.token});
                    navigate("/");
                }
            }).catch((error) => {
                if (error.response.status === 409) {
                    setShowError(true);
                }
            });
        },
        validationSchema: SignupSchema
    });

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col className="col-12 col-sm-auto">
                    <Form noValidate={true} onSubmit={formik.handleSubmit}>
                        <h1 className="text-center mb-4">{t('signupForm.header')}</h1>
                        <div>
                            {showError ? <Alert variant="danger">{t('signupForm.error')}</Alert> : ''}
                        </div>

                        <Form.Group className="mb-3">
                            <FloatingLabel label={t('signupForm.yourName')} className="mb-3">
                                <Form.Control type="text"
                                              placeholder={t('signupForm.yourName')}
                                              id="username"
                                              name="username"
                                              onChange={formik.handleChange}
                                              value={formik.values.username}
                                              isInvalid={!!formik.errors.username}
                                              autoComplete="on"
                                              ref={inputEl}
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label={t('signupForm.password')} className="mb-3">
                                <Form.Control type="password"
                                              placeholder={t('signupForm.password')}
                                              id="password"
                                              name="password"
                                              onChange={formik.handleChange}
                                              value={formik.values.password}
                                              isInvalid={!!formik.errors.password}
                                              autoComplete="on"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label={t('signupForm.passwordConfirm')} className="mb-3">
                                <Form.Control type="password"
                                              placeholder={t('signupForm.passwordConfirm')}
                                              id="passwordConfirm"
                                              name="passwordConfirm"
                                              onChange={formik.handleChange}
                                              value={formik.values.passwordConfirm}
                                              isInvalid={!!formik.errors.passwordConfirm}
                                              autoComplete="on"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.passwordConfirm}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="col-12">
                            {t('signupForm.signUp')}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;