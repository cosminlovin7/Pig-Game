'use strict';

let player0_active = true;
let winner = false;
let total_0 = 0;
let total_1 = 0;
let score_0 = 0;
let score_1 = 0;

let dice_value;

const roll_button = document.querySelector('.btn--roll');
const new_game_button = document.querySelector('.btn--new');
const hold_button = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const player0_score = document.querySelector('#current--0');
const player1_score = document.querySelector('#current--1');
const player0_total = document.querySelector('#score--0');
const player1_total = document.querySelector('#score--1');
const dice = document.querySelector('.dice');

set_score_0_to_0();
set_score_1_to_0();
update_total_0();
update_total_1();

function update_score_0() {
    score_0 += dice_value;
    player0_score.textContent = score_0;
}

function update_score_1() {
    score_1 += dice_value;
    player1_score.textContent = score_1;
}

function set_score_0_to_0() {
    score_0 = 0;
    player0_score.textContent = score_0;
}

function set_score_1_to_0() {
    score_1 = 0;
    player1_score.textContent = score_1;
}

function update_total_0() {
    total_0 += score_0;
    player0_total.textContent = total_0;

    if (total_0 >= 20) {
        winner = true;
        player0.classList.remove('player--active');
        player0.classList.add('player--winner');
    }
}

function update_total_1() {
    total_1 += score_1;
    player1_total.textContent = total_1;

    if (total_1 >= 20) {
        winner = true;
        player1.classList.remove('player--active');
        player1.classList.add('player--winner');
    }
}

function update_active_player() {
    if (player0_active) {
        set_score_0_to_0();
        player0.classList.remove('player--active');
        player1.classList.add('player--active');
    } else {
        set_score_1_to_0();
        player1.classList.remove('player--active');
        player0.classList.add('player--active');
    }
}

function show_dice_picture(value) {
    switch(value) {
        case 1 : 
            dice.src = 'dice-1.png';
            break;
        case 2 : 
            dice.src = 'dice-2.png';
            break;
        case 3 : 
            dice.src = 'dice-3.png';
            break;
        case 4 : 
            dice.src = 'dice-4.png';
            break;
        case 5 : 
            dice.src = 'dice-5.png';
            break;
        case 6 : 
            dice.src = 'dice-6.png';
            break;
        default : break;
    };
}

roll_button.addEventListener('click', function() {
    if (winner)
        return;

    dice_value = Math.floor(Math.random() * 6) + 1;
    console.log(dice_value);
    show_dice_picture(dice_value);

    if (dice_value == 1) {
        update_active_player();
        player0_active = !player0_active;
        return;
    }

    if (player0_active)
        update_score_0();
    else
        update_score_1();
});

hold_button.addEventListener('click', function() {
    if (winner)
        return;

    if (player0_active)
        update_total_0();
    else
        update_total_1();

    if (!winner) {
        update_active_player();
        player0_active = !player0_active;
    }
});

new_game_button.addEventListener('click', function() {
    if (!player0_active)
        update_active_player();

    if (winner) {
        if (player0_active) {
            player0.classList.remove('player--winner');
            player0.classList.add('player--active');
        } else {
            player1.classList.remove('player--winner');
        }
    }

    set_score_0_to_0();
    set_score_1_to_0();

    player0_active = true;
    winner = false;
    total_0 = 0;
    total_1 = 0;

    player0_total.textContent = total_0;
    player1_total.textContent = total_1;
});
