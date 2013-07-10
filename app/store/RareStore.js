Ext.define('WarhammerBuilder.store.RareStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WarhammerBuilder.model.RareUnitModel'
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