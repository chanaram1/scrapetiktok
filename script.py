#rename tiktoks 

import os
import re

def sanitize_filename(filename):
    # Remove characters that are not allowed in Windows filenames
    sanitized = re.sub(r'[<>:"/\\|?*]', '', filename)
    return sanitized

# Read the names from the "video_titles.txt" file with UTF-8 encoding
with open('video_titles.txt', 'r', encoding='utf-8') as file:
    new_names = file.read().splitlines()

# Get the list of video files in the ".\tiktoks" directory
directory = r'.\tiktoks'
video_files = [file for file in os.listdir(directory) if file.endswith(('.mp4', '.avi', '.mkv'))]

# Rename video files
for i in range(len(video_files)):
    if i < len(new_names):
        original_file = os.path.join(directory, video_files[i])
        new_file_name = sanitize_filename(new_names[i]) + '.mp4'
        new_file = os.path.join(directory, new_file_name)

        # Handle file conflict by appending a number
        count = 1
        while os.path.exists(new_file):
            base_name, extension = os.path.splitext(new_file_name)
            new_file_name = base_name + '_' + str(count) + extension
            new_file = os.path.join(directory, new_file_name)
            count += 1

        os.rename(original_file, new_file)
    else:
        break
