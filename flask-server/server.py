from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []

@app.route("/todos", methods=["GET", "POST"])
def handle_todos():
    if request.method == "GET":
        response = jsonify({"todos": todos})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        return response
    elif request.method == "POST":
        new_todo = request.json.get("todo")
        todos.append(new_todo)
        response = jsonify(new_todo)
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        return response, 201

@app.route("/todos/<int:todo_id>/toggleEditing", methods=["PUT"])
def toggle_editing(todo_id):
    for todo in todos:
        if todo.get("id") == todo_id:
            todo["editing"] = not todo.get("editing", False)
            return jsonify(todo)
    return jsonify({"error": "Todo not found"}), 404

@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    for todo in todos:
        if todo.get("id") == todo_id:
            todos.remove(todo)
            return jsonify({"message": "Todo deleted"})
    return jsonify({"error": "Todo not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)