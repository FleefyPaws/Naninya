const {
    MessageEmbed
} = require("discord.js");
const convert = require('parse-ms')
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Embed Links** Permission`)
        }
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Manage Messages** Permission`)
        }
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        let status;
        if (user.presence.activities.length === 1) status = user.presence.activities[0];
        else if (user.presence.activities.length > 1) status = user.presence.activities[1];

        if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
            return message.channel.send("This user isn't listening to Spotify.");
        }

        if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
            let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
                url = `https:/open.spotify.com/track/${status.syncID}`,
                name = status.details,
                artist = status.state,
                album = status.assets.largeText,
                timeStart = status.timestamps.start,
                timeEnd = status.timestamps.end,
                timeConvert = convert(timeEnd - timeStart);

            let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
            let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
            let time = `${minutes}:${seconds}`;

            const embed = new MessageEmbed()
                .setAuthor("Spotify Track Information")
                .setColor('#32cd32')
                .setThumbnail(image)
                .addField("Name:", name, true)
                .addField("Album:", album, true)
                .addField("Artist:", artist, true)
                .addField("Duration:", time, false)
                .addField("Listen now on Spotify!", `[\`${artist} - ${name}\`](${url})`, false)
                .setFooter(`${bot.user.username} by FleeffyPawsYT`)
            return message.channel.send(embed)
        }
    } catch (e) {
        console.log(e)
        const errembed = new MessageEmbed()
            .setTitle("An error occured")
            .setDescription(`Error: ${error}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
        message.channel.send(errembed)
    }
}

module.exports.config = {
    name: "spotify",
    description: "See the spotify song the user is listening to",
    usage: "[USER]",
    timeout: 5000,
    timeoutname: '5 seconds',
    category: "Information",
}