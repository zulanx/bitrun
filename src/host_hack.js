/** @param {NS} ns **/
export async function main(ns) {
	while (true) { await ns.hack(ns.getHostname()) };
}