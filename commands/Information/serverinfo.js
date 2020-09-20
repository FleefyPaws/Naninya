const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};
const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message, args) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please Give The Bot **Embed Links** Permission`);
		}
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`**Guild information for __${message.guild.name}__**`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({
				dynamic: true
			}))
			.addField('General', [
				`**Name:** ${message.guild.name}`,
				`**ID:** ${message.guild.id}`,
				`**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**Region:** ${regions[message.guild.region]}`,
				`**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
			.addField('Statistics', [
				`**Role Count:** ${roles.length}`,
				`**Emoji Count:** ${emojis.size}`,
				`**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**Member Count:** ${message.guild.memberCount}`,
				`**Humans:** ${members.filter(member => !member.user.bot).size}`,
				`**Bots:** ${members.filter(member => member.user.bot).size}`,
				`**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('Presence', [
				`<:online:731504589400178802>: ${members.filter(member => member.presence.status === 'online').size}`,
				`<:idle:731504868786700348>: ${members.filter(member => member.presence.status === 'idle').size}`,
				`<:dnd:731504589769277500>: ${members.filter(member => member.presence.status === 'dnd').size}`,
				`<:offline:731504590255685683>: ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
			])
		async function trimArray(arr, maxLen = 10) {
			if (arr.length > maxLen) {
				const len = arr.length - maxLen;
				arr = arr.slice(0, maxLen);
				arr.push(`${len} more...`);
			}
			return arr;
		}
		embed.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join('\n ') : roles.length > 10 ? trimArray(roles) : trimArray(roles))
		embed.setTimestamp()
		embed.setFooter(`${bot.user.username} by FleeffyPawsYT`);
		message.channel.send(embed);
	} catch (err) {
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
	name: 'serverinfo',
	description: 'Server info',
	category: 'Information',
	timeout: 5000,
	aliases: ['server', 'guild', 'si', 'gi', 'guildinfo']
};