import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link } from "expo-router";
import * as Linking from "expo-linking";
import { supabase } from "@/utils/supabase";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function handleUrl(url: string | null) {
      if (!url) return;
      const parsed = Linking.parse(url);
      const code = parsed.queryParams?.code;

      if (typeof code === "string") {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          Alert.alert("Invalid reset link", error.message);
        } else if (mounted) {
          setRecoveryReady(true);
        }
      }
    }

    void Linking.getInitialURL().then(handleUrl);
    const subscription = Linking.addEventListener("url", ({ url }) => {
      void handleUrl(url);
    });

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" && mounted) {
        setRecoveryReady(true);
      }
    });

    return () => {
      mounted = false;
      subscription.remove();
      authSubscription.unsubscribe();
    };
  }, []);

  async function handleUpdatePassword() {
    if (password.length < 8) {
      Alert.alert("Weak password", "Use at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match", "Enter the same password twice.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      Alert.alert("Unable to update password", error.message);
      return;
    }

    Alert.alert("Password updated", "Your password has been changed.");
  }

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose a new password</Text>
        <Text style={styles.subtitle}>
          {recoveryReady
            ? "Enter a new password for your Salamz account."
            : "Open this screen using the password reset link sent to your email."}
        </Text>

        {recoveryReady ? (
          <>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="New password (at least 8 characters)"
              secureTextEntry
              autoComplete="new-password"
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
              autoComplete="new-password"
            />
            <Pressable
              style={[styles.button, loading && styles.disabled]}
              onPress={handleUpdatePassword}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Updating..." : "Update password"}
              </Text>
            </Pressable>
          </>
        ) : null}

        <Link href="/sign-in" style={styles.link}>Back to sign in</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F8F5", justifyContent: "center", padding: 28 },
  content: { width: "100%", maxWidth: 420, alignSelf: "center" },
  title: { color: "#173B30", fontSize: 28, fontWeight: "700" },
  subtitle: { color: "#65746D", fontSize: 15, lineHeight: 24, marginTop: 12, marginBottom: 28 },
  input: { height: 54, backgroundColor: "#FFFFFF", borderColor: "#DFE7E0", borderWidth: 1, borderRadius: 12, paddingHorizontal: 15, marginBottom: 16 },
  button: { height: 54, backgroundColor: "#174C3B", borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 8 },
  disabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
  link: { color: "#398365", textAlign: "center", marginTop: 28, fontWeight: "600" },
});
