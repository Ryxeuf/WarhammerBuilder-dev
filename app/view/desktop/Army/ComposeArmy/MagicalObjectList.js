Ext.define('WarhammerBuilder.view.desktop.Army.ComposeArmy.MagicalObjectList', {
    extend: 'Ext.List',
    alias: 'widget.magicalobjectlist',
    config: {
        title: "Objets magiques",
        id: "magicalObjectList",
        // styleHtmlContent: true,
        itemTpl: '{name}',
        mode: 'multi',

        data: []
    }
});
