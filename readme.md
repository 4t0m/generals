## Generals.io Clone

### Background

[Generals.io](generals.io) is an online multiplayer game where players compete to gain territory and capture the opponents base.  My implementation will be single-player against a simple bot-player.  

The rules of the game are as follows:
1) Every time-step, one move from the move-queue is executed
2) Every two time-steps, captured cities generate a soldier
3) Every 25 time-steps, captured cells generate a soldier

### Functionality & MVP  

With this version of Generals, users will be able to:
- [ ] Click on squares to select them and move using keypresses or by clicking adjacent squares
- [ ] Capture cities
- [ ] Play against an AI opponent

Bonus:
- [ ] Randomly generate maps
- [ ] Start new games using user selections for map-size and game speed

### Wireframes

The app will consist of a navbar with links to my github and portfolio, a game board, and a button for an About modal.

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

Generals functionality will be produced using:

`board.js`: this script will handle the logic for creating and updating the necessary elements and rendering them to the DOM.  The board will handle the following:
- render the current state of all visible `cell`s
- hold a move-queue with future moves read from the `cursor`
- each time-step, execute a move from the move-queue

`cursor.js`: this script will take user input.  The `board` will read the move queue from the `cursor`, which it will hold as a variable.  The `cursor` is responsible for the following:
- reading keypresses and storing a queue to be read by the `board`
- toggling a CSS class `selected` that adds a white border to a `cell`
- toggling CSS classes `queue-right`, `queue-left`, `queue-up`, and `queue-down` which overlays arrows to indicate queued moves

`cell.js`: this script will have just constructor and update functions.  Each cell will have the following properties:
- `color`: red, blue, or null
- `count`: the number of soldiers on the `cell`, if any
- `isHidden`: whether the user can see
- `canPass`: always `true`; distinguishes `mountain`s from other `cell`s

`city.js`: this will inherit from `cell`, and will have the following additional characteristics:
- if `color` is not null, then it will gain a soldier every two turns
- if `color` is null and `count` is below 40, it will gain a soldier every two turns, otherwise it will not gain any soldiers

`mountain.js`: this will be a singleton with the following properties:
- `color`: always null
- `canPass`: always `false`

### Implementation Timeline

[COMPLETE] **Day 1**: Setup all necessary Node modules, including webpack.  

Goals for the day:
- Get a green bundle with `webpack`

[COMPLETE] **Day 2**: Get the basics of `cell`s and the `board` set up.  Render the board on the page.  

Goals for the day:
- Complete the `cell.js` module (constructor, update functions)
- Complete `city.js` and `mountain.js`
- Render a grid to the `DOM`.
- Make each `cell` in the grid clickable, toggling the state of the square on click

[COMPLETE] **Day 3**: Get the cursor and movement working.

Goals for the day:
- Add moves to the move queue using clicks and keypresses
- Update the `board` as moves are executed
- End the game when a `king` is taken. 
- Render moves in the queue [LEAVING FOR LATER]

**Day 4**: Add AI player

Goals for the day:
- Add an AI player that moves around the board
- Fix up styling

**Bonus**:
- Add options for map-size and game-speed when starting a new game.
- Add spectate mode where a user can watch various AI-players compete.
