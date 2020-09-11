const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  UserID: String,
  GuildID: String,
  Bug: String
});
module.exports = mongoose.model("bugreport", Schema);