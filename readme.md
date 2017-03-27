## Conway's Game of Life

### Background

Conway's Game of Life is a **cellular automaton**.  After the initial conditions are set, cells in the game follow simple rules to replicate, creating complex, hard-to-predict patterns.

The standard rules for Conway's Game of Life are as follows:
1) Any live cell with 2 or 3 live neighbors (defined to be the eight cells surrounding it) stays alive,
2) Any dead cell with exactly 3 neighbors will come to life,
3) Any live cell with less than 2 neighbors or more than 3 neighbors will die.

### Functionality & MVP  

With this Conway's Game of Life simulator, users will be able to:
- [ ] Start, pause, reset, and adjust speed of the game
- [ ] Select squares to be alive in the initial state

In addition, this project will include:
- [ ] An About modal describing the game and the interface
- [ ] A production Readme

Bonus:
- [ ] Choose from preset demo initial states
- [ ] Button to generate random initial states

### Wireframes

The app will consist of a navbar with links to my github and portfolio, a game board, and a bar along the bottom containing a button for on About modal as well as controls for the game, including options to play/pause/reset the game, adjust the speed, and select preset or random initial states.

![wireframes](images/wireframe.jpeg)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

Game of Life functionality will be produced using:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`iteration.js`: this script will iterate over the board and update each `cell` as dictated by the rules.

`cell.js`: this script will have just constructor and update functions.  Each cell will have an `aliveState` (`true` or `false`).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including webpack and `Easel.js`.  Learn the basics of `Easel.js`.  

Goals for the day:
- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Cell` object to connect to the `Board` object.  Then, use `board.js` to create and render the grid.  Build in the ability to toggle the live/dead states on click for each cell.  

Goals for the day:
- Complete the `cell.js` module (constructor, update functions)
- Render a square grid to the `Canvas` using `Easel.js`
- Make each cell in the grid clickable, toggling the state of the square on click

**Day 3**: Create the iteration backend.  Incorporate the iteration logic into the `Board.js` rendering.  

Goals for the day:
- Have a functional grid on the `Canvas` frontend that correctly handles iterations from one generation of the game to the next

**Day 4**: Add controls and style page.

Goals for the day:
- Create controls for game speed, stop, start
- Fix up styling

**Bonus**: Add interesting initial states for the user to choose from, and add a button to generate a random initial state.
