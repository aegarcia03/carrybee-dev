const axios = require('axios');

const geocodeAddress = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    console.log(process.env.GOOGLE_MAPS_API_KEY);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.status === "OK" && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
    } else {
        throw new Error("Geocoding failed. Invalid address.");
    }
  } catch (error) {
    throw new Error("Error fetching geolocation: " + error.message);
  }
};

module.exports = { geocodeAddress };