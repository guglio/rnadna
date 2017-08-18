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
    var validSting = sequenceValidation(sequence);



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
  for (var key in countedBases) {
    $("#basesCount").append("<p>"+key+" : "+countedBases[key]+", total mass: "+ masses[key]*countedBases[key]+"</p>");
  }
  for (var key in countedLinks) {
    $("#linksCount").append("<p>"+key+" : "+countedLinks[key]+"</p>");
  }
  return [countedBases,countedLinks];
};

function sequenceReformat(sequence){
  var dna = [];
  var rna = [];

  sequence.forEach(function(element){
    element[2].toLowerCase() === 'd' ? dna.push(element[1]) : rna.push(element[1]);
  });
  var label = "["+dna.join("")+"]"+rna.join("");
  $("#sequenceReformatting").append(label);

  return label;
};


function sequenceValidation(sequence){
  var modifiers = ["-", "m", "b", "d"];
  var bases = ["A", "G", "C", "T", "U", "R", "Y", "S", "W", "K", "M", "B", "D", "H", "V", "N"];
  var sugars = ["d", "r", "e", "m", "y", "l", "k", "o"];
  var linkages = ["o", "s"];
  var seqSplit = sequence.join("").split('');
  var errors = {};
  var error = 0;
  // seqSplit.forEach(function(item){
  //   errors[item] = 0;
  // });
  // var n = seqSplit.length();
  //
  // for(var i=0;i<n;i+=4){
  //   var j=i;
  //
  //
  // }

  sequence.forEach(function(item){
    if(modifiers.indexOf(item[0]) < 0 )
      error++;
    if(bases.indexOf(item[1]) < 0)
      error++;
    if(sugars.indexOf(item[2]) < 0)
      error++;
    if(linkages.indexOf(item[3]) < 0)
      error++;
  });

  if(error > 0)
    $("#sequenceValidation").html("Error in the sequence");
  // console.log(errors);

  return error;
};
