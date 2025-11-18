#!/bin/bash

# Development Server Start Script
# Starts Hugo server with live reload

cd "$(dirname "$0")/themes/andromeda-hugo"

echo "🚀 Starting Hugo development server..."
echo "📍 Location: themes/andromeda-hugo"
echo ""
echo "🌐 URLs:"
echo "   Romanian: http://localhost:1313/"
echo "   English:  http://localhost:1313/en/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

hugo server --buildDrafts --bind 0.0.0.0 --port 1313 --config hugo.toml
