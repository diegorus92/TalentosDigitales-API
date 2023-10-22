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
        try{
            const book = req.body;
            const [result] = await poolRequest.query(
                    `INSERT INTO books(name, author, category, publicationDate, isbn) VALUES(?, ?, ?, ?, ?)`, 
                    [book.name, book.author, book.category, book.publicationDate, book.isbn]
                );
            res.json({"Book added: ": result.insertId});
        }
        catch(e){
            res.json({"Error during insertion new Book => ": e});
        }
    }

    async update(req, res){
        try{
            const book = req.body;
            if(book.id == null || book.name == null || book.author == null || book.publicationDate == null || book.isbn == null)
                throw new Error("One or more attributes are invalids");

            const [result] = await poolRequest.query(
                `UPDATE books SET name = ?, author = ?, category = ?, publicationDate = ?, isbn = ? WHERE id = ?`,
                [book.name, book.author, book.category, book.publicationDate, book.isbn, book.id]
            );
            if(result.affectedRows == 0) throw new Error("Book not found");
            res.json({"Book updated" : result.affectedRows});
        }
        catch(e){
            res.json({"ERROR ocurred during book Updating => ": e.message});
        }
    }

    async deleteByIsbn(req, res){
        try{
            const book = req.body;
            if(book.isbn == null) throw Error("Invalid attribute"); //Forcing throw error according to some cases
            const [result] = await poolRequest.query(`DELETE FROM books WHERE isbn = ?`, [book.isbn]);

            if(result.affectedRows == 0) throw new Error("ISBN not found"); //Forcing throw error according to some cases

            res.json({"Book deleted" : result.affectedRows});
        }
        catch(e){
            res.json({"ERROR ocurred during book deletion => ": e.message});
        }
    }
}

export const books = new BooksController();