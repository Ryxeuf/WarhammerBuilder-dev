Ext.define('WarhammerBuilder.profile.Desktop',{
    extend: 'Ext.app.Profile',
    config:{
        name: 'Desktop',
        views:[
            'Main',
            'Army.ArmyList',
            'Army.ComposeArmy',
            'Army.ComposeArmy.LordsComposition',
            'Army.ComposeArmy.HeroesComposition',
            'Army.ComposeArmy.CoresComposition',
            'Army.ComposeArmy.SpecialsComposition',
            'Army.ComposeArmy.RaresComposition',
            'Army.ComposeArmy.UnitComposition',
        ]
    },
    isActive: function(){
        return Ext.os.is.Desktop;
    },
    launch: function(){
        console.log("Desktop Profile");
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('widget.main'));
    }
});