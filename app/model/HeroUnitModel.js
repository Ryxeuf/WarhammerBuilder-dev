Ext.define('WarhammerBuilder.model.HeroUnitModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'min', type: 'int', defaultValue: 1 },
            { name: 'max', type: 'int', defaultValue: 1 },
            { name: 'cost', type: 'float' },
            { name: 'finalcost', type: 'float' },
            { name: 'magicalobjects', type: 'boolean', defaultValue: true },
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