import { SymbolTable } from "./SymbolTable.js"
import  {dest,jump,comp}  from "./CodeModule.js"
//
export class Parser{
    #currentCommand
    #symbolTable
    #labelROMAddrCounter
    #nextAvailableRAMAddress
    constructor(){
        this.#symbolTable = new SymbolTable()
        //Running Counters:
            //phase 1:
            this.#labelROMAddrCounter = 0 //++ at A_COMMAND or C_COMMAND;
            //phase 2:
            this.#nextAvailableRAMAddress = 16 //
    }
    setCurrentCommand(cmd){
        this.#currentCommand = cmd
        switch (this.commandType()) {
            case 'A_COMMAND':
            case 'C_COMMAND':
                this.#labelROMAddrCounter+=1
                break;
          }

    }
    getCurrentCommand(){
        return this.#currentCommand
    }

    commandType(){
        if(this.#currentCommand.includes('@')){
            return 'A_COMMAND'
        }
        if(this.#currentCommand.includes('=')||this.#currentCommand.includes(';')){
            return 'C_COMMAND'
        }
        if(this.#currentCommand.includes('(')&&this.#currentCommand.includes(')')){
            return 'L_COMMAND'
        }
    }
    symbol(){
        const saneSymbol = this.#currentCommand.replaceAll(/(\(|\))|\@/g,'')


        if(this.#symbolTable.contains(saneSymbol)){
            if((typeof this.#symbolTable.GetAddress(saneSymbol))==='number'){
                return this.#convertNum2BinaryStr(this.#symbolTable.GetAddress(saneSymbol))
            }else{
                return this.#symbolTable.GetAddress(saneSymbol)
            }
        }else{
            switch (this.commandType()) {
                case 'C_COMMAND':
                    //compute from CodeModule
                    const BIN_C_COMMAND = this.#translateCInstruction(saneSymbol)
                    return BIN_C_COMMAND;
                case 'A_COMMAND':
                    if(/^-?\d+$/.test(saneSymbol)){
                        return this.#convertNum2BinaryStr(Number(saneSymbol))
                    }
                    const binRAMAddress = this.#convertNum2BinaryStr(this.#nextAvailableRAMAddress)
                    this.#symbolTable.addEntry(saneSymbol,binRAMAddress)
                    this.#nextAvailableRAMAddress+=1
                    break; 
                case 'L_COMMAND':
                    const binROMAddress = (this.#labelROMAddrCounter)
                    this.#symbolTable.addEntry(saneSymbol,binROMAddress)
                    break;
              }
           
           return this.#symbolTable.GetAddress(saneSymbol)
        }
        
    }

    #convertNum2BinaryStr(num){
        let result = num.toString(2)
        return result.padStart(16,'0')
    }
    
    #translateCInstruction(c_instruction){
        //DEST=COMP;JMP
        const c_instructionArr = c_instruction.split(/\=|\;/g)

        const DEST = c_instruction.includes('=')? c_instructionArr[0]:null
        const COMP =  c_instruction.includes('=')? c_instructionArr[1]:c_instructionArr[0]
        const JMP =  c_instruction.includes('=')? c_instructionArr[2]??null:c_instructionArr[1]

       let a = 0
       if(COMP?.includes('M')){
           a=1
       } 
       //Binary syntax:     1 1 1 a   c c c c c c             d d d                  j j j
       const finalBinary = '111'+ a+(comp(COMP)??"000000")+ (dest(DEST)??"000") + (jump(JMP)??"000")
       return finalBinary
    }
}