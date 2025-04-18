const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "It was 107 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
const insertX = ["Willy the Goblin", "Big Ben", "Father Christmas", "Mr. F", "Lord Elsington Hallstingdingdingworth", "Manfred von Karma"];
const insertY = ["the soup kitchen", "Disneyland", "the White House", "your mother's house", "the gallows", "the castle Baronalpenine"];
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away", "stared in horror for a few moments"];

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);
  while(newStory.includes(":insertx:") || newStory.includes(":inserty:") || newStory.includes(":insertz:")){
    newStory = newStory.replace(":insertx:", xItem);
    newStory = newStory.replace(":inserty:", yItem);
    newStory = newStory.replace(":insertz:", zItem);
  }
  if(customName.value !== '') {
    const name = customName.value;
	newStory = newStory.replace("Bob", name);
  }
  if(document.getElementById("uk").checked) {
    const weight = Math.round(300*0.453592)+" kilograms";
    const temperature =  Math.round((107-32)*(5/9)) + " centigrade";
	newStory = newStory.replace("107 fahrenheit", temperature);
	newStory = newStory.replace("300 pounds", weight);
  }
  else if(document.getElementById("mm").checked){
	const weight = Math.round(300/1.8)+" ငါးဆယ်သား";
	newStory = newStory.replace("300 pounds", weight);
  }
  story.textContent = newStory;
  story.style.visibility = 'visible';
}