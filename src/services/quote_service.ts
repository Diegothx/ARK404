import { Quote } from "../types/quote"; 

export default class QuotesService {
    static async getQuotes(): Promise<{ quotes: Quote[] }> {
        const response = await fetch('/ARK404/data/quotes.json');
        return response.json();
    }

    static async getRandomQuote(): Promise< Quote > {
        const response = await fetch('/ARK404/data/quotes.json'); 
        const quotes: Quote[] =  await response.json();
        const randomIndex = Math.floor(Math.random() * quotes.length); 
        return  quotes[randomIndex] ;
    }
}