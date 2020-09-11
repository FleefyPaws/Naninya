const moment = require('moment');
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
		}
		const member = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) || message.member;
		let memberelavatedperms = [];
		let isMuted;
		let isAdmin;
		if (member.hasPermission('ADMINISTRATOR')) {
			memberelavatedperms.push('Administrator');
			isAdmin = 'Yes';
		} else {
			isAdmin = 'No';
		}
		if (member.hasPermission('VIEW_AUDIT_LOG')) memberelavatedperms.push('View Audit Logs');
		if (member.hasPermission('MANAGE_GUILD')) memberelavatedperms.push('Manage Server');
		if (member.hasPermission('MANAGE_ROLES')) memberelavatedperms.push('Manage Roles');
		if (member.hasPermission('MANAGE_CHANNELS')) memberelavatedperms.push('Manage Channel');
		if (member.hasPermission('KICK_MEMBERS')) memberelavatedperms.push('Kick Members');
		if (member.hasPermission('BAN_MEMBERS')) memberelavatedperms.push('Ban Members');
		if (member.hasPermission('CREATE_INSTANT_INVITE')) memberelavatedperms.push('Create Invite');
		if (member.hasPermission('CHANGE_NICKNAME')) memberelavatedperms.push('Change Nickname');
		if (member.hasPermission('MANAGE_NICKNAMES')) memberelavatedperms.push('Manage Nickname');
		if (member.hasPermission('MANAGE_EMOJIS')) memberelavatedperms.push('Manage Emoji');
		if (member.hasPermission('MANAGE_WEBHOOKS')) memberelavatedperms.push('Manage Webhooks');
		if (member.hasPermission('VIEW_CHANNEL')) memberelavatedperms.push('Read Text Channels and See Voice Channels');

		let membertextpermissions = [];
		if (member.hasPermission('SEND_MESSAGES')) {
			isMuted = 'No';
			membertextpermissions.push('Send Messages');
		} else {
			isMuted = 'Yes';
		}
		if (member.hasPermission('SEND_TTS_MESSAGES')) membertextpermissions.push('Send TTS Messages');
		if (member.hasPermission('MANAGE_MESSAGES')) membertextpermissions.push('Manage Messages');
		if (member.hasPermission('EMBED_LINKS')) membertextpermissions.push('Embed Linsks');
		if (member.hasPermission('ATTACH_FILES')) membertextpermissions.push('Attach Files');
		if (member.hasPermission('READ_MESSAGE_HISTORY')) membertextpermissions.push('Read Message History');
		if (member.hasPermission('MENTION_EVERYONE')) membertextpermissions.push('Mention Everyone');
		if (member.hasPermission('USE_EXTERNAL_EMOJIS')) membertextpermissions.push('Use External Emojis');
		if (member.hasPermission('ADD_REACTIONS')) membertextpermissions.push('Add Reactions');

		let membervoicepermissions = [];
		if (member.hasPermission('CONNECT')) membervoicepermissions.push('Connect');
		if (member.hasPermission('SPEAK')) membervoicepermissions.push('Speak');
		if (member.hasPermission('STREAM')) membervoicepermissions.push('Video');
		if (member.hasPermission('MUTE_MEMBERS')) membervoicepermissions.push('Mute Members');
		if (member.hasPermission('DEAFEN_MEMBERS')) membervoicepermissions.push('Deafen Members');
		if (member.hasPermission('MOVE_MEMBERS')) membervoicepermissions.push('Move Members');
		if (member.hasPermission('USE_VAD')) membervoicepermissions.push('Use Voice Activity');
		if (member.hasPermission('PRIORITY_SPEAKER')) membervoicepermissions.push('Priority Speaker');

		const userFlags = member.user.flags.toArray();

		function game1() {
			let game;
			if (member.user.presence.activities.length >= 1) game = `${member.user.presence.activities[0].type} ${member.user.presence.activities[0].name}`;
			else if (member.user.presence.activities.length < 1) game = 'Not playing a game';
			return game;
		}
		if (message.mentions.members.first()) {
			const roles = member.roles.cache
				.sort((a, b) => b.position - a.position)
				.map(role => role.toString())
				.slice(0, -1);
			const embed = new MessageEmbed()
				.setThumbnail(member.user.displayAvatarURL({
					dynamic: true,
					size: 1024
				}))
				.setColor(`#32cd32`)
				.addField('User', [
					`**Username:** ${member.user.username}`,
					`**Discriminator:** ${member.user.discriminator}`,
					`**ID:** ${member.id}`,
					`**Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
					`**Avatar:** [Avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
					`**Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
					`**Status:** ${member.user.presence.status.slice(0, 1).toUpperCase() + member.user.presence.status.slice(1)}`,
					`**Game:** ${game1()}`,
					`\u200b`
				])
				.addField('Member', [
					`**Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
					`**Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
					`**Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
					`**Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
					`\u200b`
				])
				.addField('Permission', [
					`**Admin:** ${isAdmin}`, `\u200b`,
					`**Muted:** ${isMuted}`, `\u200b`,
					`**Elevated Permissions:**`, `${memberelavatedperms.join(', ')}`, `\u200b`,
					`**Text Permissions:**`, `${membertextpermissions.join(', ')}`, `\u200b`,
					`**Voice Permissions:**`, `${membervoicepermissions.join(', ')}`, `\u200b`,
					`**Member Permissions Integer:**`, `\`${member.permissions.bitfield}\``
				])
				.setTimestamp()
				.setFooter(`${bot.user.username} by FleeffyPawsYT`);
			return message.channel.send(embed);
		} else if (message.guild.members.cache.get(args[0])) {
			const roles = member.roles.cache
				.sort((a, b) => b.position - a.position)
				.map(role => role.toString())
				.slice(0, -1);
			const embed = new MessageEmbed()
				.setThumbnail(member.user.displayAvatarURL({
					dynamic: true,
					size: 1024
				}))
				.setColor(`#32cd32`)
				.addField('User', [
					`**Username:** ${member.user.username}`,
					`**Discriminator:** ${member.user.discriminator}`,
					`**ID:** ${member.id}`,
					`**Avatar:** [Avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
					`**Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
					`**Status:** ${member.user.presence.status.slice(0, 1).toUpperCase() + member.user.presence.status.slice(1)}`,
					`**Game:** ${game1()}`,
					`\u200b`
				])
				.addField('Member', [
					`**Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
					`**Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
					`**Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
					`**Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
					`\u200b`
				])
				.addField('Permission', [
					`**Admin:** ${isAdmin}`, `\u200b`,
					`**Muted:** ${isMuted}`, `\u200b`,
					`**Elevated Permissions:**`, `${memberelavatedperms.join(', ')}`, `\u200b`,
					`**Text Permissions:**`, `${membertextpermissions.join(', ')}`, `\u200b`,
					`**Voice Permissions:**`, `${membervoicepermissions.join(', ')}`, `\u200b`,
					`**Member Permissions Integer:**`, `\`${member.permissions.bitfield}\``
				])
				.setTimestamp()
				.setFooter(`${bot.user.username} by FleeffyPawsYT`);
			return message.channel.send(embed);
		} else {
			const roles = member.roles.cache
				.sort((a, b) => b.position - a.position)
				.map(role => role.toString())
				.slice(0, -1);
			const embed = new MessageEmbed()
				.setThumbnail(member.user.displayAvatarURL({
					dynamic: true,
					size: 1024
				}))
				.setColor(`#32cd32`)
				.addField('User', [
					`**Username:** ${member.user.username}`,
					`**Discriminator:** ${member.user.discriminator}`,
					`**ID:** ${member.id}`,
					`**Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
					`**Avatar:** [Avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
					`**Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
					`**Status:** ${member.user.presence.status.slice(0, 1).toUpperCase() + member.user.presence.status.slice(1)}`,
					`**Game:** ${member.user.presence.game || 'Not playing a game.'}`,
					`\u200b`
				])
				.addField('Member', [
					`**Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
					`**Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
					`**Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
					`**Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
					`\u200b`
				])
				.addField('Permission', [
					`**Admin:** ${isAdmin}`, `\u200b`,
					`**Muted:** ${isMuted}`, `\u200b`,
					`**Elevated Permissions:**`, `${memberelavatedperms.join(', ')}`, `\u200b`,
					`**Text Permissions:**`, `${membertextpermissions.join(', ')}`, `\u200b`,
					`**Voice Permissions:**`, `${membervoicepermissions.join(', ')}`, `\u200b`,
					`**Member Permissions Integer:**`, `\`${member.permissions.bitfield}\``
				])
				.setTimestamp()
				.setFooter(`${bot.user.username} by FleeffyPawsYT`);
			return message.channel.send(embed);
		}
	} catch (e) {
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
	name: 'userinfo',
	description: 'See if your wish comes true',
	usage: '[USER]',
	category: 'Information',
	timeout: 5000,
	aliases: ['ui', 'user', 'whois', 'who']
};