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
	ns.disableLog('ALL');
	var scrHack = 'easyHack.js';
	var freeMem = 0
	var scrHackMem = ns.getScriptRam(scrHack);
	var threadLimit = 1000;
	var threadCap = 5;
	var homeRam = 0;
	var hackLvl = 0;
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
	var tList = [];
	// from highest to lowest
	var vHighValue = ['ecorp', 'fulcrumassets', 'fulcrumtech', 'megacorp', 'nwo', 'blade', '4sigma', 'kuai-gong', 'defcomm', 'powerhouse-fitness', 'clarkinc', 'b-and-a', 'omnia', 'omnitek', 'stormtech', 'infocomm', 'univ-energy', 'taiyang-digital', 'aerocorp', 'galactic-cyber', 'icarus', 'global-pharm', 'microdyne', 'applied-energetics', 'helios', 'vitalife', 'deltaone', 'nova-med', 'solaris', 'zeus-med', 'titan-labs', 'unitalife', 'zb-def', 'zb-institute', 'snap-fitness', 'lexo-corp', 'syscore', 'alpha-ent', 'rho-construction'];
	var threads = 1;
	var ramAvailable = 0;
	var ramNeeded = 0;
	var hackCNT = 0;
	var currentdate = new Date();
	var datetime = "Last Sync:  @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();


	while (true) {
		//sList = list_servers(ns);
		var sList = list_servers(ns);
		homeRam = ns.getServerMaxRam('home');
		hackLvl = ns.getHackingLevel();
		// Load Available Hacks
		hackCNT = 0
		for (let g = 0; g < 5; g++) {
			if (ns.fileExists(vHacksName[g])) { vHacks[g] = 1; hackCNT++ } else { vHacks[g] = 0 };

		}
		//ns.tprint('Current Server List\n------------------------------------')
		//ns.tprint(sList);
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
				if (curSVRRoot == true && curSVRMoney > 0 && curSVRMinHack < hackLvl) {
					// we've nuked the server

					threads = Math.floor(curSVRMaxRam / scrHackMem);
					// if the server has money, copy then run the script with max threads available at itself.
					if (threads >= 1 && curSVRUsedRam == 0) {
						await ns.scp(scrHack, 'home', curSVRName);
						ns.exec(scrHack, curSVRName, threads, curSVRName);
						ns.tprint(`// Host: ${curSVRName} // Script: ${scrHack} // ${threads} Threads`)
					};



				} else if (curSVRPorts <= hackCNT) {
					// we don't have root yet
					if (hackLvl >= curSVRMinHack) {
						if (vHacks[0] == 1) { ns.brutessh(curSVRName) };
						if (vHacks[1] == 1) { ns.ftpcrack(curSVRName) };
						if (vHacks[2] == 1) { ns.httpworm(curSVRName) };
						if (vHacks[3] == 1) { ns.sqlinject(curSVRName) };
						if (vHacks[4] == 1) { ns.relaysmtp(curSVRName) };

						ns.nuke(curSVRName);
						ns.tprint(`Nuked: ${curSVRName}`)
						if (curSVRMoney > 0) {
							threads = Math.floor(curSVRMaxRam / scrHackMem);
							// if the server has money, copy then run the script with max threads available at itself.
							if (threads >= 1) {
								await ns.scp(scrHack, 'home', curSVRName);
								ns.exec(scrHack, curSVRName, threads, curSVRName);
								ns.tprint(`// Host: ${curSVRName} // Script: ${scrHack} // ${threads} Threads`)
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
		for (let j = 0; j < pList.length; j++) {
			if (y >= tList.length) { y = 0; }
			if (j < 2) {
				//ns.tprint(`Made it into <4 :${j}: ${pList[j]}`);
				for (y; y < tList.length; y++) {
					if (j >= pList.length) { continue };
					curSVR = tList[y];
					//ns.tprint(curSVR);
					if (j < 2) {
						if (typeof curSVR !== 'undefined' && curSVR.length > 0) {
							curSVRUsedRam = ns.getServerUsedRam(pList[j]);
							curSVRMaxRam = ns.getServerMaxRam(pList[j]);


							//ns.tprint(`Checking: ${curSVR}`)
							//ns.tprint(curSVR[3] + '::Ram Needed: ' + (scrHackMem * threadLimit * threadCap) + ':: Ram Available: ' + curSVRUsedRam);
							ramNeeded = (scrHackMem * threadLimit / 2 * threadCap);
							ramAvailable = (curSVRMaxRam - curSVRUsedRam);
							//ns.tprint(`Name: ${j} - ${pList[j]} :: RAM: ${curSVRMaxRam} :: Used: ${curSVRUsedRam} :: Needed: ${ramNeeded}>${ramAvailable}`);

							if (ramNeeded > ramAvailable) { ns.tprint(`${pList[j]} out of ram :: Needed: ${ramNeeded}>${ramAvailable}`); j++ }; // current pserv is out of available ram, moving to next

							if (j < 2 && j < pList.length) {
								for (let e = 0; e < threadCap; e++) {
									maxThreads = Math.floor((curSVRMaxRam - curSVRUsedRam) / scrHackMem);
									if (j < 2 && j < pList.length) {
										curSVRUsedRam = ns.getServerUsedRam(pList[j]);
										curSVRMaxRam = ns.getServerMaxRam(pList[j]);
										ramNeeded = (scrHackMem * threadLimit / 2 * threadCap);
										ramAvailable = (curSVRMaxRam - curSVRUsedRam);
										if (ramNeeded <= ramAvailable) {
											if (ns.isRunning(scrHack, pList[j], [curSVR[0], e]) == false) {
												//ns.tprint('Run: ' + e);

												//if (e == 1) { ns.tprint(`copied ${scrHack} to ${pList[j]}`) };
												if (hackLvl > curSVR[3] && j < 2) {
													await ns.scp(scrHack, 'home', pList[j]);
													ns.exec(scrHack, pList[j], threadLimit / 2, curSVR[0], e)
													//if (e == threadCap - 1) { ns.tprint(`Newb: We Attempted to Start ${pList[j]}, ${scrHack}, ${curSVR[0]}, L: ${threadLimit / 2}, C: ${threadCap} // `) };
													await ns.sleep(100);
												}

												//ns.tprint(`Script: ${scrHack} // Host: ${pList[0]} // Target: ${curSVR[0]} // ${threadLimit} Threads`);


											}
										}
									}

								}
							}

						}
					}
				}
			} else if (j >= 2 && j <= 24) {
				//ns.tprint(`Made it into >=4 (HV) :${j}: ${pList[j]}`);
				if (j >= pList.length) { continue };
				//for high value targets
				//work through high value list, highest to lowest
				for (let f = 0; f < vHighValue.length; f++) {
					for (let z = 0; z < tList.length; z++) {
						curSVR = tList[z];
						if (typeof curSVR !== 'undefined' && curSVR.length > 0) {
							if (j >= pList.length) { continue };
							curSVRUsedRam = ns.getServerUsedRam(pList[j]);
							curSVRMaxRam = ns.getServerMaxRam(pList[j]);
							if (curSVRUsedRam > 0) { j++ }
							if (curSVR[0] == vHighValue[f]) { // if current pserv is out of ram, move next, then check to see if Target Min hack is over 500
								//ns.tprint(`3R :: [${curSVR}] :: HLVL: ${hackLvl}/${curSVR[3]} :: Root: ${curSVR[1]}`);
								if (curSVR[1] && curSVR[3] <= hackLvl) {
									//ns.tprint('4R');
									await ns.scp(scrHack, 'home', pList[j]);
									//ns.tprint(`copied ${scrHack} to ${pList[j]}`);
									await ns.run('sendIT.js', 1, scrHack, pList[j], vHighValue[f], threadLimit)
									await ns.sleep(100);
									//ns.tprint(`${j}-4+: We Attempted to Start ${pList[j]}, ${scrHack}, ${curSVR[0]}, L: ${threadLimit}, C: ${threadCap}`);
								};


							}
						}
					}
				}

			}
		}
		//ns.tprint(`${datetime} :: Finished Populating PSERV`);
		//ns.tprint('-----------------------------------------------------')
		await ns.sleep(60000);
	}

}