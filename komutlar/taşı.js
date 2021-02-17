const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");


exports.run = (client, message, args) => {
if(![ayarlar.tasiyici].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
	
	return message.channel.send("yetkin yok moruq")
    let kanal = args[1];
    let kullanici = message.mentions.members.first()
    if (!kullanici) return message.channel.send("**Taşıyacağın kişiyi etiketlemelisin!**")
    if (!kanal) return message.channel.send("**Taşıyacağın kanalın İD'sini belirtmeyi unuttun.**")
   
    kullanici.voice.setChannel(`${kanal}`)
        .then(() =>
            message.channel.send(`${kullanici} <#${kanal}> adlı kanala taşındı.`))
        .catch(console.error);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['üyeyitaşı'],
    permLevel: 0
};
exports.help = {
    name: 'taşı',
    description: 'İstediğiniz kişiniyi bir sesli kanaldan diğerine taşır.',
    usage: 'taşı [kullanıcı] [kanal id]'
};