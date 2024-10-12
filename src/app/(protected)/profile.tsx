import { View, Text } from "react-native";
import { useUser } from "../../providers/auth-provider";
import { Button } from "@rneui/themed";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const user = useUser();

  return (
    <View>
      <Text>Userid : {user?.id}</Text>
      <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
    </View>
  );
}
