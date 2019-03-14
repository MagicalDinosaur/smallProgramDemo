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

// addPageInfoToApp()

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
        console.log(folder)
        if(!folder.name.length){
            console.error('文件名不能为空');
            return;
        }
        mkdirs(folder.name, targetFolderRoots[answers.type]);
        // 创建新文件夹，如果失败说明文件已经存在
        copyRealFile(folder.name, answers.type);

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
 * @param {String} type 用户选择的类型
 */

function copyRealFile(folder,type ) {
    let targetFolderRoot =  targetFolderRoots[type];
    let temFolder = temFolders[type];
    let fileName = folder.split('/').pop()
    let targetFolder = `${targetFolderRoot + folder}/${fileName}`;
    fs.readdirSync(temFolder).forEach((val, index) => {
        const extname = path.extname(val);
        let temRealFile = path.join(temFolder, `${val}`);
        let targetFile = targetFolder + extname;
        console.log(targetFolder);
        fs.writeFileSync(targetFile, fs.readFileSync(temRealFile), (err) => {
            if (err) throw err;
            console.log('文件已保存');
        });

    })
    // 如果类型是page需要在app.json注册一下
    type == 'page' && addPageInfoToApp(targetFolder)
}

/**
 * 修改app.json配置文件
 * @param {String} fileName 需要新增的page路径
 */

function addPageInfoToApp(fileName) {
    fs.readFile('./app.json', function (err, data) {
        if (err) {
            return console.error(err)
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        person.pages.push(fileName);
        const outputData = JSON.stringify(person,null,"\t")
        fs.writeFile('./app.json',outputData,function(err){
            if(err){
                console.error(err);
            }
            console.log('文件建好啦！');
        })
        console.log(person.pages);
    })
}









