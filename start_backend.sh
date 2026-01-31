#!/usr/bin/env bash
# Start the backend server

cd "$(dirname "$0")/backend"

echo "Starting Tilo Live Backend Server..."
echo "=========================================="
echo ""
echo "Backend will be available at: http://localhost:8000"
echo "API endpoint: http://localhost:8000/api/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 server.py
