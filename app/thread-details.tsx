import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ThreadsItem from "../components/ThreadsItem";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Reply, Thread } from "../types";
import ReplyItem from "../components/ReplyItem";
import { Image } from "expo-image";
import { createRandomFollower } from "../utils/generate-dummy-data";

export default function ThreadDetails(): JSX.Element {
  const route = useRoute();
  const [thread, setThread] = useState(route.params as Thread);
  const [replyContent, setReplyContent] = useState("");

  function handleReply() {
    const newReply: Reply = {
      author: createRandomFollower(),
      content: replyContent,
      createdAt: new Date().toISOString(),
      id: Math.random().toString(),
      likes: 0,
    };
    setThread((prevState) => ({
      ...prevState,
      replies: [newReply, ...prevState.replies!],
    }));
    setReplyContent("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ThreadsItem {...thread} />
        <View style={styles.replies}>
          {thread.replies?.map((reply) => (
            <ReplyItem {...reply} key={reply.id} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.replyContainer}>
        <Image
          source={thread.author.photo}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <TextInput
          placeholder="Add reply"
          value={replyContent}
          onChangeText={setReplyContent}
        />
        <Button title="Reply" disabled={!replyContent} onPress={handleReply} />
      </View>
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
  replies: {
    gap: 15,
  },
  replyContainer: {
    marginHorizontal: 30,
    gap: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  input: {
    flexGrow: 1,
    backgroundColor: "#00000010",
    marginLeft: 10,
    padding: 10,
    marginBottom: 30,
    borderRadius: 10,
  },
});
