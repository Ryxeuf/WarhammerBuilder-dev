Ext.define('WarhammerBuilder.view.Army.ComposeArmy', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.composearmy',
    config: {
        title: "Construction de l'armée",
        items:[
            {
                docked: 'top',
                xtype: 'titlebar',
                title: "Construction de l'armée",
                items:[
                    {
                        xtype: "button",
                        id: "backButton",
                        iconCls: "back",
                        iconMask: true,
                        align: 'left'
                    },
                    {
                        xtype: "button",
                        id: "saveArmyList",
                        iconCls: "data",
                        iconMask: true,
                        align: 'right'
                    }
                ]
            },
            {
                xtype: "lordscomposition"
            },
            {
                xtype: "heroescomposition"
            },
            {
                xtype: "corescomposition"
            },
            {
                xtype: "specialscomposition"
            },
            {
                xtype: "rarescomposition"
            }
        ]
    }
});
