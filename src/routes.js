import { Router } from 'express';
import { books } from './controller.js';

export const router = Router();

router.get('/books', books.getAll);
router.get('/book', books.getOne);
router.post('/book', books.insert);
router.put("/book", books.update);
router.delete("/book", books.deleteByIsbn);