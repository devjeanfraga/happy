import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator}  from '@react-navigation/stack';

import OrpahangesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';

import Header from './components/Header';

const {Navigator, Screen }= createStackNavigator();

export default function Routes(){

  return (

   <NavigationContainer>
     <Navigator screenOptions={ { headerShown:false, cardStyle:{backgroundColor:'#f2f3f5'} } }>

       <Screen 
          name="OrphanagesMap" 
          component={OrpahangesMap} 
          options= {{headerShown:false}}
      />

      <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown:true,
            header:()=><Header title="Lar dos Meninos" showCancel={false}/>
          }}
      />

      <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown:true,
            header:()=><Header title="Selecione no Mapa"/>
          }}
      />

      <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown:true,
            header:()=><Header title="Informe os Dados"/>
          }}
      />




     </Navigator>
   </NavigationContainer>
  );
}