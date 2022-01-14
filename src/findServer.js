/** @param {import(".").NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	var src = ns.getHostname();
	var tgt = ns.args[0];
	var servers = {};
	var queue = [src];
	var route = [tgt];
	var ptr = tgt;

	servers[src] = "START"

	while (queue.length) {



		var s = queue.pop();


		var links = ns.scan(s);
		for (var i = 0; i < links.length; i++) {
			if (!servers[links[i]]) {
				queue.push(links[i]);
				servers[links[i]] = s;
			}
		};
		await ns.sleep(10);
	}

	while (ptr != src) {
		ptr = servers[ptr];
		route.push(ptr);
		await ns.sleep(10);
	}
	route.pop();

	ns.print(route.reverse());
	ns.tprint(route.reverse());
}
