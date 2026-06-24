const fs = require('fs');

let custom = fs.readFileSync('css/custom.css', 'utf8');

// Fix Hamburger Menu
custom = custom.replace(
  /#mobile-menu-btn span \{[\s\S]*?transform-origin: left center;[\s\S]*?\}/,
  '#mobile-menu-btn span {\n  width: 100%;\n  height: 2px;\n  background-color: #fff;\n  transition: var(--transition);\n  transform-origin: center;\n  border-radius: 2px;\n}'
);

custom = custom.replace(
  /#mobile-menu-btn\[aria-expanded="true"\] span:nth-child\(1\) \{[\s\S]*?\}/,
  '#mobile-menu-btn[aria-expanded="true"] span:nth-child(1) {\n  transform: translateY(10px) rotate(45deg);\n}'
);

custom = custom.replace(
  /#mobile-menu-btn\[aria-expanded="true"\] span:nth-child\(3\) \{[\s\S]*?\}/,
  '#mobile-menu-btn[aria-expanded="true"] span:nth-child(3) {\n  transform: translateY(-10px) rotate(-45deg);\n}'
);

// Fix Mobile Nav Link Styles
custom = custom.replace(
  /\.mobile-nav-link a \{[\s\S]*?text-align: center;\s*\}/,
  `.mobile-nav-link {
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 1rem;
}

.mobile-nav-link > a, .mobile-nav-link > span {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
}

.mobile-nav-link.open > span {
  color: var(--accent);
}

.mobile-sub-links {
  display: none;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1rem;
  border-left: 2px solid var(--accent);
  margin-top: 1rem;
  width: 100%;
}

.mobile-nav-link.open .mobile-sub-links {
  display: flex;
}

.mobile-sub-links a {
  font-family: var(--font-main);
  font-size: 1.1rem !important;
  font-weight: 500;
  color: var(--text-secondary) !important;
  text-align: left;
  border: none;
  padding: 0;
}`
);

fs.writeFileSync('css/custom.css', custom);

// Remove duplicate sub-links from custom2.css
if (fs.existsSync('css/custom2.css')) {
  let custom2 = fs.readFileSync('css/custom2.css', 'utf8');
  custom2 = custom2.replace(/\/\* MOBILE MENU LINKS \*\/[\s\S]*?\.mobile-nav-link span \{[^\}]*\}\n/g, '');
  fs.writeFileSync('css/custom2.css', custom2);
}

console.log('CSS fixed.');
