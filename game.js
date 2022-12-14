const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showOption(option){
  return option.requiredState == null || option.requiredState(state);
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
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
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
  },
  {
    id: 4,
    text: 'You walk down the long hall towards the green light and as you get closer the light grows brighter. When you reach the end of the hall you see the light is coming from an iron brazier, green flames lick the air reaching eye level. As you stand before it a silhouette starts to form in the flames. A humanoid figure about chest height, but with long pointy ears and a slouched posture. The silhouette darkens and the figure lurches forward, leaving the brazier and flames. It moves towards you arms raised. What do you do?',
    options: [
      {
        text: 'Turn and run!',
        nextText: 6
      },
      {
        text: 'Punch the shadowy figure.',
        nextText: 7
      },
      {
        text: 'Slash the shadowy figure with your blade.',
        requiredState: (currentState) => currentState.smallBlade,
        nextText: 8
      },
      {
        text: 'Do nothing.',
        nextText: 9
      }
    ]
  },
  {
    id: 5,
    text: 'You close the door to the dusty closet and go to open the other door...',
    options: [
      {
        text: 'Next',
        nextText: 4
      }
    ]
  },
  {
    id: 6,
    text: 'You run down the dark hall back to the door which you came in. As you approach, it slams shut. You hear a deep voice resonate through the chamber.\"You have entered my lair, and awoken my minion. You cannot escape alive.\" The voice echoes, volume increasing, ending in an ear shattering tone.',
    options: [
      {
        text: 'Turn to face the minion',
        nextText: 11
      },
      {
        text: 'Try to open the door',
        nextText: 12
      }
    ]
  },
  {
    id: 7,
    text: 'Your fist meets the torso of the dark creature, and you feel an odd sensation. Not completely solid, nor fully gaseous, your hand slows to a stop obscured in the unnatural form before you. A tingling pain spreads up your arm, like simultaneous frostbite and burning, and your hand is shunted back out of the torso.',
    options: [
      {
        
      },
    ]
  },
  {
    id: 8,
    text: 'The blade slices',
    options: [
      {},
    ]
  },
  {
    id: 9,
    text: 'The shadowy figure raises it\'s dark twisted claws and swipes at you vigorously. A cold numbing pain fills your body growing out from where you were cut. You begin to feel drowsy and fall to your knees...',
    options: [
      {
        text: 'Next',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'A tragic fate befell you. You have unfortunately perished.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You turn on your heels and look up as the shadowy monster is quickly closing distance. You have moments to decide what to do.',
    options: [
      {
        text: 'Slash at it with your blade.',
        requiredState: (currentState) => currentState.smallBlade,
        nextText: 8
      },
      {
        text: 'Punch the shadowy figure.',
        nextText: 7
      },
      {
        text: 'Try to open the door',
        nextText: 12
      }
    ]
  }
]

startGame()