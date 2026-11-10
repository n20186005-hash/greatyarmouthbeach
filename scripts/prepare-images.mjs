import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
await mkdir('public/gallery/optimized',{recursive:true});
for(let i=1;i<=15;i++){
  // Original 13 has malformed SOS markers. Keep its bytes; decode this known legacy file tolerantly.
  await sharp(`public/gallery/images (${i}).jpg`,{failOn:i===13?'none':'warning'}).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:82}).toFile(`public/gallery/optimized/image-${i}.webp`);
}
