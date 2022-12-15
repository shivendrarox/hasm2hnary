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
const liner = new lineByLine('./add/Add.asm');
var stream = fs.createWriteStream("./add/Add.txt", {flags:'a'});

  while (line = liner.next()) {
    //console.log('Line ' + lineNumber + ': ' + line.toString('ascii'));
    // fs.appendFile('./add/Add.txt', line+"\n", function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    //   });
    stream.write(line + "\n");
    lineNumber++;
}
stream.end();
 