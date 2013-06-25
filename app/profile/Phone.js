Ext.define('WarhammerBuilder.profile.Phone',{
    extend: 'Ext.app.Profile',
    config:{
        name: 'Phone',
        views:[
            'Main',
            'Army.ArmyList',
            'Army.ComposeArmy',
            'Army.ComposeArmy.LordsComposition',
            'Army.ComposeArmy.HeroesComposition',
            'Army.ComposeArmy.CoresComposition',
            'Army.ComposeArmy.SpecialsComposition',
            'Army.ComposeArmy.RaresComposition',
            'Army.ComposeArmy.UnitComposition'
        ]
    },
    isActive: function(){
        return Ext.os.is.Phone;
    },
    launch: function(){
        console.log("Phone Profile");
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('WarhammerBuilder.view.phone.Main'));
    }
});