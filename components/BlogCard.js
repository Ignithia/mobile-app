import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

const BlogCard = ({
  image,
  name,
  shortdescription,
  longdescription,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{name}</Text>
      <Text style={styles.description} numberOfLines={3}>{shortdescription}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Read more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: 12,
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    color: "#ffffff",
  },
  description: {
    fontSize: 13,
    color: "#a0a0a0",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
    fontWeight: "700",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#ff4757",
    color: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default BlogCard;
