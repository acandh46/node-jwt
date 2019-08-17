var ajaxCall;
Array['prototype']['remove'] = function(_0xdc81x2) {
    var _0xdc81x3 = this['indexOf'](_0xdc81x2);
    if (_0xdc81x3 != -1) {
        this['splice'](_0xdc81x3, 1)
    };
    return this
};

function enableTextArea(_0xdc81x5) {
    $('#mailpass')['attr']('disabled', _0xdc81x5)
}

function gbrn_liveUp() {
    var _0xdc81x7 = parseInt($('#acc_live_count')['html']());
    _0xdc81x7++;
    $('#acc_live_count')['html'](_0xdc81x7 + '')
}

function gbrn_dieUp() {
    var _0xdc81x7 = parseInt($('#acc_die_count')['html']());
    _0xdc81x7++;
    $('#acc_die_count')['html'](_0xdc81x7 + '')
}

function gbrn_wrongUp() {
    var _0xdc81x7 = parseInt($('#wrong_count')['html']());
    _0xdc81x7++;
    $('#wrong_count')['html'](_0xdc81x7 + '')
}

function gbrn_badUp() {
    var _0xdc81x7 = parseInt($('#bad_count')['html']());
    _0xdc81x7++;
    $('#bad_count')['html'](_0xdc81x7 + '')
}

function updateProgress(_0xdc81xc, _0xdc81xd) {
    var _0xdc81xe = Math['floor']((_0xdc81xc / _0xdc81xd) * 100);
    $('.progress-bar')['css']('width', _0xdc81xe + '%')['attr']('aria-valuenow', _0xdc81xe);
    $('.progress-text')['text'](_0xdc81xe + '%');
    document['title'] = _0xdc81xe + '% [' + _0xdc81xc + '/' + _0xdc81xd + '] '
}

function stopLoading(_0xdc81x5) {
    $('#loading')['attr']('src', '../img/clear.gif');
    var _0xdc81x10 = $('#checkStatus')['html']();
    $('#checkStatus')['html'](_0xdc81x10['replace']('Checking', 'Stopped'));
    enableTextArea(false);
    $('#submit')['attr']('disabled', false);
    $('#stop')['attr']('disabled', true);
    if (_0xdc81x5) {
        swal({
            title: 'Checking Complete',
            type: 'success',
            allowEscapeKey: true,
            allowOutsideClick: true,
            text: 'Thanks For Using <a href=\'https://www.facebook.com/si.nopy46\' target=\'blank\'><b>Sikampret</b></a> Checker !',
            html: true,
            confirmButtonText: 'Continue'
        })
    } else {
        ajaxCall['abort']()
    };
    updateTitle('Stopped - Sikampret')
}

function updateTitle(_0xdc81x10) {
    document['title'] = _0xdc81x10
}

function updateTextBox(_0xdc81x13) {
    var _0xdc81x14 = $('#mailpass')['val']()['split']('\x0A');
    _0xdc81x14['remove'](_0xdc81x13);
    $('#mailpass')['val'](_0xdc81x14['join']('\x0A'))
}

function GbrnTmfn(_0xdc81x16, _0xdc81x17, _0xdc81x18, _0xdc81x19, _0xdc81x1a, _0xdc81x1b, _0xdc81x1c, _0xdc81x1d) {
    if (_0xdc81x16['length'] < 1 || _0xdc81x17 >= _0xdc81x16['length']) {
        stopLoading(true);
        return false
    };
    updateTextBox(_0xdc81x16[_0xdc81x17]);
    ajaxCall = $['ajax']({
        url: 'ruas.php',
        dataType: 'json',
        cache: false,
        type: 'POST',
        beforeSend: function(_0xdc81x1e) {
            updateTitle('[' + _0xdc81x1d + '/' + _0xdc81x16['length'] + ']  Checking - Sikampret');
            updateProgress(_0xdc81x1d, _0xdc81x16['length']);
            $('#checkStatus')['html']('Checking: ' + _0xdc81x16[_0xdc81x17] + '');
            $('#loading')['attr']('src', '../img/loading.gif')
        },
        data: 'ajax=1&do=check&mailpass=' + encodeURIComponent(_0xdc81x16[_0xdc81x17]) + '&delim=' + encodeURIComponent(_0xdc81x18),
        success: function(_0xdc81x1f) {
            switch (_0xdc81x1f['error']) {
                case -1:
                    _0xdc81x17++;
                    $('#wrong')['append'](_0xdc81x1f['msg'] + '<br />');
                    gbrn_wrongUp();
                    break;
                case 1:
                    ;
                case 3:
                    ;
                case 2:
                    _0xdc81x17++;
                    $('#acc_die')['append'](_0xdc81x1f['msg'] + '<br />');
                    gbrn_dieUp();
                    break;
                case 0:
                    _0xdc81x17++;
                    $('#acc_live')['append'](_0xdc81x1f['msg'] + '<br />');
                    gbrn_liveUp();
                    break
            };
            _0xdc81x1d++;
            GbrnTmfn(_0xdc81x16, _0xdc81x17, _0xdc81x18, _0xdc81x19, _0xdc81x1a, _0xdc81x1b, _0xdc81x1c, _0xdc81x1d)
        }
    });
    return true
}

function filterMP(_0xdc81x13, _0xdc81x18) {
    var _0xdc81x21 = _0xdc81x13['split']('\x0A');
    var _0xdc81x22 = new Array();
    var _0xdc81x16 = new Array();
    for (var _0xdc81x23 = 0; _0xdc81x23 < _0xdc81x21['length']; _0xdc81x23++) {
        if (_0xdc81x21[_0xdc81x23]['indexOf']('@') != -1) {
            var _0xdc81x24 = _0xdc81x21[_0xdc81x23]['split'](_0xdc81x18);
            for (var _0xdc81x25 = 0; _0xdc81x25 < _0xdc81x24['length']; _0xdc81x25++) {
                if (_0xdc81x24[_0xdc81x25]['indexOf']('@') != -1) {
                    var _0xdc81x26 = $['trim'](_0xdc81x24[_0xdc81x25]);
                    var _0xdc81x27 = $['trim'](_0xdc81x24[_0xdc81x25 + 1]);
                    if (_0xdc81x22['indexOf'](_0xdc81x26['toLowerCase']()) == -1) {
                        _0xdc81x22['push'](_0xdc81x26['toLowerCase']());
                        _0xdc81x16['push'](_0xdc81x26);
                        break
                    }
                }
            }
        }
    };
    return _0xdc81x16
}

function resetResult() {
    $('#acc_die,#wrong')['html']('');
    $('#acc_die_count,#wrong_count')['text'](0)
}
$(document)['ready'](function() {
    $('#stop')['attr']('disabled', true)['click'](function() {
        stopLoading(false)
    });
    $('#submit')['click'](function() {
        var _0xdc81x1d = 1;
        var _0xdc81x18 = $('#delim')['val']()['trim']();
        var _0xdc81x14 = filterMP($('#mailpass')['val'](), _0xdc81x18);
        var _0xdc81x1a = $('#bank')['is'](':checked') ? 1 : 0;
        var _0xdc81x1b = $('#card')['is'](':checked') ? 1 : 0;
        var _0xdc81x1c = $('#info')['is'](':checked') ? 1 : 0;
        var _0xdc81x19 = $('#email')['is'](':checked') ? 1 : 0;
        if ($('#mailpass')['val']()['trim']() == '') {
            swal({
                title: 'Error',
                timer: 4000,
                allowEscapeKey: true,
                allowOutsideClick: true,
                type: 'error',
                text: 'No Mail / Pass found!',
                confirmButtonText: 'Continue'
            });
            return false
        };
        $('#mailpass')['val'](_0xdc81x14['join']('\x0A'))['attr']('disabled', true);
        $('#procces_status')['fadeIn'](1000);
        $('#result')['fadeIn'](1000);
        resetResult();
        $('#submit')['attr']('disabled', true);
        $('#stop')['attr']('disabled', false);
        GbrnTmfn(_0xdc81x14, 0, _0xdc81x18, _0xdc81x19, _0xdc81x1a, _0xdc81x1b, _0xdc81x1c, _0xdc81x1d);
        return false
    })
});

function selectText(_0xdc81x2a) {
    if (document['selection']) {
        var _0xdc81x2b = document['body']['createTextRange']();
        _0xdc81x2b['moveToElementText'](document['getElementById'](_0xdc81x2a));
        _0xdc81x2b['select']()
    } else {
        if (window['getSelection']()) {
            var _0xdc81x2b = document['createRange']();
            _0xdc81x2b['selectNode'](document['getElementById'](_0xdc81x2a));
            window['getSelection']()['removeAllRanges']();
            window['getSelection']()['addRange'](_0xdc81x2b)
        }
    }
}