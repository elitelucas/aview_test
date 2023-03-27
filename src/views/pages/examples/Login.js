import React, { useState, useEffect, useContext } from 'react'
// import { browserHistory  } from "react-router";
import { Link, Redirect, useHistory } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";

import { publicFetch } from '../../../util/fetcher.js';
import { AuthContext } from '../../../store/auth.js';

function Login() {
  const { setAuthState, isAuthenticated } = useContext(AuthContext);
  const [focusedEmail, setfocusedEmail] = useState(false);
  const [focusedPassword, setfocusedPassword] = useState(false);
  const [userErrStatus, setUserErrStatus] = useState("");
  const [pwdErrStatus, setPwdErrStatus] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // Pull name, email, password from formData
  const { email, password } = formData;

  const authenticated = isAuthenticated();
  // console.log('Authent =>', authenticated);
  // const navigate = useNavigate();
  const history = useHistory();
  useEffect(() => {
    console.log('here')
    authenticated &&
      history.push("/auth/welcome");
  }, [authenticated])
  
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (username, password) => {
    if (username==='') {
      setUserErrStatus('Username is required.');
    } else if (username.length > 16) {
      setUserErrStatus('Username is too long, must be at most 16 characters long.');
    } else {
      setUserErrStatus('');
    }

    if (password==='') {
      setPwdErrStatus('Password is required.');
    } else if (password.length < 6) {
      setPwdErrStatus('Password must be at least 6 characters long.');
    } else if (password.length > 50) {
      setPwdErrStatus('Password must be at most 50 characters long.');
    } else {
      setPwdErrStatus('');
    }    
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    // login(email, password);
    console.log('email =>', email, 'password =>', password);
    validate(email, password);

    try {
      // @file: util/fetcher.js
      // const publicFetch = axios.create({baesURL: 'http://localhost:8000/api'})      
      const { data } = await publicFetch.post('authenticate', { username: email, password })
      console.log('response =>', data.message);
      const { token, expiresAt, userInfo } = data
      setAuthState({ token, expiresAt, userInfo })
      // resetForm({})
      setFormData({ email: '', password: '' })
      // setIsComponentVisible(false)      
    } catch (error) {
      let errorMessage = error.response.data.message;
      errorMessage ? setErrStatus(JSON.parse(JSON.stringify(errorMessage))) : setErrStatus('');
      console.log('error =>', JSON.stringify(errorMessage), 'errStatus =>', errStatus);
    }
    // <Redirect to="/auth/welcome"></Redirect>
    // Redirect if Logged in
    // if (authenticated) {
    //   console.log('authenticated =>', authenticated);
    //   history.push("/auth/welcome");
    // }
  };
  return (
    <>
      {/* <AuthHeader
        title="Welcome!"
        lead="Use these awesome forms to login or create new account in your project for free."
      /> */}
      <AuthHeader
        title="Blteleocom Service"
        lead="Signin to check and buy your mobile airtime and data."
      />
      <Container className=" pb-5" style={{ marginTop: '-9rem' }}>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              {/* <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={
                          require("assets/img/icons/common/github.svg").default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Github</span>
                  </Button>
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={
                          require("assets/img/icons/common/google.svg").default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
              </CardHeader> */}
              <CardBody className="px-lg-5 pt-lg-5 pb-lg-3">
                {/* <div className="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
                </div> */}
                <Form role="form">
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Your name"
                        type="email"
                        name="email"
                        value={email}
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(false)}
                        onChange={(e) => onChange(e)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className='mb-3' style={{color: '#fb6340'}}>{(userErrStatus.length !== 0) && <small>*{userErrStatus}</small>}</div>
                  <FormGroup
                    className={classnames("mb-1", {
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(false)}
                        onChange={(e) => onChange(e)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className='mb-3' style={{color: '#fb6340'}}>{(pwdErrStatus.length !== 0) && <small>*{pwdErrStatus}</small>}</div>
                  <div className='mb-3' style={{color: '#fb6340'}}>{(errStatus || errStatus.length !== 0) && <small>{errStatus}</small>}</div>

                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div className="custom-control custom-control-alternative">
                  </div>
                  <div className="text-center">
                    <Button className="my-4 text-default" color="info" type="button" tag={Link} to="/auth/welcome" onClick={(e) => onSubmit(e)}>
                      Login
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Create new account</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
