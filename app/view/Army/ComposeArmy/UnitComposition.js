Ext.define('WarhammerBuilder.view.Army.ComposeArmy.UnitComposition', {
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

    updateData: function(datas){
        this.callParent(arguments);
        console.log("UnitComposition :: updateData");
        console.log(this);
        console.log(datas);
        this.removeAll();
        var items = [];

        var options = [];
        datas.options.forEach(function(option){
            options.push({
                xtype: 'checkboxfield',
                name : option.name,
                label: option.name
            });
        });
        options = (options.length != 0)? options: { html: "<i>Aucune option disponible</i>" };

        var tpl = {
            xtype: "container",
            items:[
                {
                    html: "<div><span style='font-size: 15px; font-weight: bold;'>Coût</span> <div style='position: relative; right: 0px; float: right;'>"+datas.cost+"pts</div></div>"
                },
                {
                    xtype: 'spinnerfield',
                    label: "Quantité",
                    groupButtons: false,
                    stepValue: 1,
                    minValue: datas.min,
                    maxValue: (datas.max == 0)? 100000:datas.max,
                    value: datas.min
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
                            layout: "vbox",
                            flex: 5,
                            items: options
                        }
                    ]
                },
                {
                    xtype: "button",
                    html: "Engager"
                }
            ]
        };
        items.push(tpl);

        this.setItems(items);
    }
});
