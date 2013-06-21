Ext.define('WarhammerBuilder.profile.Desktop',{
    extend: 'Ext.app.Profile',
    requires:[
        "WarhammerBuilder.view.Desktop.Main",
        "WarhammerBuilder.view.Desktop.Army.ArmyList",
        "WarhammerBuilder.view.Desktop.Army.ComposeArmy",
        "WarhammerBuilder.view.Desktop.Army.ComposeArmy.LordsComposition",
        "WarhammerBuilder.view.Desktop.Army.ComposeArmy.HeroesComposition",
        "WarhammerBuilder.view.Desktop.Army.ComposeArmy.CoresComposition",
        "WarhammerBuilder.view.Desktop.Army.ComposeArmy.SpecialsComposition",
        "WarhammerBuilder.view.Desktop.Army.ComposeArmy.RaresComposition",
        "WarhammerBuilder.view.Desktop.Army.ComposeArmy.UnitComposition"
    ],
    config:{
        // views:[
        //     'Main'
        // ]
    },
    isActive: function(){
        return Ext.os.is.Desktop;
    },
    launch: function(){
        console.log("Desktop Profile");
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('WarhammerBuilder.view.Desktop.Main'));
    }
});