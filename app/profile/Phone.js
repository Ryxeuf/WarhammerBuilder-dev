Ext.define('WarhammerBuilder.profile.Phone',{
    extend: 'Ext.app.Profile',
    requires:[
        "WarhammerBuilder.view.Phone.Main",
        "WarhammerBuilder.view.Phone.Army.ArmyList",
        "WarhammerBuilder.view.Phone.Army.ComposeArmy",
        "WarhammerBuilder.view.Phone.Army.ComposeArmy.LordsComposition",
        "WarhammerBuilder.view.Phone.Army.ComposeArmy.HeroesComposition",
        "WarhammerBuilder.view.Phone.Army.ComposeArmy.CoresComposition",
        "WarhammerBuilder.view.Phone.Army.ComposeArmy.SpecialsComposition",
        "WarhammerBuilder.view.Phone.Army.ComposeArmy.RaresComposition",
        "WarhammerBuilder.view.Phone.Army.ComposeArmy.UnitComposition"
    ],
    config:{
        // views:[
        //     'Main'
        // ]
    },
    isActive: function(){
        return Ext.os.is.Phone;
    },
    launch: function(){
        console.log("Phone Profile");
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('WarhammerBuilder.view.Phone.Main'));
    }
});