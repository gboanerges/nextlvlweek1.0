import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

interface IBGEUFResponse {

  sigla: string;
}

interface IBGECityResponse {

  nome: string;
}

const Home = () => {

  const navigation = useNavigation();

  function handleNavigateToPoints(){

    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity,
    });

  }

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {

    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => {
      
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {

      const cityNames = response.data.map(city => city.nome);
      
      setCities(cityNames);

    })
  }, [selectedUf])

  return (
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >

      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')}></Image>

        <Text style={styles.title}>
          Seu marketplace de coleta de resíduos
        </Text>

        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>

        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 20,
              right: 10,
            },
            placeholder: {
              color: '#aaaaaa',
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Selecione um Estado',
            value: '0',
            color: 'black',}
          }
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: 'transparent',
                  borderTopWidth: 10,
                  borderTopColor: '#878686',
                  borderRightWidth: 10,
                  borderRightColor: 'transparent',
                  borderLeftWidth: 10,
                  borderLeftColor: 'transparent',
                  width: 0,
                  height: 0,
                }}
              />
            );
          }}

          onValueChange={(value) => {
            setSelectedUf(value)
          }}
          items={
            ufs.map((uf) => {
              return (
                
                {label: uf, value:uf, itemKey: uf}
                ) 
              })
          }
        />

        <RNPickerSelect

          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 20,
              right: 10,
            },
            placeholder: {
              color: '#aaaaaa',
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Selecione um Cidade',
            value: '0',
            color: 'black',}
          }
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: 'transparent',
                  borderTopWidth: 10,
                  borderTopColor: '#878686',
                  borderRightWidth: 10,
                  borderRightColor: 'transparent',
                  borderLeftWidth: 10,
                  borderLeftColor: 'transparent',
                  width: 0,
                  height: 0,
                }}
              />
            );
          }}

          onValueChange={(value) => {
            setSelectedCity(value)
          }}
          items={
            cities.map((city) => {
              return (
                
                {label: city, value: city, itemKey: city}
              ) 
            })}
        />  

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>

          <View style={styles.buttonIcon}>
            
            <Text>
              <Feather 
                name="arrow-right" 
                color="#FFF"
                size={24}
                />
            </Text>
          </View>

          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: '#aaa',
    fontWeight: 'bold',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Home;