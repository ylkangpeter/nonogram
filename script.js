function loadDefault(){
    // 首先确保棋盘大小是30x30
    if (currentGridSize !== 30) {
        // 更新选择框的值
        document.getElementById('grid-size-select').value = '30';
        // 重新创建30x30的棋盘
        createGrid(30);
    }
    
    // 清除现有的填充
    clearBoard();
    
    // 然后加载示例数据
    const sampleState = "{\"size\":30,\"topHints\":[\"2 10 1 1\",\"2 2 2 2 2 2\",\"2 2 2 2 4 1\",\"3 5 1 1 2 1\",\"1 1 3 3\",\"1 6 2\",\"3 6 2 3 4\",\"6 3 4 2 4 1\",\"2 6 5 1 3\",\"1 2 2 2 1 2 2 1\",\"5 3 2 1 1 3 3\",\"3 1 3 4 7 1\",\"1 1 4 2 1 2 1 6\",\"1 2 4 1 1 1 3 1\",\"2 1 2 2 2 1 1 2 1\",\"1 1 2 6 3\",\"1 1 2 2 3 1\",\"1 2 1 1 2 3\",\"2 1 1 1 2 1\",\"3 1 1 3 1 4\",\"4 2 1 2 2 1 2\",\"2 2 1 1 2 1 2\",\"2 3 1 4 2 3\",\"15 13\",\"4 2 2 2 1 5\",\"2 2 2 5\",\"2 3 5 8\",\"3 2 1 1 1 2 4\",\"2 1 2 1 6 3\",\"1 1 1 10 3\"],\"leftHints\":[\"1 5 5 2\",\"1 3 5 6 3\",\"2 2 2 6 3\",\"3 5 2 2\",\"2 7 2 2\",\"2 5 4 3\",\"3 4 2 2\",\"7 5 1\",\"2 7 2 3\",\"2 13 2\",\"1 2 1\",\"3 1 1 1\",\"7 1 1 1\",\"1 1 1 3 1 3\",\"1 1 2 3 7\",\"4 1 1 1 1 2 1 1\",\"9 5 2 1 1\",\"1 5 7 1\",\"1 1 5 6 8\",\"1 1 1 6 1 1 2\",\"3 1 2 1 1 2 1 2\",\"7 7 1 1 2\",\"1 1 2 3 4 2\",\"3 2 3 5 2 5\",\"2 3 4 6 2\",\"4 1 2 4\",\"6 2 1 5\",\"3 1 1 1 1 1 1 8\",\"4 1 1 1 1 1 1 11\",\"2 24\"],\"gridState\":[\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\",\"000000000000000000000000000000\"]}"
    loadBoardStateFromString(sampleState);
}

const gridSize = 30; // Define the size of the grid

function createGrid(size) {
    currentGridSize = size;
    const gridContainer = document.getElementById("grid-container");
    const leftHints = document.getElementById("left-hints");
    const topHints = document.getElementById("top-hints");
    
    gridContainer.innerHTML = '';
    leftHints.innerHTML = '';
    topHints.innerHTML = '';

    // 更新 CSS Grid 模板
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 15px)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 15px)`;

    // Create top hints
    for (let col = 0; col < size; col++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "top-hint-input";
        topHints.appendChild(input);
    }

    // Create left hints
    for (let row = 0; row < size; row++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "left-hint-input";
        leftHints.appendChild(input);
    }

    // Create grid cells
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (row % 5 === 0) {
                cell.classList.add("split");
            }
            cell.addEventListener('click', () => toggleCell(row, col));
            gridContainer.appendChild(cell);
        }
    }
}

function toggleCell(row, col) {
    const gridContainer = document.getElementById("grid-container");
    const cell = gridContainer.children[row * currentGridSize + col];
    cell.classList.toggle("filled");
}

function resetGame() {
    createGrid(gridSize);
}

function parseHints() {
    const topHints = [];
    const leftHints = [];
    
    // 获取顶部提示
    const topInputs = document.querySelectorAll('.top-hint-input');
    topInputs.forEach(input => {
        const numbers = input.value.trim().split(' ')
            .filter(n => n !== '')
            .map(Number);
        topHints.push(numbers);
    });
    
    // 获取左侧提示
    const leftInputs = document.querySelectorAll('.left-hint-input');
    leftInputs.forEach(input => {
        const numbers = input.value.trim().split(' ')
            .filter(n => n !== '')
            .map(Number);
        leftHints.push(numbers);
    });
    
    return { topHints, leftHints };
}

function zero1D(size) {
    var arr = [];
    while (size--) arr.push(0); 
    return arr;
}

function zero2D(rows, cols) {
    var array = [], row = [];
    while (cols--) row.push(0);
    while (rows--) array.push(row.slice());
    return array;
}

class Line {
    constructor(groups) {
        this.groups = groups;
        this.gn = groups.length;
        
        if(this.gn>0) {
            this.restLength = zero1D(this.gn);
            this.restLength[this.gn-1] = groups[this.gn-1];
            for(var i=this.gn-2;i>=0;i--) {
                this.restLength[i] = groups[i]+1+this.restLength[i+1];
            }
        }
    }
    
    setCells(cells) {
        this.length = cells.length;
        this.cells = cells;

        this.sure = zero1D(this.length);
        for (var i=0;i<this.length;i++) {
            if (this.cells[i] != 0) this.sure[i] = 1;
        }

        this.cur = zero1D(this.length);
        this.ansLine = zero1D(this.length);
    }

    checkFinal(pos) {        
        for(var i=pos; i<this.length;i++) if(this.cells[i]==1) return;
        for(var i=0;i<this.length;i++)
        {
            if (this.ansLine[i]==0) this.ansLine[i]=this.cur[i];
            else if (this.ansLine[i]!=this.cur[i]) {
                this.ansLine[i]=2;
                this.cells[i]=0; this.sure[i]=1;
            }
        }
        this.realFound++;
    }
    
    rec(g, pos) {
        if (this.realFound>0) return;
        if (pos + this.restLength[g]>this.length) return;

        var ok = true;
        for (var i = pos; i<pos+this.groups[g];i++) {
            if(this.cells[i] == -1) {
                ok = false;
                break;
            }
            this.cur[i] = 1;
        }

        if (pos+this.groups[g]<this.length && this.cells[pos+this.groups[g]]==1) {
            ok = false;
        }

        if (ok) {
            if(g==this.gn-1) this.checkFinal(pos+this.groups[g]);
            else {
                for (var i = pos+this.groups[g]+1; i<this.length; ++i) {
                    this.rec(g+1, i);
                    if(this.cells[i]==1) break;
                }
            }
        }

        for (var i = pos; i<pos+this.groups[g];i++) {
            this.cur[i] = 0;
        }
    }

    isFeasible() {
        if (this.gn == 0) {
            for(var i=0;i<this.length;++i) if(this.cells[i]==1) return false;
            return true;
        }

        this.realFound=0;
        for (var i=0;i<this.length;++i){
            this.rec(0, i);
            if (this.cells[i]==1) break;
        }
        return (this.realFound!=0);
    }

    isModificationFeasible(pos, val) {
        if (this.ansLine[pos]==2 || this.ansLine[pos]==val) return true;
        var tmp = this.cells[pos];
        this.cells[pos] = val;
        var ans = this.isFeasible();
        this.cells[pos] = tmp;
        return ans;
    }

    solve() {
        if (!this.isFeasible()) return false;
        for (var i=0; i<this.length;++i) {
            if (this.sure[i]==1) continue;
            if (!this.isModificationFeasible(i, 1)) this.cells[i]=-1;
            else if (!this.isModificationFeasible(i, -1)) this.cells[i]=1;
            else this.cells[i]=0;
            this.sure[i]=1;
        }

        return true;
    }
}

class Nonogram {
    constructor(groupsHor, groupsVert) {
        this.width = groupsVert.length;
        this.height = groupsHor.length;
        this.matrix = zero2D(this.height, this.width);
        this.rows = [];
        this.columns = [];
        
        for(var i=0; i < this.height; i++) this.rows.push(new Line(groupsHor[i])); 
        for(var i=0; i < this.width; i++) this.columns.push(new Line(groupsVert[i]));
    } 
    
    getColumn(j) {
        var ans = [];
        for (var i=0;i<this.height;i++) ans.push(this.matrix[i][j]);
        return ans;
    }

    updateMatrix(x, y, value) {
        if (this.matrix[x][y] == 0 && value != 0) {
            this.matrix[x][y] = value;
            this.changed = true;
        }
    }

    isComplete() {
        for (var i=0; i<this.height; i++)
            for (var j=0; j<this.width;j++)
                if(this.matrix[i][j]==0) return false;
        return true;
    }
    
    solve() {
        do {
            this.changed = false;
            for(var i=0;i<this.height;i++){
                this.rows[i].setCells(this.matrix[i]);
                if (!this.rows[i].solve()) return false;
                for(var j=0;j<this.width;j++) this.updateMatrix(i,j, this.rows[i].cells[j]);
            }

            for(var i=0;i<this.width;i++){
                this.columns[i].setCells(this.getColumn(i)); 
                if (!this.columns[i].solve()) return false; 
                for(var j=0;j<this.height;j++) this.updateMatrix(j,i, this.columns[i].cells[j]);
            }
        } while (this.changed);
        return true;
    }
    
    solveAndCheck() {
        if (!this.solve()) return "Impossible.";
        
        if (!this.isComplete()) return "Multiple solutions.";
        else return "Solved";
    }
}

// 替换原来的 solve 函数
function solve() {
    const { topHints, leftHints } = parseHints();
    
    // 添加输入验证
    if (!validateInput(topHints, leftHints)) {
        alert('Invalid input! Please check your numbers.');
        return;
    }
    
    // 准备行和列的提示数组
    const groupsHor = leftHints.map(row => row.filter(num => num > 0));
    const groupsVert = topHints.map(col => col.filter(num => num > 0));
    
    // 创建 Nonogram 实例并求解
    const nonogram = new Nonogram(groupsHor, groupsVert);
    const result = nonogram.solveAndCheck();
    
    if (result === "Solved") {
        // 转换矩阵为可显示的格式
        const solution = nonogram.matrix.map(row => 
            row.map(cell => cell === 1)
        );
        displaySolution(solution);
    } else {
        alert(result);
    }
}

function validateInput(topHints, leftHints) {
    // 检查输入是否有效
    if (topHints.length !== currentGridSize || leftHints.length !== currentGridSize) return false;
    
    // 检查每行每列的数字之和是否小于等于当前网格大小
    for (let hints of [...topHints, ...leftHints]) {
        if (hints.length === 0) continue;
        const sum = hints.reduce((a, b) => a + b, 0);
        const spaces = hints.length - 1;
        if (sum + spaces > currentGridSize) return false;
    }
    
    return true;
}

let combinationsTried = 0;  // 添加全局计数器

function solvePuzzle(topHints, leftHints, startTime) {
    combinationsTried = 0;  // 重置计数器
    const grid = Array(currentGridSize).fill().map(() => Array(currentGridSize).fill(false));
    const timeout = 50000; // 5秒超时

    const result = backtrack(grid, topHints, leftHints, 0, 0, startTime, timeout);
    
    // 打印最终结果
    console.log(`已尝试 ${new Intl.NumberFormat('zh-CN').format(combinationsTried)} 种组合`);
    
    return result ? grid : null;
}

function backtrack(grid, topHints, leftHints, row, col, startTime, timeout) {
    combinationsTried++;  // 增加计数器
    
    // 设置定时器，每10秒打印一次日志
    if (combinationsTried % 1000000 == 0) {
        console.log(`已尝试 ${new Intl.NumberFormat('zh-CN').format(combinationsTried)} 种组合`);
    }
    
    // 检查是否超时
    if (Date.now() - startTime > timeout) {
        return false;
    }
    
    // 完成所有行
    if (row === currentGridSize) {
        return isValidSolution(grid, topHints, leftHints);
    }
    
    // 完成当前行，检查是否有效
    if (col === currentGridSize) {
        if (!isValidRow(grid[row], leftHints[row])) {
            return false;
        }
        return backtrack(grid, topHints, leftHints, row + 1, 0, startTime, timeout);
    }
    
    // 尝试填充和不填充
    for (const value of [false, true]) {
        grid[row][col] = value;
        
        // 快速检查当前行和列
        if (isPartiallyValid(grid, topHints, leftHints, row, col)) {
            if (backtrack(grid, topHints, leftHints, row, col + 1, startTime, timeout)) {
                return true;
            }
        }
    }
    
    grid[row][col] = false;
    return false;
}

function isPartiallyValid(grid, topHints, leftHints, row, col) {
    // 检查当前行的部分
    const currentRow = grid[row].slice(0, col + 1);
    const rowGroups = getGroups(currentRow);
    const rowHints = leftHints[row];
    
    if (!isPartialGroupValid(rowGroups, rowHints)) {
        return false;
    }
    
    // 检查当前列的部分
    const currentCol = grid.map(r => r[col]).slice(0, row + 1);
    const colGroups = getGroups(currentCol);
    const colHints = topHints[col];
    
    return isPartialGroupValid(colGroups, colHints);
}

function isPartialGroupValid(groups, hints) {
    if (groups.length === 0) return true;
    if (groups.length > hints.length) return false;
    
    // 检查完整的组
    for (let i = 0; i < groups.length - 1; i++) {
        if (groups[i] !== hints[i]) return false;
    }
    
    // 检查最后一个可能未完成的组
    return groups[groups.length - 1] <= hints[groups.length - 1];
}

function isValidRow(row, hints) {
    const groups = getGroups(row);
    return compareGroups(groups, hints);
}

function isValidSolution(grid, topHints, leftHints) {
    // Check rows
    for (let i = 0; i < currentGridSize; i++) {
        const rowGroups = getGroups(grid[i]);
        if (!compareGroups(rowGroups, leftHints[i])) return false;
    }
    
    // Check columns
    for (let j = 0; j < currentGridSize; j++) {
        const column = grid.map(row => row[j]);
        const colGroups = getGroups(column);
        if (!compareGroups(colGroups, topHints[j])) return false;
    }
    
    return true;
}

function getGroups(line) {
    const groups = [];
    let count = 0;
    
    for (let i = 0; i < line.length; i++) {
        if (line[i]) {
            count++;
        } else if (count > 0) {
            groups.push(count);
            count = 0;
        }
    }
    if (count > 0) groups.push(count);
    
    return groups;
}

function compareGroups(groups, hints) {
    if (groups.length !== hints.length) return false;
    return groups.every((g, i) => g === hints[i]);
}

function displaySolution(solution) {
    const cells = document.querySelectorAll('.cell');
    solution.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                cells[i * currentGridSize + j].classList.add('filled');
            } else {
                cells[i * currentGridSize + j].classList.remove('filled');
            }
        });
    });
}

let savedBoardState = null;  // 用于存储棋盘状态的全局变量

// 保存当前棋盘状态
function saveBoardState() {
    const topHints = [];
    const leftHints = [];
    
    // 获取顶部提示
    const topInputs = document.querySelectorAll('.top-hint-input');
    topInputs.forEach(input => {
        topHints.push(input.value);
    });
    
    // 获取左侧提示
    const leftInputs = document.querySelectorAll('.left-hint-input');
    leftInputs.forEach(input => {
        leftHints.push(input.value);
    });
    
    // 获取棋盘状态
    const gridState = [];
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < currentGridSize; i++) {
        const row = [];
        for (let j = 0; j < currentGridSize; j++) {
            const cell = cells[i * currentGridSize + j];
            row.push(cell.classList.contains('filled'));
        }
        gridState.push(row);
    }
    
    // 保存状态
    savedBoardState = {
        size: currentGridSize,
        topHints: topHints,
        leftHints: leftHints,
        gridState: gridState
    };
    
    console.log('棋盘状态已保存');
}

// 加载保存的棋盘状态
function loadBoardState() {
    if (!savedBoardState) {
        console.log('没有保存的棋盘状态');
        return;
    }
    
    // 如果当前棋盘大小与保存的不同，先重新生成棋盘
    if (currentGridSize !== savedBoardState.size) {
        createGrid(savedBoardState.size);
    }
    
    // 填充顶部提示
    const topInputs = document.querySelectorAll('.top-hint-input');
    savedBoardState.topHints.forEach((hint, index) => {
        if (index < topInputs.length) {
            topInputs[index].value = hint;
        }
    });
    
    // 填充左侧提示
    const leftInputs = document.querySelectorAll('.left-hint-input');
    savedBoardState.leftHints.forEach((hint, index) => {
        if (index < leftInputs.length) {
            leftInputs[index].value = hint;
        }
    });
    
    // 填充棋盘状态
    const cells = document.querySelectorAll('.cell');
    savedBoardState.gridState.forEach((row, i) => {
        row.forEach((isFilled, j) => {
            const cell = cells[i * currentGridSize + j];
            if (isFilled) {
                cell.classList.add('filled');
            } else {
                cell.classList.remove('filled');
            }
        });
    });
    
    console.log('棋盘状态已恢复');
}

// 将棋盘状态转换为字符串
function getBoardStateString() {
    const topHints = [];
    const leftHints = [];
    
    // 获取顶部提示
    const topInputs = document.querySelectorAll('.top-hint-input');
    topInputs.forEach(input => {
        topHints.push(input.value);
    });
    
    // 获取左侧提示
    const leftInputs = document.querySelectorAll('.left-hint-input');
    leftInputs.forEach(input => {
        leftHints.push(input.value);
    });
    
    // 获取棋盘状态
    const gridState = [];
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < currentGridSize; i++) {
        const row = [];
        for (let j = 0; j < currentGridSize; j++) {
            const cell = cells[i * currentGridSize + j];
            row.push(cell.classList.contains('filled') ? '1' : '0');
        }
        gridState.push(row.join(''));
    }
    
    // 创建状态对象
    const state = {
        size: currentGridSize,
        topHints: topHints,
        leftHints: leftHints,
        gridState: gridState
    };
    
    // 转换为字符串
    return JSON.stringify(state);
}

// 从字符串加载棋盘状态
function loadBoardStateFromString(stateString) {
    try {
        const state = JSON.parse(stateString);
        
        // 如果当前棋盘大小与保存的不同，先重新生成棋盘
        if (currentGridSize !== state.size) {
            createGrid(state.size);
        }
        
        // 填充顶部提示
        const topInputs = document.querySelectorAll('.top-hint-input');
        state.topHints.forEach((hint, index) => {
            if (index < topInputs.length) {
                topInputs[index].value = hint;
            }
        });
        
        // 填充左侧提示
        const leftInputs = document.querySelectorAll('.left-hint-input');
        state.leftHints.forEach((hint, index) => {
            if (index < leftInputs.length) {
                leftInputs[index].value = hint;
            }
        });
        
        // 填充棋盘状态
        const cells = document.querySelectorAll('.cell');
        state.gridState.forEach((row, i) => {
            for (let j = 0; j < row.length; j++) {
                const cell = cells[i * currentGridSize + j];
                if (row[j] === '1') {
                    cell.classList.add('filled');
                } else {
                    cell.classList.remove('filled');
                }
            }
        });
        
        console.log('棋盘状态已恢复');
        return true;
    } catch (error) {
        console.error('加载棋盘状态失败:', error);
        return false;
    }
}

// Initialize the game
createGrid(gridSize);

// 初始化时添加事件监听器
document.addEventListener('DOMContentLoaded', () => {
    // 初始化默认大小的网格
    createGrid(30);
    
    // 添加 Generate 按钮的事件监听器
    document.getElementById('generate-button').addEventListener('click', () => {
        const size = parseInt(document.getElementById('grid-size-select').value);
        createGrid(size);
    });
    
    // 添加 Load Default 按钮事件
    document.getElementById('load-button').addEventListener('click', loadDefault);
    
    // 添加 Clear 按钮事件
    document.getElementById('clear-button').addEventListener('click', clearBoard);
    
    // 添加 Solve 按钮事件
    document.getElementById('solve-button').addEventListener('click', solve);
});

// 清除棋盘
function clearBoard() {
    // 清除所有输入框
    const inputs = document.querySelectorAll('.top-hint-input, .left-hint-input');
    inputs.forEach(input => {
        input.value = '';
    });
    
    // 清除所有填充的格子
    const cells = document.querySelectorAll('.cell');
    if (cells.length === 0) {
        console.warn('没有找到任何单元格。');
        return; // 如果没有找到单元格，直接返回
    }
    
    cells.forEach(cell => {
        if (cell) { // 确保 cell 是有效的
            cell.classList.remove('filled');
        }
    });
}

