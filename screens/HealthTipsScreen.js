import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const articles = [
  {
    title: "5 Ways to Boost Immunity Naturally",
    url: "https://www.healthline.com/health/how-to-boost-immune-system",
  },
  {
    title: "Healthy Eating Tips for Students",
    url: "https://www.nhs.uk/live-well/eat-well/food-and-diet/",
  },
  {
    title: "Ways to Increase Protein Intake",
    url: "https://www.healthline.com/nutrition/14-ways-to-increase-protein-intake",
  },
  {
    title: "How to Handle Study Stress",
    url: "https://psychcentral.com/stress/how-to-handle-stress-from-studying",
  },
  {
    title: "Ways to Drink More Water",
    url: "https://www.healthline.com/nutrition/how-to-drink-more-water",
  },
  {
    title: "The 12 Habits That Make You Healthy",
    url: "https://www.webmd.com/fitness-exercise/ss/twelve-habits-super-healthy-people",
  },
  {
    title: "Digital Detoxing",
    url: "https://toolkit.lifeline.org.au/articles/techniques/how-to-do-a-digital-detox",
  },
  {
    title: "Dealing with Anxiety",
    url: "https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/11-tips-for-coping-with-an-anxiety-disorder",
  },
  {
    title: "Summer Skincare",
    url: "https://timesofindia.indiatimes.com/life-style/beauty/summer-skin-care-tips/featureshow/118335252.cms",
  },
  {
    title: "The Glow-Up Secret",
    url: "https://www.wikihow.com/Have-a-Glow-Up",
  },
];

const HealthTipsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📚 Recommended Articles</Text>
      {articles.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => Linking.openURL(item.url)}
          style={styles.linkBox}
        >
          <Text style={styles.linkText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  linkBox: {
    backgroundColor: "#f1f8e9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  linkText: {
    color: "#2e7d32",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default HealthTipsScreen;
