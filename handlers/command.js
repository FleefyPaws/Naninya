const {
  readdirSync
} = require("fs")
const ascii = require('ascii-table')
let table = new ascii("Commands")
table.setHeading("Command", "Load Status")
module.exports = (bot) => {
  const load = dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
    for (let file of commands) {
      let pull = require(`../commands/${dirs}/${file}`);
      if (pull.config.name) {
        bot.commands.set(pull.config.name, pull);
        table.addRow(file, '✅')
      } else {
        table.addRow(file, `❌ -> Missing the name or name is not a string`)
        continue;
      }
      if (pull.config.aliases && Array.isArray(pull.config.aliases)) pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
    };
  };
  ["Miscellaneous", "Information", "Moderation", "Fun", "Math", "Image", "Config", "Owner"].forEach(x => load(x));
  console.log(table.toString())
};