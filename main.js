var noteFrame = "<div class=\"view-card mdl-card mdl-shadow--2dp animated bounceInUp\"> <div class=\"mdl-card__title\"> <h2 class=\"mdl-card__title-text\"> {{title}} </h2> </div> <div class=\"mdl-card__supporting-text\"> {{{desc}}} </div> </div>"
var noteTemplate = Handlebars.compile(noteFrame);
function loadnotes(notesArray) {
    var notes = "";
    if (notesArray.length == 0) {
        notes = "no notes found";
    } else {
        for (var i = 0; i < notesArray.length; i++) {
            notes += noteTemplate({ title: notesArray[i].title, desc: notesArray[i].desc, id: i });
        }
    }

    $("#scroll-tab-1").addClass('is-active')
    $("#scroll-tab-2").removeClass('is-active')
    $("#scroll-tab-1 > div").html(notes)
}

function loadnewnote() {
    $("#scroll-tab-2").addClass('is-active')
    $("#scroll-tab-1").removeClass('is-active')
}

function getNotesJSON() {
    return (JSON.parse(localStorage.getItem('notes')) || {}).notes || []
}

function addNote(note) {
    if (note) {
        if (note.title || note.desc) {
            var store = JSON.parse(localStorage.getItem('notes')) || {}
            if (store.notes) {
                store.notes.push(note)
            } else {
                store.notes = [note]
            }
            localStorage.setItem('notes', JSON.stringify(store))
        }
    }
}

function winload() {
    $("#note-new-btn").click(function () {
        loadnewnote();
    })

    $("#goback").click(function () {
        loadnotes(getNotesJSON());
    })

    $("#note-save-btn").click(function () {
        var title = $("#title").val();
        var desc = $("#desc").val();
        addNote({ title: title, desc: desc })
        $("#title").val(''); $("#desc").val('');
        loadnotes(getNotesJSON());
    })

    loadnotes(getNotesJSON());
}

winload();