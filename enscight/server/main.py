import os
import shutil


def sort_files_by_type(directory):
    """
    Move files in `directory` into subfolders grouped by extension.

    - Files without an extension are moved to `no_extension/`.
    - Extension folders are lowercase and omit the leading dot.
    - Existing files are never overwritten; a numeric suffix is added
      when collisions occur.
    """
    if not os.path.isdir(directory):
        raise ValueError(f"Directory does not exist: {directory}")

    for item_name in os.listdir(directory):
        source_path = os.path.join(directory, item_name)

        # Only reorganize files at the top level of the directory.
        if not os.path.isfile(source_path):
            continue

        _, extension = os.path.splitext(item_name)
        target_folder_name = extension[1:].lower() if extension else "no_extension"
        target_folder_path = os.path.join(directory, target_folder_name)
        os.makedirs(target_folder_path, exist_ok=True)

        target_path = os.path.join(target_folder_path, item_name)
        if os.path.exists(target_path):
            base_name, ext = os.path.splitext(item_name)
            counter = 1
            while True:
                candidate_name = f"{base_name}_{counter}{ext}"
                candidate_path = os.path.join(target_folder_path, candidate_name)
                if not os.path.exists(candidate_path):
                    target_path = candidate_path
                    break
                counter += 1

        shutil.move(source_path, target_path)
