const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');


var prefix = ayarlar.prefix;


const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



client.on("message", async msg => {
    if (msg.content.toLowerCase() === ".tag" ||
       msg.content.toLowerCase() === "tag"  ||
       msg.content.toLowerCase() === "!tag"){
      msg.channel.send(ayarlar.tag);
    }
    if (msg.content.toLowerCase() === "sa" ||
       msg.content.toLowerCase() === "selamın aleyküm" ||
       msg.content.toLowerCase() === "selamun aleyküm" ||
       msg.content.toLowerCase() === "selam") {

           //message.react("id") ( emoji ekliyceksen bu parantezi ve baştaki //'ları sil! tırnak içine emoji id yaz! )

      msg.channel.send(`**Aleyküm Selam <@${msg.author.id}>, Hoşgeldin!**`)
    }
  });


  //////////////////////////////////////////////

  client.on("guildMemberAdd", member => {
    member.setNickname(ayarlar.isim);
  });


  //////////////////////////////////////////////
// afk

client.on("message", async message => {
    const ms = require("parse-ms");
  
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.includes(`${prefix}afk`)) return;
  
    if (await db.fetch(`afk_${message.author.id}`)) {
      let süre = await db.fetch(`afk_süre_${message.author.id}`);
      let zaman = ms(Date.now() - süre);
      db.delete(`afk_${message.author.id}`);
      db.delete(`afk_süre_${message.author.id}`);
      message.member.setNickname(db.fetch(`afktag_${message.author.id}`))
      if(db.fetch(`dil_${message.guild.id}`) != "EN") {
      const afk_cikis = new Discord.MessageEmbed()
        .setColor("ff0000")
        .setDescription(`<@${message.author.id}>\`${zaman.hours}\` **saat**  \`${zaman.minutes}\` **dakika** \`${zaman.seconds}\` **saniye** , **AFK Modundaydın!**`)
      message.channel.send(afk_cikis)}
    if(db.fetch(`dil_${message.guild.id}`) === "EN") {
      const afk_cikis = new Discord.MessageEmbed()
        .setColor("ff0000")
        .setDescription(`<@${message.author.id}>\`${zaman.hours}\` **hours**  \`${zaman.minutes}\` **minutes** \`${zaman.seconds}\` **second(s)** , **You were in AFK Mode!**`)
          .then(msg => {
      msg.delete({ timeout: 10000 })
    })
      message.channel.send(afk_cikis)}
    }
  
    var kullanıcı = message.mentions.users.first();
    if (!kullanıcı) return;
    var sebep = await db.fetch(`afk_${kullanıcı.id}`);
  
    if (sebep) {
      let süre = await db.fetch(`afk_süre_${kullanıcı.id}`);
      let zaman = ms(Date.now() - süre);
      if(db.fetch(`dil_${message.guild.id}`) != "EN") {
      const afk_uyarı = new Discord.MessageEmbed()
        .setColor("ff0000")
       .setDescription(`<@${kullanıcı.id}> adlı kullanıcı \`${sebep}\` sebebiyle; \`${zaman.hours}\` **saat**  \`${zaman.minutes}\` **dakika** \`${zaman.seconds}\` **saniyedir AFK!**`)
      message.reply(afk_uyarı)}
          if(db.fetch(`dil_${message.guild.id}`) === "EN") {
      const afk_uyarı = new Discord.MessageEmbed()
        .setColor("ff0000")
        .setDescription(`<@${kullanıcı.id}> user \`${sebep}\` because; \`${zaman.hours}\` **hours**  \`${zaman.minutes}\` **minutes** \`${zaman.seconds}\` **second(s) AFK!**`)
      message.reply(afk_uyarı)}
    }
  });

  /////


  client.on("message" , async msg => {
    const ms = require("parse-ms");
  
  
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});

//////////////////////////////////////////////////////////////

client.on("userUpdate", async (wasty, yeni) => {
    var sunucu = client.guilds.cache.get(''); // Buraya Sunucu ID
    var uye = sunucu.members.cache.get(yeni.id);
    var logKanali = ""; // Loglanacağı Kanalın ID
  
    if (!sunucu.members.cache.has(yeni.id) || yeni.bot || wasty.username === yeni.username) return;
    
    if ((yeni.username).includes(ayarlar.tag) && !uye.roles.cache.has(ayarlar.tagrol)) {
      try {
        await uye.roles.add(ayarlar.tagrol);
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
      } catch (err) { console.error(err) };
    };
    
    if (!(yeni.username).includes(ayarlar.tag) && uye.roles.cache.has(ayarlar.tagrol)) {
      try {
        await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ayarlar.tagrol).position));
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
      } catch(err) { console.error(err) };
    };
  });


//////////////////////////////////////////////////////////////



client.on('messageDelete', message => {
    const data = require("quick.db")
    data.set(`snipe.mesaj.${message.guild.id}`, message.content)
    data.set(`snipe.id.${message.guild.id}`, message.author.id)
  
  })



////////////////////////////////////////////////////////////////