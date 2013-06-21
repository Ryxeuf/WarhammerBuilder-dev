Ext.define('WarhammerBuilder.controller.ApplicationController', {
    extend: 'Ext.app.Controller',

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
                configureSpecialUnit: "specialUnitSelection",
                configureRareUnit: "rareUnitSelection",
                backButtonTap: "backHome",
                updateCost: "updateCost",
                engageUnit: "engageUnit"
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
        console.log("commposeView");
        console.log(commposeView);
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
    },
    specialUnitSelection: function(){
        console.log("specialUnitSelection");
        var unit = Ext.getCmp("specialSelection").getRecord();
        Ext.getCmp("specialUnitComposition").setData(unit.data);
    },
    rareUnitSelection: function(){
        console.log("rareUnitSelection");
        var unit = Ext.getCmp("rareSelection").getRecord();
        Ext.getCmp("rareUnitComposition").setData(unit.data);
    },

    updateCost: function(view){
        console.log("updateCost");
        console.log(view);

        var nbFig = parseInt(Ext.getCmp(view.id+"-unitQte").getValue());
        var figCost = view.getData().cost;
        var optionsCost = 0;
        Ext.getCmp(view.id+"-options").getItems().each(function(option){
            if(!option.isXType("checkboxfield"))
                return;
            if(option.isChecked()){
                var costbyfigFactor = 1;
                if(option.getData().costbyfig){
                    costbyfigFactor = nbFig;
                }
                optionsCost += option.getData().cost*costbyfigFactor;
            }

        });
        view.unitCost = nbFig*figCost + optionsCost;
        Ext.getCmp(view.id+"-unitCostField").setHtml("<span style='font-size: 15px; font-weight: bold;'>Coût total</span>: "+view.unitCost+"pts");
    },
    engageUnit: function(){
        console.log("engageUnit");
    }
});