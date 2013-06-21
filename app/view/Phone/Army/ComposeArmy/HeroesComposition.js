Ext.define('WarhammerBuilder.view.Phone.Army.ComposeArmy.HeroesComposition', {
    extend: 'Ext.Panel',
    alias: 'widget.heroescomposition',
    config: {
        title: "Héros",
        items:[
            {
                xtype: "selectfield",
                id: "heroSelection",
                displayField: "name",
                valueField: "name",
                autoCapitalize: "on",
                usePicker: "auto",
                listeners:[
                    {
                        event: 'change',
                        fn: function() { this.parent.parent.fireEvent("configureHeroUnit"); }

                    }
                ]
            },
            {
                xtype: "unitcomposition",
                id: "heroUnitComposition"
            },
            {
                xtype: "list",
                id: "heroesChosen",
                itemTpl: new Ext.XTemplate(
                    "{name} :: "
                )
            }
        ]
    }
});
