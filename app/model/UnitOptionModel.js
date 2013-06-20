Ext.define('WarhammerBuilder.model.UnitOptionModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'cost', type: 'int' },
            { name: 'costbyfig', type: 'boolean', defaultValue: false }
        ]
    }
});