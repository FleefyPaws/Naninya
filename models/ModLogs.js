const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  GuildID: String,
  ChannelID: String
});
module.exports = mongoose.model("ModLogs", Schema);