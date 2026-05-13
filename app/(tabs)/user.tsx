import * as userEndpoints from "@/services/userEndpoints";
import { User } from "@/types/user";
import { ImageBackground } from "expo-image";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function UserScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const result = await userEndpoints.getUser();
      setUser(result);
    };
    getUser();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>User Screen</Text>
      <ImageBackground
        source={{ uri: user?.avatar }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{user?.name}</Text>
    </View>
  );
}
