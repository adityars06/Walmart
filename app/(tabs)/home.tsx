import { StyleSheet, Text, View } from "react-native";


export default function Home() {
  return (
    <View
      style={style.container}
    >
      <Text style={style.text}>Hi there</Text>
    </View>
  );
}

const style=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#041f41",
  },
  text: {
    fontSize: 20,
    color: "white",

  },
})
