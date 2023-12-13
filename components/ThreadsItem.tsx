import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Thread } from "../types";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
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
        <BottomIcons />
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
    <Text style={styles.postFooterContainer}>
      {replies} replies . {likes} likes
    </Text>
  );
}

export function BottomIcons() {
  const iconSize = 20;
  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "dark" ? "white" : "black";
  return (
    <View style={styles.bottomIconsContainer}>
      <FontAwesome name="heart" size={iconSize} color={iconColor} />
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} />
      <AntDesign name="retweet" size={iconSize} color={iconColor} />
      <Feather name="send" size={iconSize} color={iconColor} />
    </View>
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
  postFooterContainer: {
    color: "gray",
  },
  bottomIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
