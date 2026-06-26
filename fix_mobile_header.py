import os
import re

html_files = [
    'index.html', 'about.html', 'services.html', 'projects.html', 
    'industries.html', 'gallery.html', 'contact.html',
    'dist/index.html', 'dist/about.html', 'dist/services.html', 
    'dist/projects.html', 'dist/industries.html', 'dist/gallery.html', 'dist/contact.html'
]

for filepath in html_files:
    if not os.path.exists(filepath):
        continue
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Add nav-cta class to the contact button div
        content = content.replace(
            '<div style="display:flex; align-items:center; gap:1rem;">\n      <a href="tel:+919810737881"',
            '<div class="nav-cta" style="display:flex; align-items:center; gap:1rem;">\n      <a href="tel:+919810737881"'
        )
        
        # 2. Make logo title responsive
        content = content.replace(
            "font-size:1.6rem; color:var(--gn-primary)",
            "font-size:clamp(1.1rem, 4vw, 1.6rem); color:var(--gn-primary)"
        )
        
        # 3. Make logo subtitle responsive
        content = content.replace(
            "font-size:0.75rem; color:#6B7280; letter-spacing:0.2em;",
            "font-size:clamp(0.55rem, 2vw, 0.75rem); color:#6B7280; letter-spacing:clamp(0.05em, 1vw, 0.2em);"
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Fixed {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
