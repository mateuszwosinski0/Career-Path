import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


const AuthContext = createContext();


function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() =>{
        async function getInitialSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setUser(session?.user ?? null);
            setLoading(false);
        }
        getInitialSession();

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return() => {
            subscription.unsubscribe();
        };
    }, []);

   async function signUp(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  return { data, error };
}

        async function signIn(email, password) {
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            return {data,error};
        }

       async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (!error) {
    setUser(null);
  }

  return { error };
}

async function resetPassword(email) {
    return await supabase.auth.resetPasswordForEmail(email,{
        redirectTo: `${window.location.origin}/reset-password`,
    });
}

async function updatePassword(newPassword) {
    return await supabase.auth.updateUser({
        password: newPassword,
    });
}

async function getProfile(userId) {
    const {data, error} = await supabase
    .from("profiles")
    .select("id, username, created_at")
    .eq("id", userId)
    .single();

    if(error) {
        console.error("Error fetching profile", error);
        return;
    }

    setProfile(data);
}

useEffect(()=>{
    if (!user){
        setProfile(null);
        return;
    }

    getProfile(user.id);
},  [user])


async function updateProfile(username) {
    if (!user) {
        return {error: new Error("User is not authenticated")};
    }
    const {data, error} = await supabase
    .from("profiles")
    .update({
        username,
    })
    eq("id", user.id)
    .select()
    .single();
    return {data, error}
}

    return (
        <AuthContext.Provider 
        value={{user, profile, loading, signUp, signIn, signOut, resetPassword, updatePassword, updateProfile}}>
            {children}
        </AuthContext.Provider>
    )
}
function useAuth() {
    return useContext(AuthContext);
}

export {AuthProvider,useAuth};