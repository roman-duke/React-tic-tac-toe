import _ from 'lodash';

export default function computer(board, maximizer, minimizer) {
  const [max_score, draw_score, min_score] = [10, 0, -10];

  function best_move(board, piece) {
    const available_pos = board.moves.map((val, idx) => {
      if (val == null) return idx
    }).filter(item => typeof(item) == 'number');

    const scores = [];

    function calculate(piece_type) {
      for (let pos of available_pos) {
        const temp_board = _.cloneDeep(board);
        temp_board.move(pos, piece_type);

        if (temp_board.game_win()) {
          piece_type == maximizer ? scores.push(max_score) : scores.push(min_score); break
        }

        else if (!temp_board.game_win() && !temp_board.moves.includes(null)) {
          scores.push(draw_score); break
        } else {
          piece_type == maximizer ? scores.push(best_move(temp_board, minimizer))
                                  : scores.push(best_move(temp_board, maximizer)[0]);

        }
      }
    }
  
    if (piece === maximizer) {
      calculate(piece);
      return [Math.max(...scores), available_pos[scores.indexOf(Math.max(...scores))]]
    }

    else if (piece == minimizer) {
      calculate(piece);
      return Math.min(...scores);
    }

  }
  
  return best_move(board, maximizer);
}