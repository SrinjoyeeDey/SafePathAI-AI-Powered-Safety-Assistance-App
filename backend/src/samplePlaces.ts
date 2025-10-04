import mongoose from "mongoose";
import Place from "./models/Place";

async function seedPlaces() {
  await mongoose.connect("mongodb://localhost:27017/yourDB"); // replace with your DB

  await Place.create([
    {
      name: "Central Park",
      type: "park",
      address: "New York, NY",
      location: { type: "Point", coordinates: [-73.970, 40.770] },
      source: "seed"
    },
    {
      name: "Riverside Park",
      type: "park",
      address: "New York, NY",
      location: { type: "Point", coordinates: [-73.980, 40.790] },
      source: "seed"
    },
    {
      name: "Hudson River Greenway",
      type: "trail",
      address: "New York, NY",
      location: { type: "Point", coordinates: [-73.960, 40.780] },
      source: "seed"
    }
  ]);

  console.log("Seeded sample places!");
  await mongoose.disconnect();
}

seedPlaces();
