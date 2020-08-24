const {
	MessageEmbed
} = require('discord.js');
const muterole = require('../../models/muterole');
module.exports.run = async (bot, message) => {
	try {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			message.delete();
			return message.channel.send('You do not have the permission to use this command');
		}
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		muterole.findOneAndDelete({
				GuildID: message.guild.id
			},
			async (err, data) => {
				if (err) console.log(err);
				if (!data) {
					const nope1rmembed = new MessageEmbed()
						.setTitle(`❌ How will you delete a thing that is not even there!\nPlease do \`${bot.prefix}setmuterole <ROLE | ROLEID>\` to set muterole!`)
						.setColor('#FF0000');
					return message.channel.send(nope1rmembed).then(msg => {
						if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
						else msg.delete({
							timeout: 5000
						})
					});;
				} else {
					const nope1rmembed = new MessageEmbed()
						.setTitle(`<:yes:744037966942568539> The muterole has been deleted`)
						.setColor('#32cd32');
					return message.channel.send(nope1rmembed).then(msg => {
						if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) return;
						else msg.delete({
							timeout: 5000
						})
					});;
				}
			});
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		return message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'removemuterole',
	description: 'Removes the muterole for a server',
	category: 'Config',
	timeout: 5000,
	timeoutname: '5 seconds',
	accessableby: 'Admins'
};