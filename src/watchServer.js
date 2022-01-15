/** @param {import(".").NS} ns **/
function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  }
  export async function main(ns) {
	  ns.disableLog('ALL');
	  var target = ns.args[0];
	  var servSec = 0;
	  var servMon = 0;
	  var servMaxMon = Math.floor(ns.getServerMaxMoney(target) * .85);
	  var servSecTarget = ns.getServerMinSecurityLevel(target)+5;
  
	  ns.tail();
	  while (true) {
  
		  servSec = Math.round((ns.getServerSecurityLevel(target)*100)/100);
		  servMon = Math.floor(ns.getServerMoneyAvailable(target));
		  ns.clearLog();
		  ns.print('Target: ' + target + ' // Sec: ' + servSec + "/" + servSecTarget + ` // \$${numberWithCommas(servMon)} / \$${numberWithCommas(servMaxMon)} \n`);
		  await ns.sleep(50000);
	  }
  
  }