/** @param {import(".").NS} ns **/
export async function main(ns) {
	var vRAN = false;
	var homeMoney = 0;
	ns.run('mainHack.js',1);
	while (true) {
		homeMoney = ns.getServerMoneyAvailable('home');
		if (homeMoney>15000000000 && !vRAN) {
			ns.run('purchaseServer.js',1)
			vRAN = true;
		} else if ( homeMoney >=57671680000) {
			ns.kill('purchaseServer.js','home');
			ns.run('purchaseServer.js',1);
			return 0;
		}
		await ns.sleep(60000);
	}
}