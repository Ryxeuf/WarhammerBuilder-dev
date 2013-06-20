Ext.define('WarhammerBuilder.model.ArmyModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'image', type: 'string' },
            { name: 'description', type: 'string' }
        ],

        hasMany: [
            {
                model: 'WarhammerBuilder.model.CoreUnitModel',
                associationKey: 'cores',
                name: 'cores'
            },
            {
                model: 'WarhammerBuilder.model.HeroUnitModel',
                associationKey: 'heroes',
                name: 'heroes'
            },
            {
                model: 'WarhammerBuilder.model.SpecialUnitModel',
                associationKey: 'specials',
                name: 'specials'
            },
            {
                model: 'WarhammerBuilder.model.RareUnitModel',
                associationKey: 'rares',
                name: 'rares'
            },
            {
                model: 'WarhammerBuilder.model.HeroUnitModel',
                associationKey: 'lords',
                name: 'lords'
            },
            {
                model: 'WarhammerBuilder.model.MagicalObjectModel',
                associationKey: 'magicobjects',
                name: 'magicobjects'
            }
        ]
    }
});