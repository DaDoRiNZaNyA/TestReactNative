import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import OrderListScreen from './OrderListScreen';
import FullOrderScreen from './FullOrderScreen';

type RootStackParamList = {
  OrderList: undefined;
  FullOrder: {itemId: number};
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OrderList"
          component={OrderListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FullOrder"
          component={FullOrderScreen}
          options={({route}) => ({
            title: `Order ${route.params.itemId}`,
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
