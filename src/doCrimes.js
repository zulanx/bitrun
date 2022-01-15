/** @param {import(".").NS} ns **/

export async function main(ns) {

    ns.disableLog('ALL');




    var crime = '';
    var crimeLen = 0;
    var looper = 0
    var crimeTypes = [
        'Shoplift',
        'Rob store',
        'Mug someone',
        'Larceny',
        'Deal Drugs',
        'Bond Forgery',
        'Traffic illegal Arms',
        'Homicide',
        'Grand theft Auto',
        'Kidnap and random',
        'Assassinate',
        'Heist'
    ]
    var crimeLoop = 0;
    var crimeInfo = [];

    if (ns.args.length < 1) {
        ns.tprint(`No arguments supplied: run doCrime.js 'Rob store' 4?`);
        for (let i = 0; i < crimeTypes.length; i++) {
            ns.tprint(`[${i}] ${crimeTypes[i]}`)
        }
        return;
    }
    ns.tail();
    for (let ii = 0; ii < crimeTypes.length; ii++) {
        if (ns.args[0] == crimeTypes[ii] && isNaN(ns.args[0])) {
            ns.print(`Valid Crime: ${ns.args[0]}`)
            crime = ns.args[0];
            break;
        } else if (!isNaN(ns.args[0]) && ns.args[0] >= 0 && ns.args[0] <= crimeTypes.length) {
            ns.print(`Valid Crime: ${crimeTypes[ns.args[0]]}`)
            crime = crimeTypes[ns.args[0]];
            break;
        }
    }
    if (crime == '') {
        ns.print(`Invalid Crime: ${ns.args[0]}`)
        ns.tprint(`Invalid Crime Argument, must be one of:\n${crimeTypes}`)
        return;
    }

    if (ns.args.length == 2) {
        if (isNaN(ns.args[1])) {
            ns.print(`Crime Count NaN defaulting to infinite`)
            crimeLoop = 0;
        } else {
            ns.print(`Crime Loop set to: ${ns.args[1]}`);
            crimeLoop = ns.args[1];
        }
        await ns.sleep(2000);
    }


    while (true) {
        looper++;
        crimeInfo = ns.getCrimeStats(crime);
        crimeLen = ns.commitCrime(crime);
        for (let tt = 0; tt < Math.floor(crimeLen / 1000) + 1; tt++) {
            crimeInfo = ns.getCrimeStats(crime);
            ns.clearLog();
            ns.print(`*******************CRIME INFO*****************`);
            ns.print(`** Name: ${crimeInfo.name}`);
            ns.print(`** Money: ${crimeInfo.money}`);
            ns.print(`** Time: ${crimeInfo.time / 1000} seconds`);
            ns.print(`** AgiXP: ${crimeInfo.agility_exp}`);
            ns.print(`** DexXP: ${crimeInfo.dexterity_exp}`);
            ns.print(`** DefXP: ${crimeInfo.defense_exp}`);
            ns.print(`** HackXP: ${crimeInfo.hacking_exp}`);
            ns.print(`** StrXP: ${crimeInfo.strength_exp}`);
            ns.print(`** ChaXP: ${crimeInfo.charisma_exp}`);
            ns.print(`** Karma Loss: ${crimeInfo.karma}`);
            ns.print(`**********************************************`)
            ns.print(`Loop(${looper}/${crimeLoop}) Doing Crimes... ${crime} for ${(Math.floor(crimeLen / 1000) + 1) - tt} seconds `)
            await ns.sleep(1000);
        }

        if (looper >= crimeLoop && crimeLoop > 0) { break };
    }
    ns.print(`Finished doing ${looper}/${crimeLoop} crimes`);
    return;
}