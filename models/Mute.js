const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let Schema = new mongoose.Schema({
  RoleID: String,
  GuildID: String
});
module.exports = mongoose.model("muterole", Schema);