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

    async insert(req, res){
        const book = req.body;
        const [result] = await poolRequest.query(
                `INSERT INTO books(name, author, category, publicationDate, isbn) VALUES(?, ?, ?, ?, ?)`, 
                [book.name, book.author, book.category, book.publicationDate, book.isbn]
            );
        res.json({"Book added: ": result.insertId});
    }

    async update(req, res){
        const book = req.body;
        const [result] = await poolRequest.query(
            `UPDATE books SET name = ?, author = ?, category = ?, publicationDate = ?, isbn = ? WHERE id = ?`,
            [book.name, book.author, book.category, book.publicationDate, book.isbn, book.id]
        );
        res.json({"Book updated" : result.affectedRows});
    }

    async deleteByIsbn(req, res){
        const book = req.body;
        const [result] = await poolRequest.query(`DELETE FROM books WHERE isbn = ?`, [book.isbn]);
        res.json({"Book deleted" : result.affectedRows});
    }
}

export const books = new BooksController();