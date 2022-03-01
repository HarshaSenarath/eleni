var currentquestion=0;
var correctcount=0;
var wrongcount=0;
var wrongscore=0;
var totalquestions=questions.length;
var timeused=0;
var correctarray = [];//creating an array to hold the correct questions

var navbar=document.getElementById("navigationBar")
var container=document.getElementById("quizcontainer")
var questionelement=document.getElementById("question")
var opt1=document.getElementById("opt1");
var opt2=document.getElementById("opt2");
var opt3=document.getElementById("opt3");
var opt4=document.getElementById("opt4");
var nextbutton=document.getElementById("nextbutton")
var quizrules=document.getElementById("rules")
var startbutton=document.getElementById("startbutton")
var displaycount=document.getElementById("correctcount")
var quiztime=document.getElementById("quiztimeleft")
var ResultCont=document.getElementById("result")
var correctanswerdiv=document.getElementById("correctanswerdiv")//correct questions div
var time=document.getElementById("timeused")


var totalseconds=60;
var cminutes=parseInt(totalseconds/60);
var cseconds=parseInt(totalseconds%60);

    function checktime(){
        document.getElementById("quiztimeleft").innerHTML='Time Left : '+ cminutes +' Minutes ' + cseconds + ' Seconds';
        if(totalseconds<=0){
        setTimeout('submitthis()',1);//calling the submit function when time runs out
       
       
    }else{
        totalseconds=totalseconds-1;
        cminutes=parseInt(totalseconds/60);
     cseconds=parseInt(totalseconds%60);
      timeused=60-totalseconds;
     setTimeout("checktime()",1000);
    }
  }
    

function startquiz(){

  
 
startbutton.classList.add('hide')//hiding the start button after pressing it
navbar.classList.add('hide')//hiding the navigation bar 


 currentquestionindex=0//starting with the first question 
 container.classList.remove('hide')//showing the question container after presing the start button
 quiztime.classList.remove('hide')//showing the timer after the quiz start
 quizrules.classList.add('hide')//hiding the rules container after the quiz starts
 loadquestion(currentquestion);//loading the first question at the start of the quiz
 setTimeout("checktime()",1000);//starting the timer 

 
}

  
function loadquestion(questionindex){
    
    var q=questions[questionindex];
    questionelement.textContent=q.question;//showing the questions
    opt1.textContent=q.option1;//showing the options
    opt2.textContent=q.option2;
    opt3.textContent=q.option3;
    opt4.textContent=q.option4;
}

function loadnextquestion(){
    var selectedoption=document.querySelector('input[type=radio]:checked');//assigning the selected radiobutton 
    if(!selectedoption){
        alert("please select an answer!!");
        return;
    }
    var answer =selectedoption.value;//getting the value of the checked radio button
    if(questions[currentquestion].answer==answer){
         
        var eachquestion=questions[currentquestion].question;
        correctarray.push(eachquestion);//adding the correct questions to the array
      
        correctcount+=1;
        selectedoption.checked=false;//unchecking the selected option
        currentquestion++; 

    } else if
    
     (questions[currentquestion].answer!==answer){
         selectedoption.checked=false;//unchecking the selected option
        currentquestion++;
        wrongcount+=1;
        
        

    }if(currentquestion==totalquestions-1){//changing the next button content to finish at the last question
        nextbutton.textContent="finish";
    }
    if(currentquestion==totalquestions){
        navbar.classList.remove('hide');
        submitthis();//calling the function when all 10 questions are completed
       
    }  
loadquestion(currentquestion)
    
}


function submitthis(){
        
        totalseconds=0;
         
    

         container.classList.add('hide');
         ResultCont.classList.remove('hide');
         correctanswerdiv.classList.remove('hide');   
         displaycount.classList.remove('hide');
         time.classList.remove('hide');
        
         
    
         if(correctcount<=4){
            navbar.classList.remove('hide');
            document.body.style.background = "rgba(7, 125, 121, 0.89)";//changing the background color according to the score 
            ResultCont.textContent="you got a score of : "+ finalscorecalculator(wrongcount,correctcount);//showing the final score 
            displaycount.textContent="you can do better!! you got " + correctcount + " out of 10 questions correct!!";
            time.textContent="total time used is " + timeused + " seconds";
            correctanswerdiv.innerHTML= "The correct questions are <br> " + correctquestions(correctarray);
        }else if((correctcount>=5)&& (correctcount<=7)){
            navbar.classList.remove('hide');
            document.body.style.background = "rgba(0, 0, 0, 0.78)";//changing the background color according to the score 
            ResultCont.textContent="you got a score of : "+ finalscorecalculator(wrongcount,correctcount);//showing the final score 
            displaycount.textContent="Good Try!!\n you got " + correctcount + " out of 10 questions correct!!";
            time.textContent="total time used is " + timeused + " seconds";
            correctanswerdiv.innerHTML= "The correct questions are <br> " + correctquestions(correctarray);

        }else if(correctcount>=8){
            navbar.classList.remove('hide');
            document.body.style.background = "rgba(9, 6, 177, 0.64)";//changing the background color according to the score 
            ResultCont.textContent="you got a score of : "+ finalscorecalculator(wrongcount,correctcount);//showing the final score 
            displaycount.textContent="Well done!! \n you got " + correctcount + " out of 10 questions correct!!";
            time.textContent="total time used is " + timeused + " seconds";
            correctanswerdiv.innerHTML = "The correct questions are <br> " + correctquestions(correctarray);
        }
      

         return;
    }

    
    function correctquestions(correctarray){//funtion to print out the correct questions array
        var temp="";

       
        for( var i =0;i<correctarray.length;i++){
            temp+=correctarray[i] + " <br>";

        }
        return temp;

    }

   function finalscorecalculator(wrongcount,correctcount){//function to calculate the final score
       var correctscore;
       var noscore=0;
       var finalfinalscore;
       
         wrongscore=wrongcount*-1;
         correctscore=correctcount*2;
         finalfinalscore=correctscore+wrongscore;
         
        if(correctcount<=3){
            return noscore ;
        }else{
            return finalfinalscore;

        }
       
    }

   




    

