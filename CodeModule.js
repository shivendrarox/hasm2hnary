//The code module

//instruction anatomy: 1 - - c1 c2 c3 c4 c5 c6 d1 d2 d3 j1 j2 j3
const DEST_TABLE = {
    null: "000",//the value is not stored
    M: "001",//RAM[A]
    D: "010",//D register
    DM: "011",//D register and RAM[A]
    A:"100",//A register
    AM: "101",//A register and RAM[A]
    AD: "110",//A register and D register
    ADM: "111",//A register, D register, and RAM[A]
}

export function dest(destMnemonic){
    // Returns the binary code of the dest mnemonic.
    return DEST_TABLE[destMnemonic]
}

const COMP_TABLE = {
    ":0":"101010",
    ":1":"111111",
    "-1":"111010",
    "D":"001100",
    "A":"110000",
    "M":"110000",
    "!D":"001101",
    "!A":"110001",
    "!M":"110001",
    "-D":"001111",
    "-A":"110011",
    "-M":"110011",
    "D+1":"011111",
    "A+1":"110111",
    "M+1":"110111",
    "D-1":"001110",
    "A-1":"110010",
    "M-1":"110010",
    "D+A":"000010",
    "D+M":"000010",
    "D-A":"010011",
    "D-M":"010011",
    "A-D":"000111",
    "M-D":"000111",
    "D&A":"000000",
    "D&M":"000000",
    "D|A":"010101",
    "D|M":"010101",
}

export function comp(compMnemonic){
 return COMP_TABLE[compMnemonic]
}

const JUMP_TABLE={
    "null":"000",//no jump
    "JGT":"001",//if comp > 0jump
    "JEQ":"010",//if comp = 0jump
    "JGE":"011",//if comp ≥ 0jump
    "JLT":"100",//if comp < 0jump
    "JNE":"101",//if comp ≠ 0jump
    "JLE":"110",//if comp ≤ 0jump
    "JMP":"111",//Unconditional jump
}

export function jump(jumpMnemonic){
    return JUMP_TABLE[jumpMnemonic]
}
