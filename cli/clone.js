let inquirer = require('inquirer')
// 试图为NodeJs做一个可嵌入式的美观的命令行界面
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const chalk = require('chalk')

console.log(chalk.yellow('操作说明：'))


// const allPages = []
// glob.sync('./').forEach((entry) => {
//     const basename = path.basename(entry, path.extname(entry))
//     const tmp = entry.split('/').splice(-2) // 页面文件夹名字
//     const folderName = tmp[0]
//     allPages.push(folderName)
// })
// console.log(allPages)



// 选择一个类目
let a = inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'Select a type you will create:',
    choices: ['pages', 'component', 'package'],
}]).then((answers) => {
    // console.log('结果为:');
    // console.log(answers);
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Input new page name:'
    }]).then((item) => {
        // console.log(name)
        // fs.ReadStream('cli/page', function (err, data) {
        //     if (err) throw err;
        //     console.log(data)
        // })
        let temFiles = path.join(__dirname, 'page');
        // console.log(temFile);
        // let targetFile = path.join(__dirname, item.name);
        
        // console.log(targetFile);
        fs.readdirSync(temFiles).forEach((val, index) => {
            const extname = path.extname(val)
            let targetFile = `pages/${item.name}/${item.name}${extname}` ;
            console.log(targetFile)
            let temFile = path.join(__dirname, `page/${val}`);
            fs.writeFileSync(targetFile, fs.readFileSync(temFile))
            // console.log()
        })
        // let readStream = fs.createReadStream(temFile);
        // let writeStream = fs.createWriteStream(targetFile);
        // readStream.pipe(writeStream);
        // fs.writeFileSync(targetFile, fs.readFileSync(temFile));/
    })
})







