/** @param {NS} ns **/

function scan(ns, parent, server, list) {
	const children = ns.scan(server);
	for (let child of children) {
		if (parent == child) {
			continue;
		}
		list.push(child);

		scan(ns, server, child, list);
	}
}
export function list_servers(ns) {
	const sList = [];
	scan(ns, '', 'home', sList);
	var sProps = [];
	for (let i = 0; i < sList.length; i++) {
		if (sList[i].substring(0, 6) !== 'pserv-' && ns.getServerMaxMoney(sList[i]) !== 0) {
			sProps[i] = [sList[i],
			ns.hasRootAccess(sList[i]),
			ns.getServerNumPortsRequired(sList[i]),
			ns.getServerRequiredHackingLevel(sList[i]),
			ns.getServerMinSecurityLevel(sList[i]),
			ns.getServerMaxMoney(sList[i]),
			ns.getServerGrowth(sList[i])];
		}
	}
	//ns.tprint(sProps);
	return sProps;
}

export async function main(ns) {

	var scrapt = 'easyHack.js';
	var threadFactor = 100;
	var scriptRam = ns.getScriptRam(scrapt);

	var sList = list_servers(ns);
	var curSVRName = '';
	var curSVRRoot = '';
	var curSVRMinHack = 0;
	var curSVRPorts = 0;
	var curSVRMaxMoney;
	var homeRam = ns.getServerMaxRam('home') - ns.getServerUsedRam('home') - 100;
	
	var target = '';
	var maxThreads = 0;
	var threads = 0;
	var threadsLeft = 0;
	var threadsSVR = 0

	var hackDiff = 0;
	var hackLvl = ns.getHackingLevel();

	await ns.sleep(1000);
	maxThreads = Math.floor((homeRam / scriptRam));
	threadsLeft = maxThreads;
	if (homeRam < (100 * scriptRam)) {
		ns.tprint(`Not enough ram on home machine, min: ${scriptRam * 500}`)
	} else {

		for (let i = 0; i < sList.length; i++) {

			if (sList[i] !== undefined) {
				var curSVR = sList[i];

				curSVRName = curSVR[0];
				curSVRRoot = curSVR[1];
				curSVRPorts = curSVR[2];
				curSVRMinHack = curSVR[3];
				curSVRMaxMoney = curSVR[5];

				if (curSVRMinHack <= 200) { hackDiff = 2 }
				else if (curSVRMinHack <= 500) { hackDiff = 3 }
				else if (curSVRMinHack <= 750) { hackDiff = 4 }
				else { hackDiff = 5 };
				target = curSVRName;

				threads = threadFactor * hackDiff;

				if (hackLvl < curSVRMinHack) { continue } else {
					if (curSVRMinHack <= hackLvl && curSVRRoot && curSVRMaxMoney > 0) {
						threadsLeft = Math.floor(maxThreads / 75);
						threadsSVR = Math.ceil(threadsLeft / threads);
						if (false) {
							ns.tprint(`${curSVRName} = Home Ram: ${ns.getServerMaxRam('home')}`);
							ns.tprint(`${curSVRName} = Used Ram: ${ns.getServerUsedRam('home')}`);
							ns.tprint(`${curSVRName} = Max Ram: ${homeRam} :: (minus ram used - 100)`);
							ns.tprint(`${curSVRName} = Script:  ${scriptRam}`);
							ns.tprint(`${curSVRName} = Max Threads: ${maxThreads} :: ${maxThreads/75}`);
							ns.tprint(`${curSVRName} = ThreadsLeft: ${threadsLeft}`);
							ns.tprint(`${curSVRName} = Threads: ${threads}`);
							ns.tprint(`${curSVRName} = Ceiling: ${threadsSVR}`);
							return 0;
						}

						for (let x = 0; x < threadsSVR; x++) {
							if (threads > threadsLeft) { threads = threadsLeft };
							await ns.run(scrapt, threads, target, x)
							threadsLeft -= threads;
							await ns.sleep(100);
						}



					}
				}
			}






		}
	}
	ns.tprint(`Finished Populating Home`)
}