Ext.define('WarhammerBuilder.store.SpecialStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WarhammerBuilder.model.SpecialUnitModel'
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