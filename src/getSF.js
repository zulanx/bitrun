/** @param {NS} ns **/

function hideElem(elem) {
	// Make elem invisible
	elem.style.display = "none";
	elem.style.visibility = "hidden";
	elem.style.backgroundColor = '';
}

export async function main(ns) {

if (ns.args[0]!==undefined && ns.args.length > 0) {


	
//**************************************	
	var SF = ns.args[0];
	
// Change SF to Below:
//	1 = Alter Reality  find Alter Reality add break point, change false value to true on break.
//	2 = Unclickable
//  3 = Bypass & Numbers prototype	
//**************************************	
	

	
	if (SF == 1) { ns.alterReality(); 
	} else if (SF == 2) {
		// Get div#unclickable
		let div = eval("document.getElementById('unclickable')");
		// Make div visible
		div.style.display = "block"; // none
		div.style.visibility = "visible"; // hidden
		div.style.backgroundColor = 'red';
		div.addEventListener('mouseup', function (e) {
		hideElem(div);
		});
	
	} else if ( SF == 3 ) {
		eval("ns.bypass(document)");
		Number.prototype.toExponential = function() { return ""; }
	} else if (SF == 4 ) {
	
	} else if ( SF == 5) {
	
	
	}
} else {
	ns.tprint(`Usage:  getSF.js <number>`);
	ns.tprint(`//	1 = Alter Reality  find Alter Reality add break point, change false value to true on break.`);
	ns.tprint(`//	2 = Unclickable`);
	ns.tprint(`//   3 = Bypass & Numbers prototype`);
	ns.tprint(`//   4 = not implemented??`);
	ns.tprint(`//   5 = not implemented??`);
}
	
	
	





}