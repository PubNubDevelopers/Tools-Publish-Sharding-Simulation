var msg_rate = 1;
var msg_rate_milli = Math.trunc(1000 / msg_rate);
var sim_interval = null;
var msg_count = 0;
var max_msg_list_size = 5355;
var simulating = false;
var messages = []; // populated in script at bottom of page
var listElement = null;
var verbs, nouns, adjectives, adverbs, preposition;
nouns = ["bird", "student", "clock", "boy", "plastic", "duck", "teacher", "old lady", "professor", "hamster", "dog"];
verbs = ["ran", "flew", "dodged", "rolled", "breathed"];
adjectives = ["beautiful", "lazy", "professional", "lovely", "rough", "soft", "hot", "vibrating", "slimy"];
adverbs = ["slowly", "elegantly", "precisely", "quickly", "sadly", "humbly", "proudly", "shockingly", "calmly", "passionately"];
preposition = ["down", "into", "up", "on", "upon", "below", "above", "through", "across", "towards"];
var paused = false;
function randGen() {
    return Math.floor(Math.random() * 5);
}
function sentence() {
    var rand1 = Math.floor(Math.random() * 10);
    var rand2 = Math.floor(Math.random() * 10);
    var rand3 = Math.floor(Math.random() * 10);
    var rand4 = Math.floor(Math.random() * 10);
    var rand5 = Math.floor(Math.random() * 10);
    var rand6 = Math.floor(Math.random() * 10);
    var content = "The " + adjectives[rand1] + " " + nouns[rand2] + " " + verbs[rand4] + " a " + nouns[rand5] + ".";
    if (Math.floor(Math.random() * 10) < 8)
        content = "The " + adjectives[rand1] + " " + nouns[rand2] + " " + adverbs[rand3] + " " + verbs[rand4] + " because some " + nouns[rand1] + " " + adverbs[rand1] + " " + verbs[rand1] + " " + preposition[rand1] + " a " + adjectives[rand2] + " " + nouns[rand5] + " which, became a " + adjectives[rand3] + ", " + adjectives[rand4] + " " + nouns[rand6] + ".";
    if (Math.floor(Math.random() * 10) == 2)
        content = "😀";
    if (Math.floor(Math.random() * 10) == 3)
        content = "😂😂😂";
    return content;
}
for (var i = 0; i < 100; i++) {
    messages[i] = sentence();
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function random_text() {
    return messages[getRandomInt(100)] ;
}
function insert_message() {
    if (msg_count < max_msg_list_size) {
        if (paused)
        {
            paused = false;
            document.getElementById('message-list').classList.remove('paused');
        }
        msg_count ++;
        var msgList = document.getElementById('message-list');
        var newElement = document.createElement("div");
        newElement.className = "message";
        newElement.innerHTML = "<div class='avatar col-sm-2 col-md-2'><img src='image/avatar" + (1 + getRandomInt(16)) + ".png' /></div><div class='message-text text-body-2'>" + random_text() + "</div>";
        msgList.appendChild(newElement);
    }
}
function updateScroll(){
    var msgList = document.getElementById('message-list');
    msgList.scrollTop = msgList.scrollHeight;
}
function simulate() {
    sim_interval = setInterval(function(){
        insert_message();
        updateScroll();
    }, msg_rate_milli);
    simulating = true;
}
function change_rate() {
    msg_rate_milli = Math.trunc(1000 / msg_rate);
    if (sim_interval) clearInterval(sim_interval);
    simulate();
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function rateDown() {
    paused = true;
    document.getElementById('message-list').classList.add('paused');
    var new_rate = parseFloat(document.getElementById('msgrate').innerText);
    if (new_rate - 0.1 > 0) {
        msg_rate = round(new_rate - 0.1, 1);
        document.getElementById('msgrate').innerText = msg_rate.toFixed(1);
        change_rate();
        updateScroll();
    }
}

function rateUp() {
    paused = true;
    document.getElementById('message-list').classList.add('paused');
    var new_rate = parseFloat(document.getElementById('msgrate').innerText);
    if (new_rate + 0.1 < 20) {
        msg_rate = round(new_rate + 0.1, 1);
        document.getElementById('msgrate').innerText = msg_rate.toFixed(1);
        change_rate();
        updateScroll();
    }
}

document.getElementById('rate-down').addEventListener("click", rateDown);
document.getElementById('rate-up').addEventListener("click", rateUp);

