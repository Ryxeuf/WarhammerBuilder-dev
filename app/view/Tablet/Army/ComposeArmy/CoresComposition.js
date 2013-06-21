Ext.define('WarhammerBuilder.view.tablet.Army.ComposeArmy.CoresComposition', {
    extend: 'Ext.Panel',
    alias: 'widget.corescomposition',
    config: {
        title: "Bases",
        styleHtmlContent: true,
        items:[
            {
                xtype: "selectfield",
                id: "coreSelection",
                displayField: "name",
                valueField: "name",
                flex: 3,
                usePicker: "auto",
                listeners:[
                    {
                        event: 'change',
                        fn: function() { this.parent.parent.fireEvent("configureCoreUnit"); }

                    }
                ]
            },
            {
                xtype: "unitcomposition",
                id: "coreUnitComposition"
            },
            {
                xtype: "list",
                id: "coresChosen",
                itemTpl: new Ext.XTemplate(
                    "{name} :: "
                )
            }
        ]
    }
});
