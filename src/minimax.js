import _ from 'lodash';
import calculateWinner from './win_checker';

export default function computer(board, maximizer, minimizer, mode) {
  const [max_score, draw_score, min_score] = [10, 0, -10];

  function best_move(board, piece) {
    const available_pos = board.map((val, idx) => {
      if (val == null) return idx
    }).filter(item => typeof(item) == 'number');

    const scores = [];

    function calculate(piece_type) {
      for (let pos of available_pos) {
        const temp_board = _.cloneDeep(board);
        temp_board[pos] =piece_type;

        if (calculateWinner(temp_board)) {
          piece_type == maximizer ? scores.push(max_score) : scores.push(min_score); break
        }

        else if (!calculateWinner(temp_board) && !temp_board.includes(null)) {
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

  const available_pos = board.map((val, idx) => {
    if (val == null) return idx
  }).filter(item => typeof(item) == 'number');

  if (mode == 0) {
    const randomIndex = Math.floor(Math.random() * available_pos.length);
    return [null, available_pos[randomIndex]]
  }

  else if (mode == 1) {
    if (available_pos.length >= 8) {
      const randomIndex = Math.floor(Math.random() * available_pos.length);
      return [null, available_pos[randomIndex]];
    } else {
      return best_move(board, maximizer);
    }
  } 

  return best_move(board, maximizer);
}