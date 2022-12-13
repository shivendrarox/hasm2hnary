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

function dest(destMnemonic){
    // Returns the binary code of the dest mnemonic.
    return DEST_TABLE[destMnemonic]
}

const COMP_TABLE = {

    "0" 1 0 1 0 1 0,
    "1" 1 1 1 1 1 1,
    "-1" 1 1 1 0 1 0,
    "D" 0 0 1 1 0 0,
    "A" 1 1 0 0 0 0,
    "M" 1 1 0 0 0 0,
    "!D" 0 0 1 1 0 1,
    "!A" 1 1 0 0 0 1,
    "!M" 1 1 0 0 0 1,
    "-D" 0 0 1 1 1 1,
    "-A" 1 1 0 0 1 1,
    "-M" 1 1 0 0 1 1,
    "D+1" 0 1 1 1 1 1,
    "A+1" 1 1 0 1 1 1,
    "M+1" 1 1 0 1 1 1,
    "D-1" 0 0 1 1 1 0,
    "A-1" 1 1 0 0 1 0,
    "M-1" 1 1 0 0 1 0,
    "D+A" 0 0 0 0 1 0,
    "D+M" 0 0 0 0 1 0,
    "D-A" 0 1 0 0 1 1,
    "D-M" 0 1 0 0 1 1,
    "A-D" 0 0 0 1 1 1,
    "M-D" 0 0 0 1 1 1,
    "D&A" 0 0 0 0 0 0,
    "D&M" 0 0 0 0 0 0,
    "D|A" 0 1 0 1 0 1,
    "D|M" 0 1 0 1 0 1,
}

function comp(){

}