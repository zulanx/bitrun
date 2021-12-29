/** @param {NS} ns **/
export async function main(ns) {
	var scrapt = "easyHack.js";
	var attackTarget = ns.args[1];
	var target = ns.args[0];
	var threads = Math.floor( ns.getServerMaxRam(target) / ns.getScriptRam(scrapt));
	
	await ns.killall(target);
	await ns.sleep(1000);
	
	if (ns.fileExists("BruteSSH.exe")) { ns.brutessh(target) };
	if (ns.fileExists("FTPCrack.exe")) { ns.ftpcrack(target) };
	if (ns.fileExists("HTTPWorm.exe")) { ns.httpworm(target) };
	if (ns.fileExists("SQLInject.exe")) { ns.sqlinject(target) };
	if (ns.fileExists("relaySMTP.exe")) { ns.relaysmtp(target) };

	if (!ns.hasRootAccess) { await ns.nuke(target); ns.tprint(target + " Nuked")};
	
	await ns.scp(scrapt,"home",target);
	ns.tprint(scrapt+" File Copied to: "+target);
	
	await ns.exec(scrapt,target,threads,attackTarget);
	ns.tprint("Target: "+attackTarget+"\nScript Started: "+threads+" Threads");
	
	return "complete"
}