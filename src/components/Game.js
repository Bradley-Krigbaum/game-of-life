import React from 'react';
import '../css/Game.css';


const cell_size = 10;
const game_width = 800;
const game_height = 600;


class Cell extends React.Component {

    render() {

        const {x,y} = this.props;

        return(
            <>
                <div className="CellStyle" style={{
                    left: `${cell_size * x + 1}px`,
                    top: `${cell_size * y + 1}px`,
                    width: `${cell_size - 1}px`,
                    height: `${cell_size - 1}px`,
            }} />
            </>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.rows = game_height / cell_size;
        this.cols = game_width / cell_size;
        this.board = this.makeEmptyBoard();

    }

    state = {
        cells: [],
        game_is_running: false,
        grid_on: false,
        interval: 100,
    }


    // Make Board
    makeEmptyBoard() {
        let board = [];
        for(let y = 0; y < this.rows; y++) {
            board[y] = [];
            for(let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }

    // Make Cells
    makeCells() {
        let cells = [];
        for(let y = 0; y < this.rows; y++) {
            for(let x = 0; x < this.cols; x++) {
                if(this.board[y][x]) {
                    cells.push({x, y});
                }
            }
        }
        return cells;
    }


    // Gets the elements offset for the game board
    getOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop
        };
    }

    // OnClick Handler
    handleOnClick = (event) => {
        const elementOffset = this.getOffset();
        const offsetX = event.clientX - elementOffset.x;
        const offsetY = event.clientY - elementOffset.y;

        const x = Math.floor(offsetX / cell_size);
        const y = Math.floor(offsetY / cell_size);
        
        if(x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells(), cell_holder: this.makeCells()});
    }

    // Game Controls
    startGame = () => {
        this.setState({ game_is_running: true });
        this.runGeneration();
    }

    stopGame = () => {
        this.setState({ game_is_running: false });
        if(this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    clearGame = () => {
        this.board = this.makeEmptyBoard();
        this.setState({cells: this.makeCells()});
    }

    randomGame = () => {
        for(let y = 0; y < this.rows; y++) {
            for(let x = 0; x < this.cols; x++) {
                this.board[y][x] = ( Math.random() >= 0.85);
            }
        }
        this.setState({cells: this.makeCells()});
    }

    showGrid = () => {
        this.setState({ grid_on: true });
        document.getElementById("grid").className = "gameGrid_ON";
        
    }

    hideGrid = () => {
        this.setState({ grid_on: false });
        document.getElementById("grid").className = "gameGrid_OFF";
    }


    // Find the cells around the current cell
    calculateNeighbors(board, x, y) {
        // Set neighbors to 0
        let neighbors = 0;
        // Set cell looking directions
        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

        for(let i = 0; i < directions.length; i++) {
            const cell_direction = directions[i]
            let y1 = y + cell_direction[0];
            let x1 = x + cell_direction[1];

            if(x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }
        return neighbors;
    } 

    // Run the next iteration of the game
    runGeneration() {
        let newBoard = this.makeEmptyBoard();

        // Game Logic
        for(let y = 0; y < this.rows; y++) {
            for(let x = 0; x < this.cols; x++) {
                let cell_neighbors = this.calculateNeighbors(this.board, x, y);
                if(this.board[y][x]) {
                    // If cells has 2 or 3 neighbors, lives to next generation
                    if(cell_neighbors === 2 || cell_neighbors === 3) {
                        newBoard[y][x] = true;
                    // Otherwise the cell dies
                    } else {
                        newBoard[y][x] = false;
                    }
                // Otherwise if cell is alive and has 3 neighbors, lives to next generation
                } else {
                    if(!this.board[y][x] && cell_neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({cells: this.makeCells()});
        this.timeoutHandler = window.setTimeout(() => {
            this.runGeneration();
        }, this.state.interval)
    }


    render() {

        const {cells, game_is_running, grid_on} = this.state;
        // console.log("CELLS: ", cells);

        return(
            <>
                <div className="gameGrid_OFF"
                    id="grid"
                    style={{ 
                        width: game_width, 
                        height: game_height,
                        backgroundSize: `${cell_size}px ${cell_size}px`
                    }}

                    onClick={!game_is_running ? this.handleOnClick : undefined}
                    ref={(n) => {this.boardRef = n;}}
                >
                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} />
                    ))}
                    {/* {console.log("CELLS MAP: ", cells)} */}
                </div>

                <div className="buttons">
                    {game_is_running ?
                        <button className="button" onClick={this.stopGame}>STOP</button> 
                        :
                        <button className="button" onClick={this.startGame}>START</button>
                    }
                    {!game_is_running ? 
                        <button className="button" onClick={this.randomGame}>RANDOM</button>
                        :
                        <button className="button">RANDOM</button>
                    }
                    {!game_is_running ?        
                        <button className="button" onClick={this.clearGame}>CLEAR</button>
                        :
                        <button className="button">CLEAR</button>
                    }
                    {!grid_on ?
                        <button className="button show-grid" onClick={this.showGrid}>SHOW GRID</button>
                        :
                        <button className="button show-grid" onClick={this.hideGrid}>HIDE GRID</button>
                    }
                    
                </div>
            </>
        );
    }
}

export default Game;
