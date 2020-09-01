const {
	MessageEmbed
} = require('discord.js');
const Mute = require('../../models/Mute');
module.exports.run = async (bot, message, args) => {
	try {
		const nopermembed = new MessageEmbed()
			.setTitle('❌ You do not have the permission to use this command')
			.setColor('#FF0000');
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			message.delete();
			return message.channel.send(nopermembed).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		const role = message.mentions.roles.first() ? message.mentions.roles.first() : message.guild.roles.fetch(rolee => rolee.id === args[0]);
		if (!role) {
			const no13permembed = new MessageEmbed()
				.setTitle('❌ Please mention a role or give the role id')
				.setColor('#FF0000');
			message.delete();
			return message.channel.send(no13permembed).then(msg => {
				if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
				else msg.delete({
					timeout: 5000
				})
			});
		}
		Mute.findOne({
			RoleID: role.id,
			GuildID: message.guild.id
		},
			async (err, data) => {
				if (err) console.log(err);
				if (!data) {
					const newMuteRole = new Mute({
						RoleID: role.id,
						GuildID: message.guild.id
					});
					const no1permembed = new MessageEmbed()
						.setTitle('<:yes:744037966942568539> The muterole has been for the server')
						.setColor('#32CD32');
					return newMuteRole.save().then(message.channel.send(no1permembed).then(msg => {
						if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
						else msg.delete({
							timeout: 5000
						})
					}));
				} else {
					const no1permembed = new MessageEmbed()
						.setTitle(`❌ The mute role is already set for this server!\nPlease do \`${bot.prefix}removemuterole\` to remove muterole!`)
						.setColor('#FF0000');
					return message.channel.send(no1permembed).then(msg => {
						if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
						else msg.delete({
							timeout: 5000
						})
					});
				}
			});
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
	name: 'setmuterole',
	description: 'Sets the muterole of a server',
	usage: '<ROLE>',
	category: 'Config',
	timeout: 5000,
	accessableby: 'Admins'
};