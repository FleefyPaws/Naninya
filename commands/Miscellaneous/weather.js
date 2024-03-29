const weather = require('weather-js');
const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
	}
	weather.find({
		search: args.join(' '),
		degreeType: 'C'
	}, (error, result) => {
		if (error) {
			return message.channel.send(error).then(msg => {
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
		if (!args[0]) {
			const errembed = new MessageEmbed()
				.setTitle('❌ Please provide a location.')
				.setColor('#FF0000');
			return message.channel.send(errembed).then(msg => {
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

		if (result === undefined || result.length === 0) {
			const errembed = new MessageEmbed()
				.setTitle('❌ Invalid location.')
				.setColor('#FF0000');
			return message.channel.send(errembed).then(msg => {
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
		var {
			current
		} = result[0];
		var {
			location
		} = result[0];

		const weatherinfo = new MessageEmbed()
			.setDescription(`**${current.skytext}**`)
			.setAuthor(`Weather forecast for ${current.observationpoint}`)
			.setThumbnail(current.imageUrl)
			.setColor(`#32cd32`)
			.addField('Timezone', `UTC: ${location.timezone}`, true)
			.addField('Degree Type', 'Celsius', true)
			.addField('Temperature', `${current.temperature}°`, true)
			.addField('Wind', current.winddisplay, true)
			.addField('Feels like', `${current.feelslike}°`, true)
			.addField('Humidity', `${current.humidity}%`, true)
			.setTimestamp()
			.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		return message.channel.send(weatherinfo);
	});

};

module.exports.config = {
	name: 'weather',
	description: 'Show the weather of a specific place',
	usage: '<PLACE>',
	timeout: 5000,
	accessableby: 'Members',
	category: 'Miscellaneous'
};