const fs = require('fs');
const path = require('path');

const htaccessContent = `RewriteEngine On
RewriteBase /
RewriteRule ^index.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
`;

const buildDir = path.join(__dirname, '../frontend/build');
const htaccessPath = path.join(buildDir, '.htaccess');

// Create build directory if it doesn't exist
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Write .htaccess file
fs.writeFileSync(htaccessPath, htaccessContent);
console.log('✓ .htaccess file generated successfully at', htaccessPath);
