import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  console.log(code);

  /* 백엔드 작업 되면 */
  useEffect(() => {
    axios
      .post(`http://3.35.168.70/google/login/?code=${code}`)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => {
        throw err;
      });
  }, []);

  return <div>로딩중입니다... 곧 로그인이 완료됩니다...</div>;
};

export default GoogleRedirect;
