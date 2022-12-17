//hasm2hnary: Hack ASM to Hack Binary assembler
import  {dest,jump,comp}  from "./CodeModule.js"
import { Parser } from "./Parser.js"
import fs from 'fs'
import  lineByLine from 'n-readlines';
// console.log(dest("M"))//001
// console.log(jump("JEQ"))//010
// console.log(comp("-A"))//11 00 11

let line;
let lineNumber = 0;
const liner = new lineByLine('./max/Max.asm');
var stream = fs.createWriteStream("./max/Max.txt", {flags:'a'});

const parser = new Parser()
  while (line = liner.next()) {
    const command = line.toString('ascii').replaceAll(/\s/g,'').replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').trim();
    if(command===''){
        continue
    }

    parser.setCurrentCommand(command)

    let translatedBinaryStr = ''
    switch (parser.commandType()) {
        case 'C_COMMAND':
            translatedBinaryStr="C_OMMAND";
            break
        case 'A_COMMAND':
            translatedBinaryStr="A_COMMAND";
            break;
        case 'L_COMMAND':
            translatedBinaryStr =  parser.symbol()
            break;
      }

    stream.write(translatedBinaryStr + "\n");
    lineNumber++;
}
stream.end();
 