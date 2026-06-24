const fs = require('fs');

try {
    const tailwind = fs.readFileSync('css/tailwind-output.css', 'utf8');

    // Read custom.css but STRIP all Tailwind directives (they're for the CLI only, not browsers)
    let custom = fs.readFileSync('css/custom.css', 'utf8');
    custom = custom
        .replace(/@import\s+["']tailwindcss["'];?\s*/g, '')
        .replace(/@source\s+["'][^"']+["'];?\s*/g, '')
        .replace(/@theme\s*\{[^}]*\}/gs, '') // Remove @theme block (handled by tailwind output)
        .replace(/^\uFEFF/, '');

    let custom2 = fs.readFileSync('css/custom2.css', 'utf8');
    custom2 = custom2.replace(/^\uFEFF/, '');

    let pages = fs.readFileSync('css/pages.css', 'utf8');
    pages = pages.replace(/^\uFEFF/, '');

    // mobile.css loaded LAST — highest specificity wins
    let mobile = fs.readFileSync('css/mobile.css', 'utf8');
    mobile = mobile.replace(/^\uFEFF/, '');

    const tailwindClean = tailwind.replace(/^\uFEFF/, '');

    const finalCSS = tailwindClean
        + '\n\n/* === CUSTOM STYLES === */\n\n' + custom
        + '\n\n/* === HOMEPAGE STYLES === */\n\n' + custom2
        + '\n\n/* === PAGES STYLES === */\n\n' + pages
        + '\n\n/* === MOBILE OVERRIDES (always last) === */\n\n' + mobile;

    fs.writeFileSync('css/output.css', finalCSS, 'utf8');
    console.log('Concatenation successful, output length:', finalCSS.length);

    // Verify key classes exist
    const checks = ['.animate-in', '.footer-top', '.hero-bg', '.nav-inner', '.footer-bottom', '.btn-primary', '#mobile-nav'];
    checks.forEach(cls => {
        const found = finalCSS.includes(cls);
        console.log(found ? '✓' : '✗', cls);
    });
} catch (e) {
    console.error('Error:', e.message);
}
