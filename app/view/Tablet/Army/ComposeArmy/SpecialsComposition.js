Ext.define('WarhammerBuilder.view.Army.ComposeArmy.SpecialsComposition', {
    extend: 'Ext.Panel',
    alias: 'widget.specialscomposition',
    config: {
        title: "Spéciales",
        items:[
            {
                xtype: "selectfield",
                id: "specialSelection",
                displayField: "name",
                valueField: "name",
                flex: 3,
                usePicker: "auto",
                listeners:[
                    {
                        event: 'change',
                        fn: function() { this.parent.parent.fireEvent("configureSpecialUnit"); }

                    }
                ]
            },
            {
                xtype: "unitcomposition",
                id: "specialUnitComposition"
            },
            {
                xtype: "list",
                id: "specialsChosen",
                itemTpl: new Ext.XTemplate(
                    "{name} :: "
                )
            }
        ]
    }
});
