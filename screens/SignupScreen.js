import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const image1 = {
    // uri: "https://cdn.pixabay.com/photo/2014/01/21/16/01/backdrop-249158_960_720.jpg",
    // uri: "https://cdn.pixabay.com/photo/2021/04/23/17/18/triangles-6202188_960_720.jpg",4
    uri: "https://img.freepik.com/free-psd/3d-geometric-black-scene-with-cube-podium-editable-light-product-placement_167960-36.jpg?w=360&t=st=1664905269~exp=1664905869~hmac=99e221f86b892d2596f5847d91555423bfa652685739d8bbad58be7431a30b0b",
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  const userSignup = async () => {
    setLoading(true);
    // if(!email || !password || !image|| !name){
    //        alert("please add all the field")
    //        return
    // }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      firestore().collection("users").doc(result.user.uid).set({
        name: name,
        email: result.user.email,
        uid: result.user.uid,
        pic: image,
        status: "online",
      });
      setLoading(false);
    } catch (err) {
      alert("something went wrong");
    }
  };
  const pickImageAndUpload = () => {
    launchImageLibrary({ quality: 0.5 }, (fileobj) => {
      const uploadTask = storage()
        .ref()
        .child(`/userprofile/${Date.now()}`)
        .putFile(fileobj.uri);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) alert("image uploaded");
        },
        (error) => {
          alert("error uploading image");
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImage(downloadURL);
          });
        }
      );
    });
  };
  return (
    <ImageBackground source={image1} resizeMode="cover" style={styles.image}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.box1}>
          <Text style={styles.text}>Romix Registration</Text>
          <Image style={styles.img} source={require("../assets/romix.jpg")} />
        </View>
        <View style={styles.box2}>
          {!showNext && (
            <>
              <TextInput
                label="Name"
                value={name}
                onChangeText={(text) => setName(text)}
                mode="outlined"
              />
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
                            <Button
                mode="contained"
                // disabled={image?false:true}
                onPress={() => userSignup()}
              >
                Signup
              </Button>
            </>
          )}

          {/* {showNext ? (
            <>
              <TextInput
                 label="Name"
                 value={name}
                 onChangeText={(text)=>setName(text)}
                 mode="outlined"
                />
              <Button
                mode="contained"
                onPress={()=>pickImageAndUpload()}
                >select profile pic</Button>
              <Button
                mode="contained"
                disabled={image?false:true}
                onPress={() => userSignup()}
              >
                Signup
              </Button>
            </>
          ) : (
            <Button mode="contained" onPress={() => setShowNext(true)}>
              Next
            </Button>
          )} */}

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ textAlign: "center", color: "white" }}>
              Already have an account ?
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
    borderRadius: 50,
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
