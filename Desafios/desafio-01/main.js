//1 Desafio Entregable de Backend

class ProductManager {
    //Variable estatica. Recuerden que esta le pertenece a al clase. 
    static ultId = 0;


    //Desarrollamos  el constructor con el elemento products, el cual será un array vacio. 
    constructor() {
        this.products = [];
    }

    //Métodos: 

    addProduct(title, description, price, img, code, stock) {

        //Tenemos que hacer algunas validaciones que nos pide la consigna: 
        
        //Validamos que se agregaron todos los campos: 
        if(!title || !description || !price || !img || !code || !stock){
            console.log("Todos los campos son obligatorios, completalo o moriras en 24 hs"); 
            return;
        }

        //Validamos que el código sea único: 
        if(this.products.some(item => item.code === code)){
            console.log("El codigo debe ser unico, rata de dos patas!");
            return;
        }

        //Creamos un nuevo objeto con todos estos datos: 

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        //Lo agrego al array: 

        this.products.push(newProduct);

    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("Producto no encontrado, moriras miserable!!");
        } else {
            console.log("Siiiiii, lo encontramos: ", product);
        }
        
    }


}



//testing: 

//1) 
const manager = new ProductManager();

//2)
manager.getProducts();

//3) 
manager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);

//4) 
manager.addProduct("fideos", "los mas ricos", 200, "sin imagen", "abc124", 50);
manager.addProduct("arroz", "los mas ricos", 200, "sin imagen", "abc125", 50);

//5)
manager.getProducts();

//6) 
manager.addProduct("arroz", "el que no se pasa", 200, "sin imagen", "abc125", 50);

//7) 
manager.getProductById(2);
manager.getProductById(50);