CodeMirror.keyMap.pcDefault["Ctrl-D"] = function(cm){

    // get current cursor position
    var current_cursor = cm.doc.getCursor();

    // First go to end of line, to avoid the problem where if cursor was at start
    // of indented text, goLineStartSmart would go to very beginning of line,
    // and so we'd get unwanted tabs/spaces in the getRange function.
    CodeMirror.commands.goLineEnd(cm);
    // now we can safely call goLineStartSmart
    CodeMirror.commands.goLineStartSmart(cm);
    var start_cursor = cm.doc.getCursor();
    var start = {'line': start_cursor.line, 'ch': start_cursor.ch};

    // go to the end of line
    CodeMirror.commands.goLineEnd(cm);
    var end_cursor = cm.doc.getCursor();
    var end = {'line': end_cursor.line, 'ch': end_cursor.ch};

    // get content
    var line_content = cm.doc.getRange(start, end);

    // make a break for a new line
    CodeMirror.commands.newlineAndIndent(cm);

    // filled a content of the new line content from line above it
    cm.doc.replaceSelection(line_content);

    // restore position cursor on the new line
    cm.doc.setCursor(current_cursor.line + 1, current_cursor.ch);
};

CodeMirror.keyMap.pcDefault["Ctrl-L"] = function(cm){

    // get a position of a current cursor in a current cell
    var current_cursor = cm.doc.getCursor();
    var line  = current_cursor.line
    cm.doc.replaceRange("", {'line': line, 'ch': 0}, {'line': line + 1, 'ch': 0})

    // restore position cursor on the new line
    cm.doc.setCursor(current_cursor.line - 1, current_cursor.ch);
    CodeMirror.commands.goLineEnd(cm);

};


CodeMirror.keyMap.pcDefault["Ctrl-R"] = function(cm){

    // get a position of a current cursor in a current cell
    var current_cursor = cm.doc.getCursor();
    line = current_cursor.line;
    i = 0;
    while(1){

        start = {'line': line, 'ch': i};
        end = {'line': line, 'ch': i + 1};

        var line_content = cm.doc.getRange(start, end);

        if (line_content != " " && line_content != "\t"){
            cm.doc.setCursor(start);
            cm.doc.addSelection(start, {'line' : line, 'ch' : cm.doc.getLine(line).length})
            break;
        };
        i = i + 1
    };
};


