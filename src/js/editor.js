import * as CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';

var delay, editor;
var previewContainer = document.getElementById('previewcontainer');

// Load the editor.
export function loadEditor() {
    editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'text/html',
        lineNumbers: true
    });

    editor.on("change", function() {
        clearTimeout(delay);
        delay = setTimeout(updatePreview, 300);
    });

    setTimeout(updatePreview, 300);

    return editor;
}

// Update the preview pane
function updatePreview() {
    emptyPreviewContainer();
    createPreviewIframe();
    var previewFrame = document.getElementById('preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(editor.getValue());
    preview.close();
}

// Empty the container
function emptyPreviewContainer() {
    previewContainer.innerHTML = '';
}

// Create a new iframe for the container
function createPreviewIframe() {
    var iframe = document.createElement('iframe');
    iframe.id = 'preview';
    previewContainer.appendChild(iframe);
}
