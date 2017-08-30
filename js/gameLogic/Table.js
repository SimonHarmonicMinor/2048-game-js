function Table($cells, $currScore) {
    var self = this;
    var cells = [];
    var currentNumber = 2;
    var currentScore = 0;

    function convertToSimpleArray(array) {
        var res = [];
        for (var i = 0; i < array.length; i++) {
            if (!Array.isArray(array[i])) {
                res.push(array[i]);
            }
            else {
                res = res.concat(convertToSimpleArray(array[i]));
            }
        }
        return res;
    }

    function getValuesFromRowCell(cellRow, isReversed)
    {
        var answer = [];
        var addedScore = 0;
        for (var i = 0; i < cellRow.length; i++)
        {
            var val = cellRow[i].getValue();
            if (val !== null && val !== undefined) {
                answer.push(val);
            }
        }

        for (i = 1; i < answer.length; i++) {
            if (answer[i - 1] === answer[i]) {
                answer[i] *= 2;
                addedScore += answer[i];
                answer.splice(i - 1, 1);
            }
        }

        if (isReversed) {
            var count = cellRow.length - answer.length;
            for (i = 0; i < count; i++) {
                answer.unshift(null);
            }
        }
        return {
            answer: answer,
            score: addedScore
        };
    }

    function getRowOrColumn(index, rowOrColumn) {
        if (rowOrColumn === 'row') {
            return cells[index];
        }
        else if (rowOrColumn === 'column') {
            var answer = [];
            for (var i = 0; i < cells.length; i++) {
                answer.push(cells[i][index]);
            }
            return answer;
        }
    }
    
    function addNextNumberToRandomCell() {

        var newCell;
        do {
            newCell = cells[Math.floor(Math.random() * cells.length)]
                                [Math.floor(Math.random() * cells.length)]

        }while(newCell.getValue() !== null && newCell.getValue() !== undefined);

        newCell.setValue(currentNumber);
    }

    function changeScore(val) {
        currentScore += val;
    }

    function setScore(val) {
        $currScore.html(val ? val : currentScore);
    }

    this.initTable = function() {
        for (var i = 0; i < 4; i++)
        {
            var cell_row = [];
            for (var j = 0; j < 4; j++)
            {
                cell_row.push(new Cell($cells.eq(4 * i + j), i, j).initCell());
            }
            cells.push(cell_row);
        }
        cells[Math.floor(Math.random() * cells.length)]
                [Math.floor(Math.random() * cells.length)]
                .setValue(currentNumber);
        return self;
    };

    this.clearTable = function () {
        convertToSimpleArray(cells).forEach(function (t) {
            t.setValue();
        });
        setScore(0);
    };

    // сдвинуть ячейки в зависимости от нажатой кнопки
    this.actionMove = function (direction) {

        var isReversed = false;
        var rowOrColumn;
        if (direction === 'right' || direction === 'bottom') {
            isReversed = true;
        }

        if (direction === 'left' || direction === 'right') {
            rowOrColumn = 'row';
        }
        else if (direction === 'top' || direction === 'bottom') {
            rowOrColumn = 'column';
        }
        else {
            throw ReferenceError('ActionMove(direction): \nРазрешенные параметры direction:' +
                'left, right, top, bottom');
        }

        for (var i = 0; i < cells.length; i++)
        {
            var result = getValuesFromRowCell(getRowOrColumn(i, rowOrColumn), isReversed);
            var values = result.answer;
            var addedScore = result.score;
            changeScore(addedScore);
            setScore();
            for (var j = 0; j < cells[i].length; j++)
            {
                var cellValue = j < values.length ? values[j] : null;
                if (rowOrColumn === 'row')
                    cells[i][j].setValue(cellValue);
                else
                    cells[j][i].setValue(cellValue);
            }
        }



        addNextNumberToRandomCell();
    }
}