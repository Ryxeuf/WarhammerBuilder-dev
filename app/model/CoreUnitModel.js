Ext.define('WarhammerBuilder.model.CoreUnitModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'cost', type: 'int' },
            { name: 'min', type: 'int' },
            { name: 'max', type: 'int' },
            { name: 'cost', type: 'int' },
            { name: 'finalcost', type: 'int' },
            { name: 'corepoints', type: 'boolean', defaultValue: true }
        ],

        hasMany: [
            {
                model: 'WarhammerBuilder.model.UnitOptionModel',
                associationKey:'options',
                name: "options"
            }
        ]
    }
});