const fs = require('fs')
const path = require('path')

// Path to the file you want to modify
const filePath = path.resolve(
    __dirname,
    '../node_modules/three-mesh-bvh/src/index.js'
)

// Read the file content
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err)
        return
    }

    // Split the file content into an array of lines
    const lines = data.split('\n')

    // Check if line 5 exists and comment it
    if (lines.length >= 5) {
        lines[4] = `// ${lines[4]}` // Comment line 5 (index 4)
    } else {
        console.error('File does not have 5 lines.')
        return
    }

    // Join the lines back together
    const modifiedData = lines.join('\n')

    // Write the modified content back to the file
    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err)
            return
        }
        console.log('Line 5 has been commented out successfully!')
    })
})
