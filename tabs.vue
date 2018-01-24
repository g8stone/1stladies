<template>
  <div>
    <nav>
      <draggable-timeline :start="startdate" end="2018" :value="date" v-on:datechanged="dateChanged"></draggable-timeline>
      
      <!-- <ul>
        <li v-for="item,i in items" v-on:click="switchItem(i)" :class="{active: i==current}" :style="{backgroundColor: item.props.color}">
        {{ item.props.name }}
        </li>
      </ul> -->
    </nav>
    <main>
      <ul>
        <li v-for="item in currentItems">
          <h3>{{ item.props.title }}</h3>
         
          <div class="role">
            {{ item.status }}
          </div>
          <div class="person">
            <div class="portrait">
              <img :src="'assets/'+item.image" />
            </div>
			<div class="text">
              <div class="description"> {{ item.props.description }}
			  </div>
		    </div>
			
		  </div>	  
        </li>
	  </ul>
	</main>
    
  </div> 
</template>

<script>
  module.exports = {
    data: function data() {
      return {
        date: 1961
      }
    },
    props: ['items'],
    components: {
      'draggable-timeline': httpVueLoader('./draggable-timeline.vue')
    },
    computed: {
      startdate: function startdate() {
        return d3.min(this.items, function(item) {
          return parseInt(item.date.start)
        });
      },
      currentItems: function currentItems() {
        var date = this.date
        return this.items.filter(function(item) {
          return parseInt(item.date.start) <= date && parseInt(item.date.end) > date
        });
      }
    },
    mounted: function mounted() {
    },
    methods: {
      dateChanged: function dateChanged(val) {
        this.date = val
      }
    }
  }
</script>

<style scoped>
</style>