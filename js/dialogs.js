import {
    currentBookStats,
    initTyping,
    stopTyping,
} from "./typing.js";

var bookToDelete;
var bookToRestart;

// limitation of one dialog at a time, can change if needed.
var currentDialog;

export function showDialog(id) {
    currentDialog = id;
    $("#dim-content").removeClass("hidden");
    $("#" + id).removeClass("hidden");
}

export function hideDialog() {
    $("#" + currentDialog).addClass("hidden");
    $("#dim-content").addClass("hidden");

}

export function deleteBook(bookId, bookTitle) {
    bookToDelete = bookId;
    $("#book-to-delete").text(bookTitle);
    showDialog('delete-warning');
}

export function tryRestartBook(book) {
    bookToRestart = book;
    showDialog("restart-book-dialog")
}

export function confirmRestart() {
    window.electron.restartBook(bookToRestart);
    hideDialog();
    initTyping(bookToRestart);
}

export function confirmDelete() {
    if (currentBookStats) {
        if (currentBookStats.bookName == bookToDelete) {
            stopTyping();
        }
    }
    window.electron.deleteBook(bookToDelete);
    hideDialog();
}

export function tryHideDialog() {
    if (currentDialog == "book-finished") {
        return;
    }
    hideDialog();
}