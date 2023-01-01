import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Wrapper, Container, H1, Input, H3 } from './login.styled';
import LoginButton from './components/login-button/index';
import kakao from '../../assets/kakao.svg';
import waffle from '../../assets/waffle.svg';
import github from '../../assets/github.svg';
import profile from '../../assets/profile.svg';
import google from '../../assets/google.svg';

const LoginPage = () => {
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
    console.log(inputs);
    console.log(value, name);
  };

  /* DESC: 카카오 로그인하기 - 외부 링크로 이동해 동의하면 redirect page 쿼리로 인가코드 보내줌 */
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/login/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const linkToKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  /* DESC: 구글 로그인 - gapi로 client(waffle-market) initialize */
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
    console.log('success:', res);
  };
  const onFailure = (err: any) => {
    console.log('failed:', err);
  };

  return (
    <Wrapper>
      <Container>
        <H1>와플마켓에 로그인하세요</H1>
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
        <LoginButton
          img={profile}
          text="회원가입"
          bgColor="#DCDEE3"
          handleClick={linkToGoogle}
        />
        <LoginButton
          img={kakao}
          text="카카오로 시작"
          bgColor="#FEE500"
          handleClick={linkToKakao}
        />
        <div
          data-client_id={googleClientId}
          data-login_uri="https://localhost:3000/login/google"
        >
          구글
        </div>
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
