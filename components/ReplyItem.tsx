import { Image } from "expo-image";
import { Reply } from "../types";
import { StyleSheet, View, Text } from "react-native";
import { BottomIcons, PostFooter, PostHeading, blurhash } from "./ThreadsItem";

export default function ReplyItem({
  author,
  content,
  createdAt,
  id,
  likes,
}: Reply): JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        source={author.photo}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.reply}>
        <PostHeading
          name={author.name}
          createdAt={createdAt}
          verified={false}
        />
        <Text>{content}</Text>
        <BottomIcons />
        <PostFooter replies={0} likes={likes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reply: {
    flexShrink: 1,
    gap: 10,
    width: "100%",
  },
});
