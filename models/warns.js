const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let Schema = new mongoose.Schema({
  Warns: Array,
  User: String,
  Guild: String,
});
module.exports = mongoose.model("warns", Schema);