const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

let temFolders = {
    "package": path.join(__dirname, 'page'),
    "page": path.join(__dirname, 'page'),
    "component": path.join(__dirname, 'component')
}
let targetFolderRoots = {
    "package": "packages/",
    "page": "pages/",
    "component": "component/"
}

// 首先选择一个类目
inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'Select a type you will create:',
    choices: ['page', 'component', 'package'],
}]).then((answers) => {
    console.log(chalk.yellow("如果建立子目录直接加'/'分隔即可"))
    // 输入文件或目录名
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Input new page name:'
    }]).then((folder) => {
        mkdirs(folder.name, targetFolderRoots[answers.type]);
        // 创建新文件夹，如果失败说明文件已经存在
        copyRealFile(folder.name,targetFolderRoots[answers.type], temFolders[answers.type]);
    })
})


/**
 * 创建文件夹
 * @param {String} folder 终端输入的路径
 * @param {String} targetFolderRoot 输出的目标文件夹
 */
function mkdirs(folder, targetFolderRoot) {
    const folderName = folder.split('/')
    folderName.push('');
    folderName.reduce((total, folderItem) => {
        const hasFolder = fs.existsSync(`${targetFolderRoot + total}`)
        !hasFolder && fs.mkdirSync(`${targetFolderRoot + total}`)
        if (!folderItem && hasFolder) console.error(chalk.red(`== sorry, folder ${folder} is exist or your input is error! ==`))
        return total + "/" + folderItem
    })
}

/**
 * 克隆实际的底层文件列表
 * @param {String} folder 终端输入的路径
 * @param {String} targetFolderRoot 目标文件目录
 * @param {String} temFolder 对应模版的目录
 */
function copyRealFile(folder, targetFolderRoot, temFolder) {
    let fileName = folder.split('/').pop()
    let targetFolder = `${targetFolderRoot + folder}/${fileName}`;
    fs.readdirSync(temFolder).forEach((val, index) => {
        const extname = path.extname(val);
        let temRealFile = path.join(temFolder, `${val}`);
        let targetFile = targetFolder + extname;
        fs.writeFileSync(targetFile, fs.readFileSync(temRealFile));
    })
}









