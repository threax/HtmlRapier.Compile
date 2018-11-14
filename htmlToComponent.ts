import * as io from './io';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

(async function(){
    if(process.argv.length < 4){
        console.log("You must include input and output filenames.");
        process.exit(1);
    }

    var inputFile = process.argv[2];
    var outputFile = process.argv[3];

    console.log("Loading " + inputFile);

    var html = await io.readFile(inputFile);
    var dom = new JSDOM(html, { pretendToBeVisual: true });
    var document: HTMLDocument = dom.window.document;
    var templates = document.getElementsByTagName("TEMPLATE");
    var component = null;
    var variant;
    var prefix;
    var suffix;
    var output = 
`import * as component from 'hr.components';
import {ComponentBuilder, VariantBuilder} from 'hr.componentbuilder';

var builder;`;
    var currentBuilder = "";
    for(var i = 0; i < templates.length; ++i){
        var template: HTMLTemplateElement = templates[i] as HTMLTemplateElement;
        if(template.hasAttribute("data-hr-component")) {
            finishComponent();

            component = template.getAttribute("data-hr-component");
            prefix = "\n\nbuilder = new ComponentBuilder('";
            suffix = "');\n"
        }
        else if(template.hasAttribute("data-hr-variant")){
            variant = template.getAttribute("data-hr-variant");
            prefix = 'builder.addVariant("' + variant + `", new VariantBuilder('`;
            suffix = `'));\n`
        }
        currentBuilder += prefix + minify(template.innerHTML) + suffix;
    }
    finishComponent();

    console.log("Writing " + outputFile);
    await io.writeFile(outputFile, output);

    function finishComponent(){
        if(component !== null){
            output += currentBuilder;
            output += 'component.register("' + component + '", builder);'
            currentBuilder = "";
        }
    }
})();

function minify(html: string): string{
    var lines = html.split('\n');
    var result = "";
    var separator = "";

    for(var i = 0; i < lines.length; ++i){
        var line = lines[i].trim();
        if(line){
            result += separator + lines[i].trim();
            separator = " ";
        }
    }

    return result;
}