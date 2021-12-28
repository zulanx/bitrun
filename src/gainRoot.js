/** @param {NS} ns **/
export async function main(ns) {
	var scrapt = "easyHack.js";
	var attackTarget = ns.args[1];
	var target = ns.args[0];
	var threads = Math.floor( ns.getServerMaxRam(target) / ns.getScriptRam(scrapt));
	
	if (ns.fileExists("BruteSSH.exe")) { await ns.brutessh(target) };
	if (ns.fileExists("FTPCrack.exe")) { await ns.ftpcrack(target) };
	if (ns.fileExists("HTTPWorm.exe")) { await ns.httpworm(target) };
	if (ns.fileExists("SQLInject.exe")) { await ns.sqlinject(target) };
	if (ns.fileExists("relaySMTP.exe")) { await ns.relaysmtp(target) };

	await ns.nuke(target);
	ns.tprint(target + " Nuked");

	await ns.scp(scrapt,"home",target);
	ns.tprint(scrapt+" File Copied to: "+target);
	
	await ns.exec(scrapt,target,threads,attackTarget);
	ns.tprint("Target: "+attackTarget+"\nScript Started: "+threads+" Threads");
	
	return "complete"
}