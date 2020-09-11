const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  RoleID: String,
  GuildID: String
});
module.exports = mongoose.model("muterole", Schema);