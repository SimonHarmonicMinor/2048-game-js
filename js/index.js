$(document).ready(function () {

    var $page = $(document.body);
    var table;
    $page.find('.js-game-start-button').on('click', startGame);
    var $cells = $page.find('.js-game-cell');

    function startGame() {
        clearField();
        table = new Table($cells, $('.js-game-score')).initTable();
    }
    
    function clearField() {
        if (!table) return null;
        else {
            table.clearTable();
        }
    }

    $page.keydown(function (e) {
        var keyCode = e.keyCode;

        // влево или a
        if (keyCode === 37 || keyCode === 65) {
            table.actionMove('left');
        }

        // вправо или d
        else if (keyCode === 39 || keyCode === 68) {
            table.actionMove('right');
        }

        // вверх или w
        else if (keyCode === 38 || keyCode === 87) {
            table.actionMove('top');
        }

        // вниз или s
        else if (keyCode === 40 || keyCode === 83) {
            table.actionMove('bottom');
        }
    })
});