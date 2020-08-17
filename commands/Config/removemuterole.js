const {
    MessageEmbed
} = require('discord.js');
const muterole = require('../../models/muterole')
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.delete()
        return message.channel.send('You do not have the permission to use this command')
    }
    muterole.findOneAndDelete({
            GuildID: message.guild.id
        },
        async (err, data) => {
            if (err) console.log(err);
            if (!data) {
                const nope1rmembed = new MessageEmbed()
                    .setTitle(`❌ How will you delete a thing that is not even there!\nPlease do \`${bot.prefix}setmuterole <ROLE | ROLEID>\` to set muterole!`)
                    .setColor('#FF0000')
                return message.channel.send(nope1rmembed)
            } else {
                const nope1rmembed = new MessageEmbed()
                    .setTitle(`<:yes:744037966942568539> The muterole has been deleted`)
                    .setColor('#32cd32')
                message.channel.send(nope1rmembed)
            }
        });
}

module.exports.config = {
    name: "removemuterole",
    description: "Removes the muterole for a server",
    category: 'Config',
    timeout: 5000,
    timeoutname: '5 seconds',
    accessableby: "Admins"
}