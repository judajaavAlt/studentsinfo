// import fs and path to work with the directories
const { info } = require('console');
const fs = require('fs');
const path = require('path');
const { execPath } = require('process');

// gets into the public/data directory
const directoryPath = path.join(__dirname, 'public/data');

function checkInfo(folders, file)
{
    // test if info.json exists
    let testName = "checks if info.json exist in folder " + file
    let testFunction = () => {expect(folders.includes("info.json")).toBe(true)}
    test(testName, testFunction)

    // checks if info.json contains a dict
    if (folders.includes("info.json"))
    {
        const isDict = checkIfInfoIsDictionary(file)
        testName = "checks if info.json contains a dictionary in folder " + file
        testFunction = () => {expect(isDict).toBe(true)}
        test(testName, testFunction)
        if (isDict)
        {
            const hasTheKeys = checkInfoHasTheKeys(file)
            testName = "checks if info.json has the required keys in folder " + file
            testFunction = () => {expect(hasTheKeys).toBe(true)}
            test(testName, testFunction)
        }
        
    }
}
    

function checkIfInfoIsDictionary(file)
{
    const infoPath = path.join(__dirname, "public/data/" + file + "/info.json")
    let content
    try
    {
        content = JSON.parse(fs.readFileSync(infoPath, "utf8"))
    }catch
    {
        return false
    }
    if (content.constructor == Object) {
        return true
    }else
    {
        return false
    }
}

function checkInfoHasTheKeys(file)
{
    const keys = ["nombre", "edad", "carrera", "semestre", "gustos", "noGustos", "foto", "redSocial"]
    const infoPath = path.join(__dirname, "public/data/" + file + "/info.json")
    const content = JSON.parse(fs.readFileSync(infoPath, "utf8"))
    let result = true
    
    keys.forEach(key => 
    {
        if (!(key in content))
        {
            result = false
        }
    });
    return result
}

try {
// get all the directories inside public/data 
    const files = fs.readdirSync(directoryPath);
    // checks inside the directories if they have
    // the proper info and files
    files.forEach(file => {
        const folderPath = path.join(__dirname, 'public/data/' + file)
        const folderFiles = fs.readdirSync(folderPath)
        checkInfo(folderFiles, file)
    });
} catch (err) {
    console.error('Unable to scan directory: ' + err);
}