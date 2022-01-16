Create New Script to initiate download.
Save as start.js
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

spreadIT.js should be run when starting out, mainHack.js can auto nuke servers, but will not populate home or pservs until much later.

initFiles.js - download all of these scripts with wget from githubusercontent: Should be downloaded and started automatically from above script.
	- ex. 'run initFiles.ns'
1startPurchase.js - Starts mainHack.js, starts buyTools.js, starts purchaseServer.js after criteria is met
	- run 1startPurchase.js
easyHack.js - Auto Hack/Weak/Grow   
	- easyHack.js -t <threads> <target>
	- ex. 'run easyHack.js -t 20 n00dles'
mainHack.js - Main management script for automatically nuking, and populating Purchased Servers and Home.
	- run mainHack.js
buyTools.js - will monitor and purchase tor+hacking tools. SF4 required
	- run buyTools.js
gainRoot.js - Exploit/Nuke Target, send easyHack script against new target when complete. 
	- gainRoot.js <target> <attackTarget>
	- ex. 'run gainRoot.js joesguns n00dles'
purchaseServer.js - purchase new/best player servers - auto execute sendIT.js against n00dles
	- 'run purchaseServer.js'
sendIT.js - send script to new host, execute script against attack target
	- sendIT.js <script> <newHost> <attackTarget>
	- ex. 'run sendIT.js easyHack.js pserv-1 n00dles'
superSendIT.js - send easyHack.js script to all purchased servers, against target.
	- superSendIT.js <target>
	- ex. 'run superSendIT.js n00dles'
spreadIT.js - find hosts to exploit, send script, execute script against attack target
	- spreadIT.js <attack target> <script to send>
	- ex. 'run spreadIT.js n00dles easyHack.js'
watchServer.js - Show Current Security Level / Max Target Level and Current Money / Mine Target Money Level.
	- watchServer.js <target>
	- ex. 'run watchServer.js n00dles'
