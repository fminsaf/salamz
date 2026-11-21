
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error(error.message);
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>s</Text>
        </View>

        <Text style={styles.title}>Salamz</Text>
        <Text style={styles.subtitle}>
          Bringing neighbours closer.
        </Text>

        {loading ? (
          <ActivityIndicator style={styles.action} color="#174C3B" />
        ) : session?.user ? (
          <View style={styles.account}>
            <Text style={styles.eyebrow}>CURRENTLY SIGNED IN</Text>
            <Text style={styles.email}>
              {session.user.email ?? "No email address"}
            </Text>
            <Text style={styles.userId}>
              User ID: {session.user.id}
            </Text>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleSignOut}
            >
              <Text style={styles.secondaryButtonText}>Sign out</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.account}>
            <Text style={styles.description}>
              Your neighbourhood is better when we're connected.
              Join Salamz and get to know your neighbours.
            </Text>

            <Pressable
              style={styles.primaryButton}
              onPress={() =>
                Alert.alert(
                  "Coming soon",
                  "Account registration will be available soon."
                )
              }
            >
              <Text style={styles.primaryButtonText}>
                Create an account
              </Text>
            </Pressable>

            <Text style={styles.hint}>
              Account registration is coming soon.
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.footer}>
        SALAMZ · YOUR NEIGHBOURHOOD, CONNECTED
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8F5",
    padding: 28,
    paddingTop: 88,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  content: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#174C3B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
  },
  title: {
    color: "#173B30",
    fontSize: 36,
    fontWeight: "700",
  },
  subtitle: {
    color: "#65746D",
    fontSize: 15,
    marginTop: 6,
  },
  account: {
    marginTop: 56,
    padding: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8EDE8",
  },
  eyebrow: {
    color: "#668174",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  email: {
    color: "#173B30",
    fontSize: 17,
    fontWeight: "600",
  },
  userId: {
    color: "#91A098",
    fontSize: 11,
    marginTop: 8,
  },
  description: {
    color: "#65746D",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#174C3B",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 24,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#E9F0EA",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#174C3B",
    fontWeight: "600",
  },
  hint: {
    textAlign: "center",
    color: "#91A098",
    fontSize: 12,
    marginTop: 16,
  },
  action: {
    marginTop: 56,
  },
  footer: {
    color: "#91A098",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textAlign: "center",
  },
});
