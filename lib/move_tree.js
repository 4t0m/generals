import TreeNode from './tree_node';
import Command from './command';

class MoveTree {
  constructor(startingCell, board) {
    this.startingCell = startingCell;
    this.board = board;
    this.rootNode = new TreeNode(startingCell);

    this.buildMoveTree();
  }

  findPath(targetCell) {
    let endNode = this.rootNode.bfSearch(targetCell);
    let path = this.tracePath(endNode).reverse();
    let commands = [];

    // iterate over the path, creating a command for each node

    return commands;
  }
}

//   def find_path(end_pos)
//     end_node = root_node.dfs(end_pos)
//
//     trace_path_back(end_node)
//       .reverse
//       .map(&:value)
//   end
//
//   attr_accessor :root_node, :visited_positions
//
//   def self.valid_moves(pos)
//     valid_moves = []
//
//     cur_x, cur_y = pos
//     MOVES.each do |(dx, dy)|
//       new_pos = [cur_x + dx, cur_y + dy]
//
//       if new_pos.all? { |coord| coord.between?(0, 7) }
//         valid_moves << new_pos
//       end
//     end
//
//     valid_moves
//   end
//
//   def build_move_tree
//     self.root_node = PolyTreeNode.new(start_pos)
//
//     # build the tree out in breadth-first fashion
//     nodes = [root_node]
//     until nodes.empty?
//       current_node = nodes.shift
//
//       current_pos = current_node.value
//       new_move_positions(current_pos).each do |next_pos|
//         next_node = PolyTreeNode.new(next_pos)
//         current_node.add_child(next_node)
//         nodes << next_node
//       end
//     end
//   end
//
//   def new_move_positions(pos)
//     KnightPathFinder.valid_moves(pos)
//       .reject { |new_pos| visited_positions.include?(new_pos) }
//       .each { |new_pos| visited_positions << new_pos }
//   end
//
//   def trace_path_back(end_node)
//     nodes = []
//
//     current_node = end_node
//     until current_node.nil?
//       nodes << current_node
//       current_node = current_node.parent
//     end
//
//     nodes
//   end
// end
