const {
    MessageEmbed
} = require('discord.js');
const calc = require('mathjs')
module.exports.run = async (bot, message, args) => {
    if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`Please Give The Bot **Embed Links** Permission`)
    }
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`Please Give The Bot **Manage Messages** Permission`)
    }
    const math1 = args.slice(0).join(' ');
    if (!math1) {
        message.delete();
        const err1 = new MessageEmbed()
            .setTitle("❌ Please provide the question")
            .setColor('#FF0000')
        return message.channel.send(err1).then(msg => msg.delete({
            timeout: 5000
        }));
    }
    let resp = calc.evaluate(args.slice(0).join(' '));
    if (resp === undefined) {
        message.delete();
        const err1 = new MessageEmbed()
            .setTitle("❌ Please provide a valid calculation")
            .setColor('#FF0000')
        return message.channel.send(err1).then(msg => msg.delete({
            timeout: 5000
        }));
    }
    const embed = new MessageEmbed()
        .setColor('#32cd32')
        .setTitle('Math')
        .addField('Input', `\`\`\`js\n${args.slice(0).join(' ')}\`\`\``)
        .addField('Output', `\`\`\`js\n${resp}\`\`\``)
        .setTimestamp()

    message.channel.send(embed);
}
module.exports.config = {
    name: "math",
    description: "Displays the addition, multiplication, subtraction and division of 2 numbers",
    usage: "<NUMBER1> <NUMBER2>",
    accessableby: "Members",
    timeout: 5000,
    timeoutname: '5 seconds',
    category: 'Math',
}