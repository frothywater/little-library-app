<template>
  <v-container>
    <card-table :cards="cards" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CardTable from '@/components/CardTable.vue';
import { CardRow, CardType } from 'little-library/src/typing';

@Component({
  components: { CardTable },
})
export default class Cards extends Vue {
  cards: CardRow[] = [
    {
      id: 1,
      name: 'Bob',
      address: 'London, UK',
      type: CardType.student,
    },
  ];
}
</script>
