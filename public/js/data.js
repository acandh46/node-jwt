$('#btnRemove').on('click', (evt) => {
    $('#files').empty();
})

$('#btnApiStart').on('click', function (evt) {
    evt.preventDefault();

    $('#drag-and-drop-zone').dmUploader('start');
});

$('#btnApiCancel').on('click', function (evt) {
    evt.preventDefault();

    $('#drag-and-drop-zone').dmUploader('cancel');
});

$('#files').on('click', 'button.start', function (evt) {
    evt.preventDefault();

    var id = $(this).closest('li.media').data('file-id');
    $('#drag-and-drop-zone').dmUploader('start', id);
});

$('#files').on('click', 'button.cancel', function (evt) {
    evt.preventDefault();

    var id = $(this).closest('li.media').data('file-id');
    $('#drag-and-drop-zone').dmUploader('cancel', id);
});

$('#drag-and-drop-zone').dmUploader({
    url: '/data',
    auto: false,
    queue: true,
    onDragEnter: function () {
        this.addClass('active');
    },

    onDragLeave: function () {
        // Happens when dragging something OUT of the DnD area
        this.removeClass('active');
    },

    onInit: function () {
        // Plugin is ready to use
        ui_add_log('Penguin initialized :)', 'info');
    },
    onComplete: function () {
        // All files in the queue are processed (success or error)
        ui_add_log('All pending tranfers finished');
    },
    onNewFile: function (id, file) {
        // When a new file is added using the file selector or the DnD area
        ui_add_log('New file added #' + id);
        ui_multi_add_file(id, file);
    },
    onBeforeUpload: function (id) {
        // about tho start uploading a file
        ui_add_log('Starting the upload of #' + id);
        ui_multi_update_file_status(id, 'uploading', 'Uploading...');
        ui_multi_update_file_progress(id, 0, '', true);
        ui_multi_update_file_controls(id, false, true);  // change control buttons status
    },
    onUploadProgress: function (id, percent) {
        // Updating file progress
        ui_multi_update_file_progress(id, percent);
    },
    onUploadSuccess: function (id, data) {
        // A file was successfully uploaded
        ui_add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
        ui_add_log('Upload of file #' + id + ' COMPLETED', 'success');
        ui_multi_update_file_status(id, 'success', 'Upload Complete');
        ui_multi_update_file_progress(id, 100, 'success', false);
        ui_multi_update_file_controls(id, false, false);  // change control buttons status
    },
    onUploadCanceled: function (id) {
        // Happens when a file is directly canceled by the user.
        ui_multi_update_file_status(id, 'warning', 'Canceled by User');
        ui_multi_update_file_progress(id, 0, 'warning', false);
        ui_multi_update_file_controls(id, true, false);
    },
    onUploadError: function (id, xhr, status, message) {
        // Happens when an upload error happens
        ui_multi_update_file_status(id, 'danger', message);
        ui_multi_update_file_progress(id, 0, 'danger', false);
        ui_multi_update_file_controls(id, true, false, true); // change control buttons status
    },
    // onUploadError: function (id, xhr, status, message) {
    //     // Happens when an upload error happens
    //     console.log(status, message)
    //     ui_multi_update_file_status(id, 'danger', status);
    //     ui_multi_update_file_progress(id, 0, 'danger', false);
    //     ui_multi_update_file_controls(id, true, false, true); // change control buttons status
    //     if(status == 'error'){
    //         var ulElem = document.getElementById('uploaderFile'+id)
    //         console.log(ulElem)
    //         ulElem.parentNode.removeChild(ulElem)
    //         return
    //     }

    // },
    onFallbackMode: function () {
        // When the browser doesn't support this plugin :(
        ui_add_log('Plugin cant be used here, running Fallback callback', 'danger');
    },
    onFileSizeError: function (file) {
        ui_add_log('File \'' + file.name + '\' cannot be added: size excess limit', 'danger');
    }
})




// Creates a new file and add it to our list
function ui_multi_add_file(id, file) {
    var template = $('#files-template').text();
    template = template.replace('%%filename%%', file.name);

    template = $(template);
    template.prop('id', 'uploaderFile' + id);
    template.data('file-id', id);

    $('#files').find('li.empty').fadeOut(); // remove the 'no files yet'
    $('#files').prepend(template);
}

// Changes the status messages on our list
function ui_multi_update_file_status(id, status, message) {
    $('#uploaderFile' + id).find('span').html(message).prop('class', 'status text-' + status);
}

// Updates a file progress, depending on the parameters it may animate it or change the color.
function ui_multi_update_file_progress(id, percent, color, active) {
    color = (typeof color === 'undefined' ? false : color);
    active = (typeof active === 'undefined' ? true : active);

    var bar = $('#uploaderFile' + id).find('div.progress-bar');

    bar.width(percent + '%').attr('aria-valuenow', percent);
    bar.toggleClass('progress-bar-striped progress-bar-animated', active);

    if (percent === 0) {
        bar.html('');
    } else {
        bar.html(percent + '%');
    }

    if (color !== false) {
        bar.removeClass('bg-success bg-info bg-warning bg-danger');
        bar.addClass('bg-' + color);
    }
}

// Toggles the disabled status of Star/Cancel buttons on one particual file
function ui_multi_update_file_controls(id, start, cancel, wasError) {
    wasError = (typeof wasError === 'undefined' ? false : wasError);

    $('#uploaderFile' + id).find('button.start').prop('disabled', !start);
    $('#uploaderFile' + id).find('button.cancel').prop('disabled', !cancel);

    if (!start && !cancel) {
        $('#uploaderFile' + id).find('.controls').fadeOut();
    } else {
        $('#uploaderFile' + id).find('.controls').fadeIn();
    }

    if (wasError) {
        $('#uploaderFile' + id).find('button.start').html('Retry');
    }


}

function ui_add_log(message, color) {
    var d = new Date();

    var dateString = (('0' + d.getHours())).slice(-2) + ':' +
        (('0' + d.getMinutes())).slice(-2) + ':' +
        (('0' + d.getSeconds())).slice(-2);

    color = (typeof color === 'undefined' ? 'muted' : color);

    var template = $('#debug-template').text();
    template = template.replace('%%date%%', dateString);
    template = template.replace('%%message%%', message);
    template = template.replace('%%color%%', color);

    $('#debug').find('li.empty').fadeOut(); // remove the 'no messages yet'
    $('#debug').prepend(template);
}