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
	const sList = getAllServers(ns)
	var hostname = '';
	var root = '';
	var ports = '';
	var ram = '';
	var minSec = '';
	var maxMoney = '';
    var outputStr = ''       
	for (let i = 0; i < sList.length; i++) {
		hostname = sList[i];
		root = ns.hasRootAccess(sList[i]);
		ports = ns.getServerNumPortsRequired(sList[i]);
		ram = ns.getServerMaxRam(sList[i]);
		minSec = ns.getServerMinSecurityLevel(sList[i]);
		maxMoney = ns.getServerMaxMoney(sList[i]);

		outputStr = rPad(hostname,20)+'|  ';
		outputStr += rPad(root.toString(),7)+'|  ';
		outputStr += rPad(ports.toString(),7)+'|  ';
		outputStr += rPad(ram.toString(),10)+'|  ';
		outputStr += rPad(minSec.toString(),5)+'|  ';
		outputStr += rPad(maxMoney.toString(),15)+'|  ';
		ns.tprint(outputStr);
		//ns.tprint(`${rPad(hostname,20)}|${rPad(root,7)}|${rPad(ports.toString(),5)}|${rPad(ram.toString(),5)}|${rPad(minSec.toString(),6)}|${rPad(maxMoney.toString(),15)}|`);

	}

}