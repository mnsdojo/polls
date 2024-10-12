import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// Define the shape of the AuthContext
type AuthContextType = {
  session: Session | null;
  user: User | null;
};

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
});

// AuthProvider component to manage authentication state
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch the initial session
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, user: session ? session.user : null }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Custom hook to access the current user
export const useUser = () => {
  const { user } = useAuth();
  return user;
};
