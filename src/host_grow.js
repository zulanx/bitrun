/** @param {import(".").NS} ns **/
export async function main(ns) {
	while (true) { await ns.grow(ns.getHostname()) };
}