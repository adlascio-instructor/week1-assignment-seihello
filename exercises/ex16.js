/*Caze Maker II
We will still be given an input string to convert. However, this time, we'll also be given a casing style to work with. The following code block will describe all the casing styles to support. We may also receive an array of casing styles, and each of these should be applied.

Instruction
Create a function named makeCaze that will receive an input string and one or more casing options. Return a new string that is formatted based on casing options:

Precedence of each of the casing styles are as follows, values higher in the list should be processed first:

camel, pascal, snake, kebab, title
vowel, consonant
upper, lower
Our function should be able to handle all of these cases.

For more information on casing styles, read Wikipedia's Special Case Styles for a list of various casing examples.

*/

const convert = function(input, caze) {
  if(caze === "upper") input = input.toUpperCase()
  else if(caze === "lower") input = input.toLowerCase()
  else if(caze === "snake") input = input.replace(/\s/g, "_")
  else if(caze === "kebab") input = input.replace(/\s/g, "-")
  else if(caze === "camel" || caze === "pascal") {
    input = [...input]
    while(true) {
      let spaceIndex = input.indexOf(" ")
      if(spaceIndex === -1) {
        break
      } else {
        input[spaceIndex+1] = input[spaceIndex+1].toUpperCase()
        input.splice(spaceIndex, 1)
      }
    }
    if(caze === "pascal") {
      input[0] = input[0].toUpperCase()
    }
    input = input.join("")
  }
  else if(caze === "title" || caze === "vowel" || caze === "consonant") {
    input = [...input]
    let upperIndexList = []
    if(caze === "title") {
      for(let index in input) {
        if(+index === 0) {
          upperIndexList.push(0)
        }
        else {
          if(input[+index-1] === " ") {
            upperIndexList.push(index)
          }
        } 
      }
    } else if(caze === "vowel") {
      input.forEach((chara, index) => {
        if(chara === "a" || chara === "e" || chara === "i" || chara === "o" || chara === "u") {
          upperIndexList.push(index)
        }
      })
    } else if(caze === "consonant") {
      input.forEach((chara, index) => {
        if(chara != "a" && chara != "e" && chara != "i" && chara != "o" && chara != "u") {
          upperIndexList.push(index)
        }
      })
    }
    for(let upperIndex of upperIndexList) {
      input[upperIndex] = input[upperIndex].toUpperCase()
    }
    input = input.join("")
  }
  return input
}

const makeCaze = function (input, caze) {
  // Put your solution here
  if(typeof(caze) == "string") {
    input = convert(input, caze)
  }
  else {
    for(let cazeItem of caze) {
      input = convert(input, cazeItem)
    }
  }
  return input
};

console.log(makeCaze("this is a string", "camel")); // thisIsAString
console.log(makeCaze("this is a string", "pascal")); // ThisIsAString
console.log(makeCaze("this is a string", "snake")); // this_is_a_string
console.log(makeCaze("this is a string", "kebab")); // this-is-a-string
console.log(makeCaze("this is a string", "title")); // This Is A String
console.log(makeCaze("this is a string", "vowel")); // thIs Is A strIng
console.log(makeCaze("this is a string", "consonant")); // THiS iS a STRiNG
console.log(makeCaze("this is a string", ["upper", "snake"])); // THIS_IS_A_STRING

module.exports = makeCaze;
