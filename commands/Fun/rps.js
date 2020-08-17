const {
    MessageEmbed
} = require("discord.js");
module.exports.run = async (bot, message, args) => {
    const chooseArr = ['🗻', '📰', '✂'];
    const embed = new MessageEmbed()
        .setColor('#32cd32')
        .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL)
        .setDescription('Add a reaction to one of these emojis to play the game!')
        .setTimestamp();

    const mess = await message.channel.send(embed);
    const reacted = await promptMessage(mess, message.author, 30, chooseArr);

    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    const result = await getResult(reacted, botChoice);
    await mess.reactions.removeAll();

    embed
        .setDescription('')
        .addField(result, `${reacted} vs ${botChoice}`);

    mess.edit(embed);

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
    async function promptMessage(message, author, time, validReactions) {
        time *= 1000;

        for (const reaction of validReactions) await message.react(reaction);

        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        return message
            .awaitReactions(filter, {
                max: 1,
                time: time
            })
            .then(collected => collected.first() && collected.first().emoji.name);
    }
}

module.exports.config = {
    name: "rps",
    description: "Play rock paper scissors with the bot",
    accessableby: "Members",
    timeout: 2000,
    timeoutname: '2 seconds',
    category: "Fun"
}