'use strict';

window.onload = function (e) {
  var router = new VueRouter({
    mode: 'history',
    routes: [],
    fallback: false
  });

  var app = new Vue({
    router: router,

    el: '#app',

    components: {
      'credits': httpVueLoader('./vendor/afp/credits.vue'),
      'logo': httpVueLoader('./vendor/afp/logo.vue'),
      'tabs': httpVueLoader('./tabs.vue')
    },

    data: {
      story: {},
      loaded: false
    },

    created: function created() {
      var url = this.getStory(this.$route.query.lang);
      this.loadStory(url);
    },
    mounted: function mounted() {
      this.pymChild = new pym.Child({ polling: 500 });
      /**
       * Returns a number whose value is limited to the given range.
       *
       * Example: limit the output of this computation to between 0 and 255
       * (x * 255).clamp(0, 255)
       *
       * @param {Number} min The lower boundary of the output range
       * @param {Number} max The upper boundary of the output range
       * @returns A number in the range [min, max]
       * @type Number
       */
      Number.prototype.clamp = function(min, max) {
        return Math.min(Math.max(this, min), max);
      };
    },


    methods: {
      getStory: function getStory(lang) {
        if (lang && lang.length === 2) return './story_' + lang + '.txt';
        return './story_en.txt';
      },
      loadStory: function loadStory(url) {
        var _this2 = this;

        return this.$http.get(url).then(function (response) {
          return archieml.load(response.bodyText);
        }).then(function (json) {
          _this2.story = json;
          _this2.loaded = true;
        }, function (error) {
          _this2.loadStory('./story_en.txt');
        });
      }
    }
  });
};
