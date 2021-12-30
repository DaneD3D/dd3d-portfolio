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

function compareTwo(cardsToCompare: Card[]) {
  return cardsToCompare[0].name == cardsToCompare[1].name;
}

function selectCard(card: Card) {
  clicks.value++;
  cardsSelected.push(card);
  if (cardsSelected.length == 2 && compareTwo(cardsSelected)) {
    if (compareTwo(cardsSelected)) {
      correctCards = correctCards.concat(cardsSelected);
      cardsSelected = [];
      score.value++;
    } else {
      cardsSelected = [];
    }
  }
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
        class="
          flip-card
          bg-transparent
          w-full
          h-full
          border-1 border-solid border-red-700
        "
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
          "
        >
          <div class="absolute backface-hidden z-0 w-full h-full">
            <img
              src="\src\assets\memory\cardBack.jpg"
              alt="cardBack"
              class="backface-hidden h-full w-full"
            />
          </div>
          <div class="absolute z-1 w-full h-full backface-hidden transform">
            <!--readd rotate-y-180 to ^ class-->
            <component
              class="w-full h-full rounded-lg bg-light-50 bg-green-200"
              v-bind:is="card.img"
            />
          </div>
        </div>
      </div>
    </div>
    <!--
      <div
        id="popup"
        class="
          bg-red-500
          w-[200px]
          h-[200px]
          z-20
          fixed
          top-[100px]
          left-[100px]
          flex
          justify-center
          items-center
          flex-col
        "
      >
        <button id="playAgain">Play Again</button>
      </div>
      -->
  </div>
</template>

<style>
/*
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
*/
</style>
