const {
    MessageEmbed
} = require('discord.js');
const Data = require('../../models/Data');
const ModLogs = require('../../models/ModLogs');
module.exports.run = async (bot, message) => {
    try {
        const nopermembed = new MessageEmbed()
            .setTitle('❌ You do not have the permission to use this command')
            .setColor('#FF0000');
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(nopermembed).then(msg => {
                if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
                    msg.delete({
                        timeout: 5000
                    })
                } else {
                    message.delete()
                    msg.delete({
                        timeout: 5000
                    })
                }
            });
        }
        if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please give the bot **Embed Links** Permission`);
        }
        Data.findOne({
            GuildID: message.guild.id
        }, async (err, data) => {
            if (err) console.log(err);
            if (!data) {
                const newData = new Data({
                    GuildID: message.guild.id,
                    MuteRole: false,
                    ModLogs: false
                })
                newData.save();
                const newEmbed = new MessageEmbed()
                    .setTitle('❌ The ModLogs Module is not enabled on this server! Please use ' + bot.prefix + 'enablemuterole to enable the muterole module!')
                    .setColor('#FF0000');
                return message.channel.send(newEmbed)
            } else if (data.MuteRole === false) {
              const newEmbed = new MessageEmbed()
                  .setTitle('❌ The ModLogs Module is not enabled on this server! Please use ' + bot.prefix + 'enablemuterole to enable the muterole module!')
                  .setColor('#FF0000');
              return message.channel.send(newEmbed)
            } else {
                Mute.findOneAndDelete({
                    GuildID: message.guild.id
                },
                    async (err, data) => {
                        if (err) console.log(err);
                        if (!data) {
                            const nope1rmembed = new MessageEmbed()
                                .setTitle(`❌ How can I delete a thing that is not there! Please use ${bot.prefix}setmodlogs <CHANNEL> to set a ModLogs Channel`)
                                .setColor('#FF0000');
                            return message.channel.send(nope1rmembed).then(msg => {
                                if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
                                    msg.delete({
                                        timeout: 5000
                                    })
                                } else {
                                    message.delete()
                                    msg.delete({
                                        timeout: 5000
                                    })
                                }
                            });
                        } else {
                            const nope1r4membed = new MessageEmbed()
                                .setTitle(`<:yes:744037966942568539> The ModLog channel has been deleted`)
                                .setColor('#32cd32');
                            return message.channel.send(nope1r4membed).then(msg => {
                                if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
                                    msg.delete({
                                        timeout: 5000
                                    })
                                } else {
                                    message.delete()
                                    msg.delete({
                                        timeout: 5000
                                    })
                                }
                            });
                        }
                    });
            }
        })
    } catch (err) {
        console.log(err);
        const errembed = new MessageEmbed()
            .setTitle('An error occured')
            .setColor('#FF0000')
            .setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/QTdEFhk)**`);
        const user = bot.users.cache.get('443278070825091072')
        user.send(errembed)
        return message.channel.send(errembed);
    }
};

module.exports.config = {
    name: 'removemuterole',
    description: 'Removes the muterole of a server',
    category: 'Config',
    timeout: 5000,
    accessableby: 'Admins'
};
