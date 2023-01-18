import * as S from './shortcut.styled';

import LikeIcon from '../../../../assets/like-icon.svg';
import CommentIcon from '../../../../assets/comment-icon.svg';
import { useNavigate } from 'react-router-dom';

interface ShortCutProps {
  id?: number;
  content: string;
  location?: string;
  likeCount?: number;
  commentCount?: number;
}

// TODO: id(key props), handleClick 구현
export const ShortCut = ({
  id = 0,
  content,
  location = '',
  likeCount = 0,

  commentCount = 0,
}: ShortCutProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/neighborhood/${id}`);
  };
  return (
    <S.Container onClick={handleClick}>
      <S.ContentP>{content}</S.ContentP>

      <S.FooterWrapper>
        <S.Location>{location}</S.Location>

        <S.IconsContainer>
          {commentCount > 0 && (
            <>
              <S.IconImg src={CommentIcon} />
              <S.CountSpan>{commentCount}</S.CountSpan>
            </>
          )}
          {likeCount > 0 && (
            <>
              <S.IconImg src={LikeIcon} />
              <S.CountSpan>{likeCount}</S.CountSpan>
            </>
          )}
        </S.IconsContainer>
      </S.FooterWrapper>
    </S.Container>
  );
};