import os
import zipfile

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_ZIP = os.path.join(BASE_DIR, "mandyboarder_export.zip")
INCLUDE_FILES = [
    "index.html",
]
INCLUDE_DIRS = [
    "js",
    "css",
    "fonts",
    "WEB_ELEMENTS",
]
WEB_ELEMENTS_ALLOWED_EXT = {".webp"}

def should_include_web_element(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    # Only allow .webp raster images, allow all non-image files
    if ext in {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff"}:
        return False
    if ext == ".webp":
        return True
    # Allow non-image files (e.g., .svg, .json, etc.)
    return not ext or ext not in {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff"}

def add_file_to_zip(zipf, file_path, arcname):
    zipf.write(file_path, arcname)

def add_dir_to_zip(zipf, dir_path, arc_prefix="", filter_func=None):
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            abs_file = os.path.join(root, file)
            rel_path = os.path.relpath(abs_file, BASE_DIR)
            if arc_prefix:
                arcname = os.path.join(arc_prefix, os.path.relpath(abs_file, dir_path))
            else:
                arcname = rel_path
            if filter_func is None or filter_func(abs_file):
                add_file_to_zip(zipf, abs_file, arcname)

def main():
    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as zipf:
        # Add index.html
        for file in INCLUDE_FILES:
            file_path = os.path.join(BASE_DIR, file)
            if os.path.isfile(file_path):
                add_file_to_zip(zipf, file_path, file)
        # Add directories
        for dir_name in INCLUDE_DIRS:
            dir_path = os.path.join(BASE_DIR, dir_name)
            if os.path.isdir(dir_path):
                if dir_name == "WEB_ELEMENTS":
                    add_dir_to_zip(
                        zipf,
                        dir_path,
                        arc_prefix=dir_name,
                        filter_func=should_include_web_element,
                    )
                else:
                    add_dir_to_zip(zipf, dir_path, arc_prefix=dir_name)
    print(f"Exported to {OUTPUT_ZIP}")

if __name__ == "__main__":
    main()