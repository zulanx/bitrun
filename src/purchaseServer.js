/** @param {import(".").NS} ns **/
export async function main(ns) {
	var scraptTarget = '';
	if (ns.args.length == 1) {scraptTarget = ns.args[0]} else {scraptTarget = 'n00dles'}; 
	var ramToBuy=16;
	var pServer = "";
	const serverCostMulti = ns.getPurchasedServerCost(16) / 16;
	const maxNumServers = ns.getPurchasedServerLimit();
	const maxMoney = ns.getServerMoneyAvailable('home');
	const maxRAM = ns.getPurchasedServerMaxRam('home');
	var scrapt = 'sendIT.js';
	

	var theChoice = false; //await ns.prompt('Execute ' + scrapt + ' after purchse of new server?');

	if (maxMoney > serverCostMulti * ramToBuy) {
		ramToBuy *= 2;
		while (maxMoney > serverCostMulti * ramToBuy) {
			ramToBuy *= 2;
		}
		ramToBuy /= 2;
	}
	if (ramToBuy > maxRAM) { ramToBuy = maxRAM };
	ns.print('Calculated: ' + ramToBuy + 'GB RAM for ' + serverCostMulti * ramToBuy + '$')

	const serverCost = ns.getPurchasedServerCost(ramToBuy);

	var i = 0;

	while (i < maxNumServers){
		if (ns.getServerMoneyAvailable('home') > serverCost) {
			if (!ns.serverExists('pserv-' + i) || ns.getServerMaxRam('pserv-' + i) < ramToBuy) {
				if (ns.serverExists('pserv-' + i)) {
					ns.killall('pserv-'+i);
					await ns.sleep(1000);
					ns.tprint('Killing Server: pserv-' +i)
					ns.deleteServer('pserv-'+i);
					await ns.sleep(1000);
				}
                if (!ns.serverExists('pserv-' + i)) {
                    pServer = ns.purchaseServer('pserv-' + i, ramToBuy);
                    if (pServer) {

                        ns.tprint('Bought player server #' + i + ' with ' + ramToBuy + ' GB RAM for $' + serverCostMulti * ramToBuy);
                        if (theChoice) {
							ns.tprint('Starting ' + scrapt + ' on pserv-'+i + ' agaisnt ' + scraptTarget);
							ns.run(scrapt,1,'easyHack.js','pserv-'+i,scraptTarget);
						}
						++i;
                    }
                }
                await ns.sleep(100);
            } else {
                ++i;
                await ns.sleep(100);
            }
        }
        await ns.sleep(100);
    }
}