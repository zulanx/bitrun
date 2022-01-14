export async function main(ns) {
  if (ns.getHostname() !== "home") {
    throw new Exception("Run the script from home");
  }

  await ns.wget(
    `https://raw.githubusercontent.com/zulanx/bitrun/main/src/initFiles.ns?ts=${new Date().getTime()}`,
    "initFiles.ns"
  );
  ns.spawn("initFiles.ns", 1);
}