const baseUrl = 'https://raw.githubusercontent.com/zulanx/bitrun/main/src/'
const filesToDownload = ['1startPurchase.js', 'achieve_edit.js', 'buyTools.js', 'doScan.js', 'easyHack.js', 'findServer.js', 'find_coding_contract.js', 'gainRoot.js', 'getServers.js', 'getServersOrg.js', 'getSF.js', 'host_grow.js', 'host_hack.js', 'host_weak.js', 'killSCRIPT.js', 'mainHack.js', 'populateHome.js', 'populatePserv.js', 'purchaseServer.js', 'scanServers.js', 'sendIT.js', 'spreadIT.js', 'start.js', 'stocks.js', 'superSendIT.js', 'superSolver.js', 'watchServer.js', 'writeServerInfo.js']

function localeHHMMSS(ms = 0) {
  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toLocaleTimeString()
}

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting initHacking.js`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  for (let i = 0; i < filesToDownload.length; i++) {
    const filename = filesToDownload[i]
    const path = baseUrl + filename
    await ns.scriptKill(filename, 'home')
    await ns.rm(filename)
    await ns.sleep(200)
    ns.tprint(`[${localeHHMMSS()}] Trying to download ${path}`)
    await ns.wget(path + '?ts=' + new Date().getTime(), filename)
  }


  ns.tprint(`[${localeHHMMSS()}] Spawning spreadIT.js`)
  ns.run('spreadIT.js', 1, 'n00dles', 'easyHack.js')
  ns.spawn('1startPurchase.js')
}
