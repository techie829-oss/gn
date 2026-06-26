import os
import re

files_to_update = ['about.html', 'services.html', 'projects.html', 'industries.html', 'gallery.html', 'contact.html']

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract from '<nav id="navbar"' to the end of '<div id="mobile-nav"...</div>'
# We'll use regex to grab the whole block
nav_match = re.search(r'(<!-- ==================== NAVBAR ==================== -->.*?<!-- ====================)', index_content, re.DOTALL)
if nav_match:
    new_nav = nav_match.group(1)[:-28] # trim off the trailing '<!-- ===================='
    
    for file in files_to_update:
        if os.path.exists(file):
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find the equivalent block in the target file
            updated_content = re.sub(r'<!-- ==================== NAVBAR ==================== -->.*?<!-- ====================', new_nav + '\n<!-- ====================', content, flags=re.DOTALL)
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f'Updated {file}')
        else:
            print(f'{file} not found')
else:
    print('Navbar block not found in index.html')
