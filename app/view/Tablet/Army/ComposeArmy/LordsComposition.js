Ext.define('WarhammerBuilder.view.tablet.Army.ComposeArmy.LordsComposition', {
    extend: 'Ext.Panel',
    alias: 'widget.lordscomposition',
    config: {
        title: "Seigneurs",
        items:[
            {
                xtype: "selectfield",
                id: "lordSelection",
                displayField: "name",
                valueField: "name",
                autoCapitalize: true,
                usePicker: "auto",
                listeners:[
                    {
                        event: 'change',
                        fn: function() { this.parent.parent.fireEvent("configureLordUnit"); }

                    }
                ]
            },
            {
                xtype: "unitcomposition",
                id: "lordUnitComposition"
            },
            {
                xtype: "list",
                id: "lordUnitComposition-chosen"
            }
        ]
    }
});
