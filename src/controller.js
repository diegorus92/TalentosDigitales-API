import { poolRequest } from "./database.js";

class BooksController{
    
    async getAll(req, res){
        const [result] = await poolRequest.query('SELECT * from books');
        res.json(result);
    }

    async getOne(req, res){
        const book = req.body;
        const [result] = await poolRequest.query(`SELECT * from books WHERE id=(?)`, [book.id]);  
        res.json(result);
    }
}

export const books = new BooksController();