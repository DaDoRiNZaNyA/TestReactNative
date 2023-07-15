import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

interface FeedbackProps {
  rating: number;
  itemId: string;
}

const ContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 50px;
`;

const ParagraphContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 7%;
  padding-bottom: 7%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const CriteriaText = styled.Text`
  font-size: 24px;
`;

const CustomSwitch = styled.Switch`
  transform: scale(1.5);
  margin-left: 5%;
  margin-right: 3%;
`;

const SubmitButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  padding: 10px;
  background-color: #ffd401;
`;

const Feedback: React.FC<FeedbackProps> = ({rating, itemId}) => {
  const [criteriasList, setCriteriaList] = useState<{
    liked: string[];
    disliked: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCriteria, setSelectedCriteria] = useState<boolean[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://64b0e69b062767bc48254a53.mockapi.io/criterias')
      .then(({data}) => {
        if (data && data.length > 0) {
          setCriteriaList(data[0]);
          setSelectedCriteria(new Array(data[0].liked.length).fill(false));
        } else {
          console.log('Invalid data format:', data);
        }
      })
      .catch(error => {
        console.log('Error fetching criteria:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Загрузка...</Text>;
  }

  if (criteriasList === null) {
    return <Text>Произошла ошибка</Text>;
  }

  const criteriaToShow =
    rating <= 3 ? criteriasList.disliked : criteriasList.liked;

  const handleCriteriaChange = (index: number, checked: boolean) => {
    const updatedSelectedCriteria = [...selectedCriteria];
    updatedSelectedCriteria[index] = checked;
    setSelectedCriteria(updatedSelectedCriteria);
  };

  const handleSendFeedback = async () => {
    try {
      const updatedCriteria = criteriaToShow.map((criteria, index) =>
        selectedCriteria[index] ? criteria : 'not selected',
      );

      const updatedOrder = {
        feedbacks: updatedCriteria.filter(
          criteria => criteria !== 'not selected',
        ),
      };

      await axios.put(
        `https://64b0e69b062767bc48254a53.mockapi.io/orders/${itemId}`,
        updatedOrder,
      );

      console.log('Feedback sent successfully');
      // @ts-ignore
      navigation.navigate('OrderList');
    } catch (error) {
      console.log('Failed to send feedback:', error);
    }
  };

  return (
    <ContentContainer>
      {criteriaToShow.map((criteria, index) => (
        <ParagraphContainer key={index}>
          <CustomSwitch
            value={selectedCriteria[index]}
            onValueChange={value => handleCriteriaChange(index, value)}
            thumbColor="#ffd401"
            trackColor={{false: '#CCCCCC', true: '#ffd401'}}
          />
          <CriteriaText>{criteria}</CriteriaText>
        </ParagraphContainer>
      ))}
      <SubmitButton onPress={handleSendFeedback}>
        <CriteriaText>Отправить</CriteriaText>
      </SubmitButton>
    </ContentContainer>
  );
};

export default Feedback;
