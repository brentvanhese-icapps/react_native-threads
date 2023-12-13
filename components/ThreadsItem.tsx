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
import { Image } from "expo-image";

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ThreadsItem(thread: Thread): JSX.Element {
  return (
    <View style={styles.container}>
      <PostLeftSide {...thread} />
      <View style={styles.postContainer}>
        <PostHeading
          name={thread.author.name}
          createdAt={thread.createdAt}
          verified={thread.author.verified}
        />
        <Text>{thread.content}</Text>
        {thread.image && (
          <Image
            source={thread.image}
            style={styles.image}
            placeholder={blurhash}
            contentFit="cover"
            transition={200}
          />
        )}
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
    <View style={styles.postHeadingContainer}>
      <View style={styles.postHeadingPart}>
        <Text style={styles.postHeadingName}>{name}</Text>
        {verified && (
          <MaterialIcons name="verified" size={14} color="#60a5fa" />
        )}
      </View>
      <View style={styles.postHeadingPart}>
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

function PostLeftSide(thread: Thread) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === "light" ? "#00000020" : "ffffff20";

  return (
    <View style={styles.postLeftSideContainer}>
      <Image
        source={thread.author.photo}
        style={styles.profileImage}
        placeholder={blurhash}
        contentFit="cover"
        transition={200}
      />
      <View style={[styles.horizontalLine, { borderColor: borderColor }]} />
      <View style={styles.PostLeftSideImagesContainer}>
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            //@ts-ignore
            source={thread.replies[index - 1]?.author.photo}
            style={{ width: index * 7, height: index * 7, borderRadius: 15 }}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,
  },
  postContainer: {
    gap: 6,
  },
  postHeadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  postHeadingPart: {
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
  image: {
    width: "100%",
    minHeight: 300,
    borderRadius: 10,
  },
  postLeftSideContainer: {
    justifyContent: "space-between",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  horizontalLine: {
    borderWidth: 1,
    alignSelf: "center",
    flexGrow: 1,
  },
  PostLeftSideImagesContainer: {
    width: 20,
    alignItems: "center",
    alignSelf: "center",
    gap: 3,
  },
});
