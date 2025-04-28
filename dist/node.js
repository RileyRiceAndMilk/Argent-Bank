const axios = require('axios');
const fs = require('fs');

const signupApi = 'http://localhost:3001/api/v1/user/signup';

// Lire le fichier JSON
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Envoyer les requêtes pour chaque utilisateur
users.forEach((user) => {
  axios
    .post(signupApi, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log(`✅ User ${user.email} created:`, response.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(`❌ Error creating ${user.email}:`, error.response.data);
      } else {
        console.log(`❌ Request error for ${user.email}:`, error.message);
      }
    });
});
