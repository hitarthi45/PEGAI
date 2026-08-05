try:
    from flask import Flask, render_template, send_from_directory
except ImportError as e:
    raise ImportError(
        "Flask is not installed. Install it with 'pip install flask' and then rerun the app."
    ) from e

import os

app = Flask(__name__)

# Route for the main game page
@app.route('/')
def index():
    return render_template('index.html')

# If you want to serve static files from a specific path (though Flask handles 'static' automatically)
# @app.route('/static/<path:filename>')
# def static_files(filename):
#     return send_from_directory(os.path.join(app.root_path, 'static'), filename)

if __name__ == '__main__':
    # Run the Flask app
    # debug=True allows for auto-reloading and better error messages during development
    app.run(debug=True, host='127.0.0.1', port=5000)
    print("Snake Game server running on http://127.0.0.1:5000/")
