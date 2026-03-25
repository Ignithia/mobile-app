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
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

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
      .then((data) => {
        const fetchedBlogs = (data.items || []).map((item) => {
          const fieldData = item.fieldData || {};
          const rawImage =
            fieldData["main-image"] ||
            fieldData.image ||
            fieldData.thumbnail ||
            fieldData.heroImage;

          return {
            id: item.id,
            title: fieldData.name || fieldData.title || "Blog",
            description:
              fieldData.summary ||
              fieldData.description ||
              fieldData.subtitle ||
              "",
            author: fieldData.author || "Unknown author",
            date: fieldData.date || fieldData["publish-date"] || "",
            body:
              fieldData["post-body"]
                .replace(/<[^>]+>/g, " ")
                .replace(/\u00A0/g, " ") ||
              fieldData.content
                .replace(/<[^>]+>/g, " ")
                .replace(/\u00A0/g, " ") ||
              "",
            image: rawImage?.url ? { uri: rawImage.url } : null,
            category: categoryNames[fieldData.category] || "Uncategorized",
          };
        });

        if (fetchedBlogs.length > 0) {
          setBlogs(fetchedBlogs);
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const filteredBlogs = blogs.filter(
    (b) =>
      (selectedCategory === "" || b.category === selectedCategory) &&
      b.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
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
        <Picker.Item label="All" value="" />
        <Picker.Item label="Tips" value="Tips" />
        <Picker.Item label="Information" value="Information" />
        <Picker.Item label="Deck" value="Deck" />
        <Picker.Item label="Safety" value="Safety" />
      </Picker>
      <Picker
        selectedValue={sortOption}
        onValueChange={setSortOption}
        style={styles.picker}
      >
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
        {sortedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            name={blog.title}
            description={blog.description}
            onPress={() => navigation.navigate("BlogDetails", blog)}
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

export default BlogsScreen;
