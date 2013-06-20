Ext.define('WarhammerBuilder.model.SpecialUnitModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'min', type: 'int' },
            { name: 'max', type: 'int' },
            { name: 'cost', type: 'float' },
            { name: 'finalcost', type: 'float' },
            { name: 'magicalobjects', type: 'boolean', defaultValue: false },
            { name: 'maxmagicalobjectscost', type: 'int' }
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