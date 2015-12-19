'use strict'

const co = require('co')
const fs = require('mz/fs')
const path = require('path')

const analyze = require('./analyze.js')
const compile = require('./compile.js')
const util = require('./util.js')

module.exports = co.wrap(function*(opt){
    let dest = opt.dir || '.'
    if(yield fs.stat(path.join(dest, '_site')).catch(util.nil)){
        util.error(new Error('_site已存在，请先执行 nattoppet clean'))
    }else{
        yield fs.mkdir(path.join(dest, '_site')).catch(util.error)
    }
    yield compile(path.join(dest), yield analyze(dest))
})