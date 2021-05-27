import React, {useEffect, useState } from 'react';

import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import api from '../services/api';

import mapMarker from '../images/mapMarker.png';

interface orphanage {
  id: number,
  name:string,
  latitude:number,
  longitude:number,
}

export default function OrpahangesMap (){
  const [orphanages, setOrphanages]= useState<orphanage[]>([]);
  const navigation = useNavigation();

  useFocusEffect(()=>{
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  },);

  
 function handleNavigateToOrphanageDetails (id:number){
        navigation.navigate('OrphanageDetails', {id} )
 };

  function handleNavigateToCreateOrphanage (){
        navigation.navigate('SelectMapPosition')
  };
  return (
    
    <View style={styles.container}>
      <Text></Text>
      <MapView 
          provider={PROVIDER_GOOGLE}
          style={styles.map} 
          initialRegion={{
          latitude:-22.8874808,
          longitude:-42.04409,
          latitudeDelta:0.008,
          longitudeDelta:0.008
        }}
      >
          {orphanages.map(orphanage =>{
            return (
            <Marker 
               key= {orphanage.id}
              icon={mapMarker}
              calloutAnchor ={{
                x:2.7, 
                y:0.8 
              }}
              coordinate = {{
              latitude:orphanage.latitude,
              longitude:orphanage.longitude
              }}
            >
                <Callout tooltip onPress={()=>{handleNavigateToOrphanageDetails(orphanage.id)}}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
            </Marker>
            )
          }
        )
      }

        </MapView>

        <View style={styles.footer}>

          <Text style={styles.footerText}> {orphanages.length} orfanato encontrado. </Text>

          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>

            <Feather name="plus" size={20} color="#fff"/>

          </RectButton>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  map: {
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height
  },

  calloutContainer:{
    width:160,
    height:53,
    paddingHorizontal:16,
    backgroundColor:'rgba(255,255,255,0.8)',
    borderRadius:16,
    justifyContent:'center'
  },

  calloutText:{
    color: '#12c4e8',
    fontSize:14,
    fontFamily:'Nunito_700Bold'
 
  },

  footer:{
    position:'absolute',
    left: 24,
    right:24,
    bottom:32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',

    elevation:3,
  },

  footerText:{
    color:'#ffffff',
    fontFamily:'Nunito_700Bold',
  },

  createOrphanageButton: {
    width:70,
    height:70,
    backgroundColor:'#15c3d6',
    borderRadius:20,

    justifyContent:'center',
    alignItems:'center'
  },


});