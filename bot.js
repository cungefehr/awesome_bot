var Discord = require('discord.io');
//var shell = require('shelljs');
var logger = require('winston');
var auth = require('./auth.json');
//var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "cungefehr",
//   database: "discord_bot",
//   password: "cZw90c7W$"
// });

// Configure logger settings
 logger.remove(logger.transports.Console);
 logger.add(logger.transports.Console, {
     colorize: true
 });
 logger.level = 'debug';
// Initialize Discord Bot

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
     logger.info('Connected');
     logger.info('Logged in as: ');
     logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    var serverID = bot.channels[channelID].guild_id;
    //Our bot needs to know if it will execute a command
    //It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {


        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var cmd_option = args[1];

        logger.info(message);
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({to: channelID,message: 'Pong!'});
	          break;

            case 'hi':
                    console.log(user + " - " + userID);
                    bot.sendMessage({to: channelID, message: "Hi!" + "<@!" + userID + ">"});
	          break;

            //Starbound
            case 'starboundstart':
                    check = roleCheck(user, userID, channelID, evt, "Admin");

                    if ( check == 1 ) {
                      console.log(user + " - " + userID);
                      // shcmd = shell.exec('starbound.sh start');
                    } else {
                      console.log(user + " - " + userID + " Rolecheck failed!");
                      bot.sendMessage({to: channelID, message: "Rolecheck failed for User: " + user });
                    }
	          break;

            case 'starboundstop':
                    check = roleCheck(user, userID, channelID, evt, "Admin");
                    if ( check == 1 ) {
                      console.log(user + " - " + userID);
                      // shcmd = shell.exec('starbound.sh stop');
                      bot.sendMessage({to: channelID, message: " " + shcmd });
                    } else {
                      console.log(user + " - " + userID + " Rolecheck failed!");
                      bot.sendMessage({to: channelID, message: "Rolecheck failed for User: " + user });
                    }
            break;

            case 'starboundrestart':
                    check = roleCheck(user, userID, channelID, evt, "Admin");
                    if ( check == 1 ) {
                      console.log(user + " - " + userID);
                      // shcmd = shell.exec('starbound.sh restart');
                      bot.sendMessage({to: channelID, message: " " + shcmd });
                    } else {
                      console.log(user + " - " + userID + " Rolecheck failed!");
                      bot.sendMessage({to: channelID, message: "Rolecheck failed for User: " + user });
                    }
            break;

            case 'starboundupdate':
                    check = roleCheck(user, userID, channelID, evt, "Admin");
                    if ( check == 1 ) {
                      console.log(user + " - " + userID);
                      // shcmd = shell.exec('starbound.sh update');
                      bot.sendMessage({to: channelID, message: " " + shcmd });
                  } else {
                    console.log(user + " - " + userID + " Rolecheck failed!");
                    bot.sendMessage({to: channelID, message: "Rolecheck failed for User: " + user });
                  }
	          break;

            case 'starboundstatus':
                    console.log(user + " - " + userID);
		                // shcmd = shell.exec('starbound.sh status');
                    bot.sendMessage({to: channelID, message: " " + shcmd });
		    //shell.echo('Test erfolgreich');
	          break;

            case 'valheim-start':
                    // check = roleCheck(user, userID, channelID, evt, "AWE");
                    // if ( check == 1 ) {
                    //   console.log(user + " - " + userID);
                      // shcmd = shell.exec('systemctl start valheim');
                      bot.sendMessage({to: channelID, message: " " + shcmd });
                  // } else {
                  //     console.log(user + " - " + userID + " Rolecheck failed!");
                  //     bot.sendMessage({to: channelID, message: "Rolecheck failed for User: " + user });
                  // }
            break;

            case 'valheim-stop':
                    check = roleCheck(user, userID, channelID, evt, "AWE");
                    if ( check == 1 ) {
                      console.log(user + " - " + userID);
                      // shcmd = shell.exec('systemctl stop valheim');
                      bot.sendMessage({to: channelID, message: " " + shcmd });
                  } else {
                      console.log(user + " - " + userID + " Rolecheck failed!");
                      bot.sendMessage({to: channelID, message: "Rolecheck failed for User: " + user });
                  }
            break;

            case 'valheim-status':
                    console.log(user + " - " + userID);
                    // shcmd = shell.exec('systemctl status valheim');
                    bot.sendMessage({to: channelID, message: " " + shcmd });
                    //shell.echo('Test erfolgreich');
            break;

            case 'clearChat':
                check = roleCheck(user, userID, channelID, evt, "AWE");
                if ( check == 1 ) {
                  message.channel.fetchMessages()
                     .then(function(list){
                          message.channel.bulkDelete(list);
                      }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})
                } else {
                    console.log(user + " - " + userID + " Rolecheck failed!");
                    bot.sendMessage({to: channelID, message: "Rolecheck failed for User: " + user });
                }
	          break;

            // Get Server Info
            case 'getInfo':
                  serverInfo = getServerInfo(cmd_option, channelID);
	          break;
	   // Just add any case commands if you want to..
         }
     }
     if (message.substring(0, 12) == '(╯°□°）╯︵ ┻━┻') {
         var args = message.substring(1).split(' ');
         var cmd = args[0];
         var reply = "";
         var i = 0;
         //count the tables
         //var count = message.indexOf('(╯°□°）╯︵ ┻━┻', 0);
         var count = (message.match(/\(╯°□°）╯︵ ┻━┻/g) || []).length;
         console.log("Tables thrown: " + count);

         args = args.splice(1);
         //putting back the correct amount of Tables
        if ( count == 1 ) {
          reply = '┬─┬ ノ( ゜-゜ノ) ';
        } else {
          for( var i = 1 ; i <= count ; i ++) {
              if ( i == 1 ) {
                reply = '┬─┬ ノ( ゜-゜ノ) ';
              } else {
                reply = reply + ' ┬─┬ ノ( ゜-゜ノ)';
              }
          }
	}
        bot.sendMessage({to: channelID, message: reply});
        bot.sendMessage({to: channelID, message: 'No table flipping!'});
        // Just add any case commands if you want to..

    }
});

function roleCheck(user, userID, channelID, evt, role) {
       var serverID = bot.channels[channelID].guild_id;
       roles = bot.servers[serverID].members[userID].roles;
       console.log(role);

		   var i = 0;
                   var len = roles.length;

                   for (; i < len; ) {
                        roleName = bot.servers[serverID].roles[roles[i]];
                        testroleName = roleName["name"];
                        console.log(testroleName);
                        // check if user has role Awesominaten
                        if (testroleName == role) {
                           console.log("Role " + role + " found");
                           check = 1;
                           break;
                        } else {
                          check = 2;
                        }
                        roleName = JSON.stringify(roleName);
                        //console.log(roleName);
                        i++;
                   }
      console.log(check);
		  if (check == 1) {
			result = 1;
			console.log(result);
		  } else {
			result = 0;
			console.log(result);

		  }
		 return result;
}

function getServerInfo(cmd_option, channelID) {
       console.log(cmd_option);

       var serverinfo = [];

       //con.connect(function(err) {
       // if (err) throw err;
        console.log("Connected!");
            // con.query("SELECT * FROM serverinfo WHERE name='" + cmd_option +"'", function (err, result, fields, serverinfo) {
              if (err) throw err;
              //console.log(result);
              var serverinfo_rows = [ 'Servername: ' , 'Spielname: ' , 'Mods: ' , 'Maximale Spieleranzahl: ' , 'FQDN: ' , 'IP Adresse: ' , 'Port: ' , 'Server User: ' , 'Server User Password: '];
              var tablespaces = [ 'name' , 'game_name' ,'max_player_count' , 'fqdn' , 'ipaddress' , 'port' , '']
              //serverinfo.forEach(function(item, index, array){
              //  console.log(item, index);
              bot.sendMessage({to: channelID, message: serverinfo_rows[0] + result[0].name + "\n" + serverinfo_rows[1] + result[0].game_name + "\n" + serverinfo_rows[2] + result[0].mods + "\n" + serverinfo_rows[3] + result[0].max_player_count + "\n" +
                  serverinfo_rows[4] + result[0].fqdn + "\n" + serverinfo_rows[5] + result[0].ipaddress + "\n" + serverinfo_rows[6] + result[0].port + "\n" + serverinfo_rows[7] + result[0].serveruser + "\n" + serverinfo_rows[8] + result[0].serveruserpassword });
            //  bot.sendMessage({to: channelID, message: "Servername: " + result[0].name });


          //    bot.sendMessage({to: channelID, message: "Spielname: " + result[0].game_name });
            //  bot.sendMessage({to: channelID, message: "Maximale Spieleranzahl: " + result[0].max_player_count });
          //    bot.sendMessage({to: channelID, message: "FQDN: " + result[0].fqdn });
          //    bot.sendMessage({to: channelID, message: "IP Adresse: " + result[0].ipaddress });
          //    bot.sendMessage({to: channelID, message: "Port: " + result[0].port });
          //    bot.sendMessage({to: channelID, message: "Server User: " + result[0].serveruser });
          //    bot.sendMessage({to: channelID, message: "Server User Password: " + result[0].serveruserpassword });

            });

      //});



 	    return 0;
}
