

var app = angular.module('myApp', []);


function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}




app.controller('geneCtrl', function($scope) {

    // Test Genetic Variation
    var sEH="ggcacgagctctctctctctctctctctctctctcgccgccatgacgctgcgcggcgccgtcttcgaccttgacggggtgctggcgctgccagcggtgttcggcgtcctcggccgcacggaggaggccctggcgctgcccagaggacttctgaatgatgctttccagaaagggggaccagagggtgccactacccggcttatgaaaggagagatcacactttcccagtggataccactcatggaagaaaactgcaggaagtgctccgagaccgctaaagtctgcctccccaagaatttctccataaaagaaatctttgacaaggcgatttcagccagaaagatcaaccgccccatgctccaggcagctctcatgctcaggaagaaaggattcactactgccatcctcaccaacacctggctggacgaccgtgctgagagagatggcctggcccagctgatgtgtgagctgaagatgcactttgacttcctgatagagtcgtgtcaggtgggaatggtcaaacctgaacctcagatctacaagtttctgctggacaccctgaaggccagccccagtgaggtcgtttttttggatgacatcggggctaatctgaagccagcccgtgacttgggaatggtcaccatcctggtccaggacactgacacggccctgaaagaactggagaaagtgaccggaatccagcttctcaataccccggcccctctgccgacctcttgcaatccaagtgacatgagccatgggtacgtgacagtaaagcccagggtccgtctgcattttgtggagctgggctggcctgctgtgtgcctctgccatggatttcccgagagttggtattcttggaggtaccagatccctgctctggcccaggcaggttaccgggtcctagctatggacatgaaaggctatggagagtcatctgctcctcccgaaatagaagaatattgcatggaagtgttatgtaaggagatggtaaccttcctggataaactgggcctctctcaagcagtgttcattggccatgactggggtggcatgctggtgtggtacatggctctcttctaccccgagagagtgagggcggtggccagtttgaatactcccttcataccagcaaatcccaacatgtcccctttggagagtatcaaagccaacccagtatttgattaccagctctacttccaagaaccaggagtggctgaggctgaactggaacagaacctgagtcggactttcaaaagcctcttcagagcaagcgatgagagtgttttatccatgcataaagtctgtgaagcgggaggactttttgtaaatagcccagaagagcccagcctcagcaggatggtcactgaggaggaaatccagttctatgtgcagcagttcaagaagtctggtttcagaggtcctctaaactggtaccgaaacatggaaaggaactggaagtgggcttgcaaaagcttgggacggaagatcctgattccggccctgatggtcacggcggagaaggacttcgtgctcgttcctcagatgtcccagcacatggaggactggattccccacctgaaaaggggacacattgaggactgtgggcactggacacagatggacaagccaaccgaggtgaatcagatcctcattaagtggctggattctgatgcccggaacccaccggtggtctcaaagatgtagaacgcagcgtagtgcccacgctcagcaggtgtgccatccttccacctgctggggcaccattcttagtatacagaggtggccttacacacatcttgcatggatggcagcattgttctgaaggggtttgcagaaaaaaaagattttctttacataaagtgaatcaaatttgacattattttagatcccagagaaatcaggtgtgattagttctccaggcatgaatgcatcgtccctttatctgtaagaacccttagtgtcctgtagggggacagaatggggtggccaggtggtgatttctctttgaccaatgcatagtttggcagaaaaatcagccgttcatttagaagaatcttagcagagattgggatgccttactcaataaagctaagatgac";
    var varLoc=860;
    var wtNT='g';
    var varNT='a';

    sEH_var = setCharAt(sEH,varLoc-1,varNT);

    var sEHVariant = {
            name:   "sEH",
            loc:    varLoc,
            wtNT:   wtNT,
            varNT:  varNT,
            activeColor: "red"
        };

    
    var activeVariant= sEHVariant // Varient currently being scanned for

    // temp test patients
    obj1={
        "firstname":    "Samir",
        "lastname":     "Akre",
        "gene":         sEH
    };

    obj2={
        "firstname":    "Sharvari",
        "lastname":     "Bhide",
        "gene":         sEH_var
    };

    var patients = [obj1,obj2];
    
    var varIndex = activeVariant.loc - 1;
    console.log(activeVariant.varNT)
    for(var i=0; i <  patients.length; i++)
    {
        console.log(patients[i].firstname)
        console.log(patients[i].gene[varIndex])
        if(patients[i].gene[varIndex] == activeVariant.varNT)
        {
            patients[i].variant = 1
        }
        else
        {
            patients[i].variant = 0
        }
    }
    
    $scope.patients=[obj1,obj2];
    $scope.activeVariant=activeVariant;

    });


