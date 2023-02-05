import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import AuthContext from './contexts/AuthContext';

const Login = () => {
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { logIn } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required(t('loginForm.reqField')),
    password: Yup.string().required(t('loginForm.reqField')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      axios.post('/api/v1/login', {
        username: values.username,
        password: values.password,
      }).then((response) => {
        const { data: { username, token } } = response;
        setShowError(false);
        logIn({ username, token });
        navigate('/');
      }).catch(() => {
        setShowError(true);
      });
    },
    validationSchema: SignupSchema,
  });

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col className="col-12 col-sm-auto">
          <Form onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{t('loginForm.header')}</h1>
            <div>
              {showError ? <Alert variant="danger"> {t('loginForm.error')} </Alert> : ''}
            </div>

            <Form.Group className="mb-3">
              <FloatingLabel label={t('loginForm.yourName')} className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={t('loginForm.yourName')}
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
              <FloatingLabel label={t('loginForm.password')} className="mb-3">
                <Form.Control
                  type="password"
                  placeholder={t('loginForm.password')}
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

            <Button variant="primary" type="submit" className="col-12">
              {t('loginForm.enter')}
            </Button>

            <div className="text-center mb-4">{t('loginForm.noAcc')}
              <Link to="/signup">{t('loginForm.regAcc')}</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
