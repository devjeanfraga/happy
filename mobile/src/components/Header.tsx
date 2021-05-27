import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title:string;
    showCancel?:boolean;
}


export default function Header({title, showCancel=true}:HeaderProps){

  const navigation = useNavigation();

  function handleGobackToAppHomePage (){
    navigation.navigate('OrphanagesMap')
  };


  return(

    <View style={style.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color='#15b6d6'></Feather>
      </BorderlessButton>

      <Text style={style.title}> {title} </Text>

      {showCancel ? (
        <BorderlessButton onPress={handleGobackToAppHomePage}>
          <Feather name="x" size={24} color='#ff669d'></Feather>
        </BorderlessButton>
        ) : (
          <View/>
        ) 
      }
    </View>

  )
}

const style= StyleSheet.create({
      container:{
        padding:24,
        backgroundColor:'#f2f3f5',
        borderBottomWidth:1 ,
        borderColor:'#dde3f0', 
        paddingTop:44,

        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
      },

      title:{
        fontFamily:'Nunito_600SemiBold',
        color:'#8fa7b3',
        fontSize:16, 
      },
})