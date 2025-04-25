export class Common{
    public generateRandomString(length: number, defaultString: string = "", specific: boolean = false){
        let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let numbers = "1234567890"
        let mixed = ""
        if(specific){
            mixed = numbers
        }else{
            mixed = characters+numbers
        }
        for(let i=0; i<length; i++){
            let randomChar = Math.floor(Math.random() * mixed.length)
            defaultString += characters.charAt(randomChar)
        }
        return defaultString
    }
    

    public generateRandomNumber(amount: number){
        return Math.floor(Math.random() * amount)
    }
}