const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showOption(option){
  return true;
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while(optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if(showOption(option)){
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function selectOption(option) {

}

const textNodes = [
  {
    id: 1,
    text: 'You see two doors in front of you. The door on the left has a rusty handle and a faint green light eminating from the keyhole. The door on the right has a slighty less rusty handle and the keyhole is dark. Which door do you enter?',
    options: [
      {
        text: 'Enter the door on the left.',
        nextText: 2
      },
      {
        text: 'Enter the door on the right.',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You start to turn the rusty handle, stuck at first, but after giving it some force the rust breaks and the door swings slowly inward. You see a long stone hallway, dimly lit by a flickering green light coming from the end of the hall.',
    options: [
      {
        text: 'Walk down the hall towards the light.',
        nextText: 4
      },
      {
        text: 'Turn Around.',
        nextText: 1
      }
    ]
  },
  {
    id: 3,
    text: 'You open the door to a small room filled with dust and cobwebs. On the floor of the room you see a small hammered steel blade.',
    options: [
      {
        text: 'Take the blade.',
        nextText: 5,
        setState: { smallBlade: true }
      },
      {
        text: 'Leave the blade',
        nextText: 5
      }
    ]
  }
]

startGame()