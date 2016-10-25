/**
 * Created by ubuntu64 on 7/1/16.
 */

var Model = {
    guid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    },
    inherited: function () {
    },
    created: function () {
    },
    findById: function(id) {
        if(this.records[id]){
            return this.records[id];
        }
        throw('Unknown record');
    },
    prototype: {
        init: function () {
        },
        newRecord: true,
        create: function() {
            if(!this.id){
                this.id = this.parent.guid();
            }
            this.newRecord = false;
            this.parent.records[this.id] = this;
        },
        destroy: function() {
            delete this.parent.records[this.id];
        },
        update: function() {
            this.parent.records[this.id] = this;
        },
        save: function() {
            this.newRecord ? this.create() : this.update;
        }
    },
    create: function () {
        this.records = {};
        //创建一个新对象，继承Model
        var object = Object.create(this);

        object.parent = this;

        object.prototype = object.fn = Object.create(this.prototype);

        object.created();
        this.inherited(object);
        return object;
    },
    init: function () {
        var instance = Object.create(this.prototype);
        instance.parent = this;
        instance.init.apply(instance, arguments);
        return instance;
    },
    extend: function (o) {
        if (typeof o !== 'object') {
            throw new TypeError('参数类型错误。需要传入object类型参数，但传入的却是： ' + typeof o);
        }

        var extended = o.extended;
        for (var i in o) {
            this[i] = o[i];
        }
        if (extended) {
            if (typeof extended !== 'function') {
                throw new TypeError('extended属性的类型错误。需要的类型为function，而实际却是： ' + typeof extended);
            }
            extended(this);
        }
    },
    include: function (o) {
        if (typeof o !== 'object') {
            throw new TypeError('参数类型错误。需要传入object类型参数，但传入的却是： ' + typeof o);
        }

        var included = o.included;
        for (var i in o) {
            this.prototype[i] = o[i];
        }
        if (included) {
            if (typeof extended !== 'function') {
                throw new TypeError('included属性的类型错误。需要的类型为function，而实际却是： ' + typeof included);
            }
            included(this);
        }
    }
};
