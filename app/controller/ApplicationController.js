Ext.define('WarhammerBuilder.controller.ApplicationController', {
    extend: 'Ext.app.Controller',
    requires:[
        "WarhammerBuilder.view.Main",
        "WarhammerBuilder.view.Army.ArmyList",
        "WarhammerBuilder.view.Army.ComposeArmy",
        "WarhammerBuilder.view.Army.ComposeArmy.LordsComposition",
        "WarhammerBuilder.view.Army.ComposeArmy.HeroesComposition",
        "WarhammerBuilder.view.Army.ComposeArmy.CoresComposition",
        "WarhammerBuilder.view.Army.ComposeArmy.SpecialsComposition",
        "WarhammerBuilder.view.Army.ComposeArmy.RaresComposition",
        "WarhammerBuilder.view.Army.ComposeArmy.UnitComposition"
    ],

    config: {
        refs: {
            mainView: 'main',
            armyList: "armylist",
            composeArmy: "composearmy"
        },

        control: {
            armyList: { 
                itemtap: "displayArmyList" 
            },
            composeArmy: {
                initialize: "onCompositionInit",
                configureLordUnit: "lordUnitSelection",
                configureHeroUnit: "heroUnitSelection",
                configureCoreUnit: "coreUnitSelection",
                backButtonTap: "backHome" 
            }
        }
    },

    backHome: function(){
        console.log("backHome");
        Ext.Viewport.remove(this.getComposeArmy(), true);
        Ext.Viewport.setActiveItem(this.getMainView());
    },

    army: null,
    displayArmyList: function(view, index, target, record){
        console.log("displayArmyList");
        this.army = record;
        var points = Ext.getCmp("armyPts").getValue();
        var reg = new RegExp(/^[0-9]*$/);
        if(points == ""){
            Ext.Msg.alert(null, "Veuillez saisir un nombre de points");
            return;
        }else if(!reg.test(points)){
            Ext.Msg.alert(null, "Les points doivent être un nombre");
            return;
        }
        var commposeView = Ext.create("widget.composearmy");
        Ext.Viewport.add([commposeView]);
        Ext.Viewport.setActiveItem(commposeView);
        commposeView.getAt(0).setTitle(record.get('name')+" ("+points+"pts)");
    },
    onCompositionInit: function(){
        console.log("onCompositionInit");
        console.log(this.army);
        Ext.getCmp("lordSelection").setStore(this.army.lordsStore);
        Ext.getCmp("heroSelection").setStore(this.army.heroesStore);
        Ext.getCmp("coreSelection").setStore(this.army.coresStore);
        Ext.getCmp("specialSelection").setStore(this.army.specialsStore);
        Ext.getCmp("rareSelection").setStore(this.army.raresStore);
    },
    lordUnitSelection: function(){
        console.log("lordUnitSelection");
        var unit = Ext.getCmp("lordSelection").getRecord();
        Ext.getCmp("lordUnitComposition").setData(unit.data);
    },
    heroUnitSelection: function(){
        console.log("heroUnitSelection");
        var unit = Ext.getCmp("heroSelection").getRecord();
        Ext.getCmp("heroUnitComposition").setData(unit.data);
    },
    coreUnitSelection: function(){
        console.log("coreUnitSelection");
        var unit = Ext.getCmp("coreSelection").getRecord();
        Ext.getCmp("coreUnitComposition").setData(unit.data);
    }
});