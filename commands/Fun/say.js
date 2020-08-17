const {
    MessageEmbed
} = require("discord.js");
module.exports.run = async (bot, message, args) => {
    const messageToSend = args.slice(0).join(' ');
    if (!messageToSend) {
        message.delete();
        message.channel.send('No message provided').then(msg => msg.delete({
            timeout: 5000
        }));
    }
    message.delete()
    message.channel.send(messageToSend.slice(0, 1).toUpperCase() + messageToSend.slice(1));
}
module.exports.config = {
    name: "say",
    description: "Say command",
    accessableby: "Members",
    category: "Fun",
    usage: '<MESSAGE>',
    timeout: 2000,
    timeoutname: '2 seconds',
}