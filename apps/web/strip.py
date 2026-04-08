import os
import re

def main():
    base_dir = r"c:\Users\Situ Aj\Documents\KLEENCH MOBILE\apps\web\src"
    rx = re.compile(r'\s+(?:sm|md|lg|xl|2xl|hover|group-hover):[a-zA-Z0-9\-\_\[\]\#\.]+')
    changed = 0

    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    rep, count = rx.subn('', content)
                    if count > 0:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(rep)
                        changed += 1
                        print(f"Updated {path}")
                except Exception as e:
                    print(f"Failed {path}: {e}")

    print(f"Changed files: {changed}")

if __name__ == "__main__":
    main()
