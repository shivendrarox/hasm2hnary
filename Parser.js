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
        if(/^-?\d+$/.test(saneSymbol)){
            return
        }

        if(this.#symbolTable.contains(saneSymbol)){
            return this.#symbolTable.GetAddress(saneSymbol)
        }else{
            switch (this.commandType()) {
                case 'C_COMMAND':
                    //compute from CodeModule
                    const BIN_C_COMMAND = 'WTF'
                    return BIN_C_COMMAND;
                case 'A_COMMAND':
                    // this.#symbolTable.addEntry(saneSymbol,this.#nextAvailableRAMAddress)
                    // this.#nextAvailableRAMAddress+=1
                    break; 
                case 'L_COMMAND':
                    this.#symbolTable.addEntry(saneSymbol,this.#labelROMAddrCounter)
                    break;
              }
           
           return this.#symbolTable.GetAddress(saneSymbol)
        }
        
    }
}