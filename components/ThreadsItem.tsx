import { View, Text, StyleSheet } from "react-native";
import { Thread } from "../types";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { timeAgo } from "../utils/time-ago";

export default function ThreadsItem(thread: Thread): JSX.Element {
  return (
    <View>
      <Text>{thread.author.username}</Text>
      <View>
        <PostHeading
          name={thread.author.name}
          createdAt={thread.createdAt}
          verified={thread.author.verified}
        />
        <PostFooter replies={thread.repliesCount} likes={thread.likesCount} />
      </View>
    </View>
  );
}

export function PostHeading({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
}) {
  console.log("verified", verified);
  return (
    <View style={styles.container}>
      <View style={styles.postHeadingContainer}>
        <Text style={styles.postHeadingName}>{name}</Text>
        {verified && (
          <MaterialIcons name="verified" size={14} color="#60a5fa" />
        )}
      </View>
      <View style={styles.postHeadingContainer}>
        <Text style={styles.postHeadingCreatedAt}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
}

export function PostFooter({
  replies,
  likes,
}: {
  replies: number;
  likes: number;
}) {
  return (
    <Text style={styles.postFooter}>
      {replies} replies . {likes} likes
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  postHeadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  postHeadingName: {
    fontWeight: "500",
  },
  postHeadingCreatedAt: {
    color: "gray",
  },
  postFooter: {
    color: "gray",
  },
});
