Ext.define('WarhammerBuilder.model.MagicalObjectModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'cost', type: 'float' },
            { name: 'type', type: 'string' }
        ]
    }
});