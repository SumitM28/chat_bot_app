import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatFaceData from "../utils/ChatBoatFaceData.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [chatFaceDatas, setChatFaceDatas] = useState([]);
  const [selectedChatFace, setSelectedChatFace] = useState({});
  useEffect(() => {
    setChatFaceDatas(ChatFaceData);
    checkFaceId();
  }, []);

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem("chatFaceId");
    id
      ? setSelectedChatFace(ChatFaceData[id])
      : setSelectedChatFace(ChatFaceData[0]);
  };

  const onChatFacePress = async (id) => {
    setSelectedChatFace(ChatFaceData[id - 1]);
    await AsyncStorage.setItem("chatFaceId", (id - 1).toString());
  };
  return (
    <View style={{ alignItems: "center", paddingTop: 90 }}>
      <Text style={{ color: selectedChatFace.primary, fontSize: 30 }}>
        Hello
      </Text>
      <Text
        style={{
          color: selectedChatFace.primary,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        i'm {selectedChatFace.name}
      </Text>

      <Image
        source={{ uri: selectedChatFace.image }}
        style={{ width: 150, height: 150, marginTop: 20 }}
      />

      <Text style={{ fontSize: 25, marginTop: 25, fontWeight: "600" }}>
        How Can I help you?
      </Text>

      <View
        style={{
          marginTop: 20,
          backgroundColor: "#f5f5f5",
          alignItems: "center",
          height: 110,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <FlatList
          data={chatFaceDatas}
          horizontal
          renderItem={({ item }) =>
            selectedChatFace.id != item.id && (
              <TouchableOpacity
                style={{ margin: 15 }}
                onPress={() => setSelectedChatFace(item)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            )
          }
        />
        <Text style={{ color: "#B0B0B0", fontSize: 17, marginTop: 5 }}>
          Choose your fav ChatBuddy
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: selectedChatFace.primary,
          padding: 17,
          marginTop: 40,
          width: Dimensions.get("screen").width * 0.6,
          alignItems: "center",
          borderRadius: 50,
        }}
        onPress={() =>
          navigation.navigate("Chat", { selectedChatFace: selectedChatFace })
        }
      >
        <Text style={{ fontSize: 17, color: "#fff" }}>Let's Chat</Text>
      </TouchableOpacity>
    </View>
  );
}
