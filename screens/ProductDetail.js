import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

const ProductDetail = ({ route, navigation }) => {
  const { image, title, description, price } = route.params;

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    quantity < 100 ? setQuantity(quantity + 1) : null;
  };
  const decreaseQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : null;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Details</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productDescription}>{description}</Text>
      <Text style={styles.productPrice}>
        ${typeof price === "number" ? price.toFixed(2) : price}
      </Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={decreaseQuantity}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={increaseQuantity}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          alert(
            `You bought ${quantity} skateboard(s) for $ ${(price * quantity).toFixed(2)}`,
          )
        }
      >
        <Text style={styles.buttonText}>Buy Now</Text>
        <Text style={styles.buttonText}>
          Total price: $ {(price * quantity).toFixed(2)}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  heading: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 64,
    marginBottom: 16,
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
    height: 350,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  productTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  productDescription: {
    fontSize: 16,
    color: "#a0a0a0",
    marginTop: 12,
    textAlign: "center",
    paddingHorizontal: 24,
    lineHeight: 24,
  },
  productPrice: {
    fontSize: 24,
    color: "#ff4757",
    marginTop: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  input: {
    marginTop: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 32,
    fontSize: 16,
    color: "#ffffff",
  },
  button: {
    marginTop: 32,
    backgroundColor: "#ff4757",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 32,
    alignItems: "center",
    shadowColor: "#ff4757",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  quantityButton: {
    backgroundColor: "#333",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 24,
    width: 48,
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  quantityText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
});

export default ProductDetail;
