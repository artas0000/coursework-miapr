let isDrawTableSteepestDescent = false;


document.querySelector('#steepest_descent_method').addEventListener('click', () => {
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
    // document.querySelector('.method__solution_wrapper').style.height = '500px';
    // document.querySelector('.method__solution_wrapper').style.opacity = 1;

    let eps = 0.01;

    function funcXY(x1, x2) {
        return ((2 * x1 * x1) + (x2 * x2) - (x1 * x2));
    }

    function dx1(x1, x2) {
        return 4 * x1 - x2;
    }

    function dx2(x1, x2) {
        return 2 * x2 - x1;
    }

    function degree(dx1, dx2, dx1buff, dx2buff) {
        return (Math.acos((dx1 * dx1buff + dx2 * dx2buff) / ((dx1 ** 2 + dx2 ** 2) ** 0.5 * (dx1buff ** 2 + dx2buff ** 2) ** 0.5)) * 57.3)
    }

    function checkEnd(x1, x2, x1buff, x2buff) {
        return (((x1 - x1buff) ** 2 + (x2 - x2buff) ** 2) ** 0.5)
    }

    let x1 = document.querySelector('#x1').value,
        x2 = document.querySelector('#x2').value,
        lambda = 0.1;
    let resultMatrix = [
        [0, x1, x2, funcXY(x1, x2),dx1(x1, x2).toFixed(4), dx2(x1, x2).toFixed(4), lambda ,'-']
    ]
    let i = 0;
    let degreeValue = 0;
    while (true) {
        i++;
        let x1buff = x1,
            x2buff = x2;
        x1 = x1buff - lambda * dx1(x1buff, x2buff);
        x2 = x2buff - lambda * dx2(x1buff, x2buff);
        degreeValue = degree(dx1(x1, x2), dx2(x1, x2), dx1(x1buff, x2buff), dx2(x1buff, x2buff));
        if (degreeValue < 30) lambda *= 2;
        else if (degreeValue > 90) lambda /= 3;
        // else lambda = 3;
        resultMatrix.push(
            [i, x1.toFixed(4), x2.toFixed(4), funcXY(x1, x2).toFixed(6), dx1(x1, x2).toFixed(4), dx2(x1, x2).toFixed(4),
                lambda.toFixed(4) ,degree(dx1(x1, x2), dx2(x1, x2), dx1(x1buff, x2buff), dx2(x1buff, x2buff)).toFixed(4)]
        )
        
        if (checkEnd(x1, x2, x1buff, x2buff) < eps) {
            break
        }
    }

    console.log(resultMatrix);
    if (!isDrawTableSteepestDescent) {
        let table = document.createElement('table');
        table.className = "steepest_descent_table"
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
        let td6 = document.createElement('th');
        let td7 = document.createElement('th');
        tableHead.append(td0);
        tableHead.append(td1);
        tableHead.append(td2);
        tableHead.append(td3);
        tableHead.append(td4);
        tableHead.append(td5);
        tableHead.append(td6);
        tableHead.append(td7);
        td0.innerText = '№';
        td1.innerText = 'X1';
        td2.innerText = 'X2';
        td3.innerText = 'F(X1, X2)';
        td4.innerText = 'df/dx1';
        td5.innerText = 'df/dx2';
        td6.innerText = 'Lambda';
        td7.innerText = 'Alpha';
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
        isDrawTableSteepestDescent = true;
    }

})
