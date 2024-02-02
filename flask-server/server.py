from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []
todo_id_counter = 1

@app.route("/todos", methods=["GET", "POST"])
def handle_todos():
    if request.method == "GET":
        response = jsonify({"todos": todos})
        return response
    elif request.method == "POST":
        new_todo = request.json.get("todo")
        todo = {"id": todo_id_counter, "task": new_todo, "editing": False}
        todo_id_counter += 1
        todos.append(todo)
        response = jsonify(todo)
        return response, 201

@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global todos
    todos = [todo for todo in todos if todo.get("id") != todo_id]
    return jsonify({"message": "Todo deleted"})

@app.route("/todos/<int:todo_id>/toggleEditing", methods=["PUT"])
def toggle_editing(todo_id):
    for todo in todos:
        if todo.get("id") == todo_id:
            todo["editing"] = not todo.get("editing", False)
            return jsonify(todo)
    return jsonify({"error": "Todo not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)