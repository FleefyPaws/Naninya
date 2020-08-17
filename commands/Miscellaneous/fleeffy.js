const {
    MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Embed Links** Permission`)
        }
        const potatoEmbed = new MessageEmbed()
            .setTitle('Mr.Potato\'s Stuff')
            .setColor(`#32cd32`)
            .setAuthor('Mr.Potato')
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .addField('Links', [
                `YouTube: [Link](https://www.youtube.com/channel/UCWlpdkJcrKVfZH5iGxSUSeA)`,
                `Discord: FleeffyPawsYT`,
                `Geometry Dash: MrPotato14`
            ])
            .setTimestamp()
            .setFooter(`${bot.config.botname} by ${bot.config.ownername}`);
        message.channel.send(potatoEmbed);
        console.log(message)
    } catch (e) {
        console.log(e)
        const errembed = new MessageEmbed()
            .setTitle("An error occured")
            .setColor('#FF0000')
            .setDescription(`Error: ${error}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
        message.channel.send(errembed)
    }
}
module.exports.config = {
    name: "fleeffy",
    description: "Views the links to all of Mr.Potato\'s stuff",
    accessableby: "Members",
    category: 'Miscellaneous'
}