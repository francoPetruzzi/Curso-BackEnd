const fs = require("fs").promises;

class ProductManager {
  static lastId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
    try {
      const productsArray = await this.readFile();

      if (!title || !description || !price || !code || !stock || !category) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      if (productsArray.some(item => item.code === code)) {
        console.log("El código debe ser único");
        return;
      }

      const newProduct = {
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnails || []
      };

      if (productsArray.length > 0) {
        ProductManager.lastId = productsArray.reduce((maxId, product) => Math.max(maxId, product.id), 0);
      }

      newProduct.id = ++ProductManager.lastId;

      productsArray.push(newProduct);
      await this.saveFile(productsArray);
    } catch (error) {
      console.log("Error al agregar producto", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const productsArray = await this.readFile();
      return productsArray;
    } catch (error) {
      console.log("Error al leer el archivo", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const productsArray = await this.readFile();
      const foundProduct = productsArray.find(item => item.id === id);

      if (!foundProduct) {
        console.log("Producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return foundProduct;
      }
    } catch (error) {
      console.log("Error al leer el archivo", error);
      throw error;
    }
  }

  async readFile() {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const productsArray = JSON.parse(response);
      return productsArray;
    } catch (error) {
      console.log("Error al leer un archivo", error);
      throw error;
    }
  }

  async saveFile(productsArray) {
    try {
      await fs.writeFile(this.path, JSON.stringify(productsArray, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const productsArray = await this.readFile();

      const index = productsArray.findIndex(item => item.id === id);

      if (index !== -1) {
        productsArray[index] = { ...productsArray[index], ...updatedProduct };
        await this.saveFile(productsArray);
        console.log("Producto actualizado");
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const productsArray = await this.readFile();

      const index = productsArray.findIndex(item => item.id === id);

      if (index !== -1) {
        productsArray.splice(index, 1);
        await this.saveFile(productsArray);
        console.log("Producto eliminado");
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
      throw error;
    }
  }
}

module.exports = ProductManager;
