$(function() {
  $("#sequenceForm").on('submit',function(e){
    e.preventDefault();
    var sequence = $('#sequence').val().match(/.{1,4}/g);
    var massesTable = {
      A:5,
      C:5,
      G:5,
      T:5,
      U:5,
      W:5,
      S:5,
      M:5,
      K:5,
      R:5,
      Y:5,
      B:5,
      D:5,
      H:5,
      V:5,
      N:5
    };
    var counts = sequenceCounts(sequence,massesTable);
    var sequenceLabel = sequenceReformat(sequence);
    var errors = sequenceValidation(sequence);

  });
  $("#testData").on('click', function(){
    $('#sequence').val("-Gdo-Gdo-Ado-Ado-Udo-Gro-Gro-Cro-Uro-Uro-Uro-Ur");
  });
  $("#testWrongData").on('click', function(){
    $('#sequence').val("-Gdo-Gdo-Ado-Ado-Udo-Gro-Wro-Cro-Uro-Uro-Uro=Ur");
  });


});



function sequenceCounts(sequence,masses){
  var bases = [];
  var links = [];

  sequence.forEach(function(element){
    bases.push(element[1]);
    if(element[3])
      links.push(element[3]);
  });

  var countedBases = bases.reduce(function (allBases, base) {
    if (base in allBases) {
      allBases[base]++;
    }
    else {
      allBases[base] = 1;
    }
    return allBases;
  }, {});

  var countedLinks = links.reduce(function (allLinks, link) {
    if (link in allLinks) {
      allLinks[link]++;
    }
    else {
      allLinks[link] = 1;
    }
    return allLinks;
  }, {});
  var basesOut = "";
  var linksOut = "";
  for (var key in countedBases) {
    basesOut += "<p>"+key+" : "+countedBases[key]+", total mass: "+ masses[key]*countedBases[key]+"</p>";
  }
  for (var key in countedLinks) {
    linksOut += "<p>"+key+" : "+countedLinks[key]+"</p>";
  }

  $("#basesCount").html(basesOut);
  $("#linksCount").html(linksOut);

  return [countedBases,countedLinks];
};

function sequenceReformat(sequence){
  var dna = [];
  var rna = [];

  sequence.forEach(function(element){
    element[2].toLowerCase() === 'd' ? dna.push(element[1]) : rna.push(element[1]);
  });
  var label = "["+dna.join("")+"]"+rna.join("");
  $("#sequenceReformatting").html(label);

  return label;
};


function sequenceValidation(sequence){
  var modifiers = ["-", "m", "b", "d"];
  var bases = ["A", "G", "C", "T", "U", "R", "Y", "S", "W", "K", "M", "B", "D", "H", "V", "N"];
  var sugars = ["d", "r", "e", "m", "y", "l", "k", "o"];
  var linkages = ["o", "s"];
  var seqSplit = sequence.join("").split('');
  var errors = [];
  var errorFlag = 0;

  seqSplit.forEach(function(item,i){
    errors[i] = 0;
  });

  sequence.forEach(function(item,i){
    if(modifiers.indexOf(item[0]) < 0 ){
      errors[4*i+0] = "modifier not correct";
      errorFlag++;
    }
    if(bases.indexOf(item[1]) < 0){
      errors[4*i+1] = "base not correct";
      errorFlag++;
    }
    if(sugars.indexOf(item[2]) < 0){
      errors[4*i+2] = "sugar not correct";
      errorFlag++;
    }
    if(linkages.indexOf(item[3]) < 0 && item[3]){
      errors[4*i+3] = "linkage not correct";
      errorFlag++;
    }
  });

  var sequenceOutput = "";

  seqSplit.forEach(function(item,i){
    sequenceOutput += errors[i] === 0 ? item : "<code>"+item+'</code>';
  });

  $("#sequenceValidation").html('<p class="sequenceOutput">'+sequenceOutput+'</p>');

  if(errorFlag > 0){
    errorFlag === 1 ? $("#sequenceValidation").append("<p>There is 1 error</p>") :
    $("#sequenceValidation").append("<p>There are " + errorFlag + " errors</p>");
    errors.forEach(function(item,i){
      item !== 0 ? $("#sequenceValidation").append("<p>position: " + (i+1) + " there is a " + item) : '';
    });
  }
  else{
    $(".sequenceOutput").addClass('text-success');
    $("#sequenceValidation").append('<p>Sequence correct!</p>');
  }

  return errorFlag;
};
