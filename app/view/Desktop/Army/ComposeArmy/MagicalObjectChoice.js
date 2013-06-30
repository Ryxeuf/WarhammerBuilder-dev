Ext.define('WarhammerBuilder.view.desktop.Army.ComposeArmy.MagicalObjectChoice', {
    extend: 'Ext.Sheet',
    alias: 'widget.magicalobjectchoice',
    config: {
        title: "Objets magiques",
        modal: true,
        showAnimation: "fadeIn",
        height: "90%",
        width: "90%",
        items:[
            {
                xtype: "magicalobjectlist",
                height: "96%",
                width: "100%"
            },
            {
                xtype: "button",
                html: "Valider",
                listeners:[
                    {
                        event: 'tap',
                        fn: function() { this.parent.parentView.parent.parent.fireEvent("validateMagicalObject", this.parent, this.parent.getAt(0)); }

                    }
                ]
            }
        ]
    },
    parentView: null,
    parentItem: null,
    initList: function(store, cost){
        console.log("initList");
        console.log(this.getAt(0));
        console.log(store);
        this.getAt(0).setStore(store);
    }
});
