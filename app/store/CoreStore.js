Ext.define('WarhammerBuilder.store.CoreStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WarhammerBuilder.model.CoreUnitModel'
        // autoLoad: true,

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