Ext.define('WarhammerBuilder.store.PlayerArmyStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WarhammerBuilder.model.ArmyModel',
        autoLoad: true

        // proxy: {
        //     type: "ajax",
        //     url: "resources/data/armies.json",
        //     reader: {
        //         type: 'json',
        //         rootProperty: 'armies'
        //     }
        // }
    }
});