Ext.define('WarhammerBuilder.profile.Tablet',{
    extend: 'Ext.app.Profile',
    config:{
        // views:[
        //     'Main'
        // ]
    },
    isActive: function(){
        return Ext.os.is.Tablet;
    },
    launch: function(){
        console.log("Tablet Profile");
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('WarhammerBuilder.view.Tablet.Main'));
    }
});