import { Wrapper, Bar, Div, Img, Button } from './search-bar.styled';
import search from '../../../../assets/search.svg';

const SearchBar = () => {
  return (
    <Wrapper>
      <Div>
        <Img src={search} />
        <Bar placeholder="봉천동 근처 물품 검색하기" />
      </Div>
      <Button>검색</Button>
    </Wrapper>
  );
};

export default SearchBar;
