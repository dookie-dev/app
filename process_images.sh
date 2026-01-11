#!/bin/bash

# 1. Create Directories
mkdir -p public/dookie-img/hero
mkdir -p public/dookie-img/cookies/choco-chip
mkdir -p public/dookie-img/cookies/matcha
mkdir -p public/dookie-img/cookies/red-velvet
mkdir -p public/dookie-img/cookies/oatmeal
mkdir -p public/dookie-img/cookies/biscoff
mkdir -p public/dookie-img/cookies/double-choco
mkdir -p public/dookie-img/reviews
mkdir -p public/dookie-img/about
mkdir -p public/dookie-img/placeholder

# 2. Function to convert and move
convert_image() {
    src="$1"
    dest="$2"
    
    if [ -f "$src" ]; then
        cwebp -q 80 "$src" -o "$dest"
        # Create thumbnail for srcset if needed (e.g. 400w)
        # ffmpeg -i "$src" -vf scale=400:-1 "${dest%.webp}-400.webp" -y
    fi
}

# 3. Process Images (Distribute arbitrarily since filenames are opaque)
# Get list of jpg files
files=(public/dookie-img/*.jpg)

# Hero (2 images)
convert_image "${files[0]}" "public/dookie-img/hero/hero-1.webp"
convert_image "${files[1]}" "public/dookie-img/hero/hero-2.webp"

# Choco Chip (3 images)
convert_image "${files[2]}" "public/dookie-img/cookies/choco-chip/1.webp"
convert_image "${files[3]}" "public/dookie-img/cookies/choco-chip/2.webp"
convert_image "${files[4]}" "public/dookie-img/cookies/choco-chip/3.webp"

# Double Choco (2 images)
convert_image "${files[5]}" "public/dookie-img/cookies/double-choco/1.webp"
convert_image "${files[6]}" "public/dookie-img/cookies/double-choco/2.webp"

# Matcha (2 images)
convert_image "${files[7]}" "public/dookie-img/cookies/matcha/1.webp"
convert_image "${files[8]}" "public/dookie-img/cookies/matcha/2.webp"

# Red Velvet (2 images)
convert_image "${files[9]}" "public/dookie-img/cookies/red-velvet/1.webp"
convert_image "${files[10]}" "public/dookie-img/cookies/red-velvet/2.webp"

# Biscoff (2 images)
convert_image "${files[11]}" "public/dookie-img/cookies/biscoff/1.webp"
convert_image "${files[12]}" "public/dookie-img/cookies/biscoff/2.webp"

# Oatmeal (2 images)
convert_image "${files[13]}" "public/dookie-img/cookies/oatmeal/1.webp"
convert_image "${files[14]}" "public/dookie-img/cookies/oatmeal/2.webp"

# Reviews (5 images)
convert_image "${files[15]}" "public/dookie-img/reviews/1.webp"
convert_image "${files[16]}" "public/dookie-img/reviews/2.webp"
convert_image "${files[17]}" "public/dookie-img/reviews/3.webp"
convert_image "${files[18]}" "public/dookie-img/reviews/4.webp"
convert_image "${files[19]}" "public/dookie-img/reviews/5.webp"

# About (Remaining)
convert_image "${files[20]}" "public/dookie-img/about/1.webp"
convert_image "${files[21]}" "public/dookie-img/about/2.webp"
convert_image "${files[22]}" "public/dookie-img/about/3.webp"

# Clean up originals? Optional. For now keep them but maybe move to backup.
mkdir -p public/dookie-img/raw_backup
mv public/dookie-img/*.jpg public/dookie-img/raw_backup/
