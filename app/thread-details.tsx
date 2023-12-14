import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import ThreadsItem from "../components/ThreadsItem";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Thread } from "../types";

export default function ThreadDetails(): JSX.Element {
  const route = useRoute();
  const [thread, setThread] = useState(route.params as Thread);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ThreadsItem {...thread} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
});
