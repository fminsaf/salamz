import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.mark}>
          <Text style={styles.markText}>s</Text>
        </View>
        <Text style={styles.eyebrow}>YOUR NEIGHBOURHOOD, CONNECTED</Text>
        <Text style={styles.title}>A little closer.{ "\n" }A lot more connected.</Text>
        <Text style={styles.description}>
          Meet your neighbours, share what matters, and lend a helping hand.
          Stronger communities start with a simple hello.
        </Text>
        <View style={styles.status}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>A new way to connect locally</Text>
        </View>
      </View>
      <Text style={styles.footer}>SALAMZ  ·  BRINGING NEIGHBOURS CLOSER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8F5",
    paddingHorizontal: 28,
    paddingTop: 88,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  content: {
    alignItems: "flex-start",
    maxWidth: 440,
    width: "100%",
    alignSelf: "center",
  },
  mark: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#174C3B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 56,
  },
  markText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
  },
  eyebrow: {
    color: "#668174",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 18,
  },
  title: {
    color: "#173B30",
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: -1.5,
    lineHeight: 49,
    marginBottom: 20,
  },
  description: {
    color: "#65746D",
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 340,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9F0EA",
    borderRadius: 100,
    paddingVertical: 11,
    paddingHorizontal: 15,
    marginTop: 34,
    gap: 9,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#398365",
  },
  statusText: {
    color: "#315D4B",
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    color: "#91A098",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
  },
});
