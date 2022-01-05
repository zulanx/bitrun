/** @param {NS} ns **/
export async function main(ns) {


	if (ns.args.length < 3) {
		ns.tprint('Incorrect number of arguments.\nex. run sendIT.js easyhack.js pserv-1 n00dles');

	} else {
		var scrapt = ns.args[0];
		var hostname = ns.args[1];
		var target = ns.args[2];
		var threads = 1;
		var maxThreads = 1;
		var threadLimit = ns.args[3];
		var memScrapt = ns.getScriptRam(scrapt);
		var looper = 0;
		var threadCNT = 0;

		if (!ns.fileExists(scrapt)) { ns.tprintf(`File: ${scrapt} doesn't exsist, exiting.`); return 0 };
		if (!ns.hasRootAccess(hostname)) { ns.tprintf(`No Root on Host: ${hostname}`); return 0 };
		if (!ns.hasRootAccess(target)) { ns.tprintf(`No Root on Target: ${target}`); return 0 };

		maxThreads = Math.floor(ns.getServerMaxRam(hostname) / memScrapt);
		await ns.scp(scrapt, 'home', hostname);
		//ns.tprint(`Sending Payload: ${scrapt} to ${hostname}`);

		if (threadLimit == undefined) { threadLimit = 1 };
		while (maxThreads > 0) {
			if (maxThreads < 1) {
				threads = 1
				maxThreads = 0;
			} else if (maxThreads <= threadLimit) {
				threads = maxThreads;
				maxThreads = 0;
			} else {
				maxThreads -= threadLimit;
				threads = threadLimit;
			}

			ns.exec(scrapt, hostname, threads, target, looper);
			threadCNT += threads;
			
			looper++;
		}
		ns.tprint(`Success! Started: ${hostname} :: ${threadCNT} threads. :: Target: ${target}`);
	}
}