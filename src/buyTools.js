/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.disableLog('ALL');
    ns.tail();
    var tools = [
        ['BruteSSH.exe', 500000, 50],
        ['FTPCrack.exe', 1500000, 100],
        ['relaySMTP.exe', 5000000, 330],
        ['HTTPWorm.exe', 30000000, 418],
        ['SQLInject.exe', 250000000, 727],
        ['ServerProfiler.exe', 500000, 50],
        ['DeepscanV1.exe', 500000, 0],
        ['DeepscanV2.exe', 25000000, 0],
        ['AutoLink.exe', 500000, 0],
        ['Formulas.exe', 20000000000, 500]
    ]
    var toolsCNT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var playerMoney = 0;
    var hackLVL = 0;
    var totalHacks = 0;
    var curTOOL = [];

    if (ns.purchaseTor) { toolsCNT[10] = 1; ns.print(`TOR Router has been purchased`) } else { toolsCNT[10] = 0 };
    for (let i = 0; i < tools.length; i++) {
        curTOOL = tools[i];
        if (ns.fileExists(curTOOL[0])) { toolsCNT[i] = 1; ns.print(`Found: ${curTOOL[0]}`) } else { toolsCNT[i] = 0 };
    }

    while (true) {
        totalHacks = 0;
        hackLVL = ns.getHackingLevel();
        playerMoney = ns.getServerMoneyAvailable('home');

        if (toolsCNT[10] == 0 && playerMoney >= 200000) {
            ns.purchaseTor();
            toolsCNT[10] = 1;
            ns.print(`Purchased TOR Router`);
            ns.tprint(`***Purchased TOR Router`);
        } else if (toolsCNT[10] == 1) {
            while (true) {
                totalHacks = 0;
                hackLVL = ns.getHackingLevel();
                playerMoney = ns.getServerMoneyAvailable('home');
                for (let h = 0; h < tools.length; h++) {
                    curTOOL = tools[h];
                    if (!ns.fileExists(curTOOL[0]) && playerMoney >= curTOOL[1] && hackLVL >= curTOOL[2]) { ns.purchaseProgram(curTOOL[0]); toolsCNT[h] = 1; ns.print(`Purchased: ${curTOOL[0]}`) };
                }
                totalHacks = 0;
                ns.print(`1. checking how many tools we have`)
                ns.print(toolsCNT);
                for (let f = 0; f < toolsCNT.length; f++) {
                    totalHacks += toolsCNT[f];
                }
                ns.print(totalHacks)
                if (totalHacks == 11) {
                    break;
                } else {

                    for (let s = 0; s < 60; s++) {
                        ns.clearLog()
                        for (let d = 0; d < tools.length; d++) {
                            curTOOL = tools[d];
                            ns.print(`[${toolsCNT[d]}] ${curTOOL[0]} `)
                        }
                        ns.print(`Sleeping for ${60 - s} seconds.`)
                        await ns.sleep(1000);
                    }
                }
            }
        } else {
            ns.print(`TOR Unavailable: Sleeping 60 seconds.`);
            await ns.sleep(60000);
        }
        ns.print(`1. checking how many tools we have`)
        totalHacks = 0;
        for (let f = 0; f < toolsCNT.length; f++) {
            totalHacks += toolsCNT[f];
        }
        if (totalHacks == 11) {
            ns.tprint(`All tools have been purchased`);
            return;
        }
    }
}