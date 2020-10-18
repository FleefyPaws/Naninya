const moment = require('moment');
const badgeflags = {
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
const elevatedFlags = {
	VIEW_AUDIT_LOG: 'View Audit Logs',
	MANAGE_GUILD: 'Manage Server',
	MANAGE_ROLES: 'Manage Roles',
	MANAGE_CHANNELS: 'Manage Channels',
	KICK_MEMBERS: 'Kick Members',
	BAN_MEMBERS: 'Ban Memeers',
	CREATE_INSTANT_INVITE: 'Create Invite',
	CHANGE_NICKNAME: 'Change Nickname',
	MANAGE_NICKNAMES: 'Manage Nicknames',
	MANAGE_EMOJIS: 'Manage Emojis',
	MANAGE_WEBHOOKS: 'Manage Webhooks',
	VIEW_CHANNEL: 'Read Text Channels and See Voice Channels',
	ADMINISTRATOR: 'Administrator'
}
const textflags = {
	SEND_MESSAGES: 'Send Messages',
	SEND_TTS_MESSAGES: 'Send TTS Messages',
	MANAGE_MESSAGES: 'Manage Messages',
	EMBED_LINKS: 'Embed Links',
	ATTACH_FILES: 'Attach Files',
	READ_MESSAGE_HISTORY: 'Read Message History',
	MENTION_EVERYONE: 'Mention Everyone',
	USE_EXTERNAL_EMOJIS: 'Use External Emoji',
	ADD_REACTIONS: 'Add reactions'
}
const voiceflags = {
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	VIDEO: 'Video',
	MUTE_MEMBERS: 'Mute Members',
	DEAFEN_MEMBERS: 'Deafen Members',
	MOVE_MEMBERS: 'Move Members',
	USE_VAD: 'Use Voice Activity',
	PRIORITY_SPEAKER: 'Priority Speaker'
}
const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
		return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
	}
	const member = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) || message.member;
	let isMuted;
	let isAdmin;
	if (member.hasPermission('ADMINISTRATOR')) {
		isAdmin = 'Yes';
	} else {
		isAdmin = 'No';
	}
	if (member.hasPermission('SEND_MESSAGES')) {
		isMuted = 'No';
	} else {
		isMuted = 'Yes';
	}

	const userFlags = member.user.flags.toArray();
	const permFlags = member.flags.toArray();

	function game1() {
		let game;
		if (member.user.presence.activities.length >= 1) game = `${member.user.presence.activities[0].type} ${member.user.presence.activities[0].name}`;
		else if (member.user.presence.activities.length < 1) game = 'Not playing a game';
		return game;
	}
	const embed = new MessageEmbed();
	if (message.mentions.members.first()) {

		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);

		embed.setThumbnail(member.user.displayAvatarURL({
			dynamic: true,
			size: 1024
		}))
		embed.setColor(`#32cd32`)


		embed.addField('User', [
			`**Username:** ${member.user.username}`,
			`**Discriminator:** ${member.user.discriminator}`,
			`**ID:** ${member.id}`,
			`**Flags:** ${userFlags.length ? userFlags.map(flag => badgeflags[flag]).join(', ') : 'None'}`,
			`**Avatar:** [Avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
			`**Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
			`**Status:** ${member.user.presence.status.slice(0, 1).toUpperCase() + member.user.presence.status.slice(1)}`,
			`**Game:** ${game1()}`,
			`\u200b`
		])
		embed.addField('Member', [
			`**Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
			`**Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
			`**Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
			`**Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
			`\u200b`
		])
		embed.addField('Permission', [
			`**Admin:** ${isAdmin}`, `\u200b`,
			`**Muted:** ${isMuted}`, `\u200b`,
			`**Elevated Permissions:**`, `${permFlags.length ? permFlags.map(flag => elevatedFlags[flag]).join(', ') : 'None'}`, `\u200b`,
			`**Text Permissions:**`, `${permFlags.length ? permFlags.map(flag => textflags[flag]).join(', ') : 'None'}`, `\u200b`,
			`**Voice Permissions:**`, `${permFlags.length ? permFlags.map(flag => voiceflags[flag]).join(', ') : 'None'}`, `\u200b`,
			`**Member Permissions Integer:**`, `\`${member.permissions.bitfield}\``
		])
		embed.setTimestamp()
		embed.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		return message.channel.send(embed);
	} else if (message.guild.members.cache.get(args[0])) {
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		embed.addField('User', [
			`**Username:** ${member.user.username}`,
			`**Discriminator:** ${member.user.discriminator}`,
			`**ID:** ${member.id}`,
			`**Avatar:** [Avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
			`**Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
			`**Status:** ${member.user.presence.status.slice(0, 1).toUpperCase() + member.user.presence.status.slice(1)}`,
			`**Game:** ${game1()}`,
			`\u200b`
		])
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