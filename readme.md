## Generals

[Live Version](adom.info/generals)

![Game]("./docs/gifs/victory.gif")

### Background

[Generals.io](generals.io) is an online multiplayer game where players compete to gain territory and capture the opponent's base.  In my implementation of the game, the user plays against an AI opponent.

### How To Play:
+ Your goal is to gain territory, and eventually capture the blue General.
+ To move your army, click on a tile you control, and navigate using the arrow keys or WASD.  Orders will be added to your Command Queue, which executes 1 move every .5 seconds.
+ Cities are expensive to capture, but it pays off: captured cities generate an army unit every second.  Other territory generates an army unit every 25 seconds.
+ You win if you capture the blue General, and lose if the blue army captures your General.

![Informational Modal]("./docs/gifs/about-modal.gif")

### Implementation Details

As I implemented this project in Vanilla JavaScript, I had to manually keep my data storage and presentation in sync.  The format of the game introduced some interesting challenges here: users input commands in real time by clicking on elements on the page, and using keypresses to move a cursor, but these commands are executed at a fixed rate of 2 per second.

The path the Information follows is a bit complex.  The user manipulates the cursor, which adds a new Command to a queue each time it moves.  Each second, the game reads one command (for each player) from the queue and executes it.  Since the Command stores the cell, it has up-to-date information on the color and count of the cell, rather than the state of the cell when the Command was first created.

Finally, every half-second a function iterates through the current state of the board, and updates the HTML Table element.


### To-dos / Future features

There are a few areas in which I'd like to continue development:

+ Better AI: I'm most interested in building a better AI.  Right now, the BotPlayer simply explores the map, but there are simple heuristics that could turn it into a reasonably strong opponent.  One particular thing I'm excited about is building a tweaked A* algorithm that finds not only the shortest path to the user's General, but the shortest-least-defended path.

+ Efficiency Improvements: "Premature optimization is the root of all evil," and I haven't run into any performance issues, but I'd like to see what I can do to improve the efficiency of my code, particularly the functions I use to keep my "representation of state" (`board.grid`) in sync with elements in the DOM.  Right now I iterate through the entire grid and set properties for each corresponding HTML element, even those that haven't changed.  I can do better.

+ Map Improvements: Right now, the maps are randomly generated, but some simple changes would result in more interesting matches.  For example, I could always assign opposing Generals to separate quadrants of the board, and bias the placement of mountains towards the middle of the board.
