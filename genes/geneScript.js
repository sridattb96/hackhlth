

var app = angular.module('myApp', []);


function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}




app.controller('geneCtrl', function($scope,$timeout) {

    // Test Genetic Variation
    var sEH="ggcacgagctctctctctctctctctctctctctcgccgccatgacgctgcgcggcgccgtcttcgaccttgacggggtgctggcgctgccagcggtgttcggcgtcctcggccgcacggaggaggccctggcgctgcccagaggacttctgaatgatgctttccagaaagggggaccagagggtgccactacccggcttatgaaaggagagatcacactttcccagtggataccactcatggaagaaaactgcaggaagtgctccgagaccgctaaagtctgcctccccaagaatttctccataaaagaaatctttgacaaggcgatttcagccagaaagatcaaccgccccatgctccaggcagctctcatgctcaggaagaaaggattcactactgccatcctcaccaacacctggctggacgaccgtgctgagagagatggcctggcccagctgatgtgtgagctgaagatgcactttgacttcctgatagagtcgtgtcaggtgggaatggtcaaacctgaacctcagatctacaagtttctgctggacaccctgaaggccagccccagtgaggtcgtttttttggatgacatcggggctaatctgaagccagcccgtgacttgggaatggtcaccatcctggtccaggacactgacacggccctgaaagaactggagaaagtgaccggaatccagcttctcaataccccggcccctctgccgacctcttgcaatccaagtgacatgagccatgggtacgtgacagtaaagcccagggtccgtctgcattttgtggagctgggctggcctgctgtgtgcctctgccatggatttcccgagagttggtattcttggaggtaccagatccctgctctggcccaggcaggttaccgggtcctagctatggacatgaaaggctatggagagtcatctgctcctcccgaaatagaagaatattgcatggaagtgttatgtaaggagatggtaaccttcctggataaactgggcctctctcaagcagtgttcattggccatgactggggtggcatgctggtgtggtacatggctctcttctaccccgagagagtgagggcggtggccagtttgaatactcccttcataccagcaaatcccaacatgtcccctttggagagtatcaaagccaacccagtatttgattaccagctctacttccaagaaccaggagtggctgaggctgaactggaacagaacctgagtcggactttcaaaagcctcttcagagcaagcgatgagagtgttttatccatgcataaagtctgtgaagcgggaggactttttgtaaatagcccagaagagcccagcctcagcaggatggtcactgaggaggaaatccagttctatgtgcagcagttcaagaagtctggtttcagaggtcctctaaactggtaccgaaacatggaaaggaactggaagtgggcttgcaaaagcttgggacggaagatcctgattccggccctgatggtcacggcggagaaggacttcgtgctcgttcctcagatgtcccagcacatggaggactggattccccacctgaaaaggggacacattgaggactgtgggcactggacacagatggacaagccaaccgaggtgaatcagatcctcattaagtggctggattctgatgcccggaacccaccggtggtctcaaagatgtagaacgcagcgtagtgcccacgctcagcaggtgtgccatccttccacctgctggggcaccattcttagtatacagaggtggccttacacacatcttgcatggatggcagcattgttctgaaggggtttgcagaaaaaaaagattttctttacataaagtgaatcaaatttgacattattttagatcccagagaaatcaggtgtgattagttctccaggcatgaatgcatcgtccctttatctgtaagaacccttagtgtcctgtagggggacagaatggggtggccaggtggtgatttctctttgaccaatgcatagtttggcagaaaaatcagccgttcatttagaagaatcttagcagagattgggatgccttactcaataaagctaagatgac";
    var varLoc=860;
    var wtNT='g';
    var varNT='a';

    $scope.variants = FBHelper_.getVariants();
    console.log($scope.variants)
    $timeout(function(){
        $scope.$apply()
    },2000)

    sEH_var = setCharAt(sEH,varLoc-1,varNT);
    sEH_var = setCharAt(sEH,909-1,"a");
    console.log(sEH[908])

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
    

    $scope.varChange = function(v) {
        
        for(var i=0; i <  $scope.patients.length; i++)
        {
            console.log($scope.patients[i].firstname)
            console.log($scope.patients[i].gene[varIndex])
            if($scope.patients[i].gene[varIndex] == v.varNT)
            {
                $scope.patients[i].variant = 1
            }
            else
            {
                $scope.patients[i].variant = 0
            }
        }
    }

});

app.controller('variantCtrl', function($scope,$timeout) {
    
    $scope.newVariant = {
        name:"",
        chr:"",
        loc:"",
        wtNT:"",
        varNT:""
    };


    $scope.variants = FBHelper_.getVariants()
    console.log($scope.variants)

    $timeout(function(){
        $scope.$apply();
        $scope.newVariant = {
        name:"",
        chr:"",
        loc:"",
        wtNT:"",
        varNT:""
    };
    },2000)

    $scope.addVariant = function() {
        console.log($scope.newVariant);
        FBHelper_.newVariant($scope.newVariant)
        $scope.variants.push($scope.newVariant)
    };
    


});

