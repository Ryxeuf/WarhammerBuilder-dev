Ext.define('WarhammerBuilder.model.UnitOptionModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'cost', type: 'float' },
            { name: 'optiontype', type: 'string', defaultValue: "option" },
            { name: 'maxcost', type: 'int', defaultValue: 0 },
            { name: 'optiongroup', type: 'string', defaultValue: null },
            { name: 'available', type: 'boolean', defaultValue: true },
            { name: 'costbyfig', type: 'boolean', defaultValue: false }
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