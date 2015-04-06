exports.commands = {
        //just for the lols 
        dance: function(target, room, user) {
                if (!this.canBroadcast()) return;
                this.sendReply('|html| <marquee behavior="alternate" scrollamount="3"><b><img src=http://i196.photobucket.com/albums/aa279/loganknightphotos/wobbuffet-2.gif>WOBB<img src=http://i196.photobucket.com/albums/aa279/loganknightphotos/wobbuffet-2.gif>WOBB<img src=http://i196.photobucket.com/albums/aa279/loganknightphotos/wobbuffet-2.gif></b></marquee>');
        },

        sleeping: 'away',
        eating: 'away',
        studying: 'away',
        anime: 'away',
        gaming: 'away',
        afk: 'away',
        away: function(target, room, user, connection, cmd) {
                var isAway;
                var awaynames = ['- ⓈⓁⒺⒺⓅⒾⓃⒼ', '- ⒺⒶⓉⒾⓃⒼ', '- ⓈⓉⓊⒹⓎⒾⓃⒼ', '- ⒶⓃⒾⓂⒺ', '- ⒼⒶⓂⒾⓃⒼ', ' - ⒶⓌⒶⓎ'];
                for (var i = 0; i < awaynames.length; i++) {
                        if (user.name.indexOf(awaynames[i]) > -1) isAway = true;
                }
                if (!isAway) {
                        switch (cmd) {
                                case 'sleeping':
                                        var awayMessage = 'is now sleeping. Nite!';
                                        var awayName = '- ⓈⓁⒺⒺⓅⒾⓃⒼ';
                                        break;
                                case 'eating':
                                        var awayName = '- ⒺⒶⓉⒾⓃⒼ';
                                        if (!target) target = 'eating';
                                        break;
                                case 'studying':
                                        var awayMessage = 'is now studying.';
                                        var awayName = '- ⓈⓉⓊⒹⓎⒾⓃⒼ';
                                        break;
                                case 'anime':
                                        var awayMessage = 'is now watching anime.';
                                        var awayName = '- ⒶⓃⒾⓂⒺ';
                                        break;
                                case 'gaming':
                                        var awayMessage = 'is now gaming.';
                                        var awayName = '- ⒼⒶⓂⒾⓃⒼ';
                                        break;
                                default:
                                        var awayName = ' - ⒶⓌⒶⓎ';
                        }

                        if (this.can('warn') && user.getIdentity(room.id).indexOf('!') === -1 && user.getIdentity().indexOf('‽') === -1) {
                                var target2 = '(' + target + ')';
                                if (!awayMessage) {
                                        if (target.length < 1) {
                                                this.add('|html|<b>- <font color = ' + color.get(user.userid) + '>' + user.name + '</font></b> is now away.');


                                        } else {
                                                this.add('|html|<b>- <font color = ' + color.get(user.userid) + '>' + user.name + '</font></b> is now away. ' + target2);
                                        }
                                } else {
                                        this.add('|html|<b>- <font color = ' + color.get(user.userid) + '>' + user.name + '</font></b> ' + awayMessage);
                                }
                        }
                        var newname = user.name + awayName;
                        user.forceRename(newname, undefined, true);
                        user.blockChallenges = true;

                } else {
                        return this.sendReply("You have already been set as away.");
                }
        },

stafflist: function (target, room, user, connection) {
var rankLists = {};
for (var userid in Users.usergroups) {
var group = Users.usergroups[userid].substr(0, 1);
if (!rankLists[group]) rankLists[group] = [];
rankLists[group].push(userid);
}
var buffer = [];
Object.keys(rankLists).sort(function (a, b) {
return Config.groups[b].rank - Config.groups[a].rank;
}).forEach(function (r) {
buffer.push(Config.groups[r].name + "s (" + r + "):\n" + rankLists[r].sort().join(", "));
});
if (!buffer.length) return this.sendReply("This server has no staff.");
connection.popup(buffer.join("\n\n"));
},


        unafk: 'back',
        back: function(target, room, user) {
                var awaynames = ['- ⓈⓁⒺⒺⓅⒾⓃⒼ', '- ⒺⒶⓉⒾⓃⒼ', '- ⓈⓉⓊⒹⓎⒾⓃⒼ', '- ⒶⓃⒾⓂⒺ', '- ⒼⒶⓂⒾⓃⒼ', ' - ⒶⓌⒶⓎ'];
                for (var i = 0; i < awaynames.length; i++) {
                        if (user.name.indexOf(awaynames[i]) > -1) {
                                originalname = user.name.substring(0, user.name.length - awaynames[i].length);
                                user.forceRename(originalname, undefined, true);
                                user.blockChallenges = false;
                                if (this.can('lock') && user.getIdentity(room.id).indexOf('!') === -1 && user.getIdentity().indexOf('‽') === -1)
                                        this.add('|html|<b>- <font color = ' + color.get(user.userid) + '>' + user.name + '</font></b> is back.');
                                break;
                        } else {
                                if (i == 5) return this.sendReply('You are not away.');
                                continue;
                        }
                }
        },

        model: 'sprite',
    sprite: function(target, room, user) {
        if (!this.canBroadcast()) return;
        var targets = target.split(',');
        target = targets[0].trim();
        target1 = targets[1];
        if (!toId(target)) return this.sendReply("/sprite [Pokémon], [shiny/back] - Shows the animated model of the specified Pokémon.");
        var clean = target.toLowerCase();
        if (target.toLowerCase().indexOf(' ') !== -1) {
            target = target.toLowerCase().replace(/ /g, '-');
        }
        //this won't interfere with the generation of yanmega's sprite, since it doesn't have any alternate animations.
        //It however DOES somewhat interfere with porygon2. So we're gonna make that one an exception.
        if (target.indexOf('mega') == -1 && toId(target) != 'porygon2') {
            if (target.lastIndexOf('-') > -1) {
                for (var i = 0; i <= target.lastIndexOf('-'); i++) {
                    var a = target.substring(0, target.lastIndexOf('-')).replace(/-/g, ' ');
                    break;
                }
            }
        }

        var correction = a ? Tools.dataSearch(a) : Tools.dataSearch(target);
        if (correction && correction.length) {
            for (var i = 0; i < correction.length; ++i) {
                if (correction[i].id !== target && !i) {
                    target = a ? target.replace(a, correction[0].id) : correction[0].name.toLowerCase();
                }
            }
        } else {
            return this.sendReply((a || clean) + ' is not a valid Pokémon.');
        }

        if (!target1) {
            var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            for (var x = 0; x < numbers.length; x++) {
                if (target.indexOf('-' + numbers[x]) > -1) {
                    return this.sendReply('|html|<img src = "http://www.pkparaiso.com/imagenes/xy/sprites/animados/' + target + '.gif">');
                }
            }
            return this.sendReply('|html|<img src = "http://play.pokemonshowdown.com/sprites/xyani/' + target + '.gif">');
        } else {
            if (toId(target1) === 'back') {
                return this.sendReply('|html|<img src = "http://play.pokemonshowdown.com/sprites/xyani-back/' + target.toLowerCase().trim().replace(/ /g, '-') + '.gif">');
            } else if (toId(target1) === 'shiny') {
                return this.sendReply('|html|<img src = "http://play.pokemonshowdown.com/sprites/xyani-shiny/' + target.toLowerCase().trim().replace(/ /g, '-') + '.gif">');
            } else {
                this.sendReply(target1 + ' is not a valid parameter.');
                var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                for (var x = 0; x < numbers.length; x++) {
                    if (target.indexOf('-' + numbers[x]) > -1) {
                        return this.sendReply('|html|<img src = "http://www.pkparaiso.com/imagenes/xy/sprites/animados/' + target + '.gif">');
                    }
                }
                return this.sendReply('|html|<img src = "http://play.pokemonshowdown.com/sprites/xyani/' + target + '.gif">');
            }
        }
    },
        
        //Made this command for the funsies. Use it for what you need, but don't blame me if your server gets deregistered by abusing it.
        forceuse: 'forcecommand', 
        forcecommand: function(target, room, user, connection, cmd) {
		if (!user.hasSysopAccess(connection)) return false;
	        if (!target) return this.sendReply('/forcecommand [user], [command] - Forcibly makes a user use a command.');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) return this.sendReply("User '"+this.targetUsername+"' not found.");
		if (!target) return this.sendReply("You need to specify a command that you want the chosen user to use.");
		target = target.trim().split(" ");
		var cmd = target[0].trim().toLowerCase();
		var cmdTarget = [];
		for (var i = 1; i < target.length; i++) cmdTarget.push(target[i]);
		cmdTarget = cmdTarget.join(" ").trim();
		if (cmd.indexOf('/') == 0 && cmd.charAt(1) != '/') {
		        if (!CommandParser.commands[cmd.substr(1)]) return this.sendReply("'"+cmd+"' is not a valid command.");
         		if (cmd.indexOf('/me') == 0 && !cmdTarget) return this.sendReply("'"+cmd+"' needs to have a target message.");
		        else if (cmd.indexOf('/me') == 0) return room.add('|c|'+targetUser.getIdentity()+'|'+cmd+' '+cmdTarget);
		        CommandParser.parse(cmd + ' ' + cmdTarget, room, Users.get(targetUser), Users.get(targetUser).connections[0]);
		} else {
		        return this.sendReply("'"+cmd+"' is not a command. Commands must start with '/', and cannot have another '/' consecutively after the first '/'.");
                }
	},		

        roomkick: 'kick',
        spank: 'kick',
        kick: function(target, room, user, connection, cmd) {
                if (!this.can('warn', null, room)) return false;
                if (!target) return this.sendReply('/kick [user], [reason] - Kicks a user from the room');

                target = this.splitTarget(target);
                var targetUser = this.targetUser;
                if (!targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
                if (!Rooms.rooms[room.id].users[targetUser.userid]) return this.sendReply(targetUser.name + ' is not in this room.');
                switch (cmd) {
                        case 'roomkick':
                        case 'kick':
                                if (target) {
                                        targetUser.popup('You have been kicked from room ' + room.title + ' by ' + user.name + '.\n\n' + target);
                                } else {
                                        targetUser.popup('You have been kicked from room ' + room.title + ' by ' + user.name + '.');
                                }
                                break;
                        case 'spank':
                                if (target) {
                                        targetUser.popup('You have been spanked out of the room ' + room.title + ' by ' + user.name + '.\n\n' + target);
                                } else {
                                        targetUser.popup('You have been spanked out of the room ' + room.title + ' by ' + user.name + '.');
                                }
                                break;
                }
                targetUser.leaveRoom(room);
                if (cmd == 'spank') room.add('|raw|' + targetUser.name + ' has been spanked out of the room by ' + user.name + '.');
                else room.add('|raw|' + targetUser.name + ' has been kicked from the room by ' + user.name + '.');
                this.logModCommand(user.name + ' kicked ' + targetUser.name + ' from ' + room.id);
        },
        lastseen: 'seen',
        seen: function(target, room, user) {
                if (!this.canBroadcast()) return;
                if (!target) return this.sendReply('You need to specify a user.');
                var lastSeen = datestuff.lastSeen(target);
                if (Users.get(target)) {
                        if (Users.get(target).connected) {
                                if (!Users.get(target).authenticated) return this.sendReplyBox('<font color = ' + color.get(toId(target)) + '><b>' + target + '</b></font> was last seen ' + lastSeen + ' ago.');
                                var lastSeen = datestuff.lastSeen(Users.get(target));
                                return this.sendReplyBox('<font color = ' + color.get(toId(target)) + '><b>' + Users.get(target).name + '</b></font> is currently <font color = "green"> online.</font> This user has stayed online for ' + lastSeen);
                        }
                }
                if (lastSeen === 'never') return this.sendReplyBox('<font color = ' + color.get(toId(target)) + '><b>' + target + '</b></font> has <font color = "red"> never </font> been seen online.');
                return this.sendReplyBox('<font color = ' + color.get(toId(target)) + '><b>' + target + '</b></font> was last seen ' + lastSeen + ' ago.');
        }
};
