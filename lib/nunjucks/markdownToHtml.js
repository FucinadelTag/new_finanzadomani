var markdown = require( "markdown" ).markdown;

function markdownToHtml(input, options){

    return markdown.toHTML(input);

}

module.exports = markdownToHtml;