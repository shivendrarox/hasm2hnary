//hasm2hnary: Hack ASM to Hack Binary assembler
import { Parser } from "./Parser.js"
import fs from 'fs'
import  lineByLine from 'n-readlines';

let line;
let lineNumber = 0;
const liner = new lineByLine('./max/Max.asm');
var stream = fs.createWriteStream("./max/Max.txt", {flags:'a'});

const parser = new Parser()
//Phase 1:
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
    console.log(lineNumber+" :",translatedBinaryStr)
    //Phase 1: All L_COMMANDS parsed, no need to write
    //stream.write(translatedBinaryStr + "\n");
    lineNumber++;
}
//Phase 2
stream.end();
 