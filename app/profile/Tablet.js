Ext.define('WarhammerBuilder.profile.Tablet',{
    extend: 'Ext.app.Profile',
    config:{
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
        return Ext.os.is.Tablet;
    },
    launch: function(){
        console.log("Tablet Profile");
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('WarhammerBuilder.view.tablet.Main'));
    }
});