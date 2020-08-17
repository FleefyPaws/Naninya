const {
    MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Embed Links** Permission`)
        }
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Manage Messages** Permission`)
        }
        const pingingEmbed = new MessageEmbed()
            .setColor(`#32cd32`)
            .setTitle('Pinging...');

        const msg = await message.channel.send(pingingEmbed);

        const latency = msg.createdTimestamp - message.createdTimestamp;
        msg.delete();
        let color;
        if (latency && Math.round(bot.ws.ping) >= 200) {
            color = '#FF0000'
        } else if (latency && Math.round(bot.ws.ping) >= 100) {
            color = '#FFA500'
        } else {
            color = "#008000"
        }
        const pingdeEmbed = new MessageEmbed()
            .setTitle('Pong!')
            .addField('Latencies', [`**❯ Bot Latency: \`${latency}ms\`**`, `**❯ API Latency: \`${Math.round(bot.ws.ping)}ms\`**`])
            .setColor(color)
            .setTimestamp()
            .setFooter(`${bot.user.isername} by FleeffyPawsYT`);

        message.channel.send(pingdeEmbed);
    } catch (e) {
        console.log(e)
        const errembed = new MessageEmbed()
            .setTitle("An error occured")
            .setDescription(`Error: ${error}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
        message.channel.send(errembed)
    }
}

module.exports.config = {
    name: "ping",
    description: "Shows the latency",
    accessableby: "Members",
    timeout: 5000,
    timeoutname: '5 seconds',
    category: 'Miscellaneous'
}
