Ext.define('WarhammerBuilder.view.tablet.Army.ComposeArmy', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.composearmy',
    config: {
        title: "Construction de l'armée",
        tabBarPosition: 'right',
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
                        align: 'left',
                        listeners:[
                            {
                                event: "tap",
                                fn: function(){ this.parent.parent.parent.fireEvent("backButtonTap"); }
                            }
                        ]
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
            },
            {
                docked: 'bottom',
                xtype: 'titlebar',
                html: "0 pts",
                align: 'right'
            }
        ]
    },
    initialize: function(){
        this.callParent(arguments);
        console.log("Tablet ComposeArmy");
    }
});
