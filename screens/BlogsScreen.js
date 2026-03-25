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
import BlogCard from "../components/BlogCard.js";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const categoryNames = {
  "": "All",

  "69aea38f9d4aacd51299a374": "Tips",
  "69aea3837d4fa11a13523008": "Information",
  "69aea201f2c69497c7d7e2d5": "Deck",
  "69ae9fc30963d0d08a436457": "Safety",
};

const BlogsScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  useFocusEffect(React.useCallback(() => {}, [navigation]));

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/698c7fd48ee7dd8dec207cbb/collections/699efb08624b5726e1c05b0c/items/",
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
            id: item.id,
            title: item.fieldData.name,
            description: item.fieldData["post-summary"],
            body:
              item.fieldData["post-body"]
                ?.replace(/<[^>]+>/g, "")
                .replace(/\u00A0/g, " ") || "",
            image: { uri: item.fieldData["main-image"]?.url },
            category:
              categoryNames[item.fieldData["category"]?.id] ||
              "Unknown Category",
          })),
        ),
      )
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredBlogs = product.filter((blog) => {
    const matchesCategory = selectedCategory
      ? blog.category === selectedCategory
      : true;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Blogs</Text>
      <TextInput
        placeholder="Search a blog..."
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
      </Picker>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 12,
          justifyContent: "space-between",
        }}
      >
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
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            name={blog.title}
            description={blog.description}
            onPress={() => navigation.navigate("BlogDetails", blog)}
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
});

export default BlogsScreen;
