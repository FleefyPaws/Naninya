const {
    MessageEmbed
} = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.channel.send('My Owner is currently working on that')
};

module.exports.config = {
    name: 'mute',
    description: 'Comming Soon',
    accessableby: 'Moderators',
    timeout: 3000,
    category: 'Moderation'
};