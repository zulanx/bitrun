/** @param {import(".").NS} ns **/

export async function main(ns) {
	var depth = 3;
	var target = ns.args[0];
	var scrapt = ns.args[1];
	var memScrapt = 0;
	var threads = 1;
	var hostname = '';
	var skippedServers = 'Skipped Servers: ';

	if (ns.args.length < 2) { ns.tprint('Please provide target and script\nex. \'run spreadIT.js n00dles easyHack.js\n\''); return 0; }


	var hTools = ['BruteSSH.exe', 'FTPCrack.exe', 'HTTPWorm.exe', 'SQLInject.exe', 'relaySMTP.exe'];
	var hToolsIndex = [];
	var vHacks = 0;

	for (let h = 0; h < hTools.length; h++) {
		if (ns.fileExists(hTools[h])) { hToolsIndex[h] = 1; vHacks++ } else { hToolsIndex[h] = 0 };
	}
	ns.tprint('Checked for hacking tools available.');

	var srv = [];
	srv = ns.scan('home');

	for (let i = 0; i < srv.length; i++) {
		var hostname = srv[i];
		var newscan = ns.scan(hostname);
		for (let j = 0; j < newscan.length; j++) {
			if (srv.indexOf(newscan[j]) == -1) {
				srv.push(newscan[j]);
			}
		}
	}


	ns.tprint('Network Mapped With ' + srv.length + ' servers.');


	memScrapt = ns.getScriptRam(scrapt);

	for (let k = 0; k < srv.length; k++) {
		if (srv[k] == 'home') { k++ };

		threads = 1;
		hostname = srv[k];

		ns.killall(hostname);
		//ns.tprint('Killing Scripts: ' + hostname);
		await ns.sleep(500)
		if ((ns.getServerNumPortsRequired(srv[k]) <= vHacks && ns.getServerRequiredHackingLevel(srv[k]) <= ns.getHackingLevel()) || hostname.substr(0, 6) == 'pserv-') {

			if (!ns.hasRootAccess(srv[k])) {

				if (hToolsIndex[0]) { ns.brutessh(hostname) };
				if (hToolsIndex[1]) { ns.ftpcrack(hostname) };
				if (hToolsIndex[2]) { ns.httpworm(hostname) };
				if (hToolsIndex[3]) { ns.sqlinject(hostname) };
				if (hToolsIndex[4]) { ns.relaysmtp(hostname) };

				ns.nuke(hostname);
			}

			threads = Math.floor(ns.getServerMaxRam(hostname) / memScrapt);
			if (threads == 0) { continue } else if (threads < 1) {threads = 1};
			await ns.scp(scrapt, 'home', hostname);
			ns.exec(scrapt, hostname, threads, target);
			ns.tprint('Success! Started: ' + hostname + ' :: ' + threads + ' threads. :: Target: ' + target)
			await ns.sleep(100);
		} else {

			skippedServers += hostname + ', '

		}
	}
	ns.tprint(skippedServers + '\nScript Completed!');
	await ns.sleep(1000)
	ns.kill('watchServer.js', 'home')
	ns.run('watchServer.js', 1, target);
}