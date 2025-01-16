const fs = require('fs').promises
const path = require('path')
const glob = require('glob')

async function renameComponentAssets() {
  try {
    // Find all component asset files matching the pattern
    const assetFiles = glob.sync('components/*/assets/*.component.{css,js}')

    // Store old->new filename mappings for updating references
    const fileMap = new Map()

    // Rename the asset files
    for (const oldPath of assetFiles) {
      const dir = path.dirname(oldPath)
      const filename = path.basename(oldPath)
      const componentName = path.basename(path.dirname(path.dirname(oldPath)))
      const extension = path.extname(filename)
      const newFilename = `component.${componentName}${extension}`
      const newPath = path.join(dir, newFilename)

      console.log(`Renaming: ${oldPath} -> ${newPath}`)
      await fs.rename(oldPath, newPath)

      // Store the mapping of old name to new name (without extension for js files)
      const oldName = filename.replace('.component.', '.')
      fileMap.set(oldName, newFilename)
    }

    // Find all liquid component files
    const liquidFiles = glob.sync('components/*/component.*.liquid')

    // Update references in liquid files
    for (const liquidFile of liquidFiles) {
      let content = await fs.readFile(liquidFile, 'utf8')
      let hasChanges = false

      // Update references in the content
      for (const [oldName, newName] of fileMap) {
        // Handle both .js and no-extension cases for JavaScript files
        const oldJsPattern = oldName.endsWith('.js') ? [oldName, oldName.replace('.js', '')] : [oldName]

        for (const pattern of oldJsPattern) {
          if (content.includes(pattern)) {
            content = content.replace(new RegExp(pattern, 'g'), newName)
            hasChanges = true
          }
        }
      }

      // Save the file if changes were made
      if (hasChanges) {
        console.log(`Updating references in: ${liquidFile}`)
        await fs.writeFile(liquidFile, content, 'utf8')
      }
    }

    console.log('Component asset renaming completed successfully!')
  } catch (error) {
    console.error('Error during renaming:', error)
    process.exit(1)
  }
}

renameComponentAssets()
