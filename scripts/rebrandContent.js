const fs = require('fs');
const path = require('path');

// Load raw content
function loadRawContent() {
  const rawPath = path.join(__dirname, '../data/rawContent.json');
  if (!fs.existsSync(rawPath)) {
    console.error('❌ rawContent.json not found. Please run "npm run fetch-content" first.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(rawPath, 'utf8'));
}

// Replace brand mentions
function rebrandText(text) {
  if (!text) return text;
  
  return text
    .replace(/Viko Official/gi, 'Tilo Live')
    .replace(/Viko App/gi, 'TiloLive')
    .replace(/Viko/gi, 'Tilo')
    .replace(/viko/gi, 'tilo');
}

// Process home page
function processHome(rawHome) {
  const headings = rawHome.headings || [];
  const paragraphs = rawHome.paragraphs || [];
  
  const heroTitle = headings.length > 0 
    ? rebrandText(headings[0].text) 
    : "Join TiloLive: The Future of Live Streaming";
    
  const heroSubtitle = paragraphs.length > 0 
    ? rebrandText(paragraphs[0]) 
    : "Start earning weekly payouts as a Host or Agent. Join the fastest-growing community today.";
  
  const sections = [];
  
  // Create feature sections
  sections.push({
    title: "Why Choose Tilo Live?",
    features: [
      {
        icon: "💰",
        title: "Weekly Payments",
        description: "Get paid every week for your hard work. No delays, no complications."
      },
      {
        icon: "🛡️",
        title: "Safe Environment",
        description: "We ensure a secure and professional platform for all our hosts and agents."
      },
      {
        icon: "🤝",
        title: "24/7 Support",
        description: "Our dedicated team is always here to help you succeed."
      }
    ]
  });
  
  // Add additional sections from scraped content
  for (let i = 1; i < Math.min(headings.length, 4); i++) {
    if (headings[i] && paragraphs[i]) {
      sections.push({
        title: rebrandText(headings[i].text),
        content: rebrandText(paragraphs[i])
      });
    }
  }
  
  return {
    heroTitle,
    heroSubtitle,
    sections
  };
}

// Process rules page
function processRules(rawRules) {
  const headings = rawRules.headings || [];
  const paragraphs = rawRules.paragraphs || [];
  const lists = rawRules.lists || [];
  
  const sections = [];
  
  // Combine headings with their corresponding content
  headings.forEach((heading, index) => {
    const section = {
      title: rebrandText(heading.text),
      content: []
    };
    
    // Add paragraph if available
    if (paragraphs[index]) {
      section.content.push(rebrandText(paragraphs[index]));
    }
    
    // Add list items if available
    if (lists[index]) {
      section.items = lists[index].map(item => rebrandText(item));
    }
    
    sections.push(section);
  });
  
  // If no sections were created, add default rules
  if (sections.length === 0) {
    sections.push(
      {
        title: "General Guidelines",
        content: ["Follow all platform rules and maintain professional conduct at all times."],
        items: [
          "Respect all users and staff members",
          "No inappropriate content or behavior",
          "Maintain a positive and welcoming environment"
        ]
      },
      {
        title: "Host Requirements",
        content: ["All hosts must meet the following requirements to participate on Tilo Live."],
        items: [
          "Must be 18 years or older",
          "Valid identification required",
          "Consistent streaming schedule recommended",
          "Professional appearance and conduct"
        ]
      }
    );
  }
  
  return { sections };
}

// Process salary page
function processSalary(rawSalary) {
  const headings = rawSalary.headings || [];
  const paragraphs = rawSalary.paragraphs || [];
  const lists = rawSalary.lists || [];
  
  // Default salary tiers
  const tiers = [
    { diamonds: "0 - 50,000", salary: "$500", level: "Bronze" },
    { diamonds: "50,001 - 100,000", salary: "$1,200", level: "Silver" },
    { diamonds: "100,001 - 200,000", salary: "$2,500", level: "Gold" },
    { diamonds: "200,001 - 500,000", salary: "$6,000", level: "Platinum" },
    { diamonds: "500,001+", salary: "$15,000+", level: "Diamond" }
  ];
  
  return {
    title: rebrandText(headings[0]?.text || "Salary Structure"),
    description: rebrandText(paragraphs[0] || "Earn competitive salaries based on your performance. The more you earn, the more you keep."),
    tiers
  };
}

// Process contact page
function processContact(rawContact) {
  const headings = rawContact.headings || [];
  const paragraphs = rawContact.paragraphs || [];
  
  return {
    title: rebrandText(headings[0]?.text || "Contact Us"),
    description: rebrandText(paragraphs[0] || "Get in touch with our team. We're here to help you succeed."),
    info: [
      { label: "Email", value: "support@tilolive.in" },
      { label: "Response Time", value: "Within 24 hours" },
      { label: "Available", value: "24/7" }
    ]
  };
}

// Main function
function rebrandContent() {
  console.log('Starting content rebranding...\n');
  
  const rawContent = loadRawContent();
  
  const brandedContent = {
    site: {
      name: "Tilo Live",
      themeColor: "sky-blue",
      domain: "tilolive.in"
    },
    home: processHome(rawContent.home || {}),
    rules: processRules(rawContent.rules || {}),
    salary: processSalary(rawContent.salary || {}),
    contact: processContact(rawContent.contact || {})
  };
  
  // Save to file
  const outputPath = path.join(__dirname, '../data/content.json');
  fs.writeFileSync(outputPath, JSON.stringify(brandedContent, null, 2));
  
  console.log(`✅ Rebranded content saved to: ${outputPath}`);
  console.log(`\nGenerated structure:`);
  console.log(`  - Site info: ${brandedContent.site.name}`);
  console.log(`  - Home sections: ${brandedContent.home.sections.length}`);
  console.log(`  - Rules sections: ${brandedContent.rules.sections.length}`);
  console.log(`  - Salary tiers: ${brandedContent.salary.tiers.length}`);
  console.log(`  - Contact info: ${brandedContent.contact.info.length} items`);
}

// Run the script
rebrandContent();
