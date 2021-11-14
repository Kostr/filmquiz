var data = {}
var question_number = 0

function ContinueGame(link, pick_text) {
  if (document.getElementsByClassName("modal-wrong-answer__title").length == 1) {
    var str = document.getElementsByClassName("modal-wrong-answer__title")[0].innerText
    if (str.match(/«[^]*»/) != null) {
      var result = str.match(/«[^]*»/)[0].slice(1,-1);
      dict[link] = result
    }
    if (str.match(/Правильный ответ — ([^]*)\.\n/) != null) {
      dict[link] = str.match(/Правильный ответ — ([^]*)\.\n/)[1]
    }
  } else {
    dict[link] = pick_text
  }

  console.log("ContinueGame")
  var fail = false;
  if (document.getElementsByClassName("modal-wrong-answer__button").length == 1) {
    document.getElementsByClassName("modal-wrong-answer__button")[0].click()
    fail = true;
  } else {
    if (document.getElementsByClassName("modal-wrong-answer__restart-button button button_color_gradient-1").length == 1) {
      document.getElementsByClassName("modal-wrong-answer__restart-button button button_color_gradient-1")[0].click()
      question_number = 0
      fail = true
    }
  }
  question_number+=1
  console.log("question_number=" + question_number);

  if (fail) {
    setTimeout(() => bot(link), 200 + getRandomInt(1500))
  } else {
    setTimeout(() => bot(link), 200 + getRandomInt(200))
  }
}

function PickRandom(link) {
  var pick = getRandomInt(3);
  var answer = document.getElementsByClassName("game__test-answers-item")[pick]
  var pick_text = answer.innerText
  answer.click();
  return pick_text;
}

function PickAnswer(link) {
  console.log("PickAnswer")
  var pick_text = "";
  if (dict.hasOwnProperty(link)) {
    for (i=0; i<4; i+=1) {
      var choice = document.getElementsByClassName("game__test-answers-item")[i]
      if (choice.innerText == dict[link]) {
        pick_text = choice.innerText;
        choice.click();
      }
    }
  } else {
    pick_text = PickRandom(link);
  }
  setTimeout(() => ContinueGame(link, pick_text), 800 + getRandomInt(1000))
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function bot(oldlink) {
  console.log("bot")
  var image = document.getElementsByClassName("game__test-image-img")
  if (image.length != 1) {
    setTimeout(() => bot(oldlink), 200 + getRandomInt(400))
    return;
  }

  var link = document.getElementsByClassName("game__test-image-img")[0].src;

  if (link == oldlink) {
    setTimeout(() => bot(oldlink), 200 + getRandomInt(400))
    return;
  }
 
  PickAnswer(link)
}


bot('')
