module.exports = class UserDto {
  email;
  name;
  username;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.username = model.username;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
};
