#!/usr/bin/env python3
"""
Turing.com Prep Hub — Local Backend Server
Serves the web application and syncs the Knowledge Base directly with disk files.
Requires standard Python 3. No external pip dependencies needed.
"""

import http.server
import socketserver
import json
import os
import sys
import webbrowser

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_DIR = os.path.join(BASE_DIR, "app")
KB_DIR = os.path.join(BASE_DIR, "knowledge_base")

TOPICS_FILE = os.path.join(KB_DIR, "topics.json")
MCQ_FILE = os.path.join(KB_DIR, "mcq_bank.json")
LEETCODE_FILE = os.path.join(KB_DIR, "leetcode_log.json")
PROGRESS_FILE = os.path.join(KB_DIR, "progress.json")


def read_json_file(filepath, default_val=None):
    if not os.path.exists(filepath):
        return default_val if default_val is not None else []
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[Error reading {filepath}]: {e}")
        return default_val if default_val is not None else []


def write_json_file(filepath, data):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


class TuringRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP_DIR, **kwargs)

    def do_GET(self):
        if self.path == "/api/data":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            payload = {
                "topics": read_json_file(TOPICS_FILE, []),
                "mcqs": read_json_file(MCQ_FILE, []),
                "leetcode": read_json_file(LEETCODE_FILE, []),
                "progress": read_json_file(PROGRESS_FILE, {})
            }
            self.wfile.write(json.dumps(payload, ensure_ascii=False).encode("utf-8"))
            return

        super().do_GET()

    def do_POST(self):
        if self.path == "/api/save":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)

            try:
                payload = json.loads(post_data.decode("utf-8"))
                if "topics" in payload:
                    write_json_file(TOPICS_FILE, payload["topics"])
                if "mcqs" in payload:
                    write_json_file(MCQ_FILE, payload["mcqs"])
                if "leetcode" in payload:
                    write_json_file(LEETCODE_FILE, payload["leetcode"])
                if "progress" in payload:
                    write_json_file(PROGRESS_FILE, payload["progress"])

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "Saved to disk"}).encode("utf-8"))
                print("[Server] Successfully persisted updates to disk files.")
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


def run():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), TuringRequestHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 65)
        print(" 🎯 Turing.com Prep Hub Server running!")
        print(f" URL: {url}")
        print(" Press Ctrl+C in terminal to stop.")
        print("=" * 65)
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            httpd.shutdown()


if __name__ == "__main__":
    run()

