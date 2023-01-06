import { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Gnb from '../../components/gnb';
import { Wrapper, Container, Title, H1, Input, H3 } from './login.styled';
import LoginButton from './components/login-button/index';
import carrot from '../../assets/carrot.svg';
import logoImg from '../../assets/logo.svg';
import kakao from '../../assets/kakao.svg';
import waffle from '../../assets/waffle.svg';
import profile from '../../assets/profile.svg';
import google from '../../assets/google.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  /* DESC: email & pw inputs 관리 */
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputs;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  /* DESC: 카카오 로그인하기 - 외부 링크로 이동해 동의하면 redirect page 쿼리로 인가코드 보내줌 */
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/login/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const linkToKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  /* DESC: 구글 로그인 - gapi로 client(waffle-market) initialize(초기화) */
  const googleClientId: any = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = 'http://localhost:3000/login/google';
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  const linkToGoogle = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: googleClientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);
  const onSuccess = (res: any) => {
    // 성공하면 email, 이름, tokenId 모두 전달해줌
    console.log('success:', res);
    const email = res.profileObj.email
    axios
      .post(`http://3.35.168.70/google/login/?email=${email}`)
      .then(response => {
        console.log(response);
        navigate('/');
      })
      .catch(err => {
        throw err;
      });
  };
  const onFailure = (err: any) => {
    console.log('failed:', err);
  };

  return (
    <Wrapper>
      <Gnb />
      <Container>
        <Title src={logoImg} />
        {/* <H1>와플마켓에 로그인하세요</H1> */}
        <Input
          name="email"
          value={email}
          required={true}
          placeholder="이메일"
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={onChange}
        />
        <LoginButton img={waffle} text="로그인" bgColor="#FF9E66" />
        <H3>아직 회원이 아니세요?</H3>
        <Link to="/signup">
          <LoginButton img={profile} text="회원가입" bgColor="#DCDEE3" />
        </Link>
        <LoginButton
          img={kakao}
          text="카카오로 시작"
          bgColor="#FEE500"
          handleClick={linkToKakao}
        />
        <GoogleLogin
          clientId={googleClientId}
          render={renderProps => (
            <LoginButton
              img={google}
              text="Google로 시작"
              color="#f8f9fa"
              bgColor="#176BEF"
              handleClick={renderProps.onClick}
            />
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </Container>
    </Wrapper>
  );
};

export default LoginPage;
