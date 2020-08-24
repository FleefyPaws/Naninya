const {
	MessageEmbed
} = require('discord.js');
const fs = require('fs');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
		}
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Manage Messages** Permission`);
		}
		const embed = new MessageEmbed()
			.setColor('32CD32')
			.setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
			.setThumbnail(bot.user.displayAvatarURL({
				size: 512
			}));

		if (!args[0]) {
			const categories = fs.readdirSync('./commands/');

			embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix is: **${bot.prefix}**`);
			embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

			categories.forEach(category => {
				const dir = bot.commands.filter(c => c.config.category === category);
				const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
				try {
					embed.addField(`${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(' '));
				} catch (e) {
					console.log(e);
				}
			});

			return message.channel.send(embed);
		} else {
			const err1embed = new MessageEmbed()
				.setTitle('❌ Invalid Command.')
				.setColor('#FF0000');
			let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
			if (!command) {
				return message.channel.send(err1embed).then(msg => msg.delete({
					timeout: 5000
				}));
			}
			command = command.config;

			embed.setDescription(`The bot's prefix is: \`${bot.prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || 'No Description provided.'}
            **Usage:** ${command.usage ? `\`${bot.prefix}${command.name} ${command.usage}\`` : `${bot.prefix}${command.name}`}
			**Accessible by:** ${command.accessableby || 'Members'}
			**Timeout:** ${command.timeout ? `${ms(command.timeout, { long: true })}` : 'None'}
            **Aliases:** ${command.aliases ? command.aliases.join(', ') : 'None.'}`);

			return message.channel.send(embed);
		}
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'help',
	description: 'It gives the help for every single command. Duhh!',
	usage: '[COMMAND]',
	accessableby: 'Members',
	category: 'Miscellaneous',
	timeout: 5000
};