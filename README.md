#Readme

Create New Script to initiate download.

---------------------------------------------------------------------------------------------------------------------
export async function main(ns) { 
	if (ns.getHostname() !== "home") { 
		throw new Exception("Run the script from home"); 
	}

await ns.wget( 'https://raw.githubusercontent.com/zulanx/bitrun/main/src/', "initFiles.ns" ); ns.spawn("initFiles.ns", 1); 
}

---------------------------------------------------------------------------------------------------------------------
