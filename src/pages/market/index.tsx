import { useState, useEffect } from 'react';
import ShortCut from './components/shortcut';
import { Wrapper, Header, Intro, List } from './market.styled';
import Gnb from '../../components/gnb';
import AddButton from './components/add-button';
import SearchBar from './components/search-bar';
import carrot from '../../assets/carrot.svg';
import sample from '../../assets/product-sample.jpeg';
import sample2 from '../../assets/product-sample-2.jpeg';
import sample3 from '../../assets/product-sample-3.jpeg';
import sample4 from '../../assets/product-sample-4.jpeg';
import sample5 from '../../assets/product-sample-5.jpeg';
import sample6 from '../../assets/product-sample-6.jpeg';

import { redirectWithMsg } from '../../utils/errors';
import { getTradePostList } from '../../store/slices/market';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import axios from 'axios';

const MarketPage = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(state => state.session);
  const [keyword, setKeyword] = useState<string>('');
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://3.37.61.115/tradepost?keyword=aa')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   if (accessToken) {
  //     dispatch(getTradePostList({ accessToken, }))
  //       .unwrap()
  //       .then(() => {
  //         setDataLoading(false);
  //       })
  //       .catch(err => {
  //         if (axios.isAxiosError(err)) {
  //           if (err.response?.status === 404) {
  //             redirectWithMsg(2, err.response?.data.error, () => navigate(-1));
  //           } else if (err.response?.status === 401) {
  //             // TODO: refresh 후 재요청
  //             redirectWithMsg(2, err.response?.data.error, () =>
  //               navigate('/login'),
  //             );
  //           } else {
  //             redirectWithMsg(2, '요청을 수행할 수 없습니다.', () =>
  //               navigate('/'),
  //             );
  //           }
  //         }
  //       });
  //   }
  // }, [accessToken, postId]);

  const searchHandler = () => {
    console.log(keyword);
  };
  return (
    <>
      <Gnb />
      <Wrapper>
        <Header>
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            searchClick={searchHandler}
          />
        </Header>
        <List>
          {/* {data.map(shortcut => {
            return (
              <ShortCut
                img={data.imageUrls}
                title={data.title}
                tradeStatus={data.tradeStatus}
                price={data.price}
                location={data.seller.location}
                likes={data.likeCount}
                chats={data.view}
              />
            );
          })} */}
          <ShortCut
            img={sample6}
            title={'당근 팔아요'}
            tradeStatus="TRADING"
            price={4000}
            location={'관악구 행운동'}
            likes={5}
            chats={2}
            created_at={'1일 전'}
          />
          <ShortCut
            img={sample5}
            title={'당근 팔아요 맛이 정말 좋아요 직접 키웠어요'}
            tradeStatus="TRADING"
            price={4000}
            location={'관악구 행운동'}
            likes={5}
            chats={2}
            created_at={'1일 전'}
          />
          <ShortCut
            img={sample2}
            title={'아이폰 13프로 미개봉 새상품 팝니다(네고안됨)'}
            tradeStatus="RESERVATION"
            price={4000}
            location={'관악구 행운동'}
            likes={5}
            chats={2}
            created_at={'1일 전'}
          />
          <ShortCut
            img={sample}
            title={'패딩 팝니다 3년 입었어요'}
            tradeStatus="TRADING"
            price={4000}
            location={'관악구 행운동'}
            likes={5}
            chats={2}
            created_at={'1일 전'}
          />
          <ShortCut
            img={sample3}
            title={'와플 기계 팝니다 거의 새거입니다'}
            tradeStatus="COMPLETED"
            price={4000}
            location={'관악구 행운동'}
            likes={5}
            chats={2}
            created_at={'1일 전'}
          />
          <ShortCut
            img={sample4}
            title={'당근 팔아요'}
            tradeStatus="RESERVATION"
            price={4000}
            location={'관악구 행운동'}
            likes={5}
            chats={2}
            created_at={'1일 전'}
          />
          <ShortCut
            img={sample5}
            title={'당근 팔아요'}
            tradeStatus="TRADING"
            price={4000}
            location={'관악구 행운동'}
            likes={5}
            chats={2}
            created_at={'1일 전'}
          />
          <ShortCut
            img={sample6}
            title={'당근와플 중고제품 팔아요 맛있어요 한 입만 먹었어요'}
            tradeStatus="TRADING"
            price={4000}
            location={'관악구 행운동'}
            likes={5}
            chats={2}
            created_at={'1일 전'}
          />
          <ShortCut
            img={carrot}
            title={'당근 팔아요'}
            tradeStatus="TRADING"
            price={4000}
            location={'관악구 행운동'}
            likes={5}
            chats={2}
            created_at={'1일 전'}
          />
        </List>
        <AddButton />
      </Wrapper>
    </>
  );
};

export default MarketPage;
