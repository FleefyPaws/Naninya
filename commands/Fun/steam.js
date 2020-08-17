const fetch = require('node-fetch');
const {
    MessageEmbed
} = require("discord.js");
module.exports.run = async (bot, message, args) => {
    message.channel.startTyping();
    if (!args.slice(0).join(' ')) {
        message.delete()
        return message.channel.send('Please view the help command for steam')
    }
    fetch(`https://api.alexflipnote.dev/steam/user/${args[0]}`).then(res => res.json()).then(body => {
        if (!body) return message.channel.send('Sorry i\'v broke!');
        let vac;
        if (body.profile.vacbanned === false) {
            vac = 'No'
        } else if (body.profile.vacbanned === true) {
            vac = 'Yes'
        } else {
            vac = null
        }
        if (!body.profile) {
            return message.channel.send('Please view the help command for steam')
        }
        const embed = new MessageEmbed()
            .setColor(`#32cd32`)
            .setThumbnail(body.avatars.avatarfull)
            .setTitle(`Steam Info Of ${body.profile.username}`)
            .addField(`SteamID3`, `${body.id.steamid3}`)
            .addField(`SteamID32`, `${body.id.steamid32}`)
            .addField(`SteamID64`, `${body.id.steamid64}`)
            .addField(`CustomURL`, `[URL](https://steamcommunity.com/id/${body.id.customurl})`)
            .addField(`URL`, `[URL](${body.profile.url})`)
            .addField(`Background`, `[URL](${body.profile.background})`)
            .addField(`Status`, `${body.profile.state}`)
            .addField(`Location`, `${body.profile.location}`)
            .addField(`Privacy`, `${body.profile.privacy}`)
            .addField(`Time Created`, `${body.profile.timecreated}`)
            .addField(`Vac Banned`, `${vac}`)
            .setTimestamp()
        message.channel.stopTyping();
        message.channel.send(embed);
    }).catch(e => {
        message.channel.send(`The user \`${args.slice(0).join(' ')}\` cannot be found in the steam database`).then(msg => msg.delete({
            timeout: 5000
        }))
        message.channel.stopTyping();
    })
}

module.exports.config = {
    name: "steam",
    description: "Gets the steam info",
    accessableby: "Members",
    category: "Fun",
    usage: '<URL | STEAMID3 | STEAMID32 | STEAMID64 | CUSTOMURL>',
    timeout: 5000,
    timeoutname: '5 seconds',
}