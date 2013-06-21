Ext.define('WarhammerBuilder.view.tablet.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.field.Select'
    ],
    config: {
        tabBarPosition: 'bottom',
        styleHtmlContent: true,

        items: [
            {
                title: '',
                iconCls: 'home',

                styleHtmlContent: true,

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Warhammer Builder'
                    },
                    {
                        xtype: "panel",

                        items:[
                            {
                                html: "<h3 style='text-align: center;'>Renseignez le nombre de points puis choisissez votre armée pour commencer</h3><br>"
                            },
                            {
                                xtype: "textfield",
                                id: "armyPts",
                                value: "2000",
                                placeHolder: "000"
                            },
                            {
                                xtype: "armylist",
                                itemTpl: "{name}"
                            }/*,
                            {
                                xtype: "selectfield",
                                store: "ArmyStore",
                                displayField: "name",
                                placeHolder: "Armée"
                            },
                            {
                                xtype: "button",
                                id: "startArmy",
                                html: "C'est parti !",
                                ui: "round"
                            }*/
                        ]
                    }
                ]
            },
            {
                title: '',
                iconCls: 'action',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'A propos'
                },

                html: "Les droits sont réservés sur Tablette."
            }
        ]
    }
});
