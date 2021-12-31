<script setup lang="ts">
import EmojionePeach from '../../assets/memory/EmojionePeach.vue';
import EmojioneCherryVue from '../../assets/memory/EmojioneCherry.vue';
import EmojioneLemonVue from '/@/assets/memory/EmojioneLemon.vue';
import EmojionePineappleVue from '/@/assets/memory/EmojionePineapple.vue';
import EmojioneTomatoVue from '/@/assets/memory/EmojioneTomato.vue';
import EmojioneWatermelonVue from '/@/assets/memory/EmojioneWatermelon.vue';
import { ref } from 'vue';

interface Card {
  id: number;
  name: string;
  img: { name: string };
}

let cardArray: Card[] = [
  { id: 1, name: 'peach', img: EmojionePeach },
  { id: 2, name: 'watermelon', img: EmojioneWatermelonVue },
  { id: 3, name: 'watermelon', img: EmojioneWatermelonVue },
  { id: 4, name: 'peach', img: EmojionePeach },
  { id: 5, name: 'cherry', img: EmojioneCherryVue },
  { id: 6, name: 'cherry', img: EmojioneCherryVue },
  { id: 7, name: 'lemon', img: EmojioneLemonVue },
  { id: 8, name: 'lemon', img: EmojioneLemonVue },
  { id: 9, name: 'tomato', img: EmojioneTomatoVue },
  { id: 10, name: 'tomato', img: EmojioneTomatoVue },
  { id: 11, name: 'pineapple', img: EmojionePineappleVue },
  { id: 12, name: 'pineapple', img: EmojionePineappleVue },
];

let shuffledCards = shuffleSort(cardArray);

let correctCards: Card[] = [];
let cardsSelected: Card[] = [];
let transitionCards: Card[] = [];
let score = ref(0);
let clicks = ref(0);

function shuffleSort(deck: any) {
  var m = deck.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
  }

  return deck;
}

function compareNames(cardsToCompare: Card[]) {
  return cardsToCompare[0].name == cardsToCompare[1].name;
}

function compareIds(cardsToCompare: Card[]) {
  return cardsToCompare[0].id == cardsToCompare[1].id;
}

function clearSelection() {
  cardsSelected.length = 0;
}

function clearTransition() {
  transitionCards.length = 0;
}

function myTransTimeout() {
  setTimeout(clearTransition, 50);
}

function replay() {
  shuffleSort(cardArray);
}

function selectCard(card: Card) {
  clicks.value++;
  cardsSelected.push(card);
  if (cardsSelected.length >= 2) {
    if (compareNames(cardsSelected) && !compareIds(cardsSelected)) {
      correctCards.push.apply(correctCards, cardsSelected);
      clearSelection();
      score.value++;
    } else transitionCards.push.apply(transitionCards, cardsSelected);
    myTransTimeout();
    clearSelection();
  }
}

function findFlipped(card: Card) {
  let masterList = correctCards.concat(cardsSelected, transitionCards);
  return (
    undefined ==
    masterList.find(function (selected) {
      if (selected.id == card.id) {
        return true;
      }
    })
  );
}
</script>

<template>
  <div id="data" class="h-[100%] flex flex-col justify-around items-center">
    <div id="score">
      Score:
      <span id="scoreBoard">{{ score }}</span>
    </div>
    <div id="click">
      Clicks:
      <span id="clickBoard">{{ clicks }}</span>
    </div>
    <div><button :click="replay">Replay</button></div>

    <div
      id="grid"
      class="
        w-[45%]
        h-[80%]
        grid grid-cols-3 grid-rows-4
        mb-10
        gap-5
        <sm:w-[85%]
      "
    >
      <div
        class="flip-card bg-transparent w-full h-full"
        v-for="card in shuffledCards"
        v-bind:id="card.id"
        v-on:click.prevent="selectCard(card)"
      >
        <div
          class="
            flip-card-inner
            w-full
            h-full
            transition-transform
            duration-[0.8s]
            preserve-3d
            rgb
          "
          :class="{ flipped: findFlipped(card) }"
        >
          <div class="absolute z-0 w-full h-full">
            <img
              src="\src\assets\memory\cardBack.jpg"
              alt="cardBack"
              class="backface-hidden h-full w-full rounded-lg"
            />
          </div>
          <div class="absolute z-0 w-full h-full backface-hidden transform">
            <component
              class="w-full h-full rounded-lg bg-gray-500 dark:bg-secondary"
              v-bind:is="card.img"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/*
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
*/

.flip-card:hover .rgb::before {
  content: '';
  background: linear-gradient(
      45deg,
      #ff0000 0%,
      #ff9a00 10%,
      #d0de21 20%,
      #4fdc4a 30%,
      #3fdad8 40%,
      #2fc9e2 50%,
      #1c7fee 60%,
      #5f15f2 70%,
      #ba0cf8 80%,
      #fb07d9 90%,
      #ff0000 100%
    )
    repeat 0% 0% / 300% 100%;
  position: absolute;
  inset: -3px;
  border-radius: 16px;
  filter: blur(8px);
  transform: translateZ(-1px); /*or z-index */
  animation: rgb 6s linear infinite;
}

@keyframes rgb {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
