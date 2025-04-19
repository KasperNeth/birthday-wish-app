const path = require('path');


// Dynamically render email templates
// This function dynamically imports the template based on the provided template name and renders it with the provided data
const renderTemplate = async (templateName, data = {}) => {
  try {
    // Dynamically import the template
    const templatePath = path.join(__dirname,  `${templateName}.template.js`);
    const template = require(templatePath);
    
    // Call the template function with the provided data
    return template(data);
  } catch (error) {
    console.error(`Failed to render email template ${templateName}: ${error.message}`);
  
    throw new Error(`Email template rendering failed`);
  }
};

module.exports = {
  renderTemplate
};