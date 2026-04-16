addLayer("m", {
    name: "milestone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#793784",
    requires: new Decimal(1e15), // Can be a function that takes requirement increases into account
    resource: "里程碑", // Name of prestige currency
    resetDescription: "点击以获得",
    baseResource: "能力值", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type() { return "static"; }, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 3,
    exponent: 1.25, // Prestige currency exponent
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
            title: "里程碑 Milestone",
            body() {
                return "你下载了The Modding Tree的压缩包，并且开始用你学到的JavaScript知识修改了The Modding Tree，制作出了The Milestone Tree（里程碑之树）...";
            },
        },
    },
    milestones: [
		{
			requirementDescription: "第1个里程碑",
            unlocked() {return player[this.layer].best.gte(0)},
            done() {return player[this.layer].points.gte(1)}, // Used to determine when to give the milestone
            effectDescription: "在计算机层级解锁操作系统页面。",
        },
		{
			requirementDescription: "第2个里程碑",
            unlocked() {return player[this.layer].best.gte(1)},
            done() {return player[this.layer].points.gte(2)}, // Used to determine when to give the milestone
            effectDescription:  "能力值获取乘以本层级的里程碑数量。",
        },
		{
			requirementDescription: "第3个里程碑",
            unlocked() {return player[this.layer].best.gte(2)},
            done() {return player[this.layer].points.gte(3)}, // Used to determine when to give the milestone
            effectDescription:  "对于每个满分的竞赛，其加成额外变为2倍，并且获得1竞赛点数。",
        },
		{
			requirementDescription: "第4个里程碑",
            unlocked() {return player[this.layer].best.gte(3)},
            done() {return player[this.layer].points.gte(4)}, // Used to determine when to give the milestone
            effectDescription:  "写代码的速度乘以本层级的里程碑数量。解锁新的升级。",
        },
		{
			requirementDescription: "第5个里程碑",
            unlocked() {return player[this.layer].best.gte(4)},
            done() {return player[this.layer].points.gte(5)}, // Used to determine when to give the milestone
            effectDescription:  "网络知识获取乘以本层级的里程碑数量。解锁新的升级。",
        },
		{
			requirementDescription: "第6个里程碑",
            unlocked() {return player[this.layer].best.gte(5)},
            done() {return player[this.layer].points.gte(6)}, // Used to determine when to give the milestone
            effectDescription:  "解锁新的层级：Online Judge。",
        },
		{
			requirementDescription: "第7个里程碑",
            unlocked() {return player[this.layer].best.gte(6)},
            done() {return player[this.layer].points.gte(7)}, // Used to determine when to give the milestone
            effectDescription:  "Online Judge会随着时间出现新的题目。游玩时间减少OJ层级的需求。",
        },
		{
			requirementDescription: "第8个里程碑",
            unlocked() {return player[this.layer].best.gte(7)},
            done() {return player[this.layer].points.gte(8)}, // Used to determine when to give the milestone
            effectDescription:  "Online Judge里面每道完成的题目使网络知识获取+10%。",
        },
		{
			requirementDescription: "第9个里程碑",
            unlocked() {return player[this.layer].best.gte(8)},
            done() {return player[this.layer].points.gte(9)}, // Used to determine when to give the milestone
            effectDescription:  "能力值增加能力值获取。",
        },
		{
			requirementDescription: "第10个里程碑",
            unlocked() {return player[this.layer].best.gte(9)},
            done() {return player[this.layer].points.gte(10)}, // Used to determine when to give the milestone
            effectDescription:  "在操作系统页面解锁新的购买项。",
        },


    ],
    layerShown() { return hasUpgrade("i", 35) },
    resetsNothing: true,
})