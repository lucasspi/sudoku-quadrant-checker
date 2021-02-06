// Sudoku Quadrant Checker


function SudokuQuadrantChecker(strArr) {
    const errorSet = [];

    const checkForSame = function(arr) {
        valuesLogged = [], 
        errPositions = [];

      for(let i = 0; i < arr.length; i++) {
        const duplicate = (arr[i] === 'x') ? 
          -1: 
          valuesLogged.indexOf(arr[i]);

        if(duplicate > -1) {

          if(errPositions.indexOf(duplicate) < 0) {
                errPositions.push(duplicate);
          }
          errPositions.push(i); 
        }

        valuesLogged.push(arr[i])
      }

      return errPositions;
    },
    checkRows = function(arr) {
      for(let i = 0; i < arr.length; i++) {
        errorSpots = checkForSame(arr[i]);
        errorSpots.forEach(spot => {
          const badCell = findCell([spot, i]);
          if(errorSet.indexOf(badCell) < 0) {
            errorSet.push(badCell);
          }
        }); 
      }
    }, 
    checkColumns = function(arr) {
      for(let i = 0; i < arr.length; i++) {
        const newColumn = [];

        for(let j = 0; j < arr[i].length; j++) {
          newColumn.push(arr[j][i]);
        }

        errorSpots = checkForSame(newColumn);
        errorSpots.forEach(spot => {
          const badCell = findCell([i, spot]);
          
          if(errorSet.indexOf(badCell) < 0) {
            errorSet.push(badCell);
          }

        }); 
      }

    },
    checkCells = function(arr) {
      const cells = [];
      let i;

      for(i = 0; i < arr.length; i++) {
        for(j = 0; j < arr.length; j++) {
          const value = arr[i][j], 
            cell = findCell([i, j]);

            if(!cells[cell - 1]) {
              cells[cell - 1] = [];
            }
            cells[cell - 1].push(value);
        };
      }      

      for(i = 0; i < cells.length; i++) {
        const checkCellValue = checkForSame(cells[i]);

        if(checkCellValue.length > 0) {
          const suspectCell = i+1;

          if(errorSet.indexOf(suspectCell) < 0) {
            errorSet.push(suspectCell);
          }
        }
      }
    },
    findCell = function(pos) {
      const horizontal = pos[0],
        vertical = pos[1],
        // @TODO abstract this more so we can do this dynamically.
        breakpoints = [
          '2',
          '2',
          '2',
          '5',
          '5',
          '5',
          '8',
          '8',
          '8'
        ],
        cells = {
        2 : {
          2: 1,
          5: 4,
          8: 7
        },
        5: {
          2: 2,
          5: 5,
          8: 8
        },
        8: {
          2: 3,
          5: 6,
          8: 9
        }
      },
      cellBlock = cells[breakpoints[horizontal]];
      cell = cellBlock[breakpoints[vertical]];

      return cell;
    }, 
    cleanStrArr = function(strings) {
      let newArray = [];

      for(let i = 0; i < strings.length; i++) {
        const newString = strings[i].replace('(','').replace(')','');
        newArray.push(newString.split(','));
      }

      return newArray;
    }

  const cleanedArray = cleanStrArr(strArr);

  checkRows(cleanedArray);
  checkColumns(cleanedArray);
  checkCells(cleanedArray);

  if(errorSet.length === 0) {
    return 'legal'
  }

  const sortedErrorSet = errorSet.sort();

  // code goes here  
  return sortedErrorSet.join(','); 

}
   
// keep this function call here 
console.log(SudokuQuadrantChecker(readline()));
