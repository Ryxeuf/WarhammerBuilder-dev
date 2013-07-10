Ext.define('WarhammerBuilder.store.LordStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WarhammerBuilder.model.HeroUnitModel'
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