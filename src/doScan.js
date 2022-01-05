/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('ALL');
	var depth = 3;
	var target = '';
	var scrapt = ns.args[1];
	var memScrapt = 0;
	var threads = 1;
	var hostname = ns.args[0];
	var skippedServers = 'Hacked Servers: ';
	var maxThreads = 1;
	var threadLimit = ns.args[2];
	var looper = 0;

	if (ns.args.length < 3) { ns.tprint('Please provide target and script\nex. \'run doScan.js pserv-1 easyHack.js 500\n\''); return 0 };


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


	memScrapt = ns.getScriptRam(scrapt);

	for (let k = 0; k < srv.length; k++) {
		if (srv[k] == 'home') { k++ };

		threads = 1;
		target = srv[k];



		await ns.sleep(500);
		if ((ns.getServerNumPortsRequired(srv[k]) <= vHacks && ns.getServerRequiredHackingLevel(srv[k]) <= ns.getHackingLevel()) || hostname.substr(0, 6) == 'pserv-') {

			if (!ns.hasRootAccess(srv[k])) {

				if (hToolsIndex[0]) { ns.brutessh(target) };
				if (hToolsIndex[1]) { ns.ftpcrack(target) };
				if (hToolsIndex[2]) { ns.httpworm(target) };
				if (hToolsIndex[3]) { ns.sqlinject(target) };
				if (hToolsIndex[4]) { ns.relaysmtp(target) };

				ns.nuke(target);
				ns.tprint(`Nuking ${target}.`);
				maxThreads = Math.floor(ns.getServerMaxRam(hostname) / memScrapt);
				ns.tprint(`${hostname} Max Threads: ${maxThreads} // Limit Per Instance: ${threadLimit}`);
				await ns.scp(scrapt, 'home', hostname);
				ns.tprint(`${scrapt} copied to ${hostname}`)
				ns.killall(hostname);
				while (maxThreads > 0) {

					if (maxThreads <= 1) {
						threads = 1; maxThreads = 0
					} else if (maxThreads > threadLimit) {
						maxThreads -= threadLimit;
						threads = threadLimit;
					} else {
						threads = maxThreads;
						maxThreads = 0
					}
					skippedServers += target + ', '
					ns.exec(scrapt, hostname, threads, target, looper);
					ns.tprint('Success! Started: ' + hostname + ' :: ' + threads + ' threads. :: Target: ' + target)
					looper++;
					await ns.sleep(500);
				}


			}
		}
	}
	ns.tprint(skippedServers + '\nScript Completed!');
	await ns.sleep(1000);
}