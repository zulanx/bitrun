import { getAllServers } from "getServersOrg.js";

/** 
 * @param {NS} ns
 * @param {string} str The string
 * @param {number} len The number
 * **/


export function rPad(str, len) {
	var stringV = str.padEnd(len)
	return stringV;
}

export async function main(ns) {
	var argument = '';
	if (ns.args.length > 0) {
		argument = ns.args[0];
	} else if (ns.args[0] == 'help') {
		ns.tprint(`Arguments: help, ports, hack, root`)
	}

	const sList = getAllServers(ns)
	var vHacksName = ['BruteSSH.exe', 'FTPCrack.exe', 'HTTPWorm.exe', 'SQLInject.exe', 'relaySMTP.exe'];
	var hackCNT = 0;
	var hostname = '';
	var root = '';
	var ports = 0;
	var ram = '';
	var hackLVL = '';
	var minSec = '';
	var maxMoney = '';
	var outputStr = '';
	//****************/
	outputStr = rPad('Hostname', 20) + '|  ';
	outputStr += rPad('Root?', 7) + '|  ';
	outputStr += rPad('Hack', 7) + '|  ';
	outputStr += rPad('Ports', 7) + '|  ';
	outputStr += rPad('RAM', 10) + '|  ';
	outputStr += rPad('Sec', 5) + '|  ';
	outputStr += rPad('Max $$$', 15) + '|  ';
	ns.tprint(outputStr);
	outputStr = '';
	//****************/  

	for (let i = 0; i < vHacksName.length; i++) {
		if (ns.fileExists(vHacksName[i])) { hackCNT++ }
	}
	for (let i = 0; i < sList.length; i++) {
		hostname = sList[i];
		root = ns.hasRootAccess(sList[i]);
		ports = ns.getServerNumPortsRequired(sList[i]);
		ram = ns.getServerMaxRam(sList[i]);
		minSec = ns.getServerMinSecurityLevel(sList[i]);
		maxMoney = ns.getServerMaxMoney(sList[i]);
		hackLVL = ns.getServerRequiredHackingLevel(sList[i]);
		outputStr = rPad(hostname, 20) + '|  ';
		outputStr += rPad(root.toString(), 7) + '|  ';
		outputStr += rPad(hackLVL.toString(), 7) + '|  ';
		outputStr += rPad(ports.toString(), 7) + '|  ';
		outputStr += rPad(ram.toString(), 10) + '|  ';
		outputStr += rPad(minSec.toString(), 5) + '|  ';
		outputStr += rPad(maxMoney.toString(), 15) + '|  ';
		if (argument == '') {
			ns.tprint(outputStr);
		} else if (argument == 'ports' && ports <= hackCNT) {
			ns.tprint(outputStr);
		} else if (argument == 'root' && root) {
			ns.tprint(outputStr);
		} else if (argument == 'hack' && hackLVL <= ns.getHackingLevel()) {
			ns.tprint(outputStr);
		}
		

	}

}