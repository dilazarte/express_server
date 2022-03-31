const fs = require('fs');


const idAuto = (array) => {
    let autoId = array.length + 1;
    if (array.length === 0) {
        autoId = 1;
    }
    else {
        while (true) {
            if (!array.indexOf(autoId)) {
                autoId = autoId + 1;
            } else {
                break;
            }
        }
    }
    return autoId;
};

class Contenedor{
    constructor(ruta){
        this.ruta =  ruta
    }
    async save(object){
        try{
            let array = await this.getAll() //obtengo datos de mi json
            let autoId = idAuto(array)
            object.id = autoId
            array.push(object)
            await fs.promises.writeFile(this.ruta, JSON.stringify(array))
            return autoId;
        }
        catch(err){
            console.log(err)
        }
        
    }
    async getById(n){
        try{
            let array = await this.getAll()
            let item = array.filter(el => el.id == n)
            return item
        }
        catch(error){
            console.log(error)
        }
        
    }
    async getAll(){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf-8')
            let array = JSON.parse(data)
            return array
        }
        catch(error){
            console.log(error)
            return []
        }
    }
    async deleteById(n){
        let array = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
        let newArr = array.filter(el => el.id !== n)
        await fs.promises.writeFile(this.ruta, JSON.stringify(newArr))
    }
    async deleteAll(){
        let newArr = []
        //fs.writeFileSync(this.ruta, JSON.stringify(newArr))
        await fs.promises.writeFile(this.ruta, JSON.stringify(newArr))
    }
    async getRandom(){
        try{
            let arr = await this.getAll()
            let randomId = 1 + Math.floor(Math.random() * arr.length)
            return arr.filter(el => el.id == randomId)
        }
        catch(error){
            console.log(error)
            return {}
        }
    }
}
module.exports = {Contenedor}