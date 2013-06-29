Ext.define('WarhammerBuilder.view.desktop.Army.ComposeArmy.MagicalObjectList', {
    extend: 'Ext.List',
    alias: 'widget.magicalobjectlist',
    config: {
        title: "Objets magiques",
        // id: "magicalObjectList",
        // styleHtmlContent: true,
        itemTpl: "{name} <i style='position: relative; float: right;'>{cost} pts</i>",
        mode: 'multi',
        grouped: true,
        onItemDisclosure: function(record, target){
            console.log(record);
            console.log(target);
            this.parent.fireEvent("magicalObjectInfos", record);
        }
    }
});
