import React from 'react';
import styled from 'styled-components/native';

const PostView = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const PostTitle = styled.Text`
  font-size: 30px;
  font-weight: 700;
`;

const PostDetails = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  width: 100%;
`;

const RatingText = styled.Text`
  font-size: 17px;
  flex: 1;
  text-align: right;
  margin-right: 5%;
`;

interface OrderProps {
  title: string;
  rating: number;
}

export const Order: React.FC<OrderProps> = ({title, rating}) => {
  return (
    <PostView>
      <PostDetails>
        <PostTitle>{title}</PostTitle>
        <RatingText>
          Рейтинг: {rating === 0 ? 'не указан' : `${rating}⭐`}
        </RatingText>
      </PostDetails>
    </PostView>
  );
};
