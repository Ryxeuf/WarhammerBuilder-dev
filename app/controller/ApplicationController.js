Ext.define('WarhammerBuilder.controller.ApplicationController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: 'main',
            armyList: "armylist",
            composeArmy: "composearmy",
            unitComposition: "unitcomposition"
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
            },
            unitComposition:{
                updatedata: "updateUnitData"
            }
        }
    },

    backHome: function(){
        console.log("backHome");
        Ext.Viewport.remove(this.getComposeArmy(), true);
        Ext.Viewport.setActiveItem(this.getMainView());
    },






    /*********************************************************************************************************************/
    /*********************************************************************************************************************/
                    /**                 Initialisation des vues de l'application                   **/
    /*********************************************************************************************************************/
    /*********************************************************************************************************************/
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






    /*********************************************************************************************************************/
    /*********************************************************************************************************************/
                        /**                 Configuration d'une unité                   **/
    /*********************************************************************************************************************/
    /*********************************************************************************************************************/
    updateUnitData: function(view, datas){
        // view.updateData(arguments);
        var me = this;
        view.unitCost = 0;
        console.log("UnitComposition :: updateData");
        console.log(view);
        console.log(datas);
        view.removeAll();
        var items = [];

        view.unitCost += datas.cost*datas.min;

        var options = [];
        datas.options.forEach(function(option){
            options.push(me.generateCheckOption(view, option));
        });
        options = (options.length != 0)? options: { html: "<i>Aucune option disponible</i>" };

        var tpl = {
            xtype: "panel",
            items:[
                {
                    html: "<div><span style='font-size: 15px; font-weight: bold;'>Coût</span> <div style='position: relative; right: 0px; float: right;'>"+datas.cost+"pts</div></div>"
                },
                {
                    id: view.id+"-unitQte",
                    xtype: 'spinnerfield',
                    label: "Quantité",
                    groupButtons: false,
                    stepValue: 1,
                    minValue: datas.min,
                    maxValue: (datas.max == 0)? 100000:datas.max,
                    value: datas.min,
                    listeners:[
                        {
                            event: 'change',
                            fn: function(){ view.parent.parent.fireEvent("updateCost", view); }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: "hbox",
                    items: [
                        {
                            html: "<span style='font-size: 15px; font-weight: bold;'>Options</span>",
                            flex: 1
                        },
                        {
                            xtype: "panel",
                            id: view.id+"-options",
                            layout: "vbox",
                            flex: 5,
                            items: options
                        }
                    ]
                },
                {
                    xtype: "container",
                    layout: "hbox",
                    items:[
                        {
                            id: view.id+"-unitCostField",
                            html: "<span style='font-size: 15px; font-weight: bold;'>Coût total</span>: "+view.unitCost+"pts",
                            flex: 1
                        },
                        {
                            html: "",
                            flex: 2
                        },
                        {
                            xtype: "button",
                            html: "Engager",
                            flex: 1,
                            listeners:[
                                {
                                    event: 'tap',
                                    fn: function(){ view.parent.parent.fireEvent("engageUnit", view); }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        items.push(tpl);

        view.setItems(items);
    },
    generateCheckOption: function(view, option){
        var me = this;
        return {
            xtype: 'checkboxfield',
            name : option.name,
            label: option.name+" <i style='position: relative; float: right;'>"+option.cost+" pts"+((option.costbyfig)?" / fig":"")+"</i>",
            labelWidth: "90%",
            data: option,
            listeners:[
                {
                    event: 'check',
                    fn: function(){ 
                        me.checkOption(this, view);
                        view.parent.parent.fireEvent("updateCost", view); 
                    }
                },
                {
                    event: 'uncheck',
                    fn: function(){ 
                        me.uncheckOption(this, view);
                        view.parent.parent.fireEvent("updateCost", view); 
                    }
                }
            ]
        };
    },
    checkOption: function(item, view){
        console.log("checkOption");
        console.log(item);
        var me = this;
        var option = item.getData();
        // On désactive les autres options appartenant au même groupe pour éviter des choix impossibles
        item.up().getItems().each(function(element){
            if(element.getData().optiongroup != null && item.getData().optiongroup == element.getData().optiongroup && element.getData().name != item.getData().name){
                element.disable();
            }
        });
        // TODO: On ajoute les sous-options dûes à la sélection
        var options = [];
        option.options.forEach(function(suboption){
            options.push(me.generateCheckOption(view, suboption));
        });
        // item.setItems(options);
    },
    uncheckOption: function(item, view){
        console.log("uncheckOption");
        var me = this;
        var option = item.getData();
        // Comme l'option esrt annulée, on réactive les autres options du même groupe
        item.up().getItems().each(function(element){
            if(element.getData().optiongroup != null && item.getData().optiongroup == element.getData().optiongroup){
                element.enable();
            }
        });
        // TODO: On retire les sous-options dûes à la désélection
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






    /*********************************************************************************************************************/
    /*********************************************************************************************************************/
                        /**                 Engagement d'une unité                   **/
    /*********************************************************************************************************************/
    /*********************************************************************************************************************/
    engageUnit: function(view){
        console.log("engageUnit");
        console.log(view);
        console.log(view.up());
    }
});