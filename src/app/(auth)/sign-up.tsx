
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
import { supabase } from "@/utils/supabase";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Missing information", "Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Weak password", "Use at least 8 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          display_name: name.trim(),
        },
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert("Registration failed", error.message);
      return;
    }

    if (!data.session) {
      Alert.alert(
        "Check your email",
        "We sent you a confirmation link. Confirm your email before signing in."
      );
    }
    // If email confirmation is disabled, the session automatically
    // moves the user into the authenticated app.
  }

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Join your neighbourhood.</Text>
        <Text style={styles.subtitle}>
          Create your Salamz account.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Your name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
            placeholderTextColor="#9AA69F"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            placeholderTextColor="#9AA69F"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            placeholderTextColor="#9AA69F"
            secureTextEntry
          />

          <Pressable
            style={[styles.button, loading && styles.disabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creating account..." : "Create account"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <Link href="/" style={styles.link}>Sign in</Link>
        </View>
      </View>
    </View>
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
  title: {
    color: "#173B30",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -1,
  },
  subtitle: {
    color: "#65746D",
    fontSize: 15,
    marginTop: 10,
  },
  form: {
    marginTop: 32,
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
    marginBottom: 19,
  },
  button: {
    height: 54,
    backgroundColor: "#174C3B",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
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
    marginTop: 30,
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
