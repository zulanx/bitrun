#Readme

Create New Script to initiate download.

---------------------------------------------------------------------------------------------------------------------
```
export async function main(ns) {
  if (ns.getHostname() !== "home") {
    throw new Exception("Run the script from home");
  }

  await ns.wget(
    `https://raw.githubusercontent.com/zulanx/bitrun/main/src/initHacking.ns?ts=${new Date().getTime()}`,
    "initHacking.ns"
  );
  ns.spawn("initHacking.ns", 1);
}
```
---------------------------------------------------------------------------------------------------------------------
