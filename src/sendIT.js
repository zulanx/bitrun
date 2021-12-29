/** @param {NS} ns **/
export async function main(ns) {


	if (ns.args.length < 3) {
		ns.tprint('Incorrect number of arguments.\nex. run sendIT.js easyhack.js pserv-1 n00dles')
		
	} else { 
		var scrapt = ns.args[0];
		var hostname = ns.args[1];
		var target = ns.args[2];
		var threads = 1;
		var memScrapt = ns.getScriptRam(scrapt);
		
		if (!ns.fileExists(scrapt)) { ns.tprintf(`File: ${scrapt} doesn't exsist, exiting.`); return 0};
		if (!ns.hasRootAccess(hostname)) {ns.tprintf(`No Root on Host: ${hostname}`); return 0};
		if (!ns.hasRootAccess(target)) {ns.tprintf(`No Root on Target: ${target}`); return 0};

		threads = Math.floor(ns.getServerMaxRam(hostname) / memScrapt);

		if (threads < 1) { threads = 1 };
		
		await ns.scp(scrapt, 'home', hostname);
		
		ns.exec(scrapt, hostname, threads, target);
		ns.tprint('Success! Started: ' + hostname + ' :: ' + threads + ' threads. :: Target: ' + target)
	}
}