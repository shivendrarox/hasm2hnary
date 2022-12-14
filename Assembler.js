//hasm2hnary: Hack ASM to Hack Binary assembler
import  {dest,jump,comp}  from "./CodeModule.js"
import { SymbolTable } from "./SymbolTable.js"
// console.log(dest("M"))//001
// console.log(jump("JEQ"))//010
// console.log(comp("-A"))//11 00 11
const symbolTable = new SymbolTable()

console.log(symbolTable.addEntry("OPOPO",99))
