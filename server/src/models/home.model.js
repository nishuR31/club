import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    home: {
      type: String,
      default: "home",
      unique: true,
    },
    about: String,
    moto: String,
    description: String,
    clubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs",
      },
    ],
    copyRight: String,
    madeBy: String,
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.model("Home", homeSchema);

export default Home;
