Create New Script to initiate download.

---------------------------------------------------------------------------------------------------------------------
```
export async function main(ns) {
  if (ns.getHostname() !== "home") {
    throw new Exception("Run the script from home");
  }

  await ns.wget(
    `https://raw.githubusercontent.com/zulanx/bitrun/main/src/initFiles.js?ts=${new Date().getTime()}`,
    "initFiles.js"
  );
  ns.spawn("initFiles.js", 1);
}
```
---------------------------------------------------------------------------------------------------------------------

initFiles.js - download all of these scripts with wget from githubusercontent: Should be downloaded and started automatically from above script.
	- ex. 'run initFiles.ns'

easyHack.js - Auto Hack/Weak/Grow   
	- easyHack.js -t <threads> <target>
	- ex. 'run easyHack.js -t 20 n00dles'
	
gainRoot.js - Exploit/Nuke Target, send easyHack script against new target when complete. 
	- gainRoot.js <target> <attackTarget>
	- ex. 'run gainRoot.js joesguns n00dles'

purchaseServer.js - purchase new/best player servers - auto execute sendIT.js against n00dles
	- 'run purchaseServer.js'

sendIT.js - send script to new host, execute script against attack target
	- sendIT.js <script> <newHost> <attackTarget>
	- ex. 'run sendIT.js easyHack.js pserv-1 n00dles'
	
spreadIT.js - find hosts to exploit, send script, execute script against attack target, start watchServer.js(attack target)
	- spreadIT.js <attack target> <script to send>
	- ex. 'run spreadIT.js n00dles easyHack.js'
	
watchServer.js - Show Current Security Level / Max Target Level and Current Money / Mine Target Money Level.
	- watchServer.js <target>
	- ex. 'run watchServer.js n00dles'
