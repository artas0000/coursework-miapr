let isDrawTableCoordinateDescent = false;


document.querySelector('#coordinate_descent').addEventListener('click', () => {

    if (isDrawTableGradientDescent) {
        document.querySelector('.gradient_descent_table').remove();
        isDrawTableGradientDescent = false;
    }

    if (isDrawTableSteepestDescent) {
        document.querySelector('.steepest_descent_table').remove();
        isDrawTableSteepestDescent = false;
    }

    if (isDrawTableCoordinateDescent) {
        document.querySelector('.coordinate_descent_table').remove();
        isDrawTableCoordinateDescent = false;
    }

    let eps = 0.01;

    function funcXY(x1, x2) {
        return ((2 * x1 * x1) + (x2 * x2) - (x1 * x2));
    }

    function lambda1(x1, x2) {
        return (0.25 * x2 - x1)
    }

    function lambda2(x1, x2) {
        return (0.5 * x1 - x2)
    }

    let x1 = Number(document.querySelector('#x1').value),
        x2 = Number(document.querySelector('#x2').value),
        vector = 1;
        let resultMatrix = [
            [0 ,x1, x2, funcXY(x1, x2), '-', vector]
        ]
    let i = 0;
    while (true) {
        i++;
        let x1buff = x1,
            x2buff = x2;
        let lambda = 0;
        if (vector === 1) {
            lambda = lambda1(x1, x2);
            x1 = Number(x1buff) + lambda1(x1, x2);
        }

        if (vector === 2) {
            lambda = lambda2(x1, x2);
            x2 = Number(x2buff) + lambda2(x1, x2);
        }

        vector = vector === 1 ? 2 : 1;

        
        resultMatrix.push(
            [i, x1.toFixed(4), x2.toFixed(4), funcXY(x1, x2).toFixed(6), lambda.toFixed(6), vector]
        )
        console.log('x1: ' + x1.toFixed(4) + ' x2: ' + x2.toFixed(4) + ' func: ' + funcXY(x1, x2).toFixed(6))
        if (Math.abs(x1 - x1buff) < eps && vector === 2) {
            break;
        }

        if (Math.abs(x2 - x2buff) < eps && vector === 1) {
            break;
        }
        
    }

    if (!isDrawTableCoordinateDescent) {
        let table = document.createElement('table');
        table.className = "coordinate_descent_table"
        document.querySelector('.method__solution_wrapper').append(table);

        let tableHead = document.createElement('tr');
        tableHead.className = "table__head";
        table.append(tableHead);
        let td0 = document.createElement('th');
        let td1 = document.createElement('th');
        let td2 = document.createElement('th');
        let td3 = document.createElement('th');
        let td4 = document.createElement('th');
        let td5 = document.createElement('th');
        tableHead.append(td0);
        tableHead.append(td1);
        tableHead.append(td2);
        tableHead.append(td3);
        tableHead.append(td4);
        tableHead.append(td5);
        td0.innerText = '№';
        td1.innerText = 'X1';
        td2.innerText = 'X2';
        td3.innerText = 'F(X1, X2)';
        td4.innerText = 'λ';
        td5.innerText = 'Vector';
        for (let i = 0; i < resultMatrix.length; i++) {
            let row = document.createElement('tr');
            table.append(row);
            console.log(resultMatrix[i].length);
            for (let j = 0; j < resultMatrix[i].length; j++) {
                let td = document.createElement('td');
                row.append(td);
                td.innerText = resultMatrix[i][j];
            }
        }
        document.querySelector('.method__solution_wrapper').append(table);
        isDrawTableCoordinateDescent = true;
    }

})