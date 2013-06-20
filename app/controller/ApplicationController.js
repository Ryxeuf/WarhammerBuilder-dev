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
            coresComposition: "corescomposition"
        },

        control: {
            armyList: { itemtap: "displayArmyList" },
            coresComposition: {
                initialize: "onCoresCompositionInit",
                configureCoreUnit: "coreUnitSelection"
            }
        }
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
    onCoresCompositionInit: function(){
        console.log("onCoresCompositionInit");
        console.log(this.army);
        Ext.getCmp("coreSelection").setStore(this.army.coresStore);
    },
    coreUnitSelection: function(){
        console.log("coreUnitSelection");
        var unit = Ext.getCmp("coreSelection").getRecord();
        Ext.getCmp("unitComposition").setData(unit.data);

    }
});