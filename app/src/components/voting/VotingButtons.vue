<template lang="pug">
.voting-buttons
  .like(@click="like(response._id)" v-bind:class="{ 'has-voted': hasLiked }")
    i.fas.fa-caret-up
  .dislike(@click="dislike(response._id)" v-bind:class="{ 'has-voted': hasDisliked }")
    i.fas.fa-caret-down
</template>

<script>
import { mapGetters } from 'vuex'

import _find from 'lodash/find'

export default {
  name: 'voting-buttons',
  props: ['response'],
  computed: {
    ...mapGetters(['user']),
    hasLiked () {
      if (!this.user) return false
      return _find(this.response._likes, (vote) => {
        this.$log(vote._user._id)
        this.$log(this.user._id)
        return (vote._user._id === this.user._id)
      })
    },
    hasDisliked () {
      if (!this.user) return false
      return _find(this.response._dislikes, (vote) => {
        this.$log(vote._user._id)
        this.$log(this.user._id)
        return (vote._user._id === this.user._id)
      })
    }
  },
  methods: {
    like () {
      this.$emit('like')
    },
    dislike () {
      this.$emit('dislike')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.voting-buttons
  .like, .dislike
    pinned()
    animate()
    left 30px
    right 0
    color $color-text-light-grey
    position absolute
    height 30px
    line-height 30px
    text-align center
    &:hover
      cursor pointer
      color darken($color-text-light-grey, 20%)
    svg
      height 30px
      width 20px
    &.like
      bottom auto
      top 5px
      &.has-voted
        color $color-success
    &.dislike
      top auto
      bottom 15px
      &.has-voted
        color $color-danger

</style>
