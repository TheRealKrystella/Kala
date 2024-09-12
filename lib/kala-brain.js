
/**
 * Kala's Brain
 * - Developed by Ollie Krystella
 * - Dedicated to mihai.
 * 
 * - Target: NodeJS
 * 
 * @module KalaBrain
 * @version 1.0.0
 */

const KalaBrain = (function () {
  "use strict";

  /**
   * @class
   * @classdesc Represents emotions
   */
  class Emotions {
    /**
     * Defines emotions
     * @constructor
     * @param {number} [sadness=0] - Saddness
     * @param {number} [happiness=0] - Happiness
     * @param {number} [anger=0] - Anger
     * @param {number} [anticipation=0] - Anticipation
     * @param {number} [shyness=0] - Shyness
     * @param {number} [fear=0] - Fear
     * @param {number} [shock=0] - Shock
     * @returns {void}
     */
    constructor(sadness = 0, happiness = 0, anger = 0, anticipation = 0, shyness = 0, fear = 0, shock = 0) {
      this.sadness = Math.abs(sadness);
      this.happiness = Math.abs(happiness);
      this.anger = Math.abs(anger);
      this.anticipation = Math.abs(anticipation);
      this.shyness = Math.abs(shyness);
      this.fear = Math.abs(fear);
      this.shock = Math.abs(shock);
    }

    /**
     * Changes a members value
     * @param {mixed} [member=0] - The member to switch
     * @param {number} [value=0] - The value to replace it
     * @returns {boolean}
     */
    changeMember(member = 0, value = 0) {
      let output;

      // If the member parameter is a number
      if (typeof member == "number") {
        switch (member) {
          case 0:
            this.sadness = value;
            break;

          case 1:
            this.happiness = value;
            break;

          case 2:
            this.anger = value;
            break;

          case 3:
            this.anticipation = value;
            break;

          case 4:
            this.shyness = value;
            break;

          case 5:
            this.fear = value;
            break;

          case 6:
            this.shock = value;
            break;

          default:
            // Return false
            return false;
        }

        // Return true
        return true;
      }

      // If the member paramter is a string
      if (typeof member == "string") {
        switch (member) {
          case "sadness":
            this.sadness = value;
            break

          case "happiness":
            this.happiness = value;
            break;

          case "anger":
            this.anger = value;
            break;

          case "anticipation":
            this.anticipation = value;
            break;

          case "shyness":
            this.shyness = value;
            break;

          case "fear":
            this.fear = value;
            break;

          case "shock":
            this.shock = value;
            break;

          default:
            // Return false
            return false;
        }

        // Return true
        return true;
      }
    }

    /**
     * Adds anger
     * @param {number} value
     */
    addAnger(value) {
      this.anger += value;
    }



    /**
     * Calculates the mood score based on emotional states
     * @returns {number} - The calculated mood score (0-100)
     */
    calculateMood() {
      const weights = {
        anger: -2,
        anticipation: 1,
        fear: -1,
        happiness: 3,
        sadness: -2,
        shock: -1,
        shyness: -1
      };

      let mood =
        (this.anger * weights.anger) +
        (this.anticipation * weights.anticipation) +
        (this.fear * weights.fear) +
        (this.happiness * weights.happiness) +
        (this.sadness * weights.sadness) +
        (this.shock * weights.shock) +
        (this.shyness * weights.shyness);

      // Normalize the mood score to a range of 0 to 100
      mood = Math.max(0, Math.min(100, mood + 100));

      return mood;
    }
  };

  /**
   * @class
   * @classdesc Represents an emotional target
   */
  class EmotionalTarget {
    /**
     * Defines an EmotionalTarget
     * @constructor
     * @param {mixed} targetIdentifier - The identifier for the target
     * @param {Emotions} emotions - The emotions for this target
     * @returns {void}
     */
    constructor(targetIdentifier, emotions) {
      if (typeof targetIdentifier !== 'undefined' && typeof emotions !== 'undefined') {
        this.targetIdentifier = targetIdentifier;
        this.emotions = emotions;
      }
    }
  };


  const emotions = new Emotions();

  function levenshteinDistance(s1, s2) {
    const matrix = [];

    // Create the matrix
    for (let i = 0; i <= s1.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= s2.length; j++) {
      matrix[0][j] = j;
    }

    // Fill the matrix
    for (let i = 1; i <= s1.length; i++) {
      for (let j = 1; j <= s2.length; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1]; // no operation
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[s1.length][s2.length];
  }

  function areSimilar(s1, s2, threshold) {
    const distance = levenshteinDistance(s1, s2);
    return distance <= threshold;
  }

  /**
   * Returns a random eentry of the param
   * @param {mixed} any 
   * @returns {mixed}
   */
  function rand(any) {
    if (typeof any == "object") {
      return any[Math.floor(Math.random() * any.length)];
    }

    if (typeof any == "string") {
      return any.charAt(Math.floor(Math.random() * any.length));
    }
  }

  function randNo(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a response
   * @param {string} context - The context
   * @returns {string|boolean}
   */
  function generateResponse(context) {
    const response = [];
    let successfullyFound = false;

    for (const phrase of context.split(" ")) {
      if (areSimilar(phrase, "headpats", 3)) {
        successfullyFound = "headpats";
        break;
      }
    }

    let anger = emotions.anger;
    let anticipation = emotions.anticipation;
    let fear = emotions.fear;
    let happiness = emotions.happiness;
    let sadness = emotions.sadness;
    let shock = emotions.shock;
    let shyness = emotions.shyness;

    emotions.changeMember("happiness", emotions.happiness + 1);

    const mood = emotions.calculateMood();
    console.debug(mood);

    if (successfullyFound != false) {
      if (successfullyFound == "headpats") {
        if (shock < 5 && anger <= 5 && fear <= 2 && sadness <= 1) {
          const acting = [
            {
              value: "",
              condition: "true"
            },
            {
              value: "*leans into your hand*",
              condition: "mood >= 100"
            },
            {
              value: "*bites your hand*",
              condition: "mood <= 0"
            }
          ];
          const replies = [
            {
              value: "mmh... w-what? i mean- nothing...",
              excludeActing: [
                "*leans into your hand*",
                "*bites your hand*"
              ]
            },
            {
              value: "w-what the...",
              excludeActing: [
                "*leans into your hand*",
                "*bites your hand*"
              ]
            },
            {
              value: "mmh...",
              excludeActing: [
                "*bites your hand*"
              ]
            }
          ];
          let chanceActing;
          let val_acting
          let loopCount = 0;

          function setActing() {
            const fallback = 0;
            chanceActing = randNo(0, 0);
            if (chanceActing == 0) {
              let resu = rand(acting);
              if (eval(resu.condition)) {
                val_acting = resu.value;
                return true;
              } else {
                if (loopCount < 5) {
                  setActing();
                } else {
                  val_acting = acting[fallback].value;
                  return true;
                }
              }
            }
          }

          const cond1 = setActing() ?? false;

          if (cond1) {
            let val_reply;

            function update() {
              val_reply = rand(replies);

              if (val_reply.excludeActing) {
                if (val_reply.excludeActing.includes(val_acting.value)) {
                  val_reply = rand(replies);

                  update();
                }
              }

              return true;
            }

            const cond2 = update() ?? false;

            if (cond2) {
              response.push(val_acting);
              response.push(val_reply.value);
            }else{
              console.error('cond2');
              response.push('mhh...');
            }
          }else{
            console.error('cond1');
            response.push('mhh...');
          }
        }
      }
    }

    return response;
  }

  return {
    generateResponse: generateResponse
  };
})();

module.exports = KalaBrain;
