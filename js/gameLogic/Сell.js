

function Cell($cellObj, i, j) {
    var self = this;
    var $cell = $cellObj;
    var value = null;
    var color = null;

    this.initCell = function () {
        $cell.addClass('background-slow-change');
        return self;
    };

    this.setValue = function (val) {
        value = val;
        $cell.html(value ? value : '');

        var prevColor = color;
        color = getClassColorOfValue(value);
        if (prevColor === color) {
            prevColor = null;
        }
        setColor($cell, color, prevColor);
        return self;
    };


    this.getValue = function () {
        return value;
    };


    function getClassColorOfValue(value) {
        if (value === undefined || value === null) {
            return null;
        }
        value = value <= 2048 ? value : 2048;
        return 'background-' + value;
    }

    function setColor($cell, classColor, prevClassColor) {
        if (!color) {
            $cell.addClass('background-default');
        }
        else {
            $cell.removeClass('background-default');
            $cell.addClass(classColor);
        }
        if (prevClassColor) {
            $cell.removeClass(prevClassColor);
        }
    }


}