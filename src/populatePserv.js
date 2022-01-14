/** @param {import(".").NS} ns **/
export async function main(ns) {
	const pList = ns.getPurchasedServers();
	var varPRAM = 0;
	var varPRAMLast = 0;

	while (true) {
		varPRAM = 0;
		for (let i = 0; i < pList.length; i++) {
			varPRAM += ns.getServerMaxRam(pList[i]);

		}
		if (varPRAM > varPRAMLast && varPRAM < (1048576 * 25)) {
			for (let i = 0; i < pList.length; i++) {
				ns.killall(pList[i]);
				varPRAMLast = varPRAM
			}
		} else if (varPRAM == (1048576 * 25)) {
			for (let i = 0; i < pList.length; i++) {
				ns.killall(pList[i]);
				ns.tprint(`Killed Pserv Processes: Final`)
			}
			return 0;
		}
		await ns.sleep(60000);
	}
}