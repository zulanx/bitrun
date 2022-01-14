/** @param {import(".").NS} ns **/
export async function main(ns) {

	if (ns.args.length < 2) {
		ns.tprint(`Kills all running scripts on target matching script name\nex. 'run killSCRIPT.js home easyHack.js`);
	} else {
		var hostname = ns.args[0];
		var scrapt = ns.args[1];
		var psHost = ns.ps(hostname);
		var psCur = [];

		ns.scriptKill('easyHack.js', hostname);
	}

}