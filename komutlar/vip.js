const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');


exports.run = async (client, message, args) => {

 
if(!["yetkili"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`).then(x => x.delete({timeout: 5000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
 member.roles.add(ayarlar.vip)
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`${member} kişisi artık vip :)`)
  .setTimestamp()
message.channel.send(embed).then(x => x.delete({timeout: 5000}));
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['vip'],
  permLevel: 0
}
exports.help = {
  name: 'vip',
  description: "Belirtilen üyeye kayıtsız rolü verir",
  usage: 'vip @kişi'
}