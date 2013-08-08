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
                magicalObjectInfos: "displayMagicalObjectInfos",
                validateMagicalObject: "validateMagicalObject",
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
    playerarmy: null,
    magicalObjectList: null,
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

        // this.playerarmy = Ext.getStore("PlayerArmyStore");
        var armyStore = Ext.getStore("PlayerArmyStore");
        this.playerarmy = armyStore.getAt(0);
        console.log("this.playerarmy");
        console.log(this.playerarmy);

        Ext.getCmp("lordsChosen").setStore(this.playerarmy.lordsStore);
        Ext.getCmp("heroesChosen").setStore(this.playerarmy.heroesStore);
        Ext.getCmp("coresChosen").setStore(this.playerarmy.coresStore);
        Ext.getCmp("specialsChosen").setStore(this.playerarmy.specialsStore);
        Ext.getCmp("raresChosen").setStore(this.playerarmy.raresStore);

        Ext.getCmp("lordSelection").setStore(this.army.lordsStore);
        Ext.getCmp("heroSelection").setStore(this.army.heroesStore);
        Ext.getCmp("coreSelection").setStore(this.army.coresStore);
        Ext.getCmp("specialSelection").setStore(this.army.specialsStore);
        Ext.getCmp("rareSelection").setStore(this.army.raresStore);
        this.army.magicobjectsStore.setGrouper({
            groupFn: function(record) {
                return record.get('type');
            },
            sortProperty: 'type'
        });
        console.log("this.army.magicobjectsStore");
        console.log(this.army.magicobjectsStore);
        var objects = Ext.getStore("MagicalObjectStore");
        console.log("objects");
        console.log(objects);
        this.magicalObjectList = objects;
        // Ext.getCmp("magicalObjectList").setStore(objects);
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
            options = options.concat(me.generateOption(view, option));
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
        this.updateCost(view);
    },
    generateOption: function(view, option){
        var me = this;
        var options = [];
        var disabled = (option.parentoption == null)?false:true;
        switch(option.optiontype){
            case "choice":
                options.push({
                    xtype: "checkboxfield",
                    name : option.name,
                    label: option.name+" <i style='position: relative; float: right;'>"+option.cost+" pts"+((option.costbyfig)?" / fig":"")+"</i>",
                    labelWidth: "90%",
                    data: option,
                    disabled: disabled,
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
                });
            break;
            case "count":
                options.push({
                    xtype: "spinnerfield",
                    name : option.name,
                    label: option.name+" <i style='position: relative; float: right;'>"+option.cost+" pts"+((option.costbyfig)?" / fig":"")+"</i>",
                    labelWidth: "90%",
                    data: option,
                    hidden: disabled,
                    groupButtons: false,
                    stepValue: 1,
                    minValue: option.min,
                    maxValue: 100000,
                    value: option.min,
                    listeners:[
                        {
                            event: 'change',
                            fn: function(){ 
                                view.parent.parent.fireEvent("updateCost", view); 
                            }
                        }
                    ]
                });
            break;
            case "magicalobject":
                options.push(
                {
                    xtype: "magicoption",
                    hidden: disabled,
                    data: option,
                    selectedObjects: [],
                    cost: 0,
                    items: [
                        {
                            xtype: "checkboxfield",
                            name : option.name,
                            label: "Objet(s) magique(s) <i style='position: relative; float: right;'>0 pts</i>",
                            labelWidth: "90%",
                            data: option,
                            listeners:[
                                {
                                    event: 'check',
                                    fn: function(){ 
                                        me.checkOption(this, view);
                                        // view.parent.parent.fireEvent("updateCost", view); 
                                    }
                                },
                                {
                                    event: 'uncheck',
                                    fn: function(){ 
                                        me.uncheckOption(this, view);
                                        // view.parent.parent.fireEvent("updateCost", view); 
                                    }
                                }
                            ]
                        }
                    ]
                });

            break;
        }

        option.options.forEach(function(suboption){
            console.log("suboption");
            console.log(suboption);
            suboption.parentoption = option.name;
            options = options.concat(me.generateOption(view, suboption));
        });

        return options;
    },
    checkOption: function(item, view){
        console.log("checkOption");
        console.log(item);
        var me = this;

        if(item.getData().optiontype == "magicalobject"){
            console.log("OptionMagique");
            // console.log(element);
            // On se trouve sur une option de type "objet magique"
            var listmodal = Ext.create('widget.magicalobjectchoice');
            Ext.Viewport.add(listmodal);
            listmodal.initList(this.magicalObjectList, item.getData().cost);
            listmodal.parentView = view;
            listmodal.parentItem = item;
            listmodal.show();
        }else{
            // On désactive les autres options appartenant au même groupe pour éviter des choix impossibles
            item.up().getItems().each(function(element){
                if(element.getData().optiongroup != null && item.getData().optiongroup == element.getData().optiongroup && element.getData().name != item.getData().name){
                    element.disable();
                }
            });
            // On active (show) mes options débloquées par le cochage
            item.up().getItems().each(function(element){
                if(element.getData().parentoption != null && item.getData().name == element.getData().parentoption){
                    element.show();
                }
            });
        }
    },
    uncheckOption: function(item, view){
        console.log("uncheckOption");
        var me = this;
        var option = item.getData();

        if(item.getData().optiontype == "magicalobject"){
            // On se trouve sur une option de type "objet magique"
            item.parent.cost=0;
            item.parent.selectedObjects=[];
            this.updateCost(view);
        }else{        
            // Comme l'option esrt annulée, on réactive les autres options du même groupe
            item.up().getItems().each(function(element){
                if(element.getData().optiongroup != null && item.getData().optiongroup == element.getData().optiongroup){
                    element.enable();
                }
            });
            // On désactive (hide) mes options débloquées par le cochage
            item.up().getItems().each(function(element){
                if(element.getData().parentoption != null && item.getData().name == element.getData().parentoption){
                    element.hide();
                }
            });
        }
    },
    validateMagicalObject: function(modal, optionList){
        console.log("optionList");
        console.log(optionList);
        console.log(modal.parentItem);
        var checkbox = modal.parentItem;
        checkbox.parent.selectedObjects = optionList.getSelection();
        checkbox.parent.cost = 0;
        checkbox.parent.selectedObjects.forEach(function(object){
            checkbox.parent.cost += object.getData().cost;
        });
        checkbox.setLabel("Objet(s) magique(s) <i style='position: relative; float: right;'>"+checkbox.parent.cost+" pts</i>");
        modal.hide();
        this.updateCost(modal.parentView);
    },
    updateCost: function(view){
        console.log("updateCost");
        console.log(view);

        var nbFig = parseInt(Ext.getCmp(view.id+"-unitQte").getValue());
        var figCost = view.getData().cost;
        var optionsCost = 0;
        Ext.getCmp(view.id+"-options").getItems().each(function(option){
            switch(option.xtype){
                case "checkboxfield":
                    if(option.isChecked()){
                        var costbyfigFactor = 1;
                        if(option.getData().costbyfig){
                            costbyfigFactor = nbFig;
                        }
                        optionsCost += option.getData().cost*costbyfigFactor;
                    }
                break;
                case "spinnerfield":
                    optionsCost += option.getData().cost*option.getValue();
                break;
                case "magicoption":
                    console.log("magicoption");
                    console.log(option);
                    option.getItems().getAt(0).setLabel("Objet(s) magique(s) <i style='position: relative; float: right;'>"+option.cost+" pts</i>");
                    optionsCost += option.cost;
                break;
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
        var unit = view.up().getItems().getAt(0).getRecord().copy();

        var nbFig = parseInt(Ext.getCmp(view.id+"-unitQte").getValue());
        var figCost = view.getData().cost;
        var optionsCost = 0;
        Ext.getCmp(view.id+"-options").getItems().each(function(option, index){
            switch(option.xtype){
                case "checkboxfield":
                    if(option.isChecked()){
                        var costbyfigFactor = 1;
                        if(option.getData().costbyfig){
                            costbyfigFactor = nbFig;
                        }
                        optionsCost += option.getData().cost*costbyfigFactor;
                    }
                break;
                case "spinnerfield":
                    optionsCost += option.getData().cost*option.getValue();
                break;
                case "magicoption":
                    option.getItems().getAt(0).setLabel("Objet(s) magique(s) <i style='position: relative; float: right;'>"+option.cost+" pts</i>");
                    optionsCost += option.cost;
                break;
            }

        });
        unit.getData().finalcost = nbFig*figCost + optionsCost;
        // Ext.getCmp(view.id+"-unitCostField").setHtml("<span style='font-size: 15px; font-weight: bold;'>Coût total</span>: "+view.unitCost+"pts");


        // Ajout de l'unité à la liste
        switch(view.id){
            case 'lordUnitComposition':
                this.playerarmy.lordsStore.add(unit);
            break;
            case 'heroUnitComposition':
                this.playerarmy.heroesStore.add(unit);
            break;
            case 'coreUnitComposition':
                this.playerarmy.coresStore.add(unit);
            break;
            case 'specialUnitComposition':
                this.playerarmy.specialsStore.add(unit);
            break;
            case 'rareUnitComposition':
                this.playerarmy.raresStore.add(unit);
            break;
        }
        console.log(unit);
    },




    displayMagicalObjectInfos: function(record){
        Ext.Msg.alert(null, record.get("description"), Ext.emptyFn);
    }
});