import React , { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
   KeyboardAvoidingView, 
   TextInput, 
   TouchableOpacity, 
   Image, 
   Keyboard,
   Animated } from 'react-native';

export default function App() {

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 90}));
  const [opactiy] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x:130, y:155}));

  useEffect(() => {

    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue:0,
        speed:4,
        bounciness:20
      }),
      Animated.timing(opactiy, {
        toValue:1,
        duration:1000
      })
    ]).start();

  }, []);

  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue:80,
        duration:100,
      }),
      Animated.timing(logo.y,{
        toValue:95,
        duration:100
      }),
    ]).start();
  }

  function keyboardDidHide(){

     Animated.parallel([
      Animated.timing(logo.x, {
        toValue:130,
        duration:100
      }),
      Animated.timing(logo.y,{
        toValue:155,
        duration:100
      }),
    ]).start();

  }


  return (
    <KeyboardAvoidingView style={styles.container}>

        <View style={styles.containerLogo}>
          <Animated.Image 
            style={{
              width: logo.x,
              height: logo.y
            }}
            source={require('./src/assets/images/logo.png')}
          /> 
        </View>
        
        <Animated.View 
        style={[
          styles.containerInputs,
          {
              opacity: opactiy,
              transform:[
                { translateY:  offset.y}
              ]
          }
        ]}
        >
          
        <TextInput 
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TextInput 
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.submitText}>ACESSAR</Text>
          </TouchableOpacity>
        
        </Animated.View>


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#191919'
    },
    containerLogo:{
      flex:1,
      justifyContent:'center',
    },
    containerInputs:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      width:'90%',
      paddingBottom:25
    },
    input:{
      backgroundColor:'#fff',
      width: '90%',
      marginBottom:15,
      color:'#222',
      fontSize:17,
      borderRadius:7,
      padding:10
    },
    btnSubmit:{
      backgroundColor: '#35AAFF',
      width: '90%',
      height:45,
      borderRadius:7,
      alignItems:'center',
      justifyContent: 'center'
    },
    submitText:{
      fontSize:18,
      color:'white',
    }
});
