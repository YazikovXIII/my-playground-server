const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    owner: {
      type: String,
    },
    imgURL: {
      type: String,
    },
    header: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Post", PostSchema);
