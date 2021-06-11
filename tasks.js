
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {

  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text.match(/hello\w*/)){
    hello(text);
  }
  else if(text === 'list\n'){
    list(text)
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text.match(/add\w*/)){
    let i=0;
      add(text);
  }
  else if(text.match(/remove/)){
      remove(text);
  }

  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  
return console.log(text.trim() + "!");

}
/**
 * tasks array
 */
let tasks = ["feed the cats", "clean the laundry","clean the kitchen","clean the bathroom"];
/**
 * print all the attributes is the array
 */
function list() {
  let batata = tasks.map(task => task+'\n');
  let x = batata.toString().split(",").join("").trim();
  return console.log(x);
}
/**
 * add a task to the tasks array
 */
function add(text){
  let x = text.replace("add","").trim()
   tasks.push(x)
 
}
function remove(text){
  let number = text.match(/\d+/)-1;
  if(text === "remove\n"){
    tasks.pop();
  }
  else if(text.match(/^remove\s\d+/) && number <= tasks.length){
    tasks.splice(number,1,"antoine debes");
  }

}

   

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
/** 
*Listing all the possible commands 
*hello
*exit
*quit
*/
function help(){
  console.log('hello \nexit \nquit')
}

// The following line starts the application
startApp("Hussein Abou Hachem")
