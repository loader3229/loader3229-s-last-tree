addLayer("c2", {
    name: "contest", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            clickables: { 11: new Decimal(0),12: new Decimal(0) ,13: new Decimal(0) ,21: new Decimal(0),22: new Decimal(0) }
        }
    },
    color: "#CCFFCC",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "竞赛点数", // Name of prestige currency
    resetDescription: "点击以获得",
    baseResource: "能力值", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type() { return "none"; }, // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["c","i","oj"],
    infoboxes: {
        a: {
            title: "竞赛 Contest",
            body() {
                return "由于你有了足够多的Rating，你现在可以开始参加程序设计竞赛了。";
            },
        },
    },
    layerShown() { return hasUpgrade("i",15) },
    tabFormat: {
        Contests: { content: ["main-display", ["infobox", "a"], "buyables"] }
    },
	buyables:{
        11: {
            title: "CCF GESP 一级认证",
            canAfford() { return player[this.layer].clickables[11].lte(0) },
            buy() {
                c_rating = getRating();
                setClickableState(this.layer, this.id, new Decimal(60))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).max(c_rating.mul(Math.random()*0.2+2)).floor().min(100))
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x.div(50).pow(2).add(1)
		if(x.gte(100) && hasMilestone("m",2))ef = ef.mul(2)
                return ef
            },
            display() { // Everything else displayed in the buyable button after the title
                return "参加CCF GESP 一级认证，根据最高成绩提升能力值获取<br>冷却时间："+format(getClickableState(this.layer, this.id))+"s<br>最高成绩："+formatWhole(getBuyableAmount(this.layer, this.id))+"/100<br>推荐Rating：30<br>Rating为50时必定满分并取得最大加成<br>达到60分以解锁下一个竞赛<br>加成：x"+format(buyableEffect(this.layer, this.id));
            }
        },
        12: {
            title: "CCF GESP 二级认证",
            canAfford() { return player[this.layer].clickables[12].lte(0) },
            buy() {
                c_rating = getRating();
                setClickableState(this.layer, this.id, new Decimal(70))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).max(c_rating.mul(Math.random()*0.1+1)).floor().min(100))
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x.div(50).pow(2).add(1)
		if(x.gte(100) && hasMilestone("m",2))ef = ef.mul(2)
                return ef
            },
            display() { // Everything else displayed in the buyable button after the title
                return "参加CCF GESP 二级认证，根据最高成绩提升能力值获取<br>冷却时间："+format(getClickableState(this.layer, this.id))+"s<br>最高成绩："+formatWhole(getBuyableAmount(this.layer, this.id))+"/100<br>推荐Rating：60<br>Rating为100时必定满分并取得最大加成<br>达到60分以解锁下一个竞赛<br>加成：x"+format(buyableEffect(this.layer, this.id));
            },unlocked(){return player.c2.buyables[11].gte(60)}
        },
        13: {
            title: "CCF GESP 三级认证",
            canAfford() { return player[this.layer].clickables[13].lte(0) },
            buy() {
                c_rating = getRating();
                setClickableState(this.layer, this.id, new Decimal(80))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).max(c_rating.mul(Math.random()*0.06+0.6)).floor().min(100))
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x.div(50).pow(2).add(1)
		if(x.gte(100) && hasMilestone("m",2))ef = ef.mul(2)
                return ef
            },
            display() { // Everything else displayed in the buyable button after the title
                return "参加CCF GESP 三级认证，根据最高成绩提升能力值获取<br>冷却时间："+format(getClickableState(this.layer, this.id))+"s<br>最高成绩："+formatWhole(getBuyableAmount(this.layer, this.id))+"/100<br>推荐Rating：100<br>Rating为167时必定满分并取得最大加成<br>达到60分以解锁下一个竞赛<br>加成：x"+format(buyableEffect(this.layer, this.id));
            },unlocked(){return player.c2.buyables[12].gte(60)}
        },
        21: {
            title: "CCF GESP 四级认证",
            canAfford() { return player[this.layer].clickables[21].lte(0) },
            buy() {
                c_rating = getRating();
                setClickableState(this.layer, this.id, new Decimal(90))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).max(c_rating.mul(Math.random()*0.04+0.4)).floor().min(100))
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x.div(50).pow(2).add(1)
		if(x.gte(100) && hasMilestone("m",2))ef = ef.mul(2)
                return ef
            },
            display() { // Everything else displayed in the buyable button after the title
                return "参加CCF GESP 四级认证，根据最高成绩提升能力值获取<br>冷却时间："+format(getClickableState(this.layer, this.id))+"s<br>最高成绩："+formatWhole(getBuyableAmount(this.layer, this.id))+"/100<br>推荐Rating：150<br>Rating为250时必定满分并取得最大加成<br>加成：x"+format(buyableEffect(this.layer, this.id));
            },unlocked(){return player.c2.buyables[13].gte(60)}
        },
        22: {
            title: "CCF GESP 五级认证",
            canAfford() { return player[this.layer].clickables[22].lte(0) },
            buy() {
                c_rating = getRating();
                setClickableState(this.layer, this.id, new Decimal(100))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).max(c_rating.mul(Math.random()*0.03+0.3)).floor().min(100))
            },
            effect(x) { // Effects of owning x of the items, x is a decimal
                let ef = x.div(50).pow(2).add(1)
		if(x.gte(100) && hasMilestone("m",2))ef = ef.mul(2)
                return ef
            },
            display() { // Everything else displayed in the buyable button after the title
                return "参加CCF GESP 五级认证，根据最高成绩提升能力值获取<br>冷却时间："+format(getClickableState(this.layer, this.id))+"s<br>最高成绩："+formatWhole(getBuyableAmount(this.layer, this.id))+"/100<br>推荐Rating：200<br>Rating为334时必定满分并取得最大加成<br>加成：x"+format(buyableEffect(this.layer, this.id));
            },unlocked(){return player.c2.buyables[21].gte(60)}
        },
},
    update(x) {
        player.c2.clickables[11] = player.c2.clickables[11].sub(x).max(0);
        player.c2.clickables[12] = player.c2.clickables[12].sub(x).max(0);
        player.c2.clickables[13] = player.c2.clickables[13].sub(x).max(0);
        player.c2.clickables[21] = player.c2.clickables[21].sub(x).max(0);
        player.c2.clickables[22] = player.c2.clickables[22].sub(x).max(0);
	if(hasMilestone("m",2)){
		let t=0;
		if(player.c2.buyables[11].gte(100))t++;
		if(player.c2.buyables[12].gte(100))t++;
		if(player.c2.buyables[13].gte(100))t++;
		if(player.c2.buyables[21].gte(100))t++;
		if(player.c2.buyables[22].gte(100))t++;
		player[this.layer].points=new Decimal(t);
	}
    },

})
