const {
    MessageEmbed
} = require("discord.js");
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please give the bot **Embed Links** Permission`)
        }
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please give the bot **Manage Messages** Permission`)
        }
        const question = args.slice(0).join(' ');
        if (!question) {
            message.delete();
            const nopermembed = new MessageEmbed()
                .setTitle("❌ You did not specify your question!")
                .setColor('#FF0000')
            return message.channel.send(nopermembed).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        const responses = [
            'Yes',
            'No',
            'Definetly',
            'Absoloutely',
            'Not in a million years'
        ];
        const response =
            responses[Math.floor(Math.random() * responses.length)];
        const Embed = new MessageEmbed()
            .setTitle(`🎱 8Ball 🎱`)
            .addField(`Your question:`, `\`\`\`${question}\`\`\``)
            .addField(`My reply:`, `\`\`\`${response}\`\`\``)
            .setColor(`#32cd32`)
            .setFooter(`${bot.user.username} by FleeffyPawsYT`);
        return message.channel.send(Embed);
    } catch (e) {
        console.log(e)
        const errembed = new MessageEmbed()
            .setTitle("An error occured")
            .setColor('#FF000')
            .setDescription(`Error: ${e}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
        message.channel.send(errembed)
    }
}

module.exports.config = {
    name: "8ball",
    description: "See if your wish comes true",
    usage: "<QUESTION>",
    accessableby: "Members",
    category: "Fun",
    timeout: 5000,
    timeoutname: '5 seconds',
    aliases: ['8bel', '8bol']
}
