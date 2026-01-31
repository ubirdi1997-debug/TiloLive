#!/usr/bin/env bash
set -eu

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

OS_DESC=""
if [ -f /etc/os-release ]; then
  . /etc/os-release
  OS_DESC="${NAME:-} ${VERSION_ID:-}"
elif [ -f /etc/redhat-release ]; then
  OS_DESC="$(cat /etc/redhat-release)"
fi
echo "==> Detected OS: ${OS_DESC}"

if command -v dnf >/dev/null 2>&1; then
  PKG_MGR="dnf"
elif command -v yum >/dev/null 2>&1; then
  PKG_MGR="yum"
else
  PKG_MGR=""
fi

install_system_deps() {
  if [ -z "$PKG_MGR" ]; then
    echo "No yum/dnf found. Please install system deps manually."
    return
  fi

  echo "==> Installing system dependencies (CloudLinux 8)"
  sudo "$PKG_MGR" -y install \
    python3 \
    python3-pip \
    python3-devel \
    gcc \
    openssl-devel \
    libffi-devel \
    make

  if ! command -v node >/dev/null 2>&1; then
    echo "==> Installing Node.js LTS"
    sudo "$PKG_MGR" -y install nodejs npm || true
  fi
}

install_system_deps

echo "==> Installing backend Python dependencies"
python3 -m pip install --upgrade pip
python3 -m pip install \
  fastapi \
  "uvicorn[standard]" \
  python-dotenv \
  bcrypt \
  aiosmtplib \
  "pydantic[email]" \
  python-multipart

if [ -f "$ROOT_DIR/backend/requirements.txt" ]; then
  echo "==> Installing backend requirements.txt (best-effort)"
  python3 -m pip install -r "$ROOT_DIR/backend/requirements.txt" || true
fi

echo "==> Installing frontend dependencies"
cd "$ROOT_DIR/frontend"
if command -v npm >/dev/null 2>&1; then
  npm install
else
  echo "npm not found. Please install Node.js/npm first."
  exit 1
fi

echo "==> Done"
