const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
    const dir = path.join(__dirname, 'public', 'projects');
    const files = ['moonlit.jpg', 'balearic.png', 'gardais.png'];

    for (const file of files) {
        const filePath = path.join(dir, file);
        const tempPath = path.join(dir, `temp_${file}`);

        try {
            if (fs.existsSync(filePath)) {
                console.log(`Optimizing ${file}...`);

                let sharpInst = sharp(filePath).resize({ width: 1920, withoutEnlargement: true });

                if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
                    sharpInst = sharpInst.jpeg({ quality: 80, progressive: true });
                } else if (file.endsWith('.png')) {
                    sharpInst = sharpInst.png({ quality: 80, compressionLevel: 9 });
                }

                await sharpInst.toFile(tempPath);

                // Replace original with optimized version
                fs.unlinkSync(filePath);
                fs.renameSync(tempPath, filePath);

                const stats = fs.statSync(filePath);
                console.log(`Success: ${file} is now ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
            }
        } catch (err) {
            console.error(`Error optimizing ${file}:`, err);
        }
    }
}

optimizeImages();
