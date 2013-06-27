Ext.define('WarhammerBuilder.model.CoreUnitModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'min', type: 'int' },
            { name: 'max', type: 'int' },
            { name: 'cost', type: 'float' },
            { name: 'finalcost', type: 'float', defaultValue: 0 },
            { name: 'magicalobjects', type: 'boolean', defaultValue: false },
            { name: 'maxmagicalobjectscost', type: 'int', defaultValue: 0 },
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