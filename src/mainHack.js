/** @param {import(".").NS} ns **/

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
		if (sList[i].substring(0, 6) !== 'pserv-' && sList.length > 0) {
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

	ns.disableLog('ALL');
	var scrHack = 'easyHack.js';
	var freeMem = 0
	var scrHackMem = ns.getScriptRam(scrHack);
	var threadLimit = 1000;
	var threadCap = 5;
	var homeRam = 0;
	var hackLvl = 0;
	var lastHack = 0;
	var curSVR = [];
	var curSVRName = '';
	var curSVRRoot = '';
	var curSVRMinHack = 0;
	var curSVRPorts = 0;
	var curSVRMoney = 0;
	var curSVRGrowth = 0;
	var curSVRMaxRam = 0;
	var curSVRUsedRam = 0;
	var vHacks = [0, 0, 0, 0, 0];
	var vHacksName = ['BruteSSH.exe', 'FTPCrack.exe', 'HTTPWorm.exe', 'SQLInject.exe', 'relaySMTP.exe'];
	var pList = [];
	var maxThreads = 0;
	var anotherThread = 0
	var tList = [];
	// from highest to lowest
	var vHighValue = ['ecorp', 'fulcrumtech', 'megacorp', 'nwo', 'blade', '4sigma', 'kuai-gong', 'defcomm', 'powerhouse-fitness', 'clarkinc', 'b-and-a', 'omnia', 'omnitek', 'stormtech', 'infocomm', 'univ-energy', 'taiyang-digital', 'aerocorp', 'galactic-cyber', 'icarus', 'global-pharm', 'microdyne', 'applied-energetics', 'helios', 'vitalife', 'deltaone', 'nova-med', 'solaris', 'zeus-med', 'titan-labs', 'unitalife', 'zb-def', 'zb-institute', 'snap-fitness', 'lexo-corp', 'syscore', 'alpha-ent', 'rho-construction'];
	var threads = 1;
	var ramAvailable = 0;
	var ramNeeded = 0;
	var hackCNT = 0;
	var currentdate = new Date();
	var datetime = "Last Sync:  @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var hackLastLvl = 0;
	var homeUsed = 0
	var logText = ''
	var serverCNT = 0
	var looper = 0
	var hackable = false;

	while (true) {
		var logText = ''
		//sList = list_servers(ns);
		var sList = list_servers(ns);
		homeRam = ns.getServerMaxRam('home');
		hackLvl = ns.getHackingLevel();

		if (hackLvl > (hackLastLvl + 100) || (homeRam - ns.getServerUsedRam('home') - 100) / homeRam > .25) {
			if (!ns.isRunning('populateHome.js', 'home')) {

				hackLastLvl = Math.floor((hackLvl / 100)) * 100;
				ns.run('killSCRIPT.js', 1, 'home', scrHack)
				ns.print(`Killing all currently running ${scrHack} scripts on Home`);
				var logText = logText + `Killing all currently running ${scrHack} scripts on Home`
				await ns.sleep(5000);
				ns.run('populateHome.js', 1);
			} else {
				ns.print(`Error: home is already being repopulated. H: ${hackLvl} || L: ${hackLastLvl}`)
				var logText = logText + `\n` + `Error: home is already being repopulated. H: ${hackLvl} || L: ${hackLastLvl}`
			};

		}

		// Load Available Hacks
		hackCNT = 0
		for (let g = 0; g < 5; g++) {
			if (ns.fileExists(vHacksName[g])) { vHacks[g] = 1; hackCNT++ } else { vHacks[g] = 0 };

		}
		ns.print(`${hackCNT} hacks loaded...`)
		var logText = logText + `\n` + `${hackCNT} hacks loaded...`
		//ns.tprint('Current Server List\n------------------------------------')
		//ns.tprint(sList);
		ns.print(`Processing Individual Game Servers...`)
		var logText = logText + `\n` + `Processing Individual Game Servers...`
		for (let i = 0; i < sList.length; i++) {
			freeMem = homeRam - ns.getServerUsedRam('home') - 100;
			curSVR = sList[i];
			//ns.tprint(`Checking: ${curSVR}`);
			//populate server details

			if (typeof curSVR !== 'undefined' && curSVR.length > 0) {
				curSVRName = curSVR[0];
				curSVRRoot = curSVR[1];
				curSVRMinHack = curSVR[3];
				curSVRPorts = curSVR[2];
				curSVRMoney = curSVR[4];
				curSVRGrowth = curSVR[5];
				curSVRUsedRam = ns.getServerUsedRam(curSVRName);
				curSVRMaxRam = ns.getServerMaxRam(curSVRName);
				//ns.tprint(`Checking: ${curSVRName} // Root: ${curSVRRoot} // `);
				//Let each server run it's own script

				if (curSVRRoot && curSVRMoney > 0 && curSVRMinHack < hackLvl) {

					// we've nuked the server

					threads = Math.floor(curSVRMaxRam / scrHackMem);
					// if the server has money, copy then run the script with max threads available at itself.
					if (threads >= 1 && curSVRUsedRam == 0) {
						await ns.scp(scrHack, 'home', curSVRName);
						ns.exec(scrHack, curSVRName, threads, curSVRName);
						ns.tprint(`// Host: ${curSVRName} // Script: ${scrHack} // ${threads} Threads`)
						ns.print(`// Host: ${curSVRName} // Script: ${scrHack} // ${threads} Threads`)
						var logText = logText + `\n` + `// Host: ${curSVRName} // Script: ${scrHack} // ${threads} Threads`
					};



				} else if (curSVRPorts <= hackCNT) {
					// we don't have root yet
					//ns.tprint(`4 S: ${curSVRName} :: ${curSVRRoot} :: P: ${curSVRPorts} :: H: ${curSVRMinHack}/${hackLvl}`)
					if (hackLvl >= curSVRMinHack) {
						if (vHacks[0] == 1) { ns.brutessh(curSVRName) };
						if (vHacks[1] == 1) { ns.ftpcrack(curSVRName) };
						if (vHacks[2] == 1) { ns.httpworm(curSVRName) };
						if (vHacks[3] == 1) { ns.sqlinject(curSVRName) };
						if (vHacks[4] == 1) { ns.relaysmtp(curSVRName) };

						ns.nuke(curSVRName);
						ns.print(`Nuked: ${curSVRName}`)
						ns.tprint(`Nuked: ${curSVRName}`)
						var logText = logText + `\n` + `Nuked: ${curSVRName}`
						if (curSVRMoney > 0) {
							threads = Math.floor(curSVRMaxRam / scrHackMem);
							// if the server has money, copy then run the script with max threads available at itself.
							if (threads >= 1) {
								await ns.scp(scrHack, 'home', curSVRName);
								ns.exec(scrHack, curSVRName, threads, curSVRName);
								ns.print(`// Host: ${curSVRName} // Script: ${scrHack} // ${threads} Threads`)
								ns.tprint(`// Host: ${curSVRName} // Script: ${scrHack} // ${threads} Threads`)
								var logText = logText + `\n` + `// Host: ${curSVRName} // Script: ${scrHack} // ${threads} Threads`
								await ns.sleep(100)
							};
						}
					}

				}


			}
		}
		//ns.tprint('-----------------------------------------------------')
		// End Hack Spread 
		// ns.tprint(`Completed Game Server Run...`);
		// Start Player Server Hack Spread
		pList = ns.getPurchasedServers();
		var tList = list_servers(ns);
		var y = 0
		if (pList.length > 0 && (hackLvl - lastHack) >= 100) {
			serverCNT = 0
			for (let hh = 0; hh < tList.length; hh++) {
				curSVR = tList[hh]
				if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(curSVR[0]) && ns.getServerMaxMoney(curSVR[0]) > 0 && ns.hasRootAccess(curSVR[0])) {
					serverCNT++
				}

			}
			ns.tprint(`Killing PSERVs for repopulation: ${hackLvl}/${lastHack}`);
			ns.print(`Killing PSERVs for repopulation: ${hackLvl}/${lastHack}`);
			var logText = logText + `\n` + `Killing PSERVs for repopulation: ${hackLvl}/${lastHack}`
			for (let uu = 0; uu < pList.length && uu < 2; uu++) {
				ns.killall(pList[uu]);
			}
			ns.print(`Hackable Servers: ${serverCNT}`)
			var logText = logText + `\n` + `Hackable Servers: ${serverCNT}`

			// Populate pserv 0-1
			for (let j = 0; j < pList.length && j < 2; j++) {

				curSVRUsedRam = ns.getServerUsedRam(pList[j]);
				curSVRMaxRam = ns.getServerMaxRam(pList[j]);
				maxThreads = Math.floor((curSVRMaxRam - curSVRUsedRam) / serverCNT);
				if ((curSVRUsedRam / curSVRMaxRam) <= .5) {

					await ns.scp(scrHack, 'home', pList[j]);
					for (let s = 0; s < tList.length; s++) {
						curSVR = tList[s];
						if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(curSVR[0]) && ns.getServerMaxMoney(curSVR[0]) > 0 && ns.hasRootAccess(curSVR[0])) {
							threads = Math.floor(maxThreads / 40)

							for (let xx = 0; xx < 40; xx++) {
								//ns.tprint(`starting ${scrHack}, ${pList[j]},${threads},${curSVR[0]},${xx}`)
								await ns.sleep(50)
								await ns.exec(scrHack, pList[j], threads, curSVR[0], xx)
							}
						}

					}

				}


			}
			ns.print(`Finished Populating PSERV 0/1`)
			var logText = logText + `\n` + `Finished Populating PSERV 0/1`
			lastHack = hackLvl;
		} else if (pList.length > 0 && (hackLvl - lastHack) < 100) {
			ns.print(`Last hack below 100, Skipping pserv populate`)
			var logText = logText + `\n` + `Last hack below 100, Skipping pserv populate`
		} else {
			ns.print(`No purchased servers found`)
			var logText = logText + `\n` + `No purchased servers found`
		}

		
		// Populate pserv 2-24
		//ns.tprint(`Onto 2+ Plist: ${pList.length}`)
		for (let rr = 2; rr < pList.length; rr++) {
			if (ns.getServerUsedRam(pList[rr]) == 0) {
				hackable = true;
			}
		}


		for (let j = 2; j < pList.length && hackable; j++) {
			//ns.tprint(`Working Plist: ${pList[j]}`)
			for (let f = 0; f < vHighValue.length; f++) {
				//ns.tprint(`Working HV: ${vHighValue[f]}`)
				if (j < pList.length) {
					if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(vHighValue[f]) && ns.getServerMaxMoney(vHighValue[f]) > 0 && ns.hasRootAccess(vHighValue[f])) {
						ns.killall(pList[j]);
						await ns.sleep(100);
						await ns.scp(scrHack, 'home', pList[j]);
						//ns.tprint(`copied ${scrHack} to ${pList[j]}`);
						await ns.run('sendIT.js', 1, scrHack, pList[j], vHighValue[f], threadLimit)
						ns.print(`HV Started:  ${pList[j]}, ${scrHack}, ${vHighValue[f]}, L: ${threadLimit}, C: ${threadCap} //`)
						var logText = logText + `\n` + `HV Started:  ${pList[j]}, ${scrHack}, ${vHighValue[f]}, L: ${threadLimit}, C: ${threadCap} //`
						await ns.sleep(100);
						j++;
					}
					if (f == (vHighValue.length - 1) && j < pList.length) {
						f = 0;
					}
				}
			}
		}
		ns.print(`Finished Populating PSERV 2+ (Hackable: ${hackable})`)
		var logText = logText + `\n` + `Finished Populating PSERV 2+ (Hackable: ${hackable})`





		//ns.tprint(`${datetime} :: Finished Populating PSERV`);
		//ns.tprint('-----------------------------------------------------')
		looper++;
		hackable = false;
		for (let gg = 0; gg < 60; gg++) {
			ns.clearLog();

			ns.print(logText + `\n${hackLvl}/${lastHack}\n` + `Run: ${looper} :: Sleeping for ${(60 - gg)} seconds.`);
			await ns.sleep(1000);

		}

	}
}