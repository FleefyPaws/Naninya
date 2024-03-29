const {
    MessageEmbed
} = require('discord.js');
const Data = require('../../models/Data');
const Mute = require('../../models/Mute');
module.exports.run = async (bot, message) => {
    return message.channel.send('My Owner is currently working on that')
    const nopermembed = new MessageEmbed()
        .setTitle('❌ You do not have the permission to use this command')
        .setColor('#FF0000');
    if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`Please give the bot **Embed Links** Permission`);
    }
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
    Data.findOne({
        GuildID: message.guild.id
    }, async (err, message) => {
        if (err) console.log(err);
        if (!data) {
            const newData = new Data({
                GuildID: message.guild.id,
                MuteRole: false,
                ModLogs: false
            })
            newData.save();
            const newEmbed = new MessageEmbed()
                .setTitle('❌ The MuteRole Module is disabled please enable it by using ' + `${bot.prefix}enablemuterole`)
                .setColor('#FF0000')
            return message.channel.send(newEmbed)
        } else if (data.MuteRole === false) {
            const newEmbed = new MessageEmbed()
                .setTitle('❌ The MuteRole Module is disabled please enable it by using ' + `${bot.prefix}enablemuterole`)
                .setColor('#FF0000')
            return message.channel.send(newEmbed)
        } else {

            Mute.findOne({
                    GuildID: message.guild.id
                },
                async (err, data) => {
                    if (err) console.log(err);
                    if (!data) {
                        const nope1rmembed = new MessageEmbed()
                            .setTitle(`❌ The mute role has not been set for this server.\nSet it up by using this command \`${bot.prefix}setmuterole <ROLE>\`!`)
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
                        const role = message.guild.roles.cache.get(data.RoleID);
                        const nope1r3membed = new MessageEmbed()
                            .setTitle(`<:yes:744037966942568539> The mute role for \`${message.guild.name}\` is ${role.name}`)
                            .setColor('#32cd32');
                        return message.channel.send(nope1r3membed).then(msg => {
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
};

module.exports.config = {
    name: 'setmuterole',
    description: 'Views the muterole of a server',
    category: 'Config',
    timeout: 5000,
    accessableby: 'Moderator',
};