import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import SvgUri from "react-native-svg-uri";
import testSvg from "../assets/romix.svg";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const image = {
    // uri: "https://cdn.pixabay.com/photo/2014/01/21/16/01/backdrop-249158_960_720.jpg",
    // uri: "https://cdn.pixabay.com/photo/2021/04/23/17/18/triangles-6202188_960_720.jpg",4
    uri:"https://img.freepik.com/free-psd/3d-geometric-black-scene-with-cube-podium-editable-light-product-placement_167960-36.jpg?w=360&t=st=1664905269~exp=1664905869~hmac=99e221f86b892d2596f5847d91555423bfa652685739d8bbad58be7431a30b0b",
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  const userLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("please add all the field");
      return;
    }
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (err) {
      alert("something went wrong");
    }
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.box1}>
          <Text style={styles.text}>Romix</Text>
          {/* <Image
            style={styles.img}
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/12/11/04/20/reindeer-1087610_960_720.png",
            }}
          /> */}
          <Image style={styles.img} source={require("../assets/romix.jpg")} />
          {/* <SvgUri width="200" height="200" uri="../assets/romix.svg"  svgXmlData={testSvg} /> */}
          {/* <SvgUri width={118} height={107} uri="../assets/romix.svg" /> */}
        </View>
        <View style={styles.box2}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
          />
          <TextInput
            label="password"
            mode="outlined"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <Button mode="contained" onPress={() => userLogin()}>
            Login
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={{ textAlign: "center", color: "white" }}>
              Don't have an account ?
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "#000000c0",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius:50
  },
  box1: {
    alignItems: "center",
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: "space-evenly",
    height: "50%",
  },
});
