import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

const BlogDetail = ({ route, navigation }) => {
  const { image, title, shortDesc, longDesc } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Details</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.blogTitle}>{title}</Text>
      <Text style={styles.blogContent}>{longDesc}</Text>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 64,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 300,
  },
  blogTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    textAlign: "center",
  },
  blogDescription: {
    fontSize: 16,
    color: "#d0d0d0",
    marginTop: 8,
    textAlign: "center",
  },
  blogContent: {
    fontSize: 16,
    color: "#d0d0d0",
    marginTop: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  input: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 32,
    fontSize: 16,
    color: "#737373",
  },
  button: {
    marginTop: 24,
    backgroundColor: "#ff0000",
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 32,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  quantityButton: {
    backgroundColor: "#555",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  quantityText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default BlogDetail;
