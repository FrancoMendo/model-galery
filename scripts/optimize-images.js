/**
 * Script de optimización de imágenes
 * Optimiza las imágenes JPG manteniendo metadata EXIF y alta calidad
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración
const CONFIG = {
  inputDir: join(__dirname, '..', 'public', 'images', 'models'),
  backupDir: join(__dirname, '..', 'public', 'images', 'models', 'originals'),
  maxWidth: 2000,
  maxHeight: 2000,
  quality: 90,
  preserveMetadata: true,
  extensions: ['.jpg', '.jpeg', '.JPG', '.JPEG'],
};

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

/**
 * Formatea bytes a formato legible
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Obtiene información de la imagen
 */
async function getImageInfo(imagePath) {
  const metadata = await sharp(imagePath).metadata();
  const stats = await stat(imagePath);
  return {
    width: metadata.width,
    height: metadata.height,
    size: stats.size,
    format: metadata.format,
    hasExif: !!metadata.exif,
  };
}

/**
 * Crea backup de la imagen original
 */
async function createBackup(sourcePath, backupDir) {
  try {
    await mkdir(backupDir, { recursive: true });
    const fileName = sourcePath.split(/[\\/]/).pop();
    const backupPath = join(backupDir, fileName);
    
    // Copiar el archivo original
    await sharp(sourcePath)
      .toFile(backupPath);
    
    return backupPath;
  } catch (error) {
    console.error(`${colors.red}Error creando backup:${colors.reset}`, error.message);
    return null;
  }
}

/**
 * Optimiza una imagen individual
 */
async function optimizeImage(imagePath, config) {
  try {
    console.log(`\n${colors.blue}Procesando:${colors.reset} ${imagePath.split(/[\\/]/).pop()}`);
    
    // Obtener info original
    const originalInfo = await getImageInfo(imagePath);
    console.log(`  Tamaño original: ${formatBytes(originalInfo.size)}`);
    console.log(`  Dimensiones: ${originalInfo.width}x${originalInfo.height}`);
    console.log(`  Metadata EXIF: ${originalInfo.hasExif ? 'Sí' : 'No'}`);
    
    // Crear backup si no existe
    const backupPath = join(config.backupDir, imagePath.split(/[\\/]/).pop());
    try {
      await stat(backupPath);
      console.log(`  ${colors.yellow}Backup ya existe${colors.reset}`);
    } catch {
      console.log(`  Creando backup...`);
      await createBackup(imagePath, config.backupDir);
    }
    
    // Optimizar imagen
    const sharpInstance = sharp(imagePath);
    
    // Preservar metadata si está habilitado
    if (config.preserveMetadata) {
      sharpInstance.withMetadata({
        orientation: undefined, // Mantener orientación
      });
    }
    
    // Redimensionar si excede dimensiones máximas
    const needsResize = 
      originalInfo.width > config.maxWidth || 
      originalInfo.height > config.maxHeight;
    
    if (needsResize) {
      sharpInstance.resize(config.maxWidth, config.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Aplicar compresión optimizada
    sharpInstance.jpeg({
      quality: config.quality,
      progressive: true, // JPEG progresivo para carga más rápida
      mozjpeg: true, // Usar mozjpeg para mejor compresión
    });
    
    // Guardar imagen optimizada en un archivo temporal
    const fs = await import('fs/promises');
    const fileName = imagePath.split(/[\\/]/).pop();
    const dirName = imagePath.split(/[\\/]/).slice(0, -1).join('/');
    const tempPath = join(dirName, 'temp_' + fileName);
    
    await sharpInstance.toFile(tempPath);
    
    // Obtener info optimizada
    const optimizedInfo = await getImageInfo(tempPath);
    const savings = originalInfo.size - optimizedInfo.size;
    const savingsPercent = ((savings / originalInfo.size) * 100).toFixed(1);
    
    console.log(`  ${colors.green}Tamaño optimizado: ${formatBytes(optimizedInfo.size)}${colors.reset}`);
    console.log(`  ${colors.cyan}Ahorro: ${formatBytes(savings)} (${savingsPercent}%)${colors.reset}`);
    
    // Eliminar archivo original y renombrar el temporal
    await fs.unlink(imagePath);
    await fs.rename(tempPath, imagePath);
    
    return {
      path: imagePath,
      originalSize: originalInfo.size,
      optimizedSize: optimizedInfo.size,
      savings: savings,
      savingsPercent: parseFloat(savingsPercent),
    };
  } catch (error) {
    console.error(`${colors.red}Error optimizando ${imagePath}:${colors.reset}`, error.message);
    return null;
  }
}

/**
 * Procesa todas las imágenes en un directorio
 */
async function processDirectory(dirPath, config) {
  try {
    const files = await readdir(dirPath);
    const results = [];
    
    for (const file of files) {
      const filePath = join(dirPath, file);
      const fileStats = await stat(filePath);
      
      // Saltar directorios y archivos que no son imágenes
      if (fileStats.isDirectory() || !config.extensions.includes(extname(file).toLowerCase())) {
        continue;
      }
      
      const result = await optimizeImage(filePath, config);
      if (result) {
        results.push(result);
      }
    }
    
    return results;
  } catch (error) {
    console.error(`${colors.red}Error procesando directorio:${colors.reset}`, error.message);
    return [];
  }
}

/**
 * Función principal
 */
async function main() {
  console.log(`${colors.cyan}═══════════════════════════════════════════════════`);
  console.log(`  Optimizador de Imágenes - Model Gallery`);
  console.log(`═══════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`Directorio de entrada: ${CONFIG.inputDir}`);
  console.log(`Directorio de backup: ${CONFIG.backupDir}`);
  console.log(`Calidad JPEG: ${CONFIG.quality}`);
  console.log(`Dimensiones máximas: ${CONFIG.maxWidth}x${CONFIG.maxHeight}`);
  console.log(`Preservar metadata: ${CONFIG.preserveMetadata ? 'Sí' : 'No'}`);
  
  const startTime = Date.now();
  
  // Procesar imágenes
  console.log(`\n${colors.yellow}Iniciando optimización...${colors.reset}`);
  const results = await processDirectory(CONFIG.inputDir, CONFIG);
  
  // Resumen
  const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimizedSize = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalSavings = totalOriginalSize - totalOptimizedSize;
  const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════`);
  console.log(`  Resumen de Optimización`);
  console.log(`═══════════════════════════════════════════════════${colors.reset}\n`);
  console.log(`${colors.green}✓${colors.reset} Imágenes procesadas: ${results.length}`);
  console.log(`${colors.green}✓${colors.reset} Tamaño original total: ${formatBytes(totalOriginalSize)}`);
  console.log(`${colors.green}✓${colors.reset} Tamaño optimizado total: ${formatBytes(totalOptimizedSize)}`);
  console.log(`${colors.green}✓${colors.reset} Ahorro total: ${formatBytes(totalSavings)} (${totalSavingsPercent}%)`);
  console.log(`${colors.green}✓${colors.reset} Tiempo transcurrido: ${duration}s`);
  console.log(`\n${colors.yellow}💡 Los archivos originales están guardados en:${colors.reset}`);
  console.log(`   ${CONFIG.backupDir}\n`);
}

// Ejecutar
main().catch(error => {
  console.error(`${colors.red}Error fatal:${colors.reset}`, error);
  process.exit(1);
});

