let modInfo = {
	name: "loader3229's Last Tree",
	id: "loader3229-s-last-tree",
	author: "loader3229",
	pointsName: "能力值",
	modFiles: ["layers/c.js", "layers/i.js", "layers/m.js", "layers/c2.js", "layers/oj.js", "tree.js", "Chinese2.js", "core.js"],

	discordName: "loader3229's Discord Server",
	discordLink: "https://discord.gg/jztUReQ2vT",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1",
	name: "",
}

let changelog = ``

let winText = `你暂时已经达到了这个树MOD的残局，但是现在...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
    if(hasUpgrade("c",23))gain = gain.add(0.1)
    if(hasUpgrade("c",24))gain = gain.add(0.4)
    if(hasUpgrade("c",25))gain = gain.add(buyableEffect("c",21))
    if(hasUpgrade("c",25) && !hasUpgrade("i",23))gain = gain.add(buyableEffect("c",22)[0])
    if(hasUpgrade("c",25))gain = gain.add(buyableEffect("c",23))
    if(hasUpgrade("c",25) && hasUpgrade("i",23))gain = gain.mul(buyableEffect("c",22)[0])
    if(hasUpgrade("c",34))gain = gain.mul(buyableEffect("c",13))
    if(hasUpgrade("c",41))gain = gain.mul(upgradeEffect("c",41))
    if(hasUpgrade("c",42))gain = gain.mul(upgradeEffect("c",42))
    if(hasUpgrade("i",12))gain = gain.mul(2)
    if(hasUpgrade("i",14))gain = gain.mul(upgradeEffect("i",14))
    if(hasUpgrade("oj",11))gain = gain.mul(upgradeEffect("oj",11))
    if(hasUpgrade("i",15))gain = gain.mul(buyableEffect("c2",11))
    if(hasUpgrade("i",15))gain = gain.mul(buyableEffect("c2",12))
    if(hasUpgrade("i",15))gain = gain.mul(buyableEffect("c2",13))
    if(hasUpgrade("i",15))gain = gain.mul(buyableEffect("c2",21))
    if(hasUpgrade("i",21))gain = gain.mul(2)
    if(hasUpgrade("i",25)){
        let b1 = player.c.buyables[31],b2 = player.c.buyables[32],b3 = player.c.buyables[33];
        while(b1.gte(1) || b2.gte(1) || b3.gte(1)){
            gain = gain.mul(b1.add(1).div(2).floor().toNumber()+b2.add(1).div(2).floor().toNumber()+b3.add(1).div(2).floor().toNumber()+1);
            b1 = b1.div(2);b2 = b2.div(2);b3 = b3.div(2);
        }
    }
    if(hasUpgrade("i",31))gain = gain.mul(2)
    if(hasUpgrade("i",32))gain = gain.mul(2)
    if(hasUpgrade("i",34))gain = gain.mul(2)
    if(hasUpgrade("c",53))gain = gain.mul(2)
    if(hasUpgrade("i",43))gain = gain.mul(2)
    if(hasMilestone("m",1))gain = gain.mul(player.m.points)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"本MOD的作者：loader3229，QQ：1010903229",
    function(){
        if(hasUpgrade("c",33))return "Rating: "+formatWhole(getRating());
        return "";
    },
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}


// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

function getRating(){
    return player.points.add(1).log(2).mul(2);
}