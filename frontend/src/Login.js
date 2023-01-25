import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {useFormik} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
});

const Login = () => {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: SignupSchema
    });

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col className="col-12 col-sm-auto">
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Ваш ник" className="mb-3">
                                <Form.Control type="text"
                                              placeholder="Ваш ник"
                                              id="username"
                                              name="username"
                                              onChange={formik.handleChange}
                                              value={formik.values.username}
                                              isInvalid={!!formik.errors.username}
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label="Пароль" className="mb-3">
                                <Form.Control type="password"
                                              placeholder="Пароль"
                                              id="password"
                                              name="password"
                                              onChange={formik.handleChange}
                                              value={formik.values.password}
                                              isInvalid={!!formik.errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="col-12">
                            Войти
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;