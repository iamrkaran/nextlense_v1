const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Replace 'your_token' with your actual authorization token
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWU0NzFjODk2ZGViMDEyNzNmMDc3ODYiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE3MTE5MzAyNzQsImV4cCI6MTc0MzQ2NjI3NH0.JCnkrZ6a_cNmf0K3DBCEtolT0gjLovOJhK9AHc3iKTw';

const captions = [
  "Embracing the serene beauty of nature.",
  "Lost in the rhythm of the city lights.",
  "Chasing the sun, one horizon at a time.",
  "Finding peace in the chaos.",
  "Exploring the uncharted corners of my imagination.",
  "Dancing with the shadows of the twilight.",
  "Capturing the fleeting moments of joy.",
  "Savoring the symphony of the bustling streets.",
  "Immersed in the vibrant hues of the sunset.",
  "Journeying through the echoes of the past."
];

const locations = [
  "Forest", "City", "Beach", "Market", "Mountains", "Alley", "Park", "Street", "Field", "Ruins"
];

const files = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
  "10.jpeg"
];

// Function to upload a single post
const uploadPost = async (caption, location, filePath) => {
  const formData = new FormData();
  formData.append('caption', caption);
  formData.append('location', location);
  formData.append('file', fs.createReadStream(filePath), path.basename(filePath));

  try {
    const response = await axios.post('http://localhost:3001/api/posts', formData, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        ...formData.getHeaders()
      }
    });
    console.log(`Post uploaded: ${caption}`);
  } catch (error) {
    console.error(`Failed to upload post: ${caption}`, error);
  }
};

// Function to seed all posts with a delay
const seedPosts = async () => {
  for (let i = 0; i < captions.length; i++) {
    await uploadPost(captions[i], locations[i], files[i]);
    console.log(`Waiting to upload next post...`);
    await new Promise(resolve => setTimeout(resolve, 5000)); // 5-second delay
  }
};

seedPosts();
