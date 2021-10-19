import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';

export default function App() {
  return (
    // 1
    // <View style={styles.container}>
    //   <Image style={styles.logo} source={require("./app/assets/IT_KMITL_Logo_UPDATE.png")} />
    //   <Text style={styles.text}>Hello IT Ladkrabang</Text>
    // </View>
    
    // 2
    // <Text style={styles.text}>Hello IT Ladkrabang</Text>

    // 5.1
    // <View style={styles.container2}>
    //     <View style={styles.btncontainer}>
    //       <TextInput placeholder="Input Text" style={[styles.textinput, {textAlign:'center'}]} /> 
    //     </View>
    //     <Button title="ADD"/>
    //   <Image style={styles.logo2} source={require("./app/assets/IT_KMITL_Logo_UPDATE.png")} />
    // </View>

    // 5.2
    <View style={styles.container2}>
      
        <View style={styles.btncontainer}>
          <TextInput placeholder="Input Text" style={[styles.textinput, {textAlign:'center'}]} /> 
        </View>
        <View style={[{width:'20%'}]}>
          <Button title="ADD"/>
        </View>

      <Image style={styles.logo2} source={require("./app/assets/IT_KMITL_Logo_UPDATE.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "gray",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
  },
  container2: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
  },
  logo:{
    width: 120,
    height: 100
  },
  logo2:{
    width: 50,
    height: 50,
    justifyContent: 'flex-start',
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  text: {
    fontSize: 20,
    bottom: 0,
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
  },
  btncontainer: { 
    width: "70%", 
    marginRight: 10
  },

  // 5.2
  textinput:{
    borderWidth: 2,
    borderColor: "red", 
    height: 35
  }
});

// 3
// export default function App() { 
//   return (
//     <View style={styles.outer}>
//       <View style={styles.inner}>
//         <View style={[styles.box,{ backgroundColor : 'blue'}]}></View>
//         <View style={[styles.box,{backgroundColor: 'red'}]}></View>
//       </View>
//       <View style={[styles.inner, {alignItems: 'flex-end' }]}>
//         <View style={[styles.box,{backgroundColor:'green'}]}></View>
//         <View style={[styles.box,{ backgroundColor:'orange'}]}></View>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create ({
//   outer:{
//     flex: 5,
//     flexDirection: 'row',
//   },
//   inner:{
//     flex: 1,
//     justifyContent:'space-between'
//   },
//   box:{
//     width: 50,
//     height: 50
//   }
// })

// 4
// export default function App() {
//   return(
//     <View style={styles.container}>
//       <View style={{height:20}}/>
//       <View style={styles.row}>
//         <Image style={styles.logo} source={require("./app/assets/IT_KMITL_Logo_UPDATE.png")} />
//         <View style={[styles.container, {padding:10}]}>
//           <Text style={styles.header}>
//             Mobile Device Programming
//           </Text>
//           <Text numberOfLines={3}>
//             Course about how to write the Mobile App in iOS and Android by using
//             React-Native. Course about how to write the Mobile App in iOS and Android by using
//             React-Native. Course about how to write the Mobile App in iOS and Android by using
//             React-Native. 
//           </Text>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <Image style={styles.logo} source={require("./app/assets/IT_KMITL_Logo_UPDATE.png")} />
//         <View style={[styles.container, {padding:10}]}>
//           <Text style={styles.header}>
//           React-Native Course
//           </Text>
//           <Text numberOfLines={3}>
//             Course about how to write the Mobile App in iOS and Android by using
//             React-Native.
//           </Text>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <Image style={styles.logo} source={require("./app/assets/IT_KMITL_Logo_UPDATE.png")} />
//         <View style={[styles.container, {padding:10}]}>
//           <Text style={styles.header}>
//           Redux Course
//           </Text>
//           <Text numberOfLines={3}>
//             Course about how to write the Mobile App in iOS and Android by using
//             React-Native.
//           </Text>
//         </View>
//       </View>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container:{
//     flex: 1,
//   },
//   row:{
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 5,
//   },
//   header:{
//     fontSize:20,
//     flexWrap: 'wrap'
//   },  
//   logo:{
//     width: 120,
//     height: 100
//   },  
// })  
