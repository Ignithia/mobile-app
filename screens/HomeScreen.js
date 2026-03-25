import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { Picker } from "@react-native-picker/picker";

const categoryNames = {
  "": "All",
  "69aea18ae26b18b385b22cbc": "trucks",
  "69aea0d224f377f293dd0695": "Accessory",
  "69aea04edd387b0773e3626f": "Wheels",
  "699efde5b33f0d8de5677b36": "Skateboards",
};

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/698c7fd48ee7dd8dec207cbb/products",
      {
        headers: {
          Authorization:
            "Bearer 7034f6bc9c4ca213124d6f82746a75a17864aed9abfa63fd7e50e82ec20a56cb",
        },
      },
    )
      .then((res) => res.json())
      .then((data) =>
        setProduct(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            description: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price.value || 0) / 100,
            image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
            category:
              categoryNames[item.product.fieldData["category"]?.id] ||
              "Unknown Category",
          })),
        ),
      )
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = selectedCategory
    ? product.filter((p) => p.category === selectedCategory)
    : product.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our offer</Text>
      <TextInput
        placeholder="Search a product..."
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
        style={styles.picker}
      >
        <picker.Item label="All" value="" />
        <picker.Item label="Tips" value="Tips" />
        <picker.Item label="Information" value="Information" />
        <picker.Item label="Deck" value="Deck" />
        <picker.Item label="Safety" value="Safety" />
        <picker.Item label="Trucks" value="trucks" />
        <picker.Item label="Accessory" value="Accessory" />
        <picker.Item label="Wheels" value="Wheels" />
        <picker.Item label="Skateboards" value="Skateboards" />
      </Picker>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 12,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#fff", marginLeft: 8 }}>
          Only show promotions
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#81b0ff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.list}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.title}
            description={product.description}
            price={product.price}
            onPress={() => navigation.navigate("ProductDetails", product)}
          />
        ))}
        ;
      </ScrollView>
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
  switch: {
    marginVertical: 12,
  },
  input: {
    marginVertical: 12,
    backgroundColor: "#fff",
    borderColor: "#555",
    borderWidth: 1,
    color: "#737373",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  picker: {
    marginVertical: 12,
    backgroundColor: "#fff",
    borderColor: "#555",
    borderWidth: 1,
  },
});

export default HomeScreen;
