// витягуєм з монгуса схему та модель,на основі схеми створюємо схему Token,а на основі неї модель токена та експортуємо
const { Schema, model } = require("mongoose");

const TokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Token", TokenSchema);
