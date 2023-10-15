document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.querySelector('html');
    const bDirCSS = htmlElement.getAttribute('dircss');
    const bDirJS = htmlElement.getAttribute('dirjs');
    const currentUrl = document.location.href;
    const theFile = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const fileName = "index"//theFile.replace('.html', '')"";

    // Link to stylesheet
    const stylesLink = document.createElement('link');
    stylesLink.rel = 'stylesheet';
    stylesLink.href = `${bDirCSS}${fileName}.css?v=4.2.0`;
    document.head.appendChild(stylesLink);

    // Link to JavaScript
    const scriptElement = document.createElement('script');
    scriptElement.src = `${bDirJS}${fileName}.js?v=4.2.0`;
    document.body.appendChild(scriptElement);
});