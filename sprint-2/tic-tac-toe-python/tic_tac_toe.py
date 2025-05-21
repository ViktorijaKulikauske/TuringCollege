class TicTacToe:
    def __init__(self):
        self.board = [['' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'

    def make_move(self, row, col):
        if self.board[row][col] == '' and not self.check_winner():
            self.board[row][col] = self.current_player
            if not self.check_winner():
                self.current_player = 'O' if self.current_player == 'X' else 'X'
            return True
        return False

    def check_winner(self):
        lines = (
            self.board,
            zip(*self.board),
            [[self.board[i][i] for i in range(3)]],
            [[self.board[i][2 - i] for i in range(3)]]
        )
        for group in lines:
            for line in group:
                if len(set(line)) == 1 and line[0] != '':
                    return line[0]
        return None

    def is_draw(self):
        return all(cell != '' for row in self.board for cell in row) and not self.check_winner()

    def reset(self):
        self.board = [['' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'
