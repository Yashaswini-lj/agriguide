import os
import sqlite3
from datetime import datetime
from functools import wraps

from flask import Flask, flash, redirect, render_template, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_DIR = os.path.join(BASE_DIR, "database")
DB_PATH = os.path.join(DB_DIR, "database.db")

os.makedirs(DB_DIR, exist_ok=True)

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "agriguide-dev-secret-change-in-production")
app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024

# Rule-based crop profiles. This project does not use AI or machine learning.
CROP_RULES = {
    "Rice": {"soils": ["Clay", "Alluvial", "Loamy"], "seasons": ["Kharif", "All-round"], "weather": ["Moderate Rain", "Heavy Rain", "Light Rain"], "reason": "Rice generally needs warm conditions and a reliable water supply."},
    "Maize": {"soils": ["Loamy", "Alluvial", "Black", "Red"], "seasons": ["Kharif", "Rabi", "All-round"], "weather": ["Light Rain", "Moderate Rain", "Cloudy"], "reason": "Maize often suits well-drained soil with moderate rainfall."},
    "Ragi (Finger Millet)": {"soils": ["Red", "Sandy", "Loamy"], "seasons": ["Kharif", "All-round"], "weather": ["Light Rain", "Moderate Rain", "Cloudy", "Dry / Sunny"], "reason": "Ragi is commonly grown in parts of Karnataka and can tolerate comparatively drier conditions."},
    "Groundnut": {"soils": ["Sandy", "Red", "Loamy"], "seasons": ["Kharif", "Rabi", "All-round"], "weather": ["Light Rain", "Moderate Rain", "Dry / Sunny"], "reason": "Groundnut generally prefers loose, well-drained soil and avoids waterlogging."},
    "Pigeon Pea (Toor Dal)": {"soils": ["Red", "Black", "Loamy"], "seasons": ["Kharif", "All-round"], "weather": ["Light Rain", "Moderate Rain", "Dry / Sunny"], "reason": "Pigeon pea can suit warm conditions and moderate rainfall."},
    "Green Gram": {"soils": ["Sandy", "Red", "Loamy", "Alluvial"], "seasons": ["Kharif", "Rabi", "Zaid", "All-round"], "weather": ["Light Rain", "Moderate Rain", "Dry / Sunny"], "reason": "Green gram often suits well-drained soils and moderate moisture."},
    "Cotton": {"soils": ["Black", "Loamy", "Red"], "seasons": ["Kharif", "All-round"], "weather": ["Light Rain", "Moderate Rain", "Dry / Sunny"], "reason": "Cotton is commonly associated with warm growing conditions and well-drained soil."},
    "Jowar (Sorghum)": {"soils": ["Black", "Red", "Sandy", "Loamy"], "seasons": ["Kharif", "Rabi", "All-round"], "weather": ["Dry / Sunny", "Light Rain", "Moderate Rain"], "reason": "Jowar is a useful dryland cereal in many parts of India."},
    "Banana": {"soils": ["Loamy", "Alluvial", "Clay"], "seasons": ["Kharif", "All-round"], "weather": ["Moderate Rain", "Heavy Rain", "Light Rain"], "reason": "Banana generally needs fertile soil, warmth, and regular moisture."},
    "Watermelon": {"soils": ["Sandy", "Loamy", "Alluvial"], "seasons": ["Zaid", "All-round"], "weather": ["Dry / Sunny", "Light Rain"], "reason": "Watermelon often suits warm weather and loose, well-drained soil."},
    "Chickpea (Bengal Gram)": {"soils": ["Black", "Loamy", "Red"], "seasons": ["Rabi", "All-round"], "weather": ["Dry / Sunny", "Light Rain", "Cloudy"], "reason": "Chickpea is generally a cool-season crop that needs limited to moderate moisture."},
    "Coffee": {"soils": ["Red", "Loamy", "Laterite"], "seasons": ["Kharif", "All-round"], "weather": ["Cloudy", "Light Rain", "Moderate Rain"], "reason": "Coffee is grown in suitable upland areas with shade and reliable rainfall."},
}
SOIL_TYPES = {"Red", "Sandy", "Black", "Clay", "Loamy", "Alluvial", "Laterite"}
SEASONS = {"All-round", "Kharif", "Rabi", "Zaid"}
WEATHER_TYPES = {"Dry / Sunny", "Cloudy", "Light Rain", "Moderate Rain", "Heavy Rain"}

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL
        )""")
        conn.execute("""CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            n REAL NOT NULL, p REAL NOT NULL, k REAL NOT NULL,
            temperature REAL NOT NULL, humidity REAL NOT NULL, rainfall REAL NOT NULL, ph REAL NOT NULL,
            soil TEXT NOT NULL, water TEXT NOT NULL, season TEXT NOT NULL,
            recommended_crop TEXT NOT NULL,
            health TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )""")
        conn.commit()

def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if "user_id" not in session:
            flash("Please log in to continue.", "warning")
            return redirect(url_for("login"))
        return view(*args, **kwargs)
    return wrapped

def validate_form(form):
    soil = form.get("soil", "").strip()
    season = form.get("season", "").strip()
    weather = form.get("weather", "").strip()
    if not soil or not season or not weather:
        return None, "Please select soil type, season, and weather."
    if soil not in SOIL_TYPES:
        return None, "Please select a valid soil type."
    if season not in SEASONS:
        return None, "Please select a valid season."
    if weather not in WEATHER_TYPES:
        return None, "Please select a valid weather condition."
    return {"soil": soil, "season": season, "weather": weather}, None

def predict_crop(data):
    ranked = []
    for crop, profile in CROP_RULES.items():
        score = 0
        score += 1 if data["soil"] in profile["soils"] else 0
        score += 1 if data["season"] in profile["seasons"] else 0
        score += 1 if data["weather"] in profile["weather"] else 0
        ranked.append((crop, score, profile))
    ranked.sort(key=lambda item: (item[1], item[0]), reverse=True)
    best_crop, best_score, profile = ranked[0]
    alternatives = [{"crop": crop, "score": round(score / 3 * 100, 1)} for crop, score, _ in ranked[1:4]] # type: ignore
    return {
        "crop": best_crop,
        "confidence": round(best_score / 3 * 100, 1), # type: ignore # pyright: ignore[reportUndefinedVariable]
        "alternatives": alternatives,
        "health": "Good match" if best_score == 3 else ("Possible match" if best_score == 2 else "Limited match"),
        "health_score": round(best_score / 3 * 100, 1), # type: ignore
        "season": ", ".join(profile["seasons"]),
        "reasons": [profile["reason"], f"Soil selected: {data['soil']}.", f"Season selected: {data['season']}.", f"Weather selected: {data['weather']}.", f"This crop matched {best_score} of the 3 selected conditions."],
        "model_used": False
    }

@app.context_processor
def inject_globals():
    return {"logged_in_name": session.get("name")}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        phone = request.form.get("phone", "").strip()
        password = request.form.get("password", "")
        confirm = request.form.get("confirm_password", "")
        if not name or not phone or not password or not confirm:
            flash("All fields are required.", "danger")
        elif not phone.isdigit() or len(phone) != 10 or phone[0] not in "6789":
            flash("Enter a valid 10-digit Indian mobile number.", "danger")
        elif len(password) < 6:
            flash("Password must contain at least 6 characters.", "danger")
        elif password != confirm:
            flash("Passwords do not match.", "danger")
        else:
            try:
                with get_db() as conn:
                    conn.execute(
                        "INSERT INTO users(name, phone, password_hash, created_at) VALUES (?, ?, ?, ?)",
                        (name, phone, generate_password_hash(password), datetime.now().isoformat(timespec="seconds"))
                    )
                    conn.commit()
                flash("Registration successful. Please log in.", "success")
                return redirect(url_for("login"))
            except sqlite3.IntegrityError:
                flash("This phone number is already registered.", "danger")
            except Exception:
                flash("Registration could not be completed. Please try again.", "danger")
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        phone = request.form.get("phone", "").strip()
        password = request.form.get("password", "")
        with get_db() as conn:
            user = conn.execute("SELECT * FROM users WHERE phone = ?", (phone,)).fetchone()
        if user and check_password_hash(user["password_hash"], password):
            session.clear()
            session["user_id"] = user["id"]
            session["name"] = user["name"]
            return redirect(url_for("dashboard"))
        flash("Invalid phone number or password.", "danger")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    flash("You have been logged out.", "success")
    return redirect(url_for("index"))

@app.route("/dashboard")
@login_required
def dashboard():
    with get_db() as conn:
        count = conn.execute("SELECT COUNT(*) AS c FROM predictions WHERE user_id = ?", (session["user_id"],)).fetchone()["c"]
        last = conn.execute("SELECT recommended_crop, created_at FROM predictions WHERE user_id = ? ORDER BY id DESC LIMIT 1",
                            (session["user_id"],)).fetchone()
    return render_template("dashboard.html", count=count, last=last)

@app.route("/predict", methods=["GET", "POST"])
@login_required
def predict():
    if request.method == "POST":
        data, error = validate_form(request.form)
        if error:
            flash(error, "danger")
            return render_template("predict.html", form=request.form), 400
        result = predict_crop(data)
        try:
            with get_db() as conn:
                conn.execute("""INSERT INTO predictions
                    (user_id, created_at, n, p, k, temperature, humidity, rainfall, ph, soil, water, season, recommended_crop, health)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (session["user_id"], datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                     0, 0, 0, 0, 0, 0, 0, data["soil"], data["weather"], data["season"], result["crop"], result["health"]))
                conn.commit()
        except sqlite3.Error:
            app.logger.exception("Failed to save crop recommendation history")
            flash("Recommendation was generated, but history could not be saved.", "warning")
        return render_template("results.html", data=data, result=result)
    return render_template("predict.html", form={})

@app.route("/history")
@login_required
def history():
    with get_db() as conn:
        rows = conn.execute("SELECT * FROM predictions WHERE user_id = ? ORDER BY id DESC", (session["user_id"],)).fetchall()
    return render_template("history.html", rows=rows)

@app.post("/history/delete/<int:prediction_id>")
@login_required
def delete_prediction(prediction_id):
    with get_db() as conn:
        conn.execute("DELETE FROM predictions WHERE id = ? AND user_id = ?", (prediction_id, session["user_id"]))
        conn.commit()
    flash("Prediction deleted.", "success")
    return redirect(url_for("history"))

@app.post("/history/clear")
@login_required
def clear_history():
    with get_db() as conn:
        conn.execute("DELETE FROM predictions WHERE user_id = ?", (session["user_id"],))
        conn.commit()
    flash("Prediction history cleared.", "success")
    return redirect(url_for("history"))

@app.route("/health")
@login_required
def health():
    with get_db() as conn:
        last = conn.execute("SELECT * FROM predictions WHERE user_id = ? ORDER BY id DESC LIMIT 1",
                            (session["user_id"],)).fetchone()
    return render_template("health.html", last=last)

@app.route("/about")
def about():
    return render_template("about.html")

@app.errorhandler(404)
def not_found(error):
    return render_template("404.html"), 404

@app.errorhandler(500)
def server_error(error):
    return render_template("500.html"), 500

init_db()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
