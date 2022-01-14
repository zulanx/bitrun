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
    const list = [];
    scan(ns, '', 'home', list);
    return list;
}

export async function main(ns) {
    const sList = list_servers(ns);
    var sProps = [];
    for (let i = 0; i < sList.length; i++) {
        if (sList[i].substring(0,6) !== 'pserv-' && ns.getServerMaxMoney(sList[i]) !== 0) {
            sProps[i] = [sList[i],ns.hasRootAccess(sList[i]),ns.getServerNumPortsRequired(sList[i]),ns.getServerRequiredHackingLevel(sList[i]),ns.getServerMinSecurityLevel(sList[i]),ns.getServerMaxMoney(sList[i]),ns.getServerGrowth(sList[i])]
        }
    }
    ns.tprint(sProps);
}