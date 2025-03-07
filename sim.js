var fs = require('fs');

var BattleTextStream = require('./dist/sim/battle-stream.js').BattleTextStream;
var Streams = require('./dist/lib/streams');
var stdin = Streams.stdin();
var stdout = Streams.stdout();

var args = process.argv.slice(3);

var options = args.flatMap(function (arg) {
	if (arg.charAt(0) !== '-') {
		if (arg) console.error("Invalid parameter: " + arg);
		return [];
	} else if (arg.charAt(1) === '-') {
		return arg.slice(2);
	} else {
		return Array.from(arg.slice(1));
	}
});

var debug = false;
var replay = false;
var spectate = false;
for (var i = 0; i < options.length; i++) {
	switch (options[i]) {
	case 'debug': case 'D':
		debug = true;
		break;
	case 'replay': case 'R':
		replay = true;
		break;
	case 'spectate': case 'spectator': case 'S':
		replay = true;
		spectate = true;
		break;
	default:
		console.error("Invalid option: " + options[i]);
		break;
	}
}

var battleStream = new BattleTextStream({
	noCatch: true,
	debug: debug,
	replay: spectate ? 'spectator' : replay,
});
stdin.pipeTo(battleStream);
battleStream.pipeTo(stdout);