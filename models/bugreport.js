const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let Schema = new mongoose.Schema({
  UserID: String,
  GuildID: String,
  Bug: String
});
module.exports = mongoose.model("bugreport", Schema);