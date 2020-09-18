const {
    MessageEmbed
} = require('discord.js');

module.exports.run = async (bot, message, args) => {
    try {
        message.channel.send('My Owner is currently working on that')
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
    name: 'unmute',
    description: 'Comming Soon',
    accessableby: 'Moderators',
    timeout: 3000,
    category: 'Moderation'
};