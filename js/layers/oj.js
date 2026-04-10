addLayer("oj", {
    name: "oj", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OJ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#FFFF00",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "道完成的题目", // Name of prestige currency
    resetDescription: "点击以获得",
    baseResource: "能力值", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type() { return "static"; }, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base(){
	if(hasMilestone("m",6))return 4+60000/(player.timePlayed+10000);
	return 10;
	},
    exponent: 1, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    infoboxes: {
        a: {
            title: "Online Judge",
            body() {
                return "你在网上发现了一个Online Judge，里面有许多程序设计题目可以完成。你从最简单的A+B Problem开始做起...";
            },
        },
    },
    layerShown() { return hasMilestone("m", 5) },
    resetsNothing: true,
    upgrades: {
        11: {
            title: "完成题目的收获",
            description: "完成题目使你得到了收获。使能力值获取根据完成的题目数量增加。",
            cost: new Decimal(10),
            effect(){
                return player.oj.points.add(1);
            },
            effectDisplay(){
                return "x" + format(this.effect())
            },
        },
    },
});
