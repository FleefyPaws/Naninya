const {
  readdirSync
} = require("fs")
module.exports = (bot) => {
  const load = dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
    for (let file of commands) {
      let pull = require(`../commands/${dirs}/${file}`);
      if (pull.config.name) {
        bot.commands.set(pull.config.name, pull);
      } else {
        continue;
      }
      if (pull.config.aliases && Array.isArray(pull.config.aliases)) pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
    };
  };
  ["Miscellaneous", "Information", "Moderation", "Fun", "Math", "Image", "Config", "Owner"].forEach(x => load(x));
};