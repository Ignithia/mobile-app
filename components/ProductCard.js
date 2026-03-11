import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Button,
  Switch,
  TextInput,
} from "react-native";

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={require("../images/imdages.jpeg")} style={styles.image} />
      <Text style={styles.title}>Batman Skateboard</Text>
      <Text style={styles.description}>Skateboard met batman logo</Text>
      <Text style={styles.price}>$29.99</Text>
      <Button
        style={styles.button}
        OnPress={() => alert("You bought a skateboard")}
        title="Buy Now"
      ></Button>
      <Pressable
        style={styles.button}
        onPress={() => alert("Viewing details for Batman Skateboard")}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </Pressable>
      <Text style={{ color: "#fff" }}>Add to Wishlist</Text>
      <Switch
        style={styles.switch}
        onValueChange={() => alert("Added to wishlist")}
        value={false}
        title="Add to Wishlist"
      ></Switch>
      <TextInput placeholder="Enter quantity" style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: 16,
    backgroundColor: "#1c887f",
    borderRadius: 12,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#d0d0d0",
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
    backgroundColor: "#ff0000",
    color: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  switch: {
    backgroundColor: "#04fb08",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  input: {
    marginTop: 12,
    backgroundColor: "#333",
    borderColor: "#555",
    borderWidth: 1,
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});

export default ProductCard;
