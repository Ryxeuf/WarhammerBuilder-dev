Ext.define('WarhammerBuilder.view.desktop.Army.ComposeArmy.UnitComposition', {
    extend: 'Ext.Panel',
    alias: 'widget.unitcomposition',
    requires:[
        'Ext.field.Spinner',
        'Ext.field.Checkbox'
    ],
    config: {
        title: "Unité",
        styleHtmlContent: true
    },

    unitCost: 0
});
