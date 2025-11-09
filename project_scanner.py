
import os
import sys

def should_ignore(path, ignore_patterns):
    """Check if path matches any ignore pattern"""
    name = os.path.basename(path)
    for pattern in ignore_patterns:
        if pattern in path or name == pattern or path.endswith(pattern):
            return True
    return False

def get_project_structure(root_dir, output_file="project_structure.txt", ignore_patterns=None):
    """
    Scan directory and create a file with complete project structure and contents
    
    Args:
        root_dir: Root directory to scan
        output_file: Output file name
        ignore_patterns: List of patterns to ignore (folders/files)
    """
    if ignore_patterns is None:
        # Common patterns to ignore
        ignore_patterns = [
            'node_modules', '__pycache__', '.git', '.venv', 'venv',
            '.env', '.DS_Store', '.idea', '.vscode', 'dist', 'build',
            '.next', 'coverage', '.pytest_cache', '*.pyc', '*.log'
        ]
    
    # Binary file extensions to skip
    binary_extensions = {
        '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.ico', '.svg',
        '.pdf', '.zip', '.tar', '.gz', '.rar', '.7z',
        '.exe', '.dll', '.so', '.dylib',
        '.mp3', '.mp4', '.avi', '.mov',
        '.woff', '.woff2', '.ttf', '.eot'
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"PROJECT STRUCTURE: {os.path.abspath(root_dir)}\n")
        f.write("=" * 80 + "\n\n")
        
        # First, write the directory tree
        f.write("DIRECTORY TREE:\n")
        f.write("-" * 80 + "\n")
        
        for root, dirs, files in os.walk(root_dir):
            # Filter out ignored directories
            dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d), ignore_patterns)]
            
            level = root.replace(root_dir, '').count(os.sep)
            indent = '  ' * level
            f.write(f"{indent}{os.path.basename(root)}/\n")
            
            sub_indent = '  ' * (level + 1)
            for file in sorted(files):
                if not should_ignore(file, ignore_patterns):
                    f.write(f"{sub_indent}{file}\n")
        
        f.write("\n" + "=" * 80 + "\n\n")
        
        # Then, write file contents
        f.write("FILE CONTENTS:\n")
        f.write("-" * 80 + "\n\n")
        
        for root, dirs, files in os.walk(root_dir):
            # Filter out ignored directories
            dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d), ignore_patterns)]
            
            for file in sorted(files):
                if should_ignore(file, ignore_patterns):
                    continue
                
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, root_dir)
                
                # Skip binary files
                _, ext = os.path.splitext(file)
                if ext.lower() in binary_extensions:
                    f.write(f"\n{'=' * 80}\n")
                    f.write(f"FILE: {relative_path}\n")
                    f.write(f"{'=' * 80}\n")
                    f.write("[Binary file - content not displayed]\n")
                    continue
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as file_content:
                        content = file_content.read()
                        
                    f.write(f"\n{'=' * 80}\n")
                    f.write(f"FILE: {relative_path}\n")
                    f.write(f"{'=' * 80}\n")
                    f.write(content)
                    f.write("\n")
                    
                except UnicodeDecodeError:
                    f.write(f"\n{'=' * 80}\n")
                    f.write(f"FILE: {relative_path}\n")
                    f.write(f"{'=' * 80}\n")
                    f.write("[Binary file - unable to decode as text]\n")
                except Exception as e:
                    f.write(f"\n{'=' * 80}\n")
                    f.write(f"FILE: {relative_path}\n")
                    f.write(f"{'=' * 80}\n")
                    f.write(f"[Error reading file: {str(e)}]\n")
    
    print(f"✓ Project structure saved to: {output_file}")
    print(f"✓ Scanned directory: {os.path.abspath(root_dir)}")

if __name__ == "__main__":
    # Get directory from command line argument or use current directory
    directory = sys.argv[1] if len(sys.argv) > 1 else "."
    
    # Optional: custom output file
    output = sys.argv[2] if len(sys.argv) > 2 else "project_structure.txt"
    
    # Optional: add custom ignore patterns
    custom_ignore = []
    if len(sys.argv) > 3:
        custom_ignore = sys.argv[3].split(',')
    
    get_project_structure(directory, output, custom_ignore if custom_ignore else None)