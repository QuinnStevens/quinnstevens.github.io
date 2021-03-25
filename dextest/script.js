/*global $*/
var main = function() {
    var keyPressed = null;
    var currentScore = 0;
    var sequenceHighScore = 0;
    var randomHighScore = 0;
    var mode = "Playground"; // is the game running?
    var drillKey = 0;
    var sequenceDrill = [
        'q',
        'a',
        'z',
        'space',
        'w',
        's',
        'x',
        'space',
        'e',
        'd',
        'c',
        'space',
        'r',
        'f',
        'v',
        'space',
        't',
        'g',
        'b',
        'space',
        'y',
        'h',
        'n',
        'space',
        'u',
        'j',
        'm',
        'space',
        'i',
        'k',
        'comm',
        'space',
        'o',
        'l',
        'stop',
        'space',
        'p',
        'semi',
        'slash',
        'space'
    ];
    
    var keys = [
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        'a',
        's',
        'd',
        "f",
        "g",
        "h",
        "j",
        'k',
        'l',
        'semi',
        'apos',
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        'comm',
        'stop',
        'slash'
    ];
    
    var homeRow = [
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        'semi',
        'apos'
    ];
    
    var noMansLand = [
        't',
        'g',
        'b',
        'y',
        'h',
        'n'
    ];
    
    var leftHand = [
        'q',
        'a',
        'z',
        'w',
        's',
        'x',
        'e',
        'd',
        'c',
        'r',
        'f',
        'v'
    ];
    
    var rightHand = [
        'u',
        'j',
        'm',
        'i',
        'k',
        'comm',
        'o',
        'l',
        'stop',
        'p',
        'semi',
        'slash'
    ];
    
    var mainKeys = [
        'f',
        'j'
    ];
    
    var whichKey = function(key) {
        // takes a key from a keypress event and returns the class of the box
        // representing that key.
        $('#tryagain').addClass('hidden');
        switch(key) {
            case ';':
            case ':':
                // : is also on the ; key
                return '#keysemi';
                break;
            case '\'':
            case '@':
                // @ is also on the apostrophe key
                return '#keyapos';
                break;
            case ',':
            case '<':
                return '#keycomm';
                break;
            case '.':
            case '>':
                return '#keystop';
                break;
            case '/':
            case '?':
                return '#keyslash';
                break;
            case ' ':
                return '#keyspace';
                break;
            default:
                if ('qwertyuiopasdfghjklzxcvbnm'.includes(key.toLowerCase())) {
                    return '#key' + key.toLowerCase();
                }
                break;
        }
    }

    var requestKey = function() {
        var keyToTest;
        if (mode == "Sequence") {
            keyToTest = '#key' + sequenceDrill[drillKey];
            if (drillKey < sequenceDrill.length -1) {
                drillKey++;
            } else {
                drillKey = 0;
            }
        } else if (mode == "Random") {
            do {
                // Choose a random key
                keyToTest = '#key' + keys[Math.floor(Math.random() * keys.length)];
            }
            while ($(keyToTest).hasClass('invisible')) // repeat until you choose a visible one.
        }

        $(keyToTest).addClass('orange')
    }
    
    var updateScores = function() {
        // sets score to be compared against - sequence or random
        var highScore = mode == "Sequence" ? sequenceHighScore: randomHighScore;

        // if user has beaten their high score, update it.
        if(currentScore > highScore) {
            highScore = currentScore;
            $('.hiScore').text('Best: ' + highScore);
            $('.hiScore').effect('highlight', {color: '#acd0c2'}, 100);
        } else {
            $('.hiScore').text('Best: ' + highScore);
        }

        if (mode == "Sequence") {
            sequenceHighScore = highScore;
            $('#sequenceScore').val(sequenceHighScore);
        } else if (mode == "Random") {
            randomHighScore = highScore;
            $('#randomScore').val(randomHighScore);
        }
        
        $('.counter').text('Streak: ' + currentScore);
    }
    
    function changeMode() {
        /* changeMode will cycle between the three modes of the app:
            Playground,
            Sequence,
            Random
            in that order. */
        $('#tryagain').addClass('hidden');
        if (mode == 'Playground') {
            mode = 'Sequence'; //JS changed Follow the Leader to Sequence Drill
            drillKey = 0; // set sequence to start from Q
            $('.gamemode').text(mode)
            $('.key, .spacebar').removeClass('orange darkBlue turquoise red');
            $('.counter').removeClass('invisible');
            $('.hiScore').removeClass('invisible');
            requestKey();
        } else if (mode == 'Sequence') { 
            mode = 'Random'; //JS changed Follow the Leader to Random
            $('.gamemode').text(mode);
            $('.key, .spacebar').removeClass('orange darkBlue turquoise red');
            requestKey(); //JS replaced requestdrillKey(); with requestKey():
        } else {
            mode = 'Playground';
            $('.gamemode').text(mode);
            $('.key, .spacebar').removeClass('orange darkBlue turquoise red');
            $('.counter').addClass('invisible');
            $('.hiScore').addClass('invisible');
            drillKey = 0;
        }
        currentScore = 0;
        updateScores();
    }

    function showSubmitRow() {
        /* showSubmitRow checks to see if there are high scores currently
            active, and if there are, shows the submit scores form.
        */
        if (sequenceHighScore > 0 || randomHighScore > 0) {
            // If user has any high scores, show submit form
            $('#rowSubmit').removeClass('hidden');
        } else {
            $('#rowSubmit').addClass('hidden');
        }
    }

    /***************************\
    |       MAIN BODY           |
    \***************************/
    
    // Make apostrophe invisible
    $('#keyapos').addClass('invisible');
    
    // streak counter and high score start off invisible
    $('.counter').addClass('invisible');
    $('.hiScore').addClass('invisible');
    
    /* COLOURS:
        orange    - #eba232
        dark blue - #395474
        turquoise - #acd0c2
        red       - #d93744
    */
    
    // makes no mans land turquoise and tab key orange
    for (var i=0; i<noMansLand.length; i++) {
        $('#key' + noMansLand[i]).css('border', '2px solid #acd0c2');
    }
    $('#tab').css('border', '2px solid #eba232');
    
    // makes most keys blue
    for (var i=0; i<leftHand.length; i++) {
        $('#key' + leftHand[i]).css('border', '2px solid #395474');
    }
    for (var i=0; i<rightHand.length; i++) {
        $('#key' +rightHand[i]).css('border', '2px solid #395474');
    }
    
    $('#keyspace').css('border', '2px solid #395474');
    
    for (var i=0; i<mainKeys.length; i++) {
        $('#key' + mainKeys[i]).css('border', '2px solid #d93744');
    }
    
    // Key handling logic
    $('body').keydown(function(event) {
        if ($('#name').is(':focus')){
            if (event.which === 9) {
                // If tab is pressed while in form, remove focus
                event.preventDefault();
                $('#name').blur();
            }
        } else if(event.which === 9) { // if tab was pressed, switch modes
            event.preventDefault();
            changeMode();
        } else {
            keyPressed = whichKey(event.key);
            if ($(keyPressed).hasClass('invisible')) {
                // if apostrophe was pressed, ask to try again
                $('#tryagain').removeClass('hidden');
            } else {
                $('#tryagain').addClass('hidden');
                if (mode == "Random" || mode == "Sequence") {
                    if ($(keyPressed).hasClass('orange')) {
                        $('.key, .spacebar').removeClass('orange');
                        $('.key, .spacebar').removeClass('darkBlue');
                        currentScore++;
                        updateScores();
                        requestKey();
                    } else {
                        $(keyPressed).addClass('darkBlue');
                        currentScore = 0;
                        updateScores();
                    }
                } else {                                        // If in Playground Mode
                    if($(keyPressed).hasClass('turquoise')) {   // if key turquoise, highlight dark blue
                        $(keyPressed).removeClass('turquoise');
                        $(keyPressed).addClass('darkBlue');
                    } else if ($(keyPressed).hasClass('darkBlue')) {   // if key already blue, highlight turquoise
                        $(keyPressed).removeClass('darkBlue');
                        $(keyPressed).addClass('turquoise');
                    } else if (event.which === 32) {            // if spacebar pressed, reset all keys to blank
                        $('.key, .spacebar').removeClass('turquoise darkBlue');
                    } else {                                    // if key not pressed yet, colour dark blue
                        $(keyPressed).addClass('darkBlue');
                    }
                }
            }
        }

        showSubmitRow();
    });
    
    
}

$(document).ready(main());
