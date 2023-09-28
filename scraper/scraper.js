const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Book = require('../models/book');
const dbConfig = require('../config/database');

// Connect to MongoDB
mongoose.connect(dbConfig.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function scrapeBooks() {
  try {
    for (let page = 1; page <= 50; page++) {
      const response = await axios.get(`http://books.toscrape.com/catalogue/page-${page}.html`);
      const $ = cheerio.load(response.data);

      $('.product_pod').each((index, element) => {
        const title = $(element).find('h3 a').attr('title');
        const price = $(element).find('.price_color').text();
        const availability = $(element).find('.availability').text().trim();
        const rating = $(element).find('p').attr('class').split(' ')[1];

        // Create a new book document and save it to the database
        const book = new Book({
          title,
          price,
          availability,
          rating,
        });

        book.save()
          .then(() => console.log(`Scraped and saved: ${title}`))
          .catch(err => console.error('Error saving book:', err));
      });
    }
  } catch (error) {
    console.error('Error scraping books:', error);
  } finally {
    // Close the MongoDB connection when done
    mongoose.connection.close();
  }
}


module.exports=scrapeBooks();