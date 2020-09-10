const {
	MessageEmbed
} = require('discord.js');
const convert = require('parse-ms');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
		}
		const user = message.mentions.members.first() ? message.mentions.members.first() : message.guild.cache.get(args[0]) || message.author;

		let status;
		if (user.presence.activities.length === 1) status = user.presence.activities[0];
		else if (user.presence.activities.length > 1) status = user.presence.activities[1];

		if (user.presence.activities.length === 0 || status.name !== 'Spotify' && status.type !== 'LISTENING') {
			const embed1 = new MessageEmbed()
				.setTitle('❌ That user isnt listening to spotify!')
				.setColor('#FF0000');
			return message.channel.send(embed1);
		}

		if (status !== null && status.type === 'LISTENING' && status.name === 'Spotify' && status.assets !== null) {
			const image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
				url = `https:/open.spotify.com/track/${status.syncID}`,
				name = status.details,
				artist = status.state,
				album = status.assets.largeText,
				timeStart = status.timestamps.start,
				timeEnd = status.timestamps.end,
				timeConvert = convert(timeEnd - timeStart);

			const minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
			const seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
			const time = `${minutes}:${seconds}`;

			const embed = new MessageEmbed()
				.setAuthor('Spotify Track Information')
				.setColor('#32cd32')
				.setThumbnail(image)
				.addField('Name:', name, true)
				.addField('Album:', album, true)
				.addField('Artist:', artist, true)
				.addField('Duration:', time, false)
				.addField('Listen now on Spotify!', `[\`${artist} - ${name}\`](${url})`, false)
				.setFooter(`${bot.user.username} by FleeffyPawsYT`);
			return message.channel.send(embed);
		}
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		const user = bot.users.cache.get('443278070825091072')
		user.send(errembed)
		return message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'spotify',
	description: 'See the spotify song the user is listening to',
	usage: '[USER]',
	timeout: 5000,
	category: 'Information'
};