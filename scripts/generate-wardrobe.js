const fs = require('fs');
const path = require('path');

function getItems(folderPath) {
  return fs.readdirSync(folderPath)
    .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file))
    .map(file => path.join(folderPath, file).replace(/\\/g, '/'));
}

function scanSubfolders(basePath) {
  const folders = fs.readdirSync(basePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  return folders.map(dirent => {
    const subfolderPath = path.join(basePath, dirent.name);
    return {
      id: dirent.name,
      displayName: dirent.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      items: getItems(subfolderPath)
    };
  });
}

const wardrobe = {
  base_layers: {
    displayName: "Base Layers",
    subfolders: scanSubfolders("assets/wardrobe_F/base_layers_F")
  },
  accessories: {
    displayName: "Accessories",
    subfolders: scanSubfolders("assets/wardrobe_F/accessories_F")
  }
};

fs.writeFileSync('wardrobe.json', JSON.stringify(wardrobe, null, 2));
console.log("wardrobe.json updated!");
