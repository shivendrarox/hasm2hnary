import { SymbolTable } from "./SymbolTable.js"

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
            let targetAddr=0
            switch (this.commandType()) {
                case 'C_COMMAND':
                    console.log("C_OMMAND")
                    return "C_OMMAND";
                case 'A_COMMAND':
                    // targetAddr = this.#nextAvailableRAMAddress
                    // this.#nextAvailableRAMAddress+=1
                    // break
                    console.log("A_COMMAND")
                    return "A_COMMAND";
                case 'L_COMMAND':
                    targetAddr=this.#labelROMAddrCounter
                    break;
              }
           this.#symbolTable.addEntry(saneSymbol,targetAddr)
           return this.#symbolTable.GetAddress(saneSymbol)
        }
        
    }
}