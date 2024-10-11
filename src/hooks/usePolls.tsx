import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
interface Poll {
  id: number;
  question: string;
  options: string[];
  votes: number;
}
export const usePolls = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchPolls = async () => {
      console.log("Fetching...");
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("polls")
          .select("*")
          .abortSignal(signal);

        if (error) {
          throw new Error(error.message);
        }
        const updatedData = data?.map((poll) => ({ ...poll, votes: 50 })) || [];
        setPolls(updatedData);
      } catch (error) {
        setError("Error fetching data");
        Alert.alert("Error", "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
    return () => {
      controller.abort();
    };
  }, []);
  return { polls, loading, error };
};
