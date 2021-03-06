const fs = require('fs')
const path = require('path')

module.exports = function (creater, params, chalk, shelljs, ora) {
    const {
        projectName,
        description,
        src = 'src',
        public = 'public'
    } = params
    const projectId = `microApp${projectName.charAt(0).toUpperCase() + projectName.slice(1)}`
    const cwd = process.cwd()
    const projectPath = path.join(cwd, projectName)
    const sourceDir = path.join(projectPath, src)
    const publicDir = path.join(projectPath, public)

    fs.mkdirSync(projectPath)
    fs.mkdirSync(sourceDir)
    fs.mkdirSync(publicDir)

    creater.template(path.join(cwd, 'microP-temp/pkg'), path.join(projectPath, 'package.json'), {
        projectName,
        description,
    })

    creater.template(path.join(cwd, 'microP-temp/vueConf'), path.join(projectPath, 'vue.config.js'), {
        projectName,
    })

    creater.template(path.join(cwd, 'microP-temp/.eslintrc.js'), path.join(projectPath, '.eslintrc.json'))
    creater.template(path.join(cwd, 'microP-temp/.eslintignore'), path.join(projectPath, '.eslintignore'))
    creater.template(path.join(cwd, 'microP-temp/.browserslistrc'), path.join(projectPath, '.browserslistrc'))
    creater.template(path.join(cwd, 'microP-temp/.editorconfig'), path.join(projectPath, '.editorconfig'))
    creater.template(path.join(cwd, 'microP-temp/babel.config.js'), path.join(projectPath, 'babel.config.js'))
    creater.template(path.join(cwd, 'microP-temp/README.md'), path.join(projectPath, 'README.md'))
    creater.template(path.join(cwd, 'microP-temp/.gitignore'), path.join(projectPath, '.gitignore'))

    creater.copy(path.join(cwd, 'microP-temp/public/favicon.ico'), path.join(projectPath, 'public/favicon.ico'))
    creater.template(path.join(cwd, 'microP-temp/public/index.html'), path.join(projectPath, 'public/index.html'), {
        projectId,
    })
    creater.copy(path.join(cwd, 'microP-temp/src'), path.join(projectPath, 'src'))

    creater.fs.commit(() => {
        console.log()
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${chalk.grey.bold(projectName)}`)}`)
        console.log(`${chalk.green('??? ')}${chalk.grey(`??????????????????: ${projectName}/${src}`)}`)

        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/package.json`)}`)
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/vue.config.js`)}`)

        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/.eslintrc.json`)}`)
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/.eslintignore`)}`)
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/.browserslistrc`)}`)
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/.editorconfig`)}`)
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/babel.config.js`)}`)

        
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/README.md`)}`)
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/.gitignore`)}`)
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/${public}`)}`)
        console.log(`${chalk.green('??? ')}${chalk.grey(`????????????: ${projectName}/${src}`)}`)

        
        try {
            // ????????????
            shelljs.cd(projectPath);
            const command = 'npm install'
            const installSpinner = ora(`???????????????????????? ${chalk.cyan.bold(command)}, ???????????????...`).start()
            const install = shelljs.exec(command, {
                silent: true
            })
            if (install.code === 0) {
                installSpinner.color = 'green'
                installSpinner.succeed('????????????')
                console.log(`${install.stderr}${install.stdout}`)
            } else {
                installSpinner.color = 'red'
                installSpinner.fail(chalk.red('???????????????????????????????????????????????????'))
                console.log(`${install.stderr}${install.stdout}`)
            }
        } catch (error) {
            console.log('???????????????????????????????????????????????????error:', error)
        }
        console.log(chalk.green(`???????????? ${chalk.green.bold(projectName)} ?????????`))
        console.log(chalk.green(`????????????????????? ${chalk.green.bold(projectName)} ??????????????????????`))
    })
}