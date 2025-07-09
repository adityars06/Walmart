import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';


export default function Profile() {
  return (
    <View style={style.container}>
      <Text style={style.text}>About Us</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#041f41',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});