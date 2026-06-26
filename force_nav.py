import os
import re

files_to_update = ['about.html', 'services.html', 'projects.html', 'industries.html', 'gallery.html', 'contact.html']

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract styles from index.html
style_match = re.search(r'(<style>.*?</style>)', index_content, re.DOTALL)
new_style = style_match.group(1) if style_match else ""

# Extract nav from index.html
nav_match = re.search(r'(<nav id="navbar".*?</nav>.*?<div id="mobile-nav".*?</div>)', index_content, re.DOTALL)
new_nav = nav_match.group(1) if nav_match else ""

if new_style and new_nav:
    for file in files_to_update:
        if os.path.exists(file):
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace style or insert before </head>
            if '<style>' in content:
                content = re.sub(r'<style>.*?</style>', new_style, content, flags=re.DOTALL)
            else:
                content = content.replace('</head>', f'{new_style}\n</head>')
            
            # Replace nav
            # Find the start of nav and end of mobile-nav
            old_nav_match = re.search(r'(<nav id="navbar".*?</nav>.*?<div id="mobile-nav".*?</div>)', content, re.DOTALL)
            if old_nav_match:
                content = content.replace(old_nav_match.group(1), new_nav)
            else:
                # Fallback if mobile-nav is not there
                old_nav_only = re.search(r'(<nav id="navbar".*?</nav>)', content, re.DOTALL)
                if old_nav_only:
                    content = content.replace(old_nav_only.group(1), new_nav)
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {file}')
        else:
            print(f'{file} not found')
else:
    print('Error extracting style or nav from index.html')
