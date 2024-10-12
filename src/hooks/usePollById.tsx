import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Poll {
  id: number;
  question: string;
  options: string[];
  votes: number[];
  created_at: string;
}

export const usePollById = (id: number) => {
  const [poll, setPoll] = useState<Poll | null>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchPollById() {
      setError(null);
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("polls")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        if (data) {
          setPoll(data as Poll);
        } else {
          setError("Poll not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchPollById();
  }, [id]);
  return { loading, error, poll };
};
