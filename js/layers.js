addLayer("c", {
    name: "computer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
	points: new Decimal(0),
	clickables: {11: new Decimal(0)}
    }},
    color: "#999999",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "字节代码", // Name of prestige currency
    resetDescription: "点击以获得",
    baseResource: "能力值", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type(){ if(player.c.clickables[11].gte(10))return "normal";return "none";}, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	mult = mult.mul(buyableEffect("c",11))
	if(hasUpgrade("c",22))mult = mult.mul(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  infoboxes: {
    a: {
      title: "计算机 Computer",
      body() {
        if(player.c.clickables[11].gte(10))return "你醒来了，发现你正在一个房间里面，里面只有一张床和一台台式计算机。你发现你变成了loader3229，但是...";
        if(player.c.clickables[11].gte(1))return "你醒来了，发现你正在一个房间里面，里面只有一张床和一台台式计算机，计算机的桌面上有一些图标：“我的文档”、“我的电脑”、“回收站”、“Internet Explorer”...";
        return "你醒来了，发现你正在一个房间里面，里面只有一张床和一台台式计算机...";
      },
    },
  },
    layerShown(){return true},

tabFormat: {
   Computer:{content:["main-display",["infobox","a"],"prestige-button","resource-display",["clickable",11],"upgrades","buyables"]}
},
clickables: {
  11: {
	title(){
		if(player.c.clickables[11].gte(1))return "操作计算机";
return "打开计算机";
	},
	display(){
		if(player.c.clickables[11].gte(10))return "现在，你可以在记事本里面写更多的代码了。解锁了一个新的按钮！";
		if(player.c.clickables[11].gte(9))return "你写出了你的第一个cmd程序，能力值+1。你发现你很可能变成了loader3229...";
		if(player.c.clickables[11].gte(8))return "计算机弹出了一个黑色的窗口，里面正好显示了“Hello, World!”，然后是一个“请按任意键继续. . .”";
		if(player.c.clickables[11].gte(7))return "你把这个存储为了“a.cmd”，之后点击了“a.cmd”...";
		if(player.c.clickables[11].gte(6))return "你在记事本里面写下了“echo Hello, World!”，然后按下了“Enter”之后输入了“pause”...";
		if(player.c.clickables[11].gte(5))return "你注意到了左下角的“开始”按钮的菜单，打开了“记事本”...你发现你可以在里面写一些东西...";
		if(player.c.clickables[11].gte(4))return "你注意到了左下角的“开始”按钮，点开了它...";
		if(player.c.clickables[11].gte(3))return "你打开了“本地磁盘 (C:)”，看到了“Program Files”和“WINDOWS”...";
		if(player.c.clickables[11].gte(2))return "你打开了“我的电脑”，看到了“本地磁盘 (C:)”和“本地磁盘 (D:)”...";
		if(player.c.clickables[11].gte(1))return "计算机启动完成，现在在Windows XP系统的桌面，尝试操作一下...";
		if(player.c.clickables[11].gte(0.4))return "Windows XP 正在启动中... ("+format(player.c.clickables[11].mul(100))+"%)";
		if(player.c.clickables[11].gte(0.2))return "BIOS 正在初始化中... ("+format(player.c.clickables[11].mul(100))+"%)";
		if(player.c.clickables[11].gte(0.01))return "计算机正在启动中... ("+format(player.c.clickables[11].mul(100))+"%)";
		return "计算机上面有一个按钮，按下它以尝试打开计算机...";
	},
	canClick(){
		return player.c.clickables[11].eq(0) || (player.c.clickables[11].gte(1) && player.c.clickables[11].lte(9));
	},
	onClick(){
		if(player.c.clickables[11].eq(0))player.c.clickables[11]=new Decimal(0.01);
		if(player.c.clickables[11].gte(1))player.c.clickables[11]=player.c.clickables[11].add(1);
		if(player.c.clickables[11].eq(9))player.points = player.points.add(1)
	},
	unlocked(){
		return player.c.best.lt(10)
	}
}
},
    resetsNothing: true,
update(x){
	if(player.c.clickables[11].gte(0.01)&&player.c.clickables[11].lt(1))player.c.clickables[11]=player.c.clickables[11].add(x/20).min(1);
},
    upgrades: {
        11: {
            title:"help",
            description:"你打开了cmd，尝试输入help...",
            cost:new Decimal(20),
		unlocked(){return player.c.best.gte(20)}
        },
        12: {
            title:"set",
            description:"set可以让你输入变量，和对变量进行计算...",
            cost:new Decimal(10),
		unlocked(){return hasUpgrade("c",11)}
        },
        13: {
            title:"dir",
            description:"dir可以让你知道当前目录里面的文件...",
            cost:new Decimal(10),
		unlocked(){return hasUpgrade("c",11)}
        },
        14: {
            title:"type",
            description:"type可以让你知道文件里面的内容...",
            cost:new Decimal(10),
		unlocked(){return hasUpgrade("c",11)}
        },
        15: {
            title:"if",
            description:"if可以让你根据变量的值执行不同的操作...",
            cost:new Decimal(20),
		unlocked(){return hasUpgrade("c",12)&&hasUpgrade("c",13)&&hasUpgrade("c",14)}
        },
        21: {
            title:"Hello, Buyables!",
            description:"解锁一个购买项。",
            cost:new Decimal(40),
		unlocked(){return hasUpgrade("c",15)}
        },
        22: {
            title:"CMD太弱了，要学习新的语言了",
            description:"下载Dev-C++ IDE，使写代码的速度翻倍，并且开始学习C++语言",
            cost:new Decimal(200),
		unlocked(){return hasUpgrade("c",21)}
        },
        23: {
            title:"Hello, World!",
            description:"终于写出了第一个C++程序。使能力值每秒增加0.1。",
            cost:new Decimal(500),
		unlocked(){return hasUpgrade("c",22)}
        },
        24: {
            title:"A+B Problem",
            description:"第二个C++程序。使能力值每秒增加0.4。A=0.1，B=0.4，所以A+B=0.5，即每秒总计可以增加0.5能力值。",
            cost:new Decimal(1000),
		unlocked(){return hasUpgrade("c",22)}
        },
        25: {
            title:"三连击",
            description:"解锁三个购买项。",
            cost:new Decimal(2000),
		unlocked(){return hasUpgrade("c",22)}
        },
        31: {
            title:"CMD并不弱，只需要定时运行CMD",
            description:"解锁一个购买项。",
            cost:new Decimal(5000),
		unlocked(){return hasUpgrade("c",21)}
        },
        32: {
            title:"自动化循环",
            description:"“循环结构”的等级增加自动化速度。",
            cost:new Decimal(10000),
		unlocked(){return hasUpgrade("c",25) && hasUpgrade("c",31)}
        },
        33: {
            title:"能力的量化",
            description:"解锁Rating。",
            cost:new Decimal(30000),
		unlocked(){return hasUpgrade("c",32)}
        },
        34: {
            title:"批量提升能力",
            description:"解锁一个购买项。",
            cost:new Decimal(50000),
		unlocked(){return hasUpgrade("c",33)}
        },
        35: {
            title:"Internet Explorer",
            description:"解锁新层级。（暂时没有做好）",
            cost:new Decimal(100000),
		unlocked(){return hasUpgrade("c",34)}
        },
},
passiveGeneration(){return buyableEffect("c",12).toNumber()},
    buyables:{
        11: {
            title: "复制粘贴", 
            cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
        let cost = Decimal.pow(2, x).mul(10)
                return cost
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))},
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x.mul(new Decimal(buyableEffect("c",22)[1]).add(1)).add(1)
                return ef},
            display() { // Everything else displayed in the buyable button after the title
                return "利用CMD批处理程序的力量，增加每次点击写代码按钮获取<br>"+
                "花费：" + format(this.cost()) + "字节代码<br>"+
                "等级：" + format(player[this.layer].buyables[this.id])  + "<br>"+
                "效果：x" + format(this.effect()) },
            unlocked() { return hasUpgrade('c',21) }
        },
        12: {
            title: "自动化", 
            cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
        let cost = Decimal.pow(2, x).mul(1000)
                return cost
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))},
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x
		if(hasUpgrade("c",32))ef = ef.mul(player.c.buyables[23].sqrt().add(1))
                return ef},
            display() { // Everything else displayed in the buyable button after the title
                return "利用CMD批处理程序的力量，每秒自动点击1次写代码按钮<br>"+
                "花费：" + format(this.cost()) + "字节代码<br>"+
                "等级：" + format(player[this.layer].buyables[this.id])  + "<br>"+
                "效果：每秒自动点击" + format(this.effect()) + "次按钮" },
            unlocked() { return hasUpgrade('c',31) }
        },
        13: {
            title: "能力批处理提升", 
            cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
        let cost = Decimal.pow(2, x).mul(10000)
                return cost
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))},
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x.mul(0.2).add(1)
                return ef},
            display() { // Everything else displayed in the buyable button after the title
                return "利用CMD批处理程序的力量，增加能力值获取<br>"+
                "花费：" + format(this.cost()) + "字节代码<br>"+
                "等级：" + format(player[this.layer].buyables[this.id])  + "<br>"+
                "效果：能力值获取x" + format(this.effect()) + "" },
            unlocked() { return hasUpgrade('c',34) }
        },
        21: {
            title: "顺序结构", 
            cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
        let cost = Decimal.pow(2, x).mul(10)
                return cost
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))},
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x.mul(0.5)
                return ef},
            display() { // Everything else displayed in the buyable button after the title
                return "每次购买使每秒增加0.5能力值<br>"+
                "需要：" + format(this.cost()) + "能力值<br>"+
                "等级：" + format(player[this.layer].buyables[this.id])  + "<br>"+
                "效果：+" + format(this.effect()) },
            unlocked() { return hasUpgrade('c',25) }
        },
        22: {
            title: "选择结构", 
            cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
        let cost = Decimal.pow(2, x).mul(100)
                return cost
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))},
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = [x.add(1).div(2).floor().mul(2),x.div(2).floor().div(2)]
                return ef},
            display() { // Everything else displayed in the buyable button after the title
                return "每次购买时，如果购买次数为奇数则每秒增加2能力值，否则“复制粘贴”的基数增加0.5<br>"+
                "需要：" + format(this.cost()) + "能力值<br>"+
                "等级：" + format(player[this.layer].buyables[this.id])  + "<br>"+
                "效果：+" + format(this.effect()[0])+"/+"+ format(this.effect()[1]) },
            unlocked() { return hasUpgrade('c',25) }
        },
        23: {
            title: "循环结构", 
            cost(x) { // cost for buying xth buyable, can be an object if there are multiple currencies
        let cost = Decimal.pow(2, x).mul(300)
                return cost
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))},
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x.mul(x.add(1)).div(2)
                return ef},
            display() { // Everything else displayed in the buyable button after the title
                return "每次购买时，重复购买次数次，每秒增加1能力值<br>"+
                "需要：" + format(this.cost()) + "能力值<br>"+
                "等级：" + format(player[this.layer].buyables[this.id])  + "<br>"+
                "效果：+" + format(this.effect()) },
            unlocked() { return hasUpgrade('c',25) }
        },
}
})
