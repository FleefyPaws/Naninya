const fetch = require('node-fetch');
const {
	MessageEmbed,
	Message,
	Client
} = require('discord.js');
/**
 *
 * @param {Client} bot
 * @param {Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
		}
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Manage Messages** Permission`);
		}
		const countries = args[0];
		const invalidcontry = new MessageEmbed()
			.setTitle('❌ Country Not Found. Please try again.')
			.setColor('#FF0000');
		fetch(`https://disease.sh/v2/countries/${countries}`)
			.then(res => res.json())
			.then(async (data) => {
				if (!data.country) {
					message.delete();
					return message.channel.send(invalidcontry).then(msg => msg.delete({
						timeout: 5000
					}));
				}
				const country = data.country.toLocaleString();
				const { flag } = data.countryInfo;
				const confirmed = data.cases.toLocaleString();
				const todayconfirmed = data.todayCases.toLocaleString();
				const deaths = data.deaths.toLocaleString();
				const todaydeaths = data.todayDeaths.toLocaleString();
				const todayrecovered = data.todayRecovered.toLocaleString();
				const recovered = data.recovered.toLocaleString();
				const critical = data.critical.toLocaleString();
				const active = data.active.toLocaleString();

				const embed = new MessageEmbed()
					.setColor('#32cd32')
					.setTimestamp(new Date())
					.setAuthor('Coronavirus Statistics', flag)
					.addField(`Data for: ${country}`, [
						`Confirmed: **${confirmed}**`,
						`Confirmed Today: **${todayconfirmed}**`,
						`Deaths: **${deaths}**`,
						`Deaths Today: **${todaydeaths}**`,
						`Recovered: **${recovered}**`,
						`Recovered Today: **${todayrecovered}**`,
						`Critical: **${critical}**`,
						`Active: **${active}**`
					])
					.setTimestamp()
					.setFooter(`${bot.user.username} by FleeffyPawsYT`);
				return message.channel.send(embed);
			});
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`);
		message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'corona',
	description: 'Views the number of covid patients in a country or the world',
	usage: '[COUNTRY]',
	accessableby: 'Members',
	category: 'Miscellaneous',
	timeout: 5000,
	timeoutname: '5 seconds',
	aliases: ['covid']
};
