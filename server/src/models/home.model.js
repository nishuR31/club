import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    home: {
      type: String,
      default: "home",
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
    copyRight: {type:String,default:`© 2025 SynergyHub. All rights reserved.
`}
    madeBy: {type:String,default:`SynergyHub Team`}
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.model("Home", homeSchema);

export default Home;
