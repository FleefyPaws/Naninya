const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  GuildID: String,
  MuteRole: Boolean,
  ModLogs: Boolean
});
module.exports = mongoose.model("Datas", Schema);