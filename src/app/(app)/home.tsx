import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/providers/auth-provider";

export default function HomeScreen() {
  const { session } = useAuth();
  const user = session?.user;
  const displayName =
    typeof user?.user_metadata?.display_name === "string"
      ? user.user_metadata.display_name
      : "neighbour";

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Sign out failed", error.message);
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.brand}>Salamz</Text>
        <Text style={styles.title}>Welcome, {displayName}!</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.description}>
          Your account is ready. Neighbourhood onboarding and the community
          experience are the next steps.
        </Text>
        <Pressable style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F8F5", justifyContent: "center", padding: 28 },
  content: { width: "100%", maxWidth: 440, alignSelf: "center" },
  brand: { color: "#398365", fontSize: 16, fontWeight: "700", marginBottom: 24 },
  title: { color: "#173B30", fontSize: 28, fontWeight: "700" },
  email: { color: "#65746D", fontSize: 14, marginTop: 10 },
  description: { color: "#65746D", fontSize: 15, lineHeight: 24, marginTop: 24 },
  button: { backgroundColor: "#174C3B", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 36 },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
});
