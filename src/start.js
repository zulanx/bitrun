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