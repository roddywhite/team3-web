import axios from "axios";
import { useNavigate } from "react-router-dom";

const KaKaoLogin = () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  console.log(code);
  return <div>로딩중입니다... 곧 로그인이 완료됩니다...</div>;
};

export default KaKaoLogin;
