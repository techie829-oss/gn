import re

for filepath in ['gallery.html', 'dist/gallery.html']:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace h3 classes
        content = content.replace('class="text-xl font-bold mb-2 transform', 'class="text-white text-xl font-bold mb-2 transform')
        
        # Replace p classes
        content = content.replace('class="text-center text-sm text-gray-200 transform', 'class="text-white text-center text-sm transform')
        
        # Also just in case, add an inline style so the browser FORCES it white overriding global tag styles
        content = content.replace('class="text-white text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition duration-300 delay-75"', 'class="text-white text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition duration-300 delay-75" style="color: #ffffff !important;"')
        content = content.replace('class="text-white text-center text-sm transform translate-y-4 group-hover:translate-y-0 transition duration-300 delay-100"', 'class="text-white text-center text-sm transform translate-y-4 group-hover:translate-y-0 transition duration-300 delay-100" style="color: #ffffff !important;"')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'Updated {filepath}')
    except Exception as e:
        print(f'Failed on {filepath}: {e}')
