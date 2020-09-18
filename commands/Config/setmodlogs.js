const {
    MessageEmbed
} = require('discord.js');
const Data = require('../../models/Data');
const ModLog = require('../../models/ModLogs');
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
        const channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.guild.cache.get(args[0])
        if (!channel) {
            const erreeeeeeeemebed = new MessageEmbed()
                .setTitle('❌ Please specify the channel by mentioning it or giving the ID of the channel')
                .setColor('#FF0000')
            return message.channel.send(erreeeeeeeemebed).then(msg => {
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
        Data.findOne({
            GuldID: message.guild.id
        }, async (err, data1) => {
            if (err) console.log(err);
            if (!data1) {
                const newData = new Data({
                    GuildID: message.guild.id,
                    MuteRole: false,
                    ModLogs: false
                })
                newData.save()
                const newEmbed = new MessageEmbed()
                    .setTitle('❌ The ModLogs are not enabled on this server! Please use ' + bot.prefix + 'enablemuterole to enable the muterole!')
                    .setColor('#FF0000');
                return mesage.channel.send(newEmbed)
            } else if (data.ModLogs === false) {
                const newEmbed = new MessageEmbed()
                    .setTitle('❌ The ModLogs are not enabled on this server! Please use ' + bot.prefix + 'enablemuterole to enable the muterole!')
                    .setColor('#FF0000');
            } else {
        ModLog.findOne({
            GuildID: message.guild.id
        },
            async (err, data) => {
                if (err) console.log(err);
                if (!data) {
                    const newDataEmbed = new MessageEmbed()
                        .setTitle('<:yes:744037966942568539> The ModLog channel has been set!')
                        .setColor('#32CD32')
                    const newData = new ModLog({
                        GuildID: message.guild.id,
                        ChannelID: channel.id
                    })
                    message.channel.send(newDataEmbed).then(msg => {
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
                    await newData.save();
                } else {
                    const erreeeeeeeemebeed = new MessageEmbed()
                        .setTitle('❌ The ModLog Channel is already set! Please use ' + bot.prefix + 'removemodlogs to remove the ModLog Channel')
                        .setColor('#FF0000')
                    return message.channel.send(erreeeeeeeemebeed).then(msg => {
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