/** @param {NS} ns **/
export async function main(ns) {

//Uses a DFS to find the path to the specified server and then prints the path
//to Terminal.

//The target server's HOSTNAME must be a string passed in as an argument to the script.
//It is CASE-SENSITIVE.
//If an invalid hostname is passed the script will probably just run forever.

var target = ns.args[0];

var visited = [];
var stack = [];
var parentTracker = [];
var origin = ns.getHostname();
var node='';
var nextNodes =[];
var pair=[];
var parentTracker=[];
var i = '';
stack.push(origin);
var stack = [];
var path=[];

while(stack.length > 0) {
    node = stack.pop();
    ns.print("DFS processing server " + node);
    if (visited.includes(node)) {
        //Do nothing. Essentially a "continue" but that doesn't exist yet
    } else {
        if (node == target) {break;}
        visited.push(node);
        nextNodes = ns.scan(node);
        for (i = 0; i < nextNodes.length; ++i) {
            stack.push(nextNodes[i]);

            //Keep track of the nodes "parent" so we can re-create the path
            //Ignore entries that start at the origin
            if (nextNodes[i] != origin) {
                pair = [nextNodes[i], node];
                parentTracker.push(pair);
            }
        }
    }
}

ns.print("Target found. About to re-create path");
ns.print("parentTracker size: " + parentTracker.length);
path = [];
i = target;
while (i != ns.getHostname()) {
    path.push(i);
    ns.print("Re-creating path at " + i);

    //Search through the parentTracker array to find this nodes parent
    for (let j = 0; j < parentTracker.length; ++j) {
        pair = parentTracker[j];
        if (pair[0] == i) {
            i = pair[1];
            break;
        }
    }
}

path.reverse();
ns.tprint(path);


}