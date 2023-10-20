// витягуєм з монгуса схему та модель,на основі схеми створюємо схему юзера,а на основі неї модель юзера та експортуємо
const { boolean } = require("joi");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationLink: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

// const User = model("User", userSchema);
// module.exports = User;
// Тут можна скоротити

module.exports = model("User", UserSchema);
