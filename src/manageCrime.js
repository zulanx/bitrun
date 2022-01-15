/** @param {import(".").NS} ns **/

export async function main(ns) {
	var player = ns.getPlayer();
	ns.tprint(player)
	ns.tprint(`Tor: ${player.tor}`)
}