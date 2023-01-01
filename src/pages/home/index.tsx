import axios from 'axios';
import { Link } from 'react-router-dom';
import { Wrapper } from './home.styled';

const HomePage = () => {
  // 백엔드와의 통신을 위한 테스트 api call
  const test = () => {
    axios.get('http://3.35.168.70/hello').then(res => {
      console.log(res);
    });
  };
  return (
    <Wrapper>
      <a>홈페이지입니다</a>
      <Link to="/login">
        <a>로그인</a>
      </Link>
      <Link to="/signup">
        <a>회원가입</a>
      </Link>
      <button onClick={test}>백엔드 통신 테스트</button>
    </Wrapper>
  );
};

export default HomePage;
