addLayer("i", {
    name: "internet", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            clickables: { 11: new Decimal(0) }
        }
    },
    color: "#FF9999",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "网络知识", // Name of prestige currency
    resetDescription: "点击以获得",
    baseResource: "能力值", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type() { return "normal"; }, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.03, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("i",13))mult = mult.add(buyableEffect("c",21))
        if(hasUpgrade("i",34))mult = mult.mul(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    infoboxes: {
        a: {
            title: "网络 Internet",
            body() {
                return "你打开了Internet Explorer，输入了www.baidu.com在百度上搜索程序设计知识...";
            },
        },
    },
    layerShown() { return hasUpgrade("c", 35) },
    resetsNothing: true,

    passiveGeneration() { return buyableEffect("c", 41).toNumber() },
    upgrades: {
        11: {
            title: "更多批处理知识",
            description: "搜索结果中有更多CMD批处理知识...使C层级第1-3个可购买项效果翻倍",
            cost: new Decimal(20)
        },
        12: {
            title: "C++教程",
            description: "搜索结果中有一个C++教程。现在可以更好的学习C++了。使能力值获取翻倍。",
            cost: new Decimal(30)
        },
        13: {
            title: "按顺序阅读网页",
            description: "“顺序结构”也会增加网络知识获取。",
            cost: new Decimal(40)
        },
        14: {
            title: "位运算",
            description: "能力值每有一个二进制位，能力值获取+10%。",
            effect(){
                return player.points.log2().floor().add(1).max(1).div(10).add(1)
            },
            effectDisplay(){
                return "x" + format(this.effect())
            },
            cost: new Decimal(400)
        },
        15: {
            title: "竞赛报名",
            description: "解锁新的层级。",
            cost: new Decimal(600)
        },
        21: {
            title: "Python",
            description: "在网上找到了Python教程...又可以学习新的语言了！使能力值获取翻倍。",
            cost: new Decimal(1000),
            unlocked(){return hasUpgrade("c",42)}
        },
        22: {
            title: "深度理解顺序结构",
            description: "“顺序结构”的效果翻倍。",
            cost: new Decimal(2000),
            unlocked(){return hasUpgrade("c",42)}
        },
        23: {
            title: "switch语句和深层分支",
            description: "“分支结构”的第一效果改为能力值乘数。",
            cost: new Decimal(3000),
            unlocked(){return hasUpgrade("c",42)}
        },
        24: {
            title: "多重嵌套循环",
            description: "“自动化循环”升级效果更好。",
            cost: new Decimal(4000),
            unlocked(){return hasUpgrade("c",42)}
        },
        25: {
            title: "数组",
            description: "新的知识点！在计算机层级里面解锁新的页面。",
            cost: new Decimal(8000),
            unlocked(){return hasUpgrade("c",42)}
        },
        31: {
            title: "Java",
            description: "又一门编程语言！使能力值获取翻倍。",
            cost: new Decimal(100000),
            unlocked(){return hasUpgrade("c",44)}
        },
        32: {
            title: "JavaScript",
            description: "这正是这棵树所使用的编程语言。使能力值获取翻倍。",
            cost: new Decimal(200000),
            unlocked(){return hasUpgrade("c",44)}
        },
        33: {
            title: "指针",
            description: "double* pointer=arr; 在数组页面解锁新的购买项。",
            cost: new Decimal(4e5),
            unlocked(){return hasUpgrade("i",25)}
        },
        34: {
            title: "函数",
            description: "int x(int y){return y+1;} 新的知识点！使能力值获取，写代码的速度和网络知识获取翻倍。",
            cost: new Decimal(6e5),
            unlocked(){return hasUpgrade("i",25)}
        },
        35: {
            title: "The Modding Tree",
            description: "解锁新的层级。",
            cost: new Decimal(1e6),
            unlocked(){return hasUpgrade("i",34)}
        },
    }
})