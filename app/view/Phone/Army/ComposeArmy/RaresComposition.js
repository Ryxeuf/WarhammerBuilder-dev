Ext.define('WarhammerBuilder.view.phone.Army.ComposeArmy.RaresComposition', {
    extend: 'Ext.Panel',
    alias: 'widget.rarescomposition',
    config: {
        title: "Rares",
        items:[
            {
                xtype: "selectfield",
                id: "rareSelection",
                displayField: "name",
                valueField: "name",
                flex: 3,
                usePicker: "auto",
                listeners:[
                    {
                        event: 'change',
                        fn: function() { this.parent.parent.fireEvent("configureRareUnit"); }

                    }
                ]
            },
            {
                xtype: "unitcomposition",
                id: "rareUnitComposition"
            },
            {
                xtype: "list",
                id: "raresChosen",
                itemTpl: new Ext.XTemplate(
                    "{name} :: "
                )
            }
        ]
    }
});
