import React, {useState, useEffect} from 'react';
import StarRating from 'react-native-star-rating';
import {RouteProp} from '@react-navigation/native';
import axios from 'axios';
import Feedback from '../components/Feedback';
import styled from 'styled-components/native';

interface FullOrderScreenProps {
  route: RouteProp<RootStackParamList, 'FullOrder'>;
}

type RootStackParamList = {
  FullOrder: {itemId: string};
};

const HeaderText = styled.Text`
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
`;

const ScrollViewStyled = styled.ScrollView`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StarRatingContainer = styled.View`
  width: 90%;
  align-self: center;
  margin-top: 20px;
`;

const FullOrderScreen: React.FC<FullOrderScreenProps> = ({route}) => {
  const itemId = route.params.itemId;
  const [rating, setRating] = useState(0);

  const fullStar = require('../assets/star-icon.png');
  const emptyStar = require('../assets/star-empty-icon.png');

  useEffect(() => {
    axios
      .get(`https://64b0e69b062767bc48254a53.mockapi.io/orders/${itemId}`)
      .then(({data}) => {
        setRating(data.rating);
      });
  }, [itemId]);

  const handleRatingChange = async (
    newRating: number,
    updatedItemId: string,
  ) => {
    try {
      await axios.put(
        `https://64b0e69b062767bc48254a53.mockapi.io/orders/${updatedItemId}`,
        {rating: newRating},
      );
      console.log('Rating updated successfully');
      setRating(newRating);
    } catch (error) {
      console.log('Failed to update rating:', error);
    }
  };

  return (
    <ScrollViewStyled>
      <ContentContainer>
        <HeaderText>Как вам заказ {itemId}?</HeaderText>
        <StarRatingContainer>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(selectedRating: number) =>
              handleRatingChange(selectedRating, itemId)
            }
            fullStar={fullStar}
            emptyStar={emptyStar}
          />
        </StarRatingContainer>
      </ContentContainer>
      {rating > 0 ? <Feedback rating={rating} itemId={itemId} /> : null}
    </ScrollViewStyled>
  );
};

export default FullOrderScreen;
