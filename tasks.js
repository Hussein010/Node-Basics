
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
  try{
  load()
  }catch{
    console.log("can't load");
  }
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
  else if(text.match(/edit/)){
      edit(text);
}
  else if(text.match(/check/)){
    modeling(text); 
  }
  else if(text.match(/unchcheck/)){
    modeling(text);
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
let tasks = [{check: "[]",value:"feed the cats"},{check: "[]", value:"clean the laundry"}, {check: "[]", value:"clean the kitchen"}];
/**
 * print all the attributes is the array
 */
function list() {
  let batata = tasks.map(task => (task.check+task.value+"\n"));
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
/**
 * remove the task at a given number 
 */
function remove(text){
  let number = text.match(/\d+/)-1;
  if(text === "remove\n"){
    tasks.pop();
  }
  else if(text.match(/^remove\s\d+/) && number <= tasks.length){
    tasks.splice(number,1);
  }
  else if(number >= tasks.length){
    console.log('better remove');
}
}
/**
 *  edit a task at a number given
 */
 function edit(text){

    let number = text.match(/\d+/)-1;
    if (text === "edit\n"){
    console.log("error");
 }
     else if (text.match(/edit\s\D\w/)){
      let i = text.replace("edit","").trim()
       tasks.pop()
       tasks.push(i)
   }
  
    else if(text.match(/^edit\s\d+/) && number <= tasks.length){
      let x = text.replace(/edit\s\d+/,"").trim()
      tasks.splice(number,1,x);
    }
 }
/**
 * check and uncheck the tasks 
 */
   
function modeling(text){
  let number = text.match(/\d+/)-1;

  if(text === "check\n" || text === "uncheck\n"){
    console.log('error');
  }
  else if(text.match(/^check\s\d+/) && number <= tasks.length){
    tasks[number].check = "checked  ";
  }
  else if(text.match(/^uncheck\s\d+/) && number <= tasks.length){
    tasks[number].check = "unchecked  "
  }
}
/**
 * load fata
 */
 function load(){
  const fs = require('fs');

  let data = fs.readFileSync("database.json");
  tasks = JSON.parse(data);
}
/** 
*Listing all the possible commands 
*/
function help(){
  console.log('hello \nexit \nquit \nremove \nremove 1 \nremove 2 \ncheck1 \n check2')
}

/**
 * Exits the application
 *
 * @returns {void}
 */
/**
 * save and exit
 */
function quit(){
  fs = require('fs');
  fs.writeFileSync("database.json", JSON.stringify(list));
  console.log('Quitting now, goodbye!');
  process.exit();

}
/** 
*Listing all the possible commands 
*/
function help(){
  console.log('hello \nexit \nquit \nremove \nremove 1 \nremove 2 \ncheck1 \n check2')
}

// The following line starts the application
startApp("Hussein Abou Hachem")
