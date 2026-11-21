import { useState } from "react";
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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    if (!email.trim()) {
      Alert.alert("Email required", "Enter your email address.");
      return;
    }

    setLoading(true);
    const redirectTo = Linking.createURL("reset-password");
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo }
    );
    setLoading(false);

    if (error) {
      Alert.alert("Request failed", error.message);
      return;
    }

    Alert.alert(
      "Check your email",
      "If an account exists for this address, you will receive a password reset link."
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.subtitle}>
          Enter your account email and we'll send you a reset link.
        </Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <Pressable
          style={[styles.button, loading && styles.disabled]}
          onPress={handleReset}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Sending..." : "Send reset link"}
          </Text>
        </Pressable>
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
  input: { height: 54, backgroundColor: "#FFFFFF", borderColor: "#DFE7E0", borderWidth: 1, borderRadius: 12, paddingHorizontal: 15 },
  button: { height: 54, backgroundColor: "#174C3B", borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 20 },
  disabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
  link: { color: "#398365", textAlign: "center", marginTop: 28, fontWeight: "600" },
});
