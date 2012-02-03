yate.AST.arglist_item = {};

yate.AST.arglist_item.action = function() {
    var vars = this.parent.parent.Body.Block.scope.vars; // FIXME: Очень уж хрупкая конструкция.
                                                         // NOTE: Смысл в том, что в AST параметры и блок на одном уровне, а отдельный scope создается
                                                         //       только для блока. И аргументы нужно прописывать именно туда.
    var name = this.Name;
    if (vars[name]) {
        this.error('Повторное определение аргумента ' + this.Name);
    }

    this.Vid = this.state.vid++;
    this.Type = yate.AST.var_type.ARGUMENT;

    vars[name] = this;
};

yate.AST.arglist_item._getType = function() {
    if (this.Typedef == 'nodeset') { return 'nodeset'; }
    if (this.Typedef == 'boolean') { return 'boolean'; }
    return 'scalar';
};

