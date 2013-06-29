Ext.define('WarhammerBuilder.store.MagicalObjectStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'WarhammerBuilder.model.MagicalObjectModel',
        autoLoad: true,
        grouper: {
            groupFn: function(record) {
                return record.get('type');
            }
        },
        proxy: {
            type: "ajax",
            url: "resources/data/magicalobjects.json",
            reader: {
                type: 'json',
                rootProperty: 'magicalobjects'
            }
        }
    }
});