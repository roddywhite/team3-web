import { Wrapper, Bar, Div, Img, Button } from './search-bar.styled';
import search from '../../../../assets/search.svg';

interface Search {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchClick: () => void;
}

const SearchBar = ({ keyword, setKeyword, searchClick }: Search) => {
  return (
    <Wrapper>
      <Div>
        <Img src={search} />
        <Bar
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="봉천동 근처 물품 검색하기"
        />
      </Div>
      <Button onClick={searchClick}>검색</Button>
    </Wrapper>
  );
};

export default SearchBar;
