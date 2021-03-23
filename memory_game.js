// the Start

document.querySelector( ".controls-buttons span" ).onclick = function ()
{
  // Set The Name
  let yourName = prompt( "what is your name?" );

  if ( yourName == null || yourName == "" )
  {
    document.querySelector( ".name span" ).innerHTML = "Unknown";
  } else
  {
    document.querySelector( ".name span" ).innerHTML = yourName;
  }

  // Remove to start
  document.querySelector( ".controls-buttons" ).remove();
};

// Set an important Variables

// >The Effect Duration
let duration = 1000;
// > The blocks Container
let blocksContainer = document.querySelector( ".memory-game-blocks" );
// > Creat Array From Blocks
let blocks = Array.from( blocksContainer.children );
// Creat Renge Of Keys
let orderRange = Array.from( Array( blocks.length ).keys() );

shuffle( orderRange );

blocks.forEach( ( block, index ) =>
{
  // Add Css Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener( 'click', function ()
  {
    // Trigger The Fllip Block Function
    fllipBlock( block );
    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter( flippedBlock => flippedBlock.classList.contains( 'is-flipped' ) );
    // If Theres Tow Selected Blocks
    if ( allFlippedBlocks.length === 2 )
    {
      // stop Clicking Function 
      stopClicking();
      // Check matched block Function
      checkMatchedBlocks( allFlippedBlocks[0], allFlippedBlocks[1] );
    }
  } );
} );

// stop Clicking Function
function stopClicking()
{
  // Add Class No Clicking on main container
  blocksContainer.classList.add( 'no-clicking' );

  setTimeout( () =>
  {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove( 'no-clicking' );
  }, duration );
}
// Check matched block Function
function checkMatchedBlocks( firstBlock, secondBlock )
{
  let triesElement = document.querySelector( '.tries span' );
  if ( firstBlock.dataset.technology === secondBlock.dataset.technology )
  {
    firstBlock.classList.remove( 'is-flipped' );
    secondBlock.classList.remove( 'is-flipped' );

    firstBlock.classList.add( 'has-match' );
    secondBlock.classList.add( 'has-match' );
  } else
  {
    triesElement.innerHTML = parseInt( triesElement.innerHTML ) + 1;

    setTimeout( () =>
    {
      firstBlock.classList.remove( 'is-flipped' );
      secondBlock.classList.remove( 'is-flipped' );
    }, duration );
  }
}

// Fllip Block Function
function fllipBlock( selectedBlock )
{
  selectedBlock.classList.add( 'is-flipped' );
}

// shuffle Function
function shuffle( array )
{
  // setting vars
  let current = array.length,
    temp,
    random;

  while ( current > 0 )
  {
    // get Random Number
    random = Math.floor( Math.random() * current );
    // Decrase Length By One
    current--;

    // [1] save Current Element in stash.
    temp = array[current];
    // [2] current Element = Random Element
    array[current] = array[random];
    // [3] Random Element = get The element form stash
    array[random] = temp;
  }
  return array;
}