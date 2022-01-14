/** @param {import(".").NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	var target = '';
	if (ns.args[0] == undefined) { target=ns.getHostname() } else { target = ns.args[0] };
	
	var maxMoney = ns.getServerMaxMoney(target) * .85;
	var maxSecurity = ns.getServerMinSecurityLevel(target) + 5;
	var loopCNT = 1;
	var srvSec = 0;
	var curMoney = 0;
	while (true) {
		ns.clearLog();
		srvSec = ns.getServerSecurityLevel(target);
		curMoney = ns.getServerMoneyAvailable(target);
		if (Math.floor(srvSec) > maxSecurity) {
			ns.print("Target Security Too High: Weakening (" + srvSec + "/" + maxSecurity)
			ns.print("Loop: " + loopCNT);
			await ns.weaken(target);

		} else if (maxMoney >= curMoney) {
			ns.print("Server is too poor: Growing (" + curMoney + "/" + maxMoney);
			ns.print("Loop: " + loopCNT);
			await ns.grow(target);

		} else {
			ns.print("Server is RIPE!: Hacking");
			ns.print("Loop: " + loopCNT);
			await ns.hack(target);
		}

		loopCNT++
	}

}