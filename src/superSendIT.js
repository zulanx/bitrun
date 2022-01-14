/** @param {import(".").NS} ns **/
export async function main(ns) {

	if (ns.args.length !== 1) {
		ns.tprint(`Incorrect Number of arugments supplied.\nex. run superSendIT.js <target>`)
		return 0;
	} else {

		const pServ = ns.getPurchasedServers();

		var target = ns.args[0];

		for (let i = 0; i < pServ.length; i++) {
			ns.killall(pServ[i]);
			await ns.sleep(100);
			ns.run('sendIT.js',1,'easyHack.js',pServ[i], target,1000,i);
		}
	}
}