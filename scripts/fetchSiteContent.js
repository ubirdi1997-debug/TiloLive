const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Pages to scrape
const pages = [
  { name: "home", url: "https://vikoofficial.com/" },
  { name: "rules", url: "https://vikoofficial.com/rules" },
  { name: "salary", url: "https://vikoofficial.com/salary" },
  { name: "contact", url: "https://vikoofficial.com/contact" }
];

// Clean text function
function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract content from a page
async function extractContent(url) {
  try {
    console.log(`Fetching: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    // Remove script and style tags
    $('script').remove();
    $('style').remove();
    
    // Extract headings
    const headings = [];
    $('h1, h2, h3').each((i, elem) => {
      const text = cleanText($(elem).text());
      if (text) {
        headings.push({
          level: elem.name,
          text: text
        });
      }
    });
    
    // Extract paragraphs
    const paragraphs = [];
    $('p').each((i, elem) => {
      const text = cleanText($(elem).text());
      if (text && text.length > 10) { // Filter out very short paragraphs
        paragraphs.push(text);
      }
    });
    
    // Extract lists
    const lists = [];
    $('ul, ol').each((i, elem) => {
      const items = [];
      $(elem).find('li').each((j, li) => {
        const text = cleanText($(li).text());
        if (text) {
          items.push(text);
        }
      });
      if (items.length > 0) {
        lists.push(items);
      }
    });
    
    // Extract images
    const images = [];
    $('img').each((i, elem) => {
      const src = $(elem).attr('src');
      const alt = $(elem).attr('alt') || '';
      if (src) {
        images.push({
          src: src.startsWith('http') ? src : `https://vikoofficial.com${src}`,
          alt: cleanText(alt)
        });
      }
    });
    
    return {
      headings,
      paragraphs,
      lists,
      images
    };
    
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return {
      headings: [],
      paragraphs: [],
      lists: [],
      images: [],
      error: error.message
    };
  }
}

// Main function
async function fetchAllContent() {
  console.log('Starting content fetch...\n');
  
  const rawContent = {};
  
  for (const page of pages) {
    console.log(`\nProcessing: ${page.name}`);
    rawContent[page.name] = await extractContent(page.url);
    
    // Add delay to be respectful to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Save to file
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const outputPath = path.join(dataDir, 'rawContent.json');
  fs.writeFileSync(outputPath, JSON.stringify(rawContent, null, 2));
  
  console.log(`\n✅ Content saved to: ${outputPath}`);
  console.log(`\nSummary:`);
  
  for (const [name, content] of Object.entries(rawContent)) {
    console.log(`  ${name}:`);
    console.log(`    - ${content.headings?.length || 0} headings`);
    console.log(`    - ${content.paragraphs?.length || 0} paragraphs`);
    console.log(`    - ${content.lists?.length || 0} lists`);
    console.log(`    - ${content.images?.length || 0} images`);
  }
}

// Run the script
fetchAllContent().catch(console.error);
