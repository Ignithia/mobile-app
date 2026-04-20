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
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

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
      .then((data) => {
        const fetchedProducts = (data.items || []).map((item) => {
          const product = item?.product || {};
          const productFieldData = product?.fieldData || {};
          const firstCategoryId = Array.isArray(productFieldData.category)
            ? productFieldData.category[0]
            : undefined;
          const imageUrl = item?.skus?.[0]?.fieldData?.["main-image"]?.url;

          return {
            id: product?.id || item?.id,
            title: productFieldData.name || "Unknown Product",
            description: productFieldData.subtitle || "",
            price: (
              (item?.skus?.[0]?.fieldData?.price?.value || 0) / 100
            ).toFixed(2),
            image: imageUrl ? { uri: imageUrl } : null,
            category: categoryNames[firstCategoryId] || "Unknown Category",
          };
        });

        setProducts(fetchedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc")
      return parseFloat(a.price) - parseFloat(b.price);
    if (sortOption === "price-desc")
      return parseFloat(b.price) - parseFloat(a.price);
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

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
        <Picker.Item label="All" value="" />
        <Picker.Item label="Trucks" value="trucks" />
        <Picker.Item label="Accessory" value="Accessory" />
        <Picker.Item label="Wheels" value="Wheels" />
        <Picker.Item label="Skateboards" value="Skateboards" />
      </Picker>

      <Picker
        selectedValue={sortOption}
        onValueChange={setSortOption}
        style={styles.picker}
      >
        <Picker.Item label="Price: Low to High" value="price-asc" />
        <Picker.Item label="Price: High to Low" value="price-desc" />
        <Picker.Item label="Name: A to Z" value="name-asc" />
        <Picker.Item label="Name: Z to A" value="name-desc" />
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
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.title}
            description={product.description}
            price={product.price}
            onPress={() => navigation.navigate("ProductDetails", product)}
          />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
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
    letterSpacing: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  switch: {
    marginVertical: 12,
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: "#1e1e1e",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 10,
    color: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  picker: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#1e1e1e",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 10,
    color: "#ffffff",
  },
});

export default HomeScreen;
