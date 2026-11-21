
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { supabase } from "@/utils/supabase";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!email.trim() || !password) {
      Alert.alert("Missing information", "Enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Sign in failed", error.message);
    }

    router.push("/(app)");
    // The AuthProvider updates the session and Expo Router opens the app.
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>s</Text>
        </View>

        <Text style={styles.title}>Welcome back.</Text>
        <Text style={styles.subtitle}>
          Sign in to connect with your neighbourhood.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#9AA69F"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            placeholderTextColor="#9AA69F"
            secureTextEntry
            autoComplete="current-password"
          />

          <Link href="/forgot-password" style={styles.forgot}>
            Forgot password?
          </Link>

          <Pressable
            style={[styles.button, loading && styles.disabled]}
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Sign in"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.bottomText}>New to Salamz? </Text>
          <Link href="/sign-up" style={styles.link}>
            Create an account
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8F5",
    justifyContent: "center",
    padding: 28,
  },
  content: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#174C3B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "700",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#173B30",
    letterSpacing: -1,
  },
  subtitle: {
    color: "#65746D",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  form: {
    marginTop: 36,
  },
  label: {
    color: "#315D4B",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 9,
  },
  input: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DFE7E0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#173B30",
    marginBottom: 20,
  },
  forgot: {
    color: "#398365",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
    marginTop: -7,
    marginBottom: 24,
  },
  button: {
    height: 54,
    backgroundColor: "#174C3B",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  bottomText: {
    color: "#65746D",
    fontSize: 13,
  },
  link: {
    color: "#398365",
    fontSize: 13,
    fontWeight: "700",
  },
});
