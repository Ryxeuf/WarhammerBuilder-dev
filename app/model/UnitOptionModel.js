Ext.define('WarhammerBuilder.model.UnitOptionModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'cost', type: 'float' },
            { name: 'costbyfig', type: 'boolean', defaultValue: false }
        ]
    }
});