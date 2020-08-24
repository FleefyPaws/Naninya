const {
	MessageEmbed
} = require('discord.js');
module.exports.run = async (bot, message) => {
	try {
		if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		if (!message.guild.me.hasPermission('ADD_REACTIONS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(`Please give the bot **Embed Links** Permission`);
		}
		const chooseArr = ['🗻', '📰', '✂'];
		const embed = new MessageEmbed()
			.setColor('#32cd32')
			.setFooter(message.guild.me.displayName, bot.user.displayAvatarURL({
				dynamic: true
			}))
			.setDescription('Add a reaction to one of these emojis to play the game!')
			.setTimestamp();

		const msg = await message.channel.send(embed);
		const reacted = await promptMessage(msg, message.author, 30, chooseArr);

		const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

		const result = await getResult(reacted, botChoice);
		await msg.reactions.removeAll();

		embed.addField(result, `${reacted} vs ${botChoice}`);

		msg.edit(embed);
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		return message.channel.send(errembed);
	}
	async function getResult(me, clientChosen) {
		if ((me === '🗻' && clientChosen === '✂') ||
			(me === '📰' && clientChosen === '🗻') ||
			(me === '✂' && clientChosen === '📰')) {
			return 'You won!';
		} else if (me === clientChosen) {
			return "It's a tie!";
		} else {
			return 'You lost!';
		}
	}
	async function promptMessage(messaged, author, time, validReactions) {
		time *= 1000;

		for (const reaction of validReactions) await messaged.react(reaction);

		const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

		return messaged
			.awaitReactions(filter, {
				max: 1,
				time: time
			})
			.then(collected => collected.first() && collected.first().emoji.name);
	}
};

module.exports.config = {
	name: 'rps',
	description: 'Play rock paper scissors with the bot',
	accessableby: 'Members',
	timeout: 2000,
	category: 'Fun'
};