const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");


module.exports.run = async (client, message, args) => {

    if(!["810081700918198292"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
    return message.channel.send(new MessageEmbed().setDescription(`yetkin yok moruq.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 4000}));
      

    message.channel.send(new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .addField(`Komutlarımız`, `Made by Wasty`)
    .addField(`Afk`, `.afk Sebebi`, true)
    .addField(`Vip Verme`, `.vip @etiket`, true)
    .addField(`Mesaj Silme`, `.clear 1-100`, true)
    .addField(`Bağlantı Kesme`, `.kes @etiket`, true)
    .addField(`Ses Odasına Gitme`, `.git @etiket`, true)
    .addField(`Ses Odasına Getirme`, `.gel @etiket`, true)
    .addField(`Ses Odasına Çekme`, `.çek @etiket`, true)
    .addField(`Ses Odasına Taşıma`, `.taşı @etiket KanalID`, true)
    .addField(`Vokal Rolü Verme`, `.vokal @etiket`, true)
    .addField(`Virtuoz Rolü Verme`, `.virtuoz @etiket`, true)
    .addField(`Tasarımcı Rolü Verme`, `.tasarımcı @etiket`, true)
    .addField(`Codder Rolü Verme`, `.codder @etiket`, true)
    .addField(`Animator Rolü Verme`, `.animator @etiket`, true)
    .addField(`Snipe`, `.snipe`, true)
    .addField(`Avatar Bakma`, `.avatar @etiket`)
    .setFooter('©️ Wasty'))


}
    
    
    exports.conf = { 
        enabled: true, 
        guildOnly: true, 
        aliases: ["yardım", "help", "h", "y"]
        }
        
        exports.help = {
        name: "yardım",
        usage: ".y",
        info: "komutları gösterir"
        }