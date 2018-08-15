var delay, editor;
var previewContainer = document.getElementById('previewcontainer');

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

function updatePreview() {
    emptyPreviewContainer();
    createPreviewIframe();
    var previewFrame = document.getElementById('preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(editor.getValue());
    preview.close();
}

function emptyPreviewContainer() {
    previewContainer.innerHTML = '';
}

function createPreviewIframe() {
    var iframe = document.createElement('iframe');
    iframe.id = 'preview';
    previewContainer.appendChild(iframe);
}
