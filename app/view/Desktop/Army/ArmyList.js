Ext.define('WarhammerBuilder.view.desktop.Army.ArmyList', {
    extend: 'Ext.List',
    alias: 'widget.armylist',
    config: {
        // styleHtmlContent: true,
        height: "200px",
        title: "Liste des armées",
        store: "ArmyStore",
        itemTpl: "-{name}-"
    }
});
