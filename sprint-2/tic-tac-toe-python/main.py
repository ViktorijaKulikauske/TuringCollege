from tic_tac_toe import TicTacToe

game = TicTacToe()

while True:
    for row in game.board:
        print(row)
    print(f"Player {game.current_player}'s turn.")
    move = input("Enter row and column (e.g., 0 2): ").split()
    if len(move) != 2 or not all(m.isdigit() for m in move):
        print("Invalid input.")
        continue
    row, col = map(int, move)
    if not (0 <= row < 3 and 0 <= col < 3):
        print("Invalid move.")
        continue
    if not game.make_move(row, col):
        print("Cell already taken or game over.")
        continue
    winner = game.check_winner()
    if winner:
        for row in game.board:
            print(row)
        print(f"Player {winner} wins!")
        break
    if game.is_draw():
        for row in game.board:
            print(row)
        print("It's a draw!")
        break