import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { supabase } from "@/utils/supabase";

export default function AuthCallbackScreen() {
  const [message, setMessage] = useState("Confirming your account...");

  useEffect(() => {
    let mounted = true;

    async function completeAuth(url: string | null) {
      if (!url) {
        if (mounted) setMessage("No confirmation link was received.");
        return;
      }

      const parsed = Linking.parse(url);
      const code = parsed.queryParams?.code;

      if (typeof code !== "string") {
        if (mounted) setMessage("This confirmation link is invalid or has expired.");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!mounted) return;

      setMessage(
        error
          ? "We couldn't confirm this link. It may have expired; request a new one and try again."
          : "Your email is confirmed. You can continue to Salamz."
      );

      if (error) Alert.alert("Confirmation failed", error.message);
    }

    void Linking.getInitialURL().then(completeAuth);
    const subscription = Linking.addEventListener("url", ({ url }) => {
      void completeAuth(url);
    });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator color="#174C3B" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#F7F8F5",
  },
  message: {
    color: "#315D4B",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 18,
  },
});
