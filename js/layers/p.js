addLayer("p", {
    name: "program", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#33CCFF",
    requires: new Decimal(1e16), // Can be a function that takes requirement increases into account
    resource: "应用程序", // Name of prestige currency
    resetDescription: "重置代码量以获得",
    baseResource: "字节代码", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type() { return "normal"; }, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["c"],
    infoboxes: {
        a: {
            title: "应用程序 Program",
            body() {
                return "你写了非常多的代码，现在你有一个想法：把你写的所有代码进行编译和打包，变成可以直接运行的应用程序...（该层级仅重置代码量，不会重置其他任何层级资源。）";
            },
        },
    },
    layerShown() { return hasMilestone("m", 10) },
    passiveGeneration() { return 0; },
    upgrades: {
    },
    doReset(layer){
        if(layer=='p')player.c.points=new Decimal(0);
    }
})