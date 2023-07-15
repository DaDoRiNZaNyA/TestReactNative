import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Order} from '../components/Order';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

interface OrderData {
  id: string;
  title: string;
  rating: number;
}

const OrderListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get('https://64b0e69b062767bc48254a53.mockapi.io/orders')
      .then(({data}) => {
        setOrders(data);
        console.log(data);
      });
  };

  const handleOrderPress = (itemId: string): void => {
    // @ts-ignore
    navigation.navigate('FullOrder', {itemId});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchOrders();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <ScrollView>
        {orders.map((item: OrderData) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleOrderPress(item.id)}>
            <Order title={item.title} rating={item.rating} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default OrderListScreen;
