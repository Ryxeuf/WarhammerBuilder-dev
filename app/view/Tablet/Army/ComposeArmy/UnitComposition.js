Ext.define('WarhammerBuilder.view.tablet.Army.ComposeArmy.UnitComposition', {
    extend: 'Ext.Panel',
    alias: 'widget.unitcomposition',
    requires:[
        'Ext.field.Spinner',
        'Ext.field.Checkbox'
    ],
    config: {
        title: "Unité",
        styleHtmlContent: true
    },

    unitCost: 0,
    updateData: function(datas){
        this.callParent(arguments);
        var me = this;
        this.unitCost = 0;
        console.log("UnitComposition :: updateData");
        console.log(this);
        console.log(datas);
        this.removeAll();
        var items = [];

        this.unitCost += datas.cost*datas.min;

        var options = [];
        datas.options.forEach(function(option){
            options.push({
                xtype: 'checkboxfield',
                name : option.name,
                label: option.name,
                data: option,
                listeners:[
                    {
                        event: 'check',
                        fn: function(){ me.parent.parent.fireEvent("updateCost", me); }
                    },
                    {
                        event: 'uncheck',
                        fn: function(){ me.parent.parent.fireEvent("updateCost", me); }
                    }
                ]
            });
        });
        options = (options.length != 0)? options: { html: "<i>Aucune option disponible</i>" };

        var tpl = {
            xtype: "panel",
            items:[
                {
                    html: "<div><span style='font-size: 15px; font-weight: bold;'>Coût</span> <div style='position: relative; right: 0px; float: right;'>"+datas.cost+"pts</div></div>"
                },
                {
                    id: me.id+"-unitQte",
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
                            fn: function(){ me.parent.parent.fireEvent("updateCost", me); }
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
                            id: me.id+"-options",
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
                            id: me.id+"-unitCostField",
                            html: "<span style='font-size: 15px; font-weight: bold;'>Coût total</span>: "+this.unitCost+"pts",
                            flex: 1
                        },
                        {
                            html: "",
                            flex: 2
                        },
                        {
                            xtype: "button",
                            html: "Engager",
                            flex: 1
                        }
                    ]
                }
            ]
        };
        items.push(tpl);

        this.setItems(items);
    }
});
