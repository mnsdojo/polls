import { View, Text, FlatList } from "react-native";
import { usePolls } from "../hooks/usePolls";
import PollItem from "../components/PollItem";
import Loader from "../components/ui/loader";
import ErrorMessage from "../components/ui/error-message";

export default function Page() {
  const { polls, error, loading } = usePolls();

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Welcome to Polls
      </Text>
      <Text className="text-gray-600 mb-4">
        Participate in our quick polls and share your opinions!
      </Text>
      <FlatList
        data={polls}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PollItem poll={item} />}
      />
    </View>
  );
}
